// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMinter is ERC721URIStorage, Ownable {
    uint256 private mintingFee;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;

    struct RenderNft {
        uint256 id;
        string uri;
    }

    constructor(
        uint256 _mintingFee,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        mintingFee = _mintingFee;
    }

    function mintNFT(string memory _tokenURI) public payable returns (uint256) {
        require(msg.value == mintingFee, "must pay minting fee");

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        payable(owner()).transfer(msg.value);
        _tokenIds.increment();

        return newItemId;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        override
    {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId));
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function getAllNfts() public view returns (RenderNft[] memory) {
        uint256 lastestId = _tokenIds.current();
        RenderNft[] memory items = new RenderNft[](lastestId);
        for (uint256 i = 0; i < lastestId; i++) {
            string memory uri = tokenURI(i);
            items[i] = RenderNft(i, uri);
        }
        return items;
    }

    function getMyNfts() public view returns (RenderNft[] memory) {
        uint256 lastestId = _tokenIds.current();
        uint256 myNftsCount = balanceOf(msg.sender);

        RenderNft[] memory myNfts = new RenderNft[](myNftsCount);

        uint256 counter = 0;
        for (uint256 i = 0; i < lastestId; i++) {
            if (ownerOf(i) == msg.sender) {
                string memory uri = tokenURI(i);
                myNfts[counter] = RenderNft(i, uri);
                counter++;
            }
        }
        return myNfts;
    }

    function getMintingFee() public view returns (uint256) {
        return mintingFee;
    }
}
