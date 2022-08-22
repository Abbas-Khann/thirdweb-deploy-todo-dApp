# Learn how to build a basic Todo dApp using thirdweb


### Who is this blog tutorial for: 
This blog post is for people learning how to use thirdweb to deploy their smart contracts, interact with their contracts through the dashboard before setting up a frontend and use thirdweb SDK to connect their metamask wallet to their dApp.

# Tech Stack: 
- Solidity
- Hardhat
- Thirdweb deploy for contract deployment
- Thirdweb dashboard for interacting with contract functions
- Wallet Connection using the Thirdweb React SDK
- Next
- Tailwindcss
- Javascript/Typescript

- Also make sure you have Metamask Installed, Since we will be using it to interact with our application.

[Here's a good video that will help you download Metamask](https://youtu.be/afATAw7iuUM)

## Let's Start Building

### Smart Contract

To build the smart contract we will be using Hardhat. Hardhat is an Ethereum development environment and framework designed for full stack development in Solidity. In simple words you can write your smart contract, deploy them, run tests, and debug your code.


- First, You need to create a twdeploy folder where hardhat project and your Next.js app will later go.

- Open up a terminal and execute these commands


```
mkdir twdeploy
cd twdeploy
```

- In the same directory where you installed Hardhat run:


```
npx hardhat
```
? What do you want to do? … 
  Create a JavaScript project
  Create a TypeScript project
  Create an empty hardhat.config.js
  Quit

- Choose the first or the second option and click ok on all the options. Also it really doesn't matter whether you use JS or TS, Since thirdweb deploy will make the process 10x easier and it won't be needed.

Now you have a hardhat project ready to go!

- Start by creating a new file inside the `contracts` directory called `Todo.sol`

```javascript
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Todos {
    
    string[] public todos;

    function setTodo(string memory _todo) public {
        todos.push(_todo);
    }

    function getTodo() public view returns(string[] memory) {
        return todos;
    }

    function getTodosLength() public view returns(uint) {   
        uint todosLength = todos.length;
        return todosLength;
    }

    function deleteToDo(uint _index) public {
        require(_index < todos.length, "This todo index does not exist.");
        todos[_index] = todos[getTodosLength() - 1];
        todos.pop();
    }

}
```

- Now that we have written our basic Todo List Smart contract we will go ahead and deploy our contract using thirdweb deploy.

Oh wait, you thought we would be setting up rpc urls, exporting private keys and writing scripts etc? 
Nope! thirdweb deploy has made the whole process 10x easier just write your contract and deploy.

## Let's get into the simple process of using thirdweb deploy to deploy our smart contract

- Now that we have our contract ready, We can depoy it. All you need to do is to execute the following command.
```npm
npx thirdweb deploy
```
- If you don't have thirdweb setup already it will ask you to download the required packages and the contract you want to deploy if you have multiple files and boom take you to the thirdweb link straight up.

- You should be able to see something similar in your cli (image here)

- Now you can choose any mainnet or testnet chain that you want to deploy your contract to.

- I will deploy my contract to Mumbai(MATIC) and click on the `Deploy Now` button which will trigger two transactions.

- After the transactions are mined you will be taken to the dashboard which consists of many options.

- In the overview section you can explore your contract and interact with the functions without having to integrate it within your frontend code yet so it gives you a better idea on how your functions are working and also acts as a good testing environment.

- In the code section you see the different languages and ways you can interact with your contract. Which we will look into later on in the tutorial.

- In the activity section you are able to see all the transactions you make.

- You can also customize the settings after enabling the required interfaces in the settings section.

- In the source section you can see your smart contract and it also gives you a verification button on the relevant chain you deployed your contract to.

Well that's enough of explaining let's get right into the frontend and wrap up our dApp since most of the work was already done by thirdweb deploy.

- Now go ahead and create a frontend folder after exiting the `twdeploy` folder.

```
mkdir frontend
cd frontend
```

- Inside the frontend folder run the following command and setup a Next.js project.

```
npx create-next-app@latest

```
- Your Next app should be set up in a minute and you should be good to go.

- Now go ahead and run the following command to to setup thirdweb and install the packages into an existing Next project.

```
# Run this to install with npm
npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers

# Or run this to install with yarn
yarn add @thirdweb-dev/react @thirdweb-dev/sdk ethers
```
- To get started with wallet connection, We need to install our packages into an existing React/Next project.
- Once you've installed the necessary packages, set up the ThirdwebProvider to wrap the rest of your application:

```javascript
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  const desiredChainId = ChainId.Mumbai;

  /**
   * Make sure that your app is wrapped with these contexts.
   * If you're using React, you'll have to replace the Component setup with {children}
   */
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
```

- Now we are ready to use one of thirdweb's wallet connection hooks to interact with our dApp.

- We will create a components folder and create a component called `ConnectWallet.tsx` if you're using Javascript you may want to use `.js` at the end of each component name.


- Our ConnectWallet.tsx file should look something like this.

**Note** Each line of code is explained in the comments 

```javascript
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
// First off we will import the above hooks from package we installed
import React from "react";

export const ConnectWallet = () => {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  // We will fetch the imported hooks

  // We will show a Disconnect Wallet button if the wallet is connected otherwise we will display the Connect Wallet button
  if (address) {
    return (
      <div>
        <button
          className="text-white  bg-gradient-to-r from-cyan-500 to-indigo-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl m-4 px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => disconnectWallet()}
        >
          Disconnect Wallet
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        className="text-white  bg-gradient-to-r from-cyan-500 to-indigo-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl m-4 px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => connectWithMetamask()}
      >
        Connect Wallet
      </button>
    </div>
  );
};

```

- If you want more hooks for more wallets you can use this blog for all the available wallets that thirdweb supports[Click here](https://portal.thirdweb.com/guides/add-connectwallet-to-your-website#:~:text=thirdweb's%20connect%20wallet%20button%20makes,to%20your%20site%20or%20app).

- Now we can import this hook wherever we want, So we will import it inside the Header component later on but before that let's get straight into the `index.tsx` or `index.js` in JS.

```javascript
import type { NextPage } from "next";
import React, { useState } from "react";
import {
  useContract,
  useContractData,
  useContractCall,
} from "@thirdweb-dev/react";
// We need to import useContract to interact with the contract and useContractData will be used in the form of a provider
// to read from the contract and useContractCall will be used in the form of a signer to write to the contract.
import List from "./Components/List";
// importing the List component
import Header from "./Components/Header";

const Home: NextPage = () => {
  const { contract } = useContract(
    "0x0E25E7aACE4a32223d4062AcF3802914485B923B"
  );
  // We are fetching the contract address so that we can fetch functions interacting with it.
  const { data } = useContractData(contract, "getTodo");
  // Here we are reading from the contract and fetching the getTodo function
  const { mutateAsync: setTodo } = useContractCall(contract, "setTodo");
  // Here we are writing to the contract and fetching the setTodo function
  const { mutateAsync: deleteTodo } = useContractCall(contract, "deleteToDo");
  // Similar to the setTodo function

  const [todos, setTodos] = useState <string[]> ([]);
  // We set up an array of strings so we can set it up later on and get the list of our todos in the form of an array

  const addNewTodo = async (_todo: any): Promise<void> => {
    try {
      // setting the parameter
      const data = await setTodo([_todo]);
      // for testing purposes
      console.info("Contract call was successful", data);
      // fetching the getTodos function again after the transaction so that we can get the updated list
      await getTodos();
    } catch (err) {
      // catch if any errors
      console.error(err);
      console.error("triggereddddd");
    }
  };

  const getTodos = async (): Promise<void> => {
    try {
      // fetching the data in the todosData state
      const todosData = await data;
      console.log("data", todosData);
      // setting it upto the array state we declared above
      setTodos(todosData);
    } catch (err) {
      console.error(err);
    }
  };

  // Similar process to the setTodo function above
  const deleteTodos = async (_index: number): Promise<void> => {
    try {
      const data = await deleteTodo([_index]);
      console.info("Contract call succesfull!", data);
      await getTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // we will render the todos and return the List Component which has everything set up to show our list in the dApp
  const renderTodos = todos.map((todo, index): JSX.Element => {
    return (
      <List key={index} todo={todo} idx={index} deleteTodos={deleteTodos} />
    );
    // passing in the necessary props
  });

  return (
    <div>
      <div>
        <Header getTodos={getTodos} addNewTodo={addNewTodo} />
      </div>
      <div>
        {todos.length === 0 ? null : renderTodos}
        {/* renderTodos should be displayed if the length of todos is greater than 0 */}
      </div>
    </div>
  );
};

export default Home;
```

- Now that we have seen all the functions and how we can use them let's head over to the `List.tsx` or `List.js` component and write the necessary code there.

```javascript
import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { TiInputCheckedOutline } from "react-icons/ti";

const List = (props: any) => {
  const { todo, deleteTodos, idx } = props;
  // Receiving props
  const handleDelete = () => {
    alert("Are you sure you want to delete this task?");
    deleteTodos(idx);
    // passing in the index to delete the particular task
  };

  return (
    <div className=" my-4 flex flex-col justify-between items-center mt-7">
      <p className=" py-5 text-white bg-gray-900 dark:bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50  md:text-2xl  sm:text-xl rounded px-3 sm: w-10/12 flex  justify-between pb-3 ">
        {todo}
        <div className="flex items-center">
          <TiDeleteOutline
            onClick={handleDelete}
            className="text-3xl sm:text-5xl text-white cursor-pointer"
          />
        </div>
      </p>
    </div>
  );
};

export default List;
```

- Time to render our ConnectWallet Component inside our `Header.tsx/js/jsx` and wrap up our dApp.

```javascript
import React, { useState } from "react";
import { ConnectWallet } from "./ConnectWallet";
// Imported the hook
const Header = (props: any) => {
  const { getTodos, addNewTodo } = props;
  // Props received
  const [inputText, setInputText] = useState("");

  const handleChange = (event: any): void =>  {
    setInputText(event.target.value);
    // setting up the input text state to the handleChange function which will fetch the typed value inside the input box so that we can push in the text we want
    console.log(event.target.value);
    // log it to the console to see if it is actually working
  };

  return (
    <main>
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
            // passing in the inputText state which will now consist of the value we input inside of the input box
          >
            Add Task
          </button>
          <button
            className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl m-4 px-5 py-2.5 text-center mr-2 mb-2"
            onClick={getTodos}
            // This will fetch the getTodos function when clicked 
          >
            Get Todos
          </button>
        </div>
      </div>
    </main>
  );
};

export default Header;
```
- And that's a wrap, Using thirdweb deploy and thirdweb React SDK just makes the process much easier, provides more security since you don't have to import any Private keys or create any env files.