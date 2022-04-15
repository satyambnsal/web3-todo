import { FC, useState } from 'react';
import { Todo } from './Todos';
import { RINKEBY_BLOCK_EXPLORER } from '../constants';

type TodoListProps = {
  todos: Todo[];
  handleToggle: (id: number) => void;
};

export const TodoList: FC<TodoListProps> = ({ todos, handleToggle }) => {
  return (
    <div className="mb-10 w-full">
      <ul className="mt-5 w-3/4 mx-auto bg-white shadow-md rounded-sm p-5">
        {todos.map(({ id, title, completed, transactionHash }) => (
          <li
            className="flex px-4 py-2 my-4 border text-lg font-semibold justify-between items-center shadow-sm hover:shadow-md"
            key={id}
          >
            <p>{title}</p>
            <div className="flex items-center">
              <a
                target="_blank"
                rel="noreferrer"
                className="link text-xs"
                href={`${RINKEBY_BLOCK_EXPLORER}/tx/${transactionHash}`}
              >
                Transaction Details
              </a>
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
