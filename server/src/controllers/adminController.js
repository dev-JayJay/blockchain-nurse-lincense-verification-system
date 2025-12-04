import Admin from "../models/Admin.js";
import Nurse from "../models/Nurse.js";
import Verifier from "../models/Verifier.js";
import jwt from "jsonwebtoken";

// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      department,
      permissions,
    } = req.body;

    // Check for existing user
    const existing = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existing)
      return res
        .status(400)
        .json({ message: "Admin with this email or username already exists" });

    const admin = new Admin({
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      department,
      permissions,
    });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Try to find user in Admin collection
    let user = await Admin.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    let role = "admin";

    // If not found, try Verifier collection
    if (!user) {
      user = await Verifier.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });
      role = "verifier";

      // If verifier exists, check status
      if (user && user.status !== "Approved") {
        return res.status(403).json({
          message:
            user.status === "Pending"
              ? "Your account is still pending admin approval."
              : `Your account was rejected. Reason: ${
                  user.rejectionReason || "N/A"
                }`,
        });
      }
    }

    // If still not found → invalid credentials
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const loginAdmin = async (req, res) => {
//   try {
//     const { emailOrUsername, password } = req.body;

//     // Find admin by email or username
//     const admin = await Admin.findOne({
//       $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
//     });

//     if (!admin) return res.status(400).json({ message: "Invalid credentials" });

//     // Compare password
//     const isMatch = await admin.comparePassword(password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     // Generate JWT
//     const token = jwt.sign(
//       { id: admin._id, username: admin.username, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: admin._id,
//         username: admin.username,
//         email: admin.email,
//         role: admin.role,
//         department: admin.department,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// List all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAdminlogs = async (req, res) => {
  try {
    const pendingVerifiers = await Verifier.countDocuments({ status: "Pending" });
    const activeVerifiers = await Verifier.countDocuments({ status: "Approved" });
    const licenses = await Nurse.countDocuments();

    res.json({
      pendingVerifiers,
      activeVerifiers,
      licenses,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}