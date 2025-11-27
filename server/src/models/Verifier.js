import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const VerifierSchema = new mongoose.Schema({
  orgName: String,
  orgType: String,
  street: String,
  city: String,
  state: String,
  country: String,
  phone: String,
  email: String,
  website: String,
  cacNumber: String,
  tin: String,
  password: {
    type: String,
    required: true,
  },

  rep: {
    firstName: String,
    middleName: String,
    lastName: String,
    title: String,
    address: String,
    email: String,
  },
  documents: {
    cacCert: String,
    taxCert: String,
    ownerID: String,
  },

  status: { type: String, default: "Pending" }, 
  rejectionReason: String,
  createdAt: { type: Date, default: Date.now },
});

VerifierSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

VerifierSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("Verifier", VerifierSchema);
