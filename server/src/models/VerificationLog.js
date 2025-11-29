import mongoose from "mongoose";

const verificationLogSchema = new mongoose.Schema(
  {
    licenseNumber: String,
    status: String, 
    verifierId: String,
    verifierOrg: String,
    ip: String,
  },
  { timestamps: true }
);

export default mongoose.model("VerificationLog", verificationLogSchema);
