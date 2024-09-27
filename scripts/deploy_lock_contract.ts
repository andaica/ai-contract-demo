import { ethers } from "hardhat";

async function main() {
  // Get the contract factory
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const ONE_GWEI = 1_000_000_000;

  const lockedAmount = ONE_GWEI;
  const unlockTime = Math.floor(new Date().getTime() / 1000) + ONE_YEAR_IN_SECS;

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  console.log("Lock deployed to:", lock.target, unlockTime);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
