<div id="top"></div>

<!-- ABOUT THE PROJECT -->
## NFT Drawing Minter

This is a NFT dapp built for evm compatible blockchains (Ethereum, Polygon, BSC,...), it enables user to draw it's own digital art and minted as an NFT

<p align="center">
  <img alt="Dark" src="https://user-images.githubusercontent.com/83681204/169620068-693d0aa3-5c85-4110-a0ee-c7b13ac4baa0.png" width="100%">
</p>


* [Solidity](https://docs.soliditylang.org/)
* [Hardhat](https://hardhat.org/getting-started/)
* [React.js](https://reactjs.org/)
* [ethers.js](https://docs.ethers.io/v5/)
* [web3modal](https://github.com/Web3Modal/web3modal)
* [material ui](https://mui.com/getting-started/installation/)


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
       <li><a href="#prerequisites">Prerequisites</a></li>
       <li><a href="#project-structure">Project structure</a></li>
       <li><a href="#initial-setup">Initial Setup</a></li>
      </ul>
    </li>
    <li>
      <a href="#how-it-works">How it Works</a>
     <ul>
       <li><a href="#contracts">Contracts</a></li>
       <li><a href="#user-interface">User interface</a></li>
      </ul>
    </li>
    <li><a href="#how-to-use">How to Use</a></li>
    <li><a href="#future-developements">Future developements</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Please install or have installed the following:
* [nodejs](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/en/)
* [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) Chrome extension installed in your browser
* [Ganache](https://trufflesuite.com/ganache/) for local smart contracts deployement and testing

### Project structure

This a full stack web3 decentralized application built using Hardhat/React js, so the project is devided into 2 main parts:
<ul>
 <li><b>Smart contract/backend side:</b></li>
 Located in the hardhat folder, it contains the blockchain developement envirenment built using Hardhat, with all the smart contracts tests, deployement scripts and the plugins used (openzepplin contracts). 
  <li><b>front-end side:</b></li>
The code for the UI can be found in the src folder (as in all reactjs apps)
</ul>

### Initial Setup
1. Clone the repository and install all the required packages by running:
   ```sh
   git clone https://github.com/Aymen1001/nft-draw-minter.git
   cd nft-draw-minter
   yarn
   ```
2. Private key & Network Urls setup: in the hardhat folder you'll find a .env file, it's used to store all the sensible data/keys like your private key, RPC url for mainnet, rinkeby, kovan... (you get RPC url from services like Infura or Alchemy for free), you can also provide Etherscan api key to allow automatic contracts verifications :
   ```sh
    RINKEBY_ETHERSCAN_API_KEY="your etherscan api key"
    RINKEBY_RPC_URL="https://eth-rinkeby.alchemyapi.io/v2/apiKey"
    POLYGON_RPC_URL="Your polygon RPC url from alchemy or infura"
    MUMBAI_RPC_URL="Your mumbai RPC url from alchemy or infura"
    PRIVATE_KEY="ganahce-private-key"
   ```
* <b>IMPORTANT : </b> For the purpose of testing you can just provide the ganache private key and ignore all the other variables.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Working EXAMPLES -->
## How it Works

### contracts
The application is built with ERC721.sol nft standard contract from openzepplin and more specificaly the ERC721URIStorage extension, it allows user to mint an nft and set it's correspanding IPFS metadata URI

### User interface
The front end is structured into 4 pages:
* The home page is the landing page of the app, it contains a list of all the previously minted nfts.

![Capture d’écran 2022-05-20 à 20 04 43](https://user-images.githubusercontent.com/83681204/169628955-e8ded120-fd78-4dad-bcd0-6a3f83c41ad2.png)

* The Mint page is where the user can create a new nft, it uses React Canvas to allow the user to draw whatever he wants and Reacte color for choosing the picture backgound color.After finishing the drawing part and providing the required nft metadata (name, description), the user can mint his nft while paying a small minting fee

![Capture d’écran 2022-05-20 à 19 53 36](https://user-images.githubusercontent.com/83681204/169628978-747402c1-9e51-4a73-953b-e5025a9428d2.png)

* The Nft page gives details about each item: creator, name, description, (and optionaly the price).

![Capture d’écran 2022-05-20 à 19 53 36](https://user-images.githubusercontent.com/83681204/169651032-1b7480ec-e2be-4efd-afaa-519951fb17e1.png)

* Each user has it's own Dashboard, it contains all the nft that he has created.

![Capture d’écran 2022-05-20 à 19 52 05](https://user-images.githubusercontent.com/83681204/169628982-46147205-ebd1-4aac-9163-9b26ed79dda4.png)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## How to Use

After going through all the installation and setup steps, you'll need to deploy the smart contract to the ganache network by running: 
   ```sh
   cd hardhat
   npx hardhat run scripts/deploy-nft-minter.js --network ganache
   ```
This will create a config.js file and an artifacts folder and transfer them to the src folder to enable the interaction between the contract and the UI

If you want to test the functionnalities of the NFTMinter contract you can do it by running:
   ```sh
   npx hardhat test
   ```

To start the app you have to go back to the nft-draw-minter folder and run the command:
   ```sh
   yarn start
   ```
   
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- FUTURE DEVELOPEMENT -->
## Future developements

* Creating an nft marketplace where users can exchange their drawn nfts.
* Give user the ability to create nfts using AI (text to image).

   
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Contact -->
## Contact

If you have any question or problem running this project just contact me: aymenMir1001@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
