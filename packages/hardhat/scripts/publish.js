const fs = require("fs")

const graphDir = "../subgraph";
const publishDir = "../frontend/contracts";

function publishContract(contractName, contract, address, networkName = "hardhat", deployVersion = "v1") {
  try {
    // Write contract address and abi to frontend package
    const networkPublishDir = `${publishDir}/${networkName}/${deployVersion}/`
    if (!fs.existsSync(networkPublishDir)) {
      fs.mkdirSync(networkPublishDir, { recursive: true });
    }
    fs.writeFileSync(
      `${networkPublishDir}/${contractName}.address.ts`,
      `export const address = "${address}";`
    );
    fs.writeFileSync(
      `${networkPublishDir}/${contractName}.abi.ts`,
      `export const abi = ${JSON.stringify(contract.abi, null, 2)};`
    );
    fs.writeFileSync(
      `${networkPublishDir}/${contractName}.bytecode.js`,
      `export const bytecode = "${contract.bytecode}";`
    );

    // Write the contract address and abi to the subgraph package

    const graphConfigPath = `${graphDir}/config/config.json`;
    let graphConfig;
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = fs.readFileSync(graphConfigPath).toString();
      } else {
        graphConfig = "{}";
      }
    } catch (e) {
      console.log(e);
    }

    graphConfig = JSON.parse(graphConfig);
    graphConfig[`${networkName}_${contractName}Address`] = address;

    const folderPath = graphConfigPath.replace("/config.json", "");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfig, null, 2));
    if (!fs.existsSync(`${graphDir}/abis`)) fs.mkdirSync(`${graphDir}/abis`);
    fs.writeFileSync(
      `${graphDir}/abis/${networkName}_${contractName}.json`,
      JSON.stringify(contract.abi, null, 2)
    );

    return true;
  } catch (e) {
    console.log("Failed to publish " + contractName + " to services.");
    console.log(e);
    return false;
  }
}

module.exports = {
  publishContract
}

