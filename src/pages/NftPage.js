import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './styles.css';
import { ethers } from "ethers";
import axios from 'axios';

import contract from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import { contractAddress } from "../utils/contracts-config";
import Identicon from '../components/Identicon';


const Item = () => {
    const { id } = useParams()

    const [nftData, setNftData] = useState(
        { creator: "", creatorNftCount: 0, name: "", description: "", imageUrl: "" }
    )

    const getItemDetails = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const nftContract = new ethers.Contract(contractAddress, contract.abi, provider);

        const creator = await nftContract.ownerOf(Number(id))
        const creatorItemsCount = await nftContract.balanceOf(creator)
        const nftTokenUri = await nftContract.tokenURI(Number(id))

        let metaData = await axios.get(nftTokenUri)

        setNftData({
            creator: creator,
            creatorNftCount: Number(creatorItemsCount),
            name: metaData.data.name,
            description: metaData.data.description,
            imageUrl: metaData.data.image
        })
    }

    useEffect(() => {
        getItemDetails()
    }, [])

    return (
        <div className='item section__padding' style={{ backgroundColor: "#24252d" }}>
            <div className="item-image">
                <img src={nftData.imageUrl} alt="item" />
            </div>
            <div className="item-content">
                <div className="item-content-title">
                    <h1>{nftData.name}</h1>
                </div>
                <div className="item-content-creator">
                    <div><p>Creater (Created {nftData.creatorNftCount} nfts)</p></div>
                    <div>
                        <Identicon account={nftData.creator} />
                        <p>{nftData.creator &&
                            `${nftData.creator.slice(0, 6)}...${nftData.creator.slice(
                                nftData.creator.length - 4,
                                nftData.creator.length
                            )}`} </p>
                        <br />
                    </div>

                </div>
                <div className="item-content-detail">
                    <p>{nftData.description}</p>
                </div>
            </div>
        </div>
    )
};

export default Item;
