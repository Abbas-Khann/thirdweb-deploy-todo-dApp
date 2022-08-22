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
