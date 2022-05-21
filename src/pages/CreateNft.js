import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { BlockPicker } from "react-color";
import Tippy from "@tippyjs/react";
import { Buffer } from "buffer";
import SignatureCanvas from "react-signature-canvas"
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import { Form, Button } from "react-bootstrap"

import contract from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import { contractAddress } from "../utils/contracts-config";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0")
const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/"

function CreateNft() {
    const elementRef = useRef()
    const navigate = useNavigate()

    const [bgColor, setBgColor] = useState("#E18715")

    const [formInput, setFormInput] = useState(
        { name: "", description: "" }
    )

    const clearCanvas = () => {
        const canvasElement = elementRef.current;
        canvasElement.clear();
    }

    const changeColor = (color) => {
        setBgColor(color)
        clearCanvas()
    }

    const getImage = () => {
        const canvasElement = elementRef.current;
        let dataUrl = canvasElement.toDataURL("image/png")
        const buffer = Buffer(dataUrl.split(",")[1], "base64")
        return buffer;
    }

    const mint = async () => {
        try {
            console.log(formInput)
            const signer = provider.getSigner()
            const nftContract = new ethers.Contract(contractAddress, contract.abi, signer);

            const image = getImage()
            const addedFile = await ipfsClient.add(image)
            const imageURI = ipfsBaseUrl + addedFile.path

            const { name, description } = formInput
            if (!name || !description || !imageURI) return

            const data = JSON.stringify({
                name: name, description: description, image: imageURI
            })

            const mintingFee = await nftContract.getMintingFee()

            try {
                const added = await ipfsClient.add(data)
                const url = ipfsBaseUrl + added.path
                const mint_tx = await nftContract.mintNFT(
                    url,
                    { value: mintingFee }
                )
                await mint_tx.wait()

            } catch (error) {
                window.alert('Error while minting, Please try again')
            }

            setFormInput({ name: "", description: "" })
            navigate("/dashboard")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (

        <div style={{ alignItems: "center", color: "white", padding: "40px", marginBottom: "1rem", backgroundColor: "#24252d" }}>
            <h1 style={{ padding: "40px" }}>
                Mint Your NFT
            </h1>
            <div className='row p-2'>
                <div className='col-md-7 text-center p-3'>
                    <div className='p-3'>
                        <SignatureCanvas
                            canvasProps={{ width: 350, height: 350 }}
                            backgroundColor={bgColor}
                            ref={elementRef}
                        />
                        <br />
                        <br />
                        <div >
                            <Tippy interactive={true} placement={"bottom"} content={
                                <BlockPicker color={bgColor} onChangeComplete={color => { changeColor(color.hex) }} />} >
                                <Button variant="warning">
                                    Change color
                                </Button>

                            </Tippy>

                            <Button type="submit" variant="warning" onClick={clearCanvas} style={{ marginLeft: "5px" }}>
                                Clear
                            </Button>
                        </div>

                    </div>

                </div>
                <div className='col-md-5 p-3'>
                    <div style={{ color: "white", textAlign: "left" }}>
                        <div style={{ width: "400px" }}>
                            <label>Give Your NFT a name: </label>
                            <Form.Control type="text" placeholder="Enter your artwork name" onChange={e => setFormInput({ ...formInput, name: e.target.value })} />
                        </div>
                        <br />
                        <div style={{ width: "400px" }}>
                            <label>Describe your NFT: </label>
                            <Form.Control as="textarea" rows={5} maxLength={400} placeholder="Enter your artwork description" onChange={(e) => { setFormInput({ ...formInput, description: e.target.value }) }} />
                        </div>
                    </div>

                    <br />
                    <Button type="submit" variant="warning" onClick={mint}>
                        Mint
                    </Button>
                </div>

            </div>

        </div >
    )
}

export default CreateNft;



