import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import "./styles.css";
import { ethers } from "ethers";
import axios from 'axios';
import coin from "../assets/coin.png"

import contract from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import { contractAddress, networkDeployedTo } from "../utils/contracts-config";
import networksMap from "../utils/networksMap.json";

const Home = () => {

    const data = useSelector((state) => state.blockchain.value)
    const [nfts, setNfts] = useState([])

    async function getAllNfts() {
        if (data.network === networksMap[networkDeployedTo]) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
    }

    useEffect(() => {
        if (window.ethereum !== undefined) {
            getAllNfts()
        }
    }, [data.network])


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
                {data.network === networksMap[networkDeployedTo] ? (
                    <div className="bids-container-card">
                        {nfts.map((nft, i) => {
                            return (
                                <div className="card-column" key={i} >
                                    <div className="bids-card">
                                        <div className="bids-card-top">
                                            <img src={nft.image} alt="" />
                                            <Link to={`/nft-items/${nft.id}`}>
                                                <p className="bids-title">
                                                    {nft.name}
                                                </p>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bids-container-card">
                        {`Please Switch to the ${networksMap[networkDeployedTo]} network`}
                    </div>
                )}

            </div>

        </div>
    );
};

export default Home;
