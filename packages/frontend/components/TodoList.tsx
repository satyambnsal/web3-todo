import { FC, useState } from 'react';
import { Todo } from './Todos';

type TodoListProps = {
  todos: Todo[];
  handleToggle: (id: number) => void;
};

export const TodoList: FC<TodoListProps> = ({ todos, handleToggle }) => {
  return (
    <div className="mb-10 w-full">
      <h1 className="w-full text-gray-800 text-center text-2xl uppercase underline underline-offset-2 font-bold decoration-gray-900">
        All Todos
      </h1>
      <ul className="mt-5 w-3/4 mx-auto bg-white shadow-md rounded-sm p-5">
        {todos.map(({ id, title, completed }) => (
          <li
            className="flex px-4 py-2 mb-3 text-lg font-semibold border-2 justify-between items-center"
            key={id}
          >
            <p>{title}</p>
            <div className="flex items-center">
              <p className="uppercase mx-3">
                {!!completed ? 'done' : 'pending'}
              </p>
              <button
                className="uppercase bg-blue-600 text-white px-6 py-2 rounded-md "
                onClick={() => handleToggle(id)}
              >
                Mark {!!completed ? 'pending' : 'done'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
