import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  graduationDate: { type: Date, required: true },
});

const NurseSchema = new mongoose.Schema({
  // Section 1: Nurse Identification
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  idType: { type: String, required: true },
  idNumber: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },

  // Section 2: License & Registration
  licenseType: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  licenseStatus: { type: String, required: true },

  // Section 3: Professional Qualifications & History
  education: [EducationSchema],
  certifications: [String],

  // Section 4: System/Admin fields
  internalNurseId: { type: String, required: true },
  walletAddress: { type: String, required: true },
  attestation: { type: Boolean, required: true },
  adminESignature: String,
  adminUsername: String,
  adminStaffId: String,
  adminTitle: String,
  adminDepartment: String,
  adminTimestamp: { type: Date, default: Date.now },
  adminIP: String,
}, { timestamps: true });

const Nurse = mongoose.model("Nurse", NurseSchema);

export default Nurse;
