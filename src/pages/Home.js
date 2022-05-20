import React, { useState, useEffect } from "react";
import "./styles.css";
import { ethers } from "ethers";
import axios from 'axios';
import coin from "../assets/coin.png"

import contract from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import { contractAddress } from "../utils/contracts-config";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const Home = () => {

    const [nfts, setNfts] = useState([])

    async function getAllNfts() {
        const nftContract = new ethers.Contract(contractAddress, contract.abi, provider);
        const allNfts = await nftContract.getAllNfts()

        if (allNfts !== undefined) {
            const items = await Promise.all(
                allNfts.map(async (nft) => {
                    let metaData = await axios.get(nft[1])
                    let item = {
                        id: Number(nft[0]),
                        name: metaData.data.name,
                        image: metaData.data.image
                    }
                    return item
                })
            )
            setNfts(items.reverse())
        }
    }

    useEffect(() => {
        getAllNfts()
    }, [])


    return (
        <div style={{ color: "white", backgroundColor: "#24252d" }}>
            <div className="header">
                <div className="header-content">
                    <div>
                        <h1>Push your creativity to create extraordinary NFTs</h1>
                        <img className='shake-vertical' src={coin} alt="" />
                    </div>
                </div>
            </div>
            <div className="bids-container">
                <div className="bids-container-text">
                    <h1>Hot NFTs</h1>
                </div>
                <div className="bids-container-card">
                    {nfts.map((nft, i) => {
                        return (
                            <div className="card-column" key={i} >
                                <div className="bids-card">
                                    <div className="bids-card-top">
                                        <img src={nft.image} alt="" />
                                        <p className="bids-title">{nft.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </div>
    );
};

export default Home;