import { network } from "hardhat";

async function main() {
    // Connect to the desired network (localhost, hardhatOp, etc.)
    const { ethers } = await network.connect({
        network: "hardhatOp",
        chainType: "op",
    });

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);

    // Deploy the contract using the Factory pattern
    const Factory = await ethers.getContractFactory("NurseLicenseRegistry");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    console.log("NurseLicenseRegistry deployed at:", contract);

    // Example transaction on the same network
    console.log("Sending 1 wei from", deployer.address, "to itself");
    const tx = await deployer.sendTransaction({
        to: deployer.address,
        value: 1n,
    });
    await tx.wait();
    console.log("Transaction sent successfully");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
