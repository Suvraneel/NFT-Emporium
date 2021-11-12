import React from "react"
import Web3 from "web3";
import "./CreateNFT.css"
const Moralis = require('moralis');
const Ethereum = new Web3(window.ethereum);

function CreateNFT() {
  
  Moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
  Moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

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
        const encodedFunction = Web3.eth.abi.encodeFunctionCall(
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
          from: Ethereum.selectedAddress,
          data: encodedFunction,
        };
        const txt = await Ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });
        return txt;
      }

	return (
		<div>
			<h1>IPFS Demo</h1>

			{/* <button id="btn-login" onclick={login}>
				Moralis Login
			</button> */}

			<input
				type="text"
				name="metadataName"
				id="metadataName"
				placeholder="Metadata Name"
			/>
			<br />
			<br />
			<input
				type="text"
				name="metadataDescription"
				id="metadataDescription"
				placeholder="Metadata Description"
			/>
			<br />
			<br />
			<input type="file" name="fileInput" id="file" placeholder="File" />
			<button onClick={toTheMoon}>To the moon</button>
		</div>
	)
}

export default CreateNFT
