# `NFT-Emporium`


[NFT Emporium](https://suvraneel.github.io/NFT-Emporium/#/wallet)

[Video Presentation](https://www.youtube.com/watch?v=5kWyemtuUMQ)

This boilerplate is built on [react-moralis](https://github.com/MoralisWeb3/react-moralis) and [Moralis](https://moralis.io?utm_source=github&utm_medium=readme&utm_campaign=ethereum-boilerplate). Also has its own context provider for quick access to `chainId` or `ethAddress`

There are many components in this that do not require an active web3 provider, they use Moralis Web3 API. Moralis supports the most popular blockchains and their test networks. You can find a list of all available networks in [Moralis Supported Chains](https://docs.moralis.io/moralis-server/web3-sdk/intro#supported-chains)

Please check the [official documentation of Moralis](https://docs.moralis.io/#user) for all the functionalities of Moralis.

![preview_init](https://user-images.githubusercontent.com/63473496/141360201-4ad46d74-03bd-4337-8a61-7443b8f738a1.gif)

# 🚀 Quick Start

📄 Clone or fork:
```sh
git clone https://github.com/NFT-Cryptonaut/NFT-Emporium
```
💿 Install all dependencies inside repo:
```sh
yarn install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:3000/server
```
🚴‍♂️ Run your App:
```sh
yarn start
```

## Inspiration

NFTs in the keyword of 2021 and the talks of getting NFTs, the FOMO of missing out on the train of the Web3.0 is something which is getting people attracted. We wanted to create a simple User-friendly app for the people so that NFT minting can be done easily without falling into the tedious work of writing smart contracts. 
NFT minting apps is not something new, so what we did was think if there is just one stop-go for creating NFTs on multiple ecosystems. This way the complete hassle can be cut down !! 

## What it does

We provide a platform that currently supports minting NFTs on Polygon, Ethereum and Binance Smart Chain all along with a real simple UI to be understood by the common people. This way people can turn their digital art into NFTs on their favourite blockchain. 
Along with the Lighting NFT Minter, we also added a game where each wallet can get a Randomly Picked Character from a set. Chainlink makes it easy to get the randomness on the blockchain and we leveraged this fact to make this cool page. 

## How we built it

We used Moralis as our backend which did our work of getting the simple jobs such as User Authentication and getting user data according to the wallet address such as what NFTs the user holds. We used Solidity Smart Contracts to mint NFTs, we deployed them on multiple blockchains and stored them. 
We are using the Randomness feature given by Chainlink to generate the random characters for each wallet that have logged in to our application. 

<!-- ## Challenges we ran into

- Learning Solidity
- Integrating Smart Contracts with Web3JS 
- Understanding Chainlink 

## Accomplishments that we're proud of

- Providing and production built website, obviously, more features can be added but we are proud of creating the first version. 
- Learning Solidity quickly and leveraging the power of Smart Contracts -->

## What's next for NFT Emporium 

- Improving the UI
- Populating the categories
- Making it user friendly for mobile & other devices
- Adding more chains to the application 
- Adding more fun game pages


