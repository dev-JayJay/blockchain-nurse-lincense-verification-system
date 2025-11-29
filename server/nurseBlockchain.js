import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ethers } from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load ABI
const artifactPath = path.join(
  __dirname,
  "../blockchain/artifacts/contracts/NurseLicenseRegistry.sol/NurseLicenseRegistry.json"
);
const NurseLicenseABI = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

// Hardhat localhost RPC
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// 🔥 Hardhat FIRST ACCOUNT private key (acts as deployer)
const HARDHAT_PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";


const signer = new ethers.Wallet(HARDHAT_PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function getContract() {
  return new ethers.Contract(CONTRACT_ADDRESS, NurseLicenseABI.abi, signer);
}


export async function registerNurseOnChain(nurse) {
  const contract = getContract();

  const tx = await contract.addLicense(
    nurse.internalNurseId,
    nurse.firstName,
    nurse.lastName,
    nurse.licenseNumber,
    nurse.status || "Active"
  );

  await tx.wait();
  return tx.hash;
}

// Read nurse license
export async function getNurseLicense(nurseId) {
  const contract = getContract();
  return await contract.getLicense(nurseId);
}
