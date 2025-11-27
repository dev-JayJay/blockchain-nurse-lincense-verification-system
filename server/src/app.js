import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import nurseRoutes from "./routes/nurseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import verifierRoutes from "./routes/verifierRoutes.js";
dotenv.config()

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/nurses", nurseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/verifier", verifierRoutes);

app.get("/", (req, res) => res.send("Nurse License Verification Server Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
