
const hre = require("hardhat");
const { publishContract } = require("./publish")
const fs = require("fs")

const CONTRACT_NAME = "Todos"


async function main() {
  let networkName = "hardhat"
  const { npm_lifecycle_script } = process.env
  if (npm_lifecycle_script.includes("mumbai")) {
    networkName = "mumbai"
  }
  if (npm_lifecycle_script.includes("rinkeby")) {
    networkName = "rinkeby"
  }
  const deployParams = []
  const Contract = await hre.ethers.getContractFactory(CONTRACT_NAME);
  const contractArtifact = await hre.artifacts.readArtifact(`${CONTRACT_NAME}`);

  const contract = await Contract.deploy(...deployParams);
  await contract.deployed();

  console.log(`${CONTRACT_NAME} deployed to: ${contract.address}`)

  await publishContract(CONTRACT_NAME, contractArtifact, contract.address, networkName);

}

// This pattern recommended to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
