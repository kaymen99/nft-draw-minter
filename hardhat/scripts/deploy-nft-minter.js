/* scripts/deploy.js */
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  let mintingFee = hre.ethers.utils.parseEther("0.001", "ether");
  let nftName = "trojans"
  let nftSymbol = "TRG"

  const NFTMinter = await hre.ethers.getContractFactory("NFTMinter")
  const nftContract = await NFTMinter.deploy(mintingFee, nftName, nftSymbol)

  await nftContract.deployed();
  console.log("nft contract deployed to:", nftContract.address);

  /* this code writes the contract addresses and network deployed in to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync('../src/utils/contracts-config.js', `
  export const contractAddress = "${nftContract.address}"
  export const ownerAddress = "${nftContract.signer.address}"
  export const networkDeployedTo = "${hre.network.config.chainId}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
