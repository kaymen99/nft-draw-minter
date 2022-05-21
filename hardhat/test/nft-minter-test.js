const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMinter.sol", () => {
    let contractFactory;
    let contract;
    let admin;
    let adminAddress;
    let user1;
    let user2;
    let mintingFee = ethers.utils.parseEther("0.001", "ether");

    const nftName = "trojans";
    const nftSymbol = "TRG";

    beforeEach(async () => {
        [admin, user1, user2] = await ethers.getSigners()

        // Deploy NFTMinter contract 
        contractFactory = await ethers.getContractFactory("NFTMinter");
        contract = await contractFactory.deploy(mintingFee, nftName, nftSymbol);
        adminAddress = await admin.getAddress();
    });

    describe("Correct Deployement", () => {
        it("should have correct owner address", async () => {
            const contractOwner = await contract.owner();
            expect(contractOwner).to.equal(adminAddress);
        });
        it("should have correct minting fee", async () => {
            const fee = await contract.getMintingFee();
            expect(fee).to.equal(mintingFee);
        });
        it("should have the correct nft name and symbol", async () => {
            const name = await contract.name()
            const symbol = await contract.symbol()
            expect(name).to.equal(nftName);
            expect(symbol).to.equal(nftSymbol);
        });
    });

    describe("Core Functions", () => {
        it("user should be able to mint new nft and admin recieve the minting fee", async () => {

            const nftTokenUri = "https://ipfs/QXVF78RHJnbv5bbv8"

            const initialAdminBalance = await admin.getBalance()

            await contract.connect(user1).mintNFT(
                nftTokenUri,
                { value: mintingFee }
            )

            const finalAdminBalance = await admin.getBalance()

            const nftId = 0;
            const ownerOfNft0 = await contract.ownerOf(nftId);
            const user1NftCount = await contract.balanceOf(user1.address);
            const uriOfNft0 = await contract.tokenURI(nftId)

            expect(ownerOfNft0).to.equal(user1.address)
            expect(user1NftCount).to.equal(1);
            expect(uriOfNft0).to.equal(nftTokenUri);

            expect(Number(finalAdminBalance)).to.equal(
                Number(initialAdminBalance) + Number(mintingFee)
            )
        });

        it("should return all created nfts and each user minted nfts", async () => {
            const nftTokenUri1 = "https://ipfs/QXVF78RHJnbv5bbv8"
            const nftTokenUri2 = "https://ipfs/JHGBNF4YU6CC05bbv8"

            await contract.connect(user1).mintNFT(
                nftTokenUri1,
                { value: mintingFee }
            )
            await contract.connect(user2).mintNFT(
                nftTokenUri2,
                { value: mintingFee }
            )

            const allNfts = await contract.getAllNfts()
            const user1Nfts = await contract.connect(user1).getMyNfts()

            expect(allNfts.length).to.equal(2)
            expect(user1Nfts.length).to.equal(1);
            expect(user1Nfts[0][0]).to.equal(0); // nftId = 0
            expect(user1Nfts[0][1]).to.equal(nftTokenUri1); // correct tokenURI
        });

    })
});
