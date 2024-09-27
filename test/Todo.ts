import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Todo", function () {
  async function deployTodoFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Todo = await hre.ethers.getContractFactory("Todo");
    const todo = await Todo.deploy();

    return { todo, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract", async function () {
      const { todo } = await loadFixture(deployTodoFixture);
      expect(todo.target).to.properAddress;
    });
  });

  describe("Todo Management", function () {
    it("Should create a new todo item", async function () {
      const { todo } = await loadFixture(deployTodoFixture);
      await todo.createTodo("Test Todo", 1672531199); // Example deadline timestamp
      const todoCount = await todo.getTodoCount();
      expect(todoCount).to.equal(1);
    });

    it("Should retrieve a todo item", async function () {
      const { todo } = await loadFixture(deployTodoFixture);
      await todo.createTodo("Test Todo", 1672531199);
      const [description, deadline, isFinished] = await todo.getTodo(0);
      expect(description).to.equal("Test Todo");
      expect(deadline).to.equal(1672531199);
      expect(isFinished).to.equal(false);
    });

    it("Should finish a todo item", async function () {
      const { todo } = await loadFixture(deployTodoFixture);
      await todo.createTodo("Test Todo", 1672531199);
      await todo.finishTodo(0);
      const [description, deadline, isFinished] = await todo.getTodo(0);
      expect(isFinished).to.equal(true);
    });

    it("Should revert if trying to finish a non-existent todo item", async function () {
      const { todo } = await loadFixture(deployTodoFixture);
      await expect(todo.finishTodo(0)).to.be.revertedWith(
        "Todo item does not exist."
      );
    });

    it("Should revert if trying to finish an already finished todo item", async function () {
      const { todo } = await loadFixture(deployTodoFixture);
      await todo.createTodo("Test Todo", 1672531199);
      await todo.finishTodo(0);
      await expect(todo.finishTodo(0)).to.be.revertedWith(
        "Todo item is already finished."
      );
    });
  });
});
