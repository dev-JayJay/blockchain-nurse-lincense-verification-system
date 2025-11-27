import Nurse from "../models/Nurse.js";

// Add a new nurse
export const addNurse = async (req, res) => {
  try {
    const nurse = new Nurse(req.body);
    await nurse.save();
    res.status(201).json({ success: true, nurse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get a nurse by license number
export const getNurse = async (req, res) => {
  try {
    const nurse = await Nurse.findOne({ licenseNumber: req.params.licenseNumber });
    if (!nurse) return res.status(404).json({ error: "Nurse not found" });
    res.json(nurse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all nurses
export const getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
