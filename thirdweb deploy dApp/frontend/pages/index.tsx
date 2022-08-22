import type { NextPage } from 'next'
import React, { useState } from 'react';
import { useContract, useContractData, useContractCall } from "@thirdweb-dev/react";
// We need to import useContract to interact with the contract and useContractData will be used in the form of a provider
// to read from the contract and useContractCall will be used in the form of a signer to write to the contract.
import List  from "./Components/List"
// importing the List component 
import Header from './Components/Header';


const Home: NextPage = () => {
  const { contract } = useContract("0x0E25E7aACE4a32223d4062AcF3802914485B923B");
  // We are fetching the contract address so that we can fetch functions interacting with it.
  const { data } = useContractData(contract, "getTodo");
  // Here we are reading from the contract and fetching the getTodo function 
  const { mutateAsync: setTodo } = useContractCall(contract, "setTodo");
  // Here we are writing to the contract and fetching the setTodo function
  const { mutateAsync: deleteTodo } = useContractCall(contract, "deleteToDo");
  // Similar to the setTodo function


  const [todos, setTodos] = useState <string[]> ([]);
  // We set up an array of strings so we can set it up later on and get the list of our todos in the form of an array
  
  const addNewTodo = async (_todo: any): Promise <void> => {
    try {
      // setting the parameter
      const data = await setTodo([_todo]);
      // for testing purposes 
      console.info("Contract call was successful", data);
      // fetching the getTodos function again after the transaction so that we can get the updated list
      await getTodos();
    } catch (err) {
      // catch if any errors
      console.error(err)
      console.error("triggereddddd")
    }
  } 
  
  const getTodos = async (): Promise <void> => {
    try {
      // fetching the data in the todosData state
      const todosData = await data;
      console.log("data", todosData)
      // setting it upto the array state we declared above
      setTodos(todosData);
    } catch (err) {
      console.error(err)
    }
  }

  // Similar process to the setTodo function above
  const deleteTodos = async (_index: number): Promise <void> => {
    try {
      const data = await deleteTodo([_index]);
      console.info("Contract call succesfull!", data);
      await getTodos();
    } catch (err) {
      console.error(err)
    }
  }
  
  // we will render the todos and return the List Component which has everything set up to show our list in the dApp
  const renderTodos = todos.map((todo, index): JSX.Element => {
    return <List key={index} todo={todo} idx={index} deleteTodos={deleteTodos} />
    // passing in the necessary props
  })
  
  return (
    <div>
        <div>
        <Header getTodos={getTodos} addNewTodo={addNewTodo} />
        </div>
        <div>
        {todos.length === 0 ? null: renderTodos}
        {/* renderTodos should be displayed if the length of todos is greater than 0 */}

        </div>
    </div>
  )
}

export default Home
