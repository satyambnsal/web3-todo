import React, { useState, FC } from 'react';
import { abi as TodosHardhatAbi } from '../contracts/hardhat/v1/Todos.abi';
import { address as TodosHardhatAddress } from '../contracts/hardhat/v1/Todos.address';
import { abi as TodosRinkebyAbi } from '../contracts/rinkeby/v1/Todos.abi';
import { address as TodosRinkebyAddress } from '../contracts/rinkeby/v1/Todos.address';
import { useContract, useSigner, useContractEvent } from 'wagmi';
import { TodoList } from './TodoList';
import { useLocalStorage } from '../hooks/useLocalstorage';
import toast from 'react-hot-toast';
type TodoProps = {
  handleOpenWalletModal: () => void;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  transactionHash: string;
};

const TODO_CREATED_EVENT = 'TodoCreated';
const TODO_UPDATED_EVENT = 'TodoUpdated';

export const Todos: FC<TodoProps> = ({ handleOpenWalletModal }) => {
  const [{ data: signer, error, loading }, getSigner] = useSigner();
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const TodoContract = useContract({
    addressOrName: TodosRinkebyAddress,
    contractInterface: TodosRinkebyAbi,
    signerOrProvider: signer,
  });

  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useContractEvent(
    {
      addressOrName: TodosRinkebyAddress,
      contractInterface: TodosRinkebyAbi,
    },
    TODO_CREATED_EVENT,
    (event) => {
      console.log('event: ', event);
      const [id, title, completed, txDetails] = event;
      const { transactionHash } = txDetails;
      const numberId = id.toString();
      const newTodo = {
        id: numberId,
        title,
        completed,
        transactionHash,
      };
      // here we check if todo already exist in the list
      const isExist = todos.find((todo) => todo.id === numberId);
      if (!isExist) {
        setTodos([...todos, newTodo]);
      } else {
        console.log('todo already exist');
      }
    }
  );

  useContractEvent(
    {
      addressOrName: TodosRinkebyAddress,
      contractInterface: TodosRinkebyAbi,
    },
    TODO_UPDATED_EVENT,
    (event) => {
      console.log('updated event: ', event);
      const [id, title, completed, txDetails] = event;
      const { transactionHash } = txDetails;
      const numberId = id.toString();
      const updated = {
        id: numberId,
        title,
        completed,
        transactionHash,
      };
      // here we check if todo already exist in the list
      const updatedTodos = todos.map((todo) => {
        if (todo.id === numberId) {
          return updated;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  );

  const handleCreateTodo = async () => {
    if (!signer) {
      handleOpenWalletModal();
      return;
    }
    // console.log('todo title:: ', title);
    // console.log('signer:: ', signer, error);
    try {
      const tx = TodoContract.create(title);
      // await tx.wait();
      console.log(tx);

      toast('Todo created successfully');
    } catch (error) {
      console.log('Error occured::: ', error);
    }
  };

  const handleToggleTodo = async (id: number) => {
    if (!signer) {
      handleOpenWalletModal();
      return;
    }
    try {
      const tx = TodoContract.toggleCompleted(id);
      console.log(tx);
    } catch (error) {
      console.log('Error occured::: ', error);
    }
  };

  return (
    <div className="w-full">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold"> GM Web3 Folks!</h1>
            <div className="pt-6">
              Whereas most technologies tend to automate workers on the
              periphery doing menial tasks, blockchains automate away the
              center. Instead of putting the taxi driver out of a job,
              blockchain puts Uber out of a job and lets the taxi drivers work
              with the customer directly.
              <div>- Vitalik Buterin, Co-Founder of Ethereum</div>
            </div>
            <div className="flex mt-14">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Todo Title"
                className="input w-full"
              />
              <button className="btn" onClick={handleCreateTodo}>
                Create Todo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider">All Todos</div>
      <TodoList todos={todos} handleToggle={handleToggleTodo}></TodoList>
    </div>
  );
};
