import React from "react";
import { AwesomeButton } from "react-awesome-button";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import Web3 from "web3";
import { useEffect, useState } from "react";
import "./Forge.css";
import { useMoralis } from "react-moralis";

import { Card, Image, Tooltip, Modal, Input, Button } from "antd";
import { AwesomeButtonProgress } from "react-awesome-button";
import ForgingChain from "components/Forging Chain/Chains";

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
    key: "0x13881",
    value: "Mumbai",
    // icon: <PolygonLogo />,
  },
];

const Moralis = require("moralis");

function Forge() {
  Moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
  Moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;
  const { user } = useMoralis();

  async function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement("script");
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }
  AddLibrary("https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js");
  AddLibrary("https://unpkg.com/moralis/dist/moralis.js");
  const web3 = new Web3(window.ethereum);

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
    if (chainId === "0x13881") {
      setNftContractAddress("0xe7f131704ac294e9c2da16c9ac335246a7fdee59");
      console.log("Contract Address Changed");
    }
  }, [chainId]);

  const ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "result",
          type: "uint256",
        },
      ],
      name: "DiceLanded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "roller",
          type: "address",
        },
      ],
      name: "DiceRolled",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "character",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "generate",
      outputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "randomResult",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "randomness",
          type: "uint256",
        },
      ],
      name: "rawFulfillRandomness",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  var Generator = new web3.eth.Contract(ABI, nftContractAddress);

  const generateCharacter = async () => {
    await window.ethereum.enable();
    const address = user.attributes.ethAddress;
    const gen = Generator.methods
      .generate(address)
      .send({
        from: user.attributes.ethAddress,
      })
      .then((res) => {
        console.log(res);
      });
  };
  let mythic;
  const getCharacter = async () => {
    await window.ethereum.enable();
    const address = user.attributes.ethAddress;
    const player = Generator.methods
      .character(address)
      .call()
      .then((res) => {
        mythic = res;
        console.log(res);
      });
  };

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
        <ForgingChain />
        <Card
          style={styles.card}
          bodyStyle={{ padding: "20px" }}
          size="large"
          style={{ width: "100%", border: "2px solid #e7eaf3" }}
          cover={
            <Image
              preview={false}
              src={
                "https://cdn.mos.cms.futurecdn.net/u8wSHMmMMXzZuAFBCmcsCK.jpg" ||
                "error"
              }
              alt=""
              style={{ height: "300px" }}
            />
          }
        ></Card>

        <Button
          type="primary"
          onClick={generateCharacter}
          style={{
            marginTop: "20px",
            width: "100%",
          }}
        >
          Spawn your character
        </Button>
        <Button
          type="primary"
          onClick={getCharacter}
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
