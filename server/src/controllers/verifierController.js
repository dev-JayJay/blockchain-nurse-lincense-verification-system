import Verifier from "../models/Verifier.js";
import VerificationLog from "../models/VerificationLog.js";
import { sendEmail } from "../utils/mailer.js";

export const submitVerifierRegistration = async (req, res) => {
  try {
    const body = req.body;
    const existingMail = await Verifier.findOne({ email: body.email });

    if (existingMail) {
      return res
        .status(400)
        .json({ message: "Organization email already exists" });
    }

    const existingRepMail = await Verifier.findOne({
      "rep.email": body.rep.email,
    });

    if (existingRepMail) {
      return res
        .status(400)
        .json({ message: "Representative email already exists" });
    }

    const v = new Verifier({
      orgName: body.orgName,
      orgType: body.orgType,
      street: body.street,
      city: body.city,
      state: body.state,
      country: body.country,
      phone: body.phone,
      email: body.email,
      website: body.website,
      cacNumber: body.cacNumber,
      tin: body.tin,
      password: body.password,
      rep: {
        firstName: body.repFirstName,
        middleName: body.repMiddleName,
        lastName: body.repLastName,
        title: body.repTitle,
        address: body.repAddress,
        email: body.repEmail,
      },
      // documents: handle file uploads later
      status: "Pending",
    });
    await v.save();
    return res.json({ success: true, id: v._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const listPendingVerifiers = async (req, res) => {
  try {
    const pending = await Verifier.find({ status: "Pending" }).sort({
      createdAt: -1,
    });
    return res.json(pending);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllVerifiers = async (req, res) => {
  try {
    const allVerifiers = await Verifier.find().sort({
      createdAt: -1,
    });
    return res.json(allVerifiers);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

export const approveVerifier = async (req, res) => {
  try {
    const { id } = req.params;
    const v = await Verifier.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );
    if (!v) return res.status(404).json({ error: "not found" });
    await sendEmail({
      to: v.email,
      subject: "Your Verifier Registration Has Been Approved",
      html: `
    <h2>Congratulations ${v.rep.firstName ?? ""} ${v.rep.middleName ?? ""} ${
        v.rep.lastName ?? ""
      }!</h2>

    <p>Your organization <strong>${
      v.orgName
    }</strong> has been approved by the admin.</p>
    <p>You can now log in and start verifying credentials.</p>

    <br />

    <a href="http://localhost:5173/login"
      style="
        display: inline-block;
        padding: 12px 20px;
        background-color: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        font-size: 16px;
      "
    >
      Login to Your Account
    </a>

    <br /><br />

    <p>Best regards,</p>
    <p><strong>The Admin Team</strong></p>
  `,
    });

    return res.json({ success: true, verifier: v });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const rejectVerifier = async (req, res) => {
  try {
    const { id } = req.params;
    const reason =
      "Your account request was rejected because it does not comply with our platform policies or terms of service.";
    if (!reason) return res.status(400).json({ error: "reason required" });
    const v = await Verifier.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );
    if (!v) return res.status(404).json({ error: "not found" });
    await sendEmail({
      to: v.email,
      subject: "Your Verifier Registration Was Rejected",
      html: `
        <h2>Hello ${v.rep.firstName ?? ""} ${v.rep.middleName ?? ""} ${
        v.rep.lastName ?? ""
      },</h2>
        <p>We reviewed your application for <strong>${v.orgName}</strong>.</p>
        <p><strong>Status:</strong> Rejected</p>
        <p><strong>Reason:</strong> ${reason}</p>

        <p>You may update your information and reapply if the issue can be resolved.</p>
        <br />

        <p>Regards,</p>
        <p><strong>The Admin Team</strong></p>
      `,
    });
    return res.json({ success: true, verifier: v });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const start = async (req, res) => {
  try {
    const totalVerified = await VerificationLog.countDocuments({verifierId: req.params.id});
    const successCount = await VerificationLog.countDocuments({
      status: "success",
      verifierId: req.params.id
    });
    const invalidCount = await VerificationLog.countDocuments({
      status: "invalid",
      verifierId: req.params.id
    });

    res.json({
      totalVerified,
      successCount,
      invalidCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logs = async (req, res) => {
  try {
    const logs = await VerificationLog.find({verifierId: req.params.id}).sort({ createdAt: -1 }).limit(5);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
