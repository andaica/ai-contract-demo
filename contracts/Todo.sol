// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todo {
    struct TodoItem {
        string description;
        uint256 deadline;
        bool isFinished;
    }

    TodoItem[] public todos;

    function createTodo(string memory _description, uint256 _deadline) public {
        todos.push(TodoItem({
            description: _description,
            deadline: _deadline,
            isFinished: false
        }));
    }

    function finishTodo(uint256 _index) public {
        require(_index < todos.length, "Todo item does not exist.");
        require(!todos[_index].isFinished, "Todo item is already finished.");
        
        todos[_index].isFinished = true;
    }

    function getTodoCount() public view returns (uint256) {
        return todos.length;
    }

    function getTodo(uint256 _index) public view returns (string memory, uint256, bool) {
        require(_index < todos.length, "Todo item does not exist.");
        TodoItem storage todo = todos[_index];
        return (todo.description, todo.deadline, todo.isFinished);
    }
}