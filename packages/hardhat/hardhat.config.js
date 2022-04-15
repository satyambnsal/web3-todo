require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

const POLYGON_ALCHEMY_KEY = process.env.POLYGON_ALCHEMY_KEY;
const RINKEBY_ALCHEMY_KEY = process.env.RINKEBY_ALCHEMY_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the addresses of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    polygon_mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${POLYGON_ALCHEMY_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    rinkeby: {
      chainId: 4,
      url: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }
};
