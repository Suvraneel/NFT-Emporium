import React from "react";
import Web3 from "web3";
import "./CreateNFT.css";
import { Card, Image, Tooltip, Modal, Input } from "antd";
import { AwesomeButtonProgress } from "react-awesome-button";

const styles = {
  card: {
    width: "25%",
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
};


const Moralis = require("moralis");
const Ethereum = new Web3(window.ethereum);

function CreateNFT() {
  Moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
  Moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

  async function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement("script");
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }
  AddLibrary("https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js");
  AddLibrary("https://unpkg.com/moralis/dist/moralis.js");
  const web3 = new Web3(window.ethereum);

  const nftContractAddress = "0x351bbee7C6E9268A1BF741B098448477E08A0a53"; // Make this variable

  // Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
  // Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
  // BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD

  // const login = async () => {
  //     Moralis.Web3.authenticate().then(async (result) => {
  //       console.log(result);
  //       alert("Login successful");
  //     });
  //   };

  const toTheMoon = async () => {
    // Storing the file

    const fileInput = document.getElementById("file");
    const data = fileInput.files[0];
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();

    // Storing the metadata

    const imageURI = imageFile.ipfs();
    const metadata = {
      name: document.getElementById("metadataName").value,
      description: document.getElementById("metadataDescription").value,
      image: imageURI,
    };
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();
    console.log(metadataURI);
    alert("Upload successful");

    // minting

    const txt = await mintToken(metadataURI);
    console.log("Minted!!" + txt);
  };

  async function mintToken(_uri) {
    const encodedFunction = web3.eth.abi.encodeFunctionCall(
      {
        name: "mintToken",
        type: "function",
        inputs: [
          {
            type: "string",
            name: "tokenURI",
          },
        ],
      },
      [_uri]
    );

    const transactionParameters = {
      to: nftContractAddress,
      // eslint-disable-next-line no-undef
      from: ethereum.selectedAddress,
      data: encodedFunction,
    };
    // eslint-disable-next-line no-undef
    const txt = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return txt;
  }

  return (
    <div style={{width:"100%", display:"flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center"}}>
      <Card style={styles.card} bodyStyle={{ padding: "18px" }}
        title={
          <div>
            IPFS Demo
          </div>
        }
        size="large"
      >
      {/* <AwesomeButton type="secondary" id="btn-login" onclick={login}>
				Moralis Login
			</AwesomeButton> */}
      <Input
        type="text"
        name="metadataName"
        id="metadataName"
        placeholder="Metadata Name"
      />
      <br />
      <br />
      <Input
        type="text"
        name="metadataDescription"
        id="metadataDescription"
        placeholder="Metadata Description"
      />
      <br />
      <br />
      <Input type="file" name="fileInput" id="file" placeholder="File" />
      <br />
      <br />
      <br />
      <AwesomeButtonProgress type="primary" onClick={toTheMoon}>
      🪙 Mint NFT !!!
      </AwesomeButtonProgress>
      </Card>
    </div>
  );
}

export default CreateNFT;
