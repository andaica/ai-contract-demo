import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    derachain: {
      chainId: 20240801,
      url: "https://rpc-testnet.derachain.com/ext/bc/2LZp9ypK4SWm3a8MBYZbxTZgKbvB4aemUf83cBp1hSnvP7SFiw/rpc",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      derachain: "empty",
    },
    customChains: [
      {
        network: "derachain",
        chainId: 20240801,
        urls: {
          apiURL: "https://trace.derachain.com/api",
          browserURL: "https://trace.derachain.com",
        },
      },
    ],
  },
};

export default config;
