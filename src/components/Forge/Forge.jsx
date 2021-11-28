import React from "react";
import { AwesomeButton } from "react-awesome-button";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import Web3 from "web3";
import { useEffect, useState } from "react";
import "./Forge.css";

import { Card, Image, Tooltip, Modal, Input, Button } from "antd";
import { AwesomeButtonProgress } from "react-awesome-button";
import Chains from "components/Chains";
import MintingChains from "components/MintingChains/Chains";

const styles = {
  card: {
    width: "65%",
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
const menuItems = [
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    // icon: <ETHLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    // icon: <BSCLogo />,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    // icon: <PolygonLogo />,
  },
];

const Moralis = require("moralis");

function Forge() {
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

  // Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
  // Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
  // BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD

  // const login = async () => {
  //     Moralis.Web3.authenticate().then(async (result) => {
  //       console.log(result);
  //       alert("Login successful");
  //     });
  //   };
  const { chainId } = useMoralisDapp();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  // set the value of nftcontract address as per the selected chain
  const [nftContractAddress, setNftContractAddress] = useState({});

  useEffect(() => {
    if (!chainId) return null;
    if (chainId === "0x4") {
      setNftContractAddress("0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431");
      console.log("Contract Address Changed");
    } else if (chainId === "0x61") {
      setNftContractAddress("0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD");
      console.log("Contract Address Changed");
    } else if (chainId === "0x13881") {
      setNftContractAddress("0x351bbee7C6E9268A1BF741B098448477E08A0a53");
      console.log("Contract Address Changed");
    }
  }, [chainId]);

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

    const txt = await mintToken(metadataURI).then((result) => {
      console.log(result);
      alert("Token minting done.Let it get confirmed!!");
    });
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
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Card
        style={styles.card}
        bodyStyle={{ padding: "20px" }}
        title={<div>Forge Mythical Character</div>}
        size="large"
      >

      <Card
        style={styles.card}
        bodyStyle={{ padding: "20px" }}
        size="large"
        style={{ width: "100%", border: "2px solid #e7eaf3" }}
              cover={
                <Image
                  preview={false}
                  src={"https://cdn.mos.cms.futurecdn.net/u8wSHMmMMXzZuAFBCmcsCK.jpg" || "error"}
                  alt=""
                  style={{ height: "300px" }}
                />
              }
      >
      </Card>

        <Button
          type="primary"
          onClick={toTheMoon}
          style={{
            marginTop: "20px",
            width: "100%",
          }}
        >
          Spawn your character
        </Button>
        <Button
          type="primary"
          onClick={toTheMoon}
          style={{
            marginTop: "20px",
            width: "100%",
          }}
        >
          Show off your cool new character
        </Button>
      </Card>
    </div>
  );
}

// onClick={document.getElementById("metadataName").value && document.getElementById("metadataDescription").value && document.getElementById("file").value ? toTheMoon : alert("hell")}

export default Forge;
