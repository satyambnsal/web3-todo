import React, { useState } from 'react';
import { abi as TodosAbi } from '../contracts/hardhat/v1/Todos.abi';
import { address as TodosContractAddress } from '../contracts/hardhat/v1/Todos.address';
import { useContract, useSigner } from 'wagmi';

export function Todos() {
  const [{ data, error, loading }, getSigner] = useSigner();

  const TodoContract = useContract({
    addressOrName: TodosContractAddress,
    contractInterface: TodosAbi,
    signerOrProvider: data,
  });

  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateTodo = async () => {
    console.log('todo title:: ', title);
    try {
      const tx = TodoContract.create(title);
      // await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log('Error occured::: ', error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold"> GM Web3 Folks!</h1>
          <p className="pt-6">
            Whereas most technologies tend to automate workers on the periphery
            doing menial tasks, blockchains automate away the center. Instead of
            putting the taxi driver out of a job, blockchain puts Uber out of a
            job and lets the taxi drivers work with the customer directly.
            <div>- Vitalik Buterin, Co-Founder of Ethereum</div>
          </p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Todo Title"
            className="mt-5 input"
          />
          <button className="btn" onClick={handleCreateTodo}>
            Create Todo
          </button>
        </div>
      </div>
    </div>
  );
}
