import React, { useState } from "react";
import { ConnectWallet } from "./ConnectWallet";
const Header = (props: any) => {
  const { getTodos, addNewTodo } = props;
  const [inputText, setInputText] = useState("");

  const handleChange = (event: any): void =>  {
    setInputText(event.target.value);
    console.log(event.target.value);
  };

  return (
    <main className="">
      <nav className="flex justify-around items-center dark:bg-blue-500 bg-gray-900 p-3 ">
        <h1 className="text-center text-white text-3xl m-0">
          Decentralized To do List App
        </h1>
          <ConnectWallet />
      </nav>

      <div className="m-auto w-10/12 flex dark:bg-gray-600 flex-wrap flex-col mt-10 items-center justify-center p-12 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50 ">
        <input
          className="py-3.5 w-10/12 pl-4 text-xl text-black outline-none sm:w-6/12 border rounded-xl"
          placeholder="Add Task..."
          onChange={handleChange}
        />

        <div className="flex items-center justify-center mt-4 mx-4 flex-wrap">
          <button
            className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl m-4 px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => addNewTodo(inputText)}
          >
            Add Task
          </button>
          <button
            className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl m-4 px-5 py-2.5 text-center mr-2 mb-2"
            onClick={getTodos}
          >
            Get Todos
          </button>
        </div>
      </div>
    </main>
  );
};

export default Header;