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
    <h1>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Todo Title"
        className=""
      />
      <button onClick={handleCreateTodo}>Create Todo</button>
    </h1>
  );
}
