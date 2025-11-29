import Nurse from "../models/Nurse.js";
import VerificationLog from "../models/VerificationLog.js";
import crypto from "crypto";
import { registerNurseOnChain } from "../../nurseBlockchain.js";

// Add a new nurse
export const addNurse = async (req, res) => {
  try {
    const form = req.body;

    // 1️⃣ Save nurse record in MongoDB
    const nurse = await Nurse.create({
      ...form,
      createdAt: new Date(),
    });

    // 2️⃣ Prepare blockchain hash
    const licenseHash = crypto
      .createHash("sha256")
      .update(
        form.licenseNumber +
          form.firstName +
          form.lastName +
          form.issueDate +
          form.expiryDate +
          form.licenseStatus +
          form.adminTimestamp
      )
      .digest("hex");

    // 3️⃣ Call blockchain smart contract
    const txHash = await registerNurseOnChain({
      internalNurseId: nurse.internalNurseId,
      licenseNumber: "0x" + licenseHash,
      firstName: nurse.firstName,
      lastName: nurse.lastName,
    });

    // 4️⃣ Save blockchain metadata
    nurse.blockchainHash = licenseHash;
    nurse.blockchainTx = txHash;
    await nurse.save();

    res.status(201).json({
      success: true,
      nurseId: nurse.internalNurseId,
      blockchainTx: txHash,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// Get a nurse by license number
export const getNurse = async (req, res) => {
  try {
    const nurse = await Nurse.findOne({
      licenseNumber: req.params.licenseNumber,
    });
    if (nurse) {
      await VerificationLog.create({
        verifierId: req.params.verifierId,
        licenseNumber: req.params.licenseNumber,
        status: "success",
      });

      return res.json(nurse);
    } else {
      await VerificationLog.create({
        verifierId: req.params.verifierId,
        licenseNumber: req.params.licenseNumber,
        status: "invalid",
      });
      return res.status(404).json({ error: "Nurse not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all nurses
export const getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find().sort({ createdAt: -1 });
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNurseStatus = async (req, res) => {
  try {
    const { licenseNumber } = req.params;
    const { status } = req.body;

    const nurse = await Nurse.findOneAndUpdate(
      { licenseNumber },
      { licenseStatus: status },
      { new: true }
    );

    if (!nurse) return res.status(404).json({ message: "Nurse not found" });

    res.json(nurse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const revokeNurseLicense = async (req, res) => {
  try {
    const { licenseNumber } = req.params;

    const nurse = await Nurse.findOneAndUpdate(
      { licenseNumber },
      { licenseStatus: "Revoked" },
      { new: true }
    );

    if (!nurse) return res.status(404).json({ message: "Nurse not found" });

    res.json(nurse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
