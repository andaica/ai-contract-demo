import { ethers } from "hardhat";

async function main() {
  // Get the contract factory
  const Todo = await ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();
  console.log("Todo contract deployed to:", todo.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
