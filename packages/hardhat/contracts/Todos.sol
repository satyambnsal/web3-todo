//SPDX-License-Identifier: MIT

/*
AUTHOR: SATYAM BANSAL
*/

pragma solidity ^0.8.4;

contract Todos {
    struct Todo {
        uint256 id;
        string text;
        bool completed;
    }
    Todo[] public todos;

    uint256 counter;
    event TodoCreated(uint256 id, string text, bool completed);
    event TodoUpdated(uint256 id, string text, bool completed);

    function create(string memory _text) public {
        // todos.push(Todo(_text, false));

        // todos.push(Todo({text: _text, completed: false}));

        Todo memory todo;
        todo.text = _text;
        todo.id = counter;
        counter += 1;
        todos.push(todo);
        emit TodoCreated(todo.id, _text, false);
    }

    function get(uint256 _index)
        public
        view
        returns (
            uint256 id,
            string memory text,
            bool completed
        )
    {
        Todo storage todo = todos[_index];
        return (todo.id, todo.text, todo.completed);
    }

    function update(uint256 _index, string memory _text) public {
        Todo storage todo = todos[_index];
        todo.text = _text;
        emit TodoUpdated(todo.id, todo.text, todo.completed);
    }

    function toggleCompleted(uint256 _index) public {
        Todo storage todo = todos[_index];
        todo.completed = !todo.completed;
        emit TodoUpdated(todo.id, todo.text, todo.completed);
    }
}
