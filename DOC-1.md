# Fruition Of The Damned | Project Documentation
 A web application for Fruition Of The Damned which utilizes Immutable X's Layer-2 scaling solution. Front-end portion is developed in React, with injected Web 3, that mints NFTs for users. Minting process includes usage of Immutable X's API and Link SDK library, which are used to communicate with a ERC-1155/ERC-721 Layer-1 NFT (Non-Fungible-Token) smart contract via ZK-Rollups.

### What is Immutable X?

TBD

## Layer 1 Token Smart Contract
 *"A crucial part of building on Immutable X is having a Layer 1 (L1) Ethereum smart contract, which is required for minting assets that can be withdrawn from Immutable X on Layer 2 (L2). For a smart contract to work with Immutable X, we need an implementation of a mintFor function, which is what our Stark contract calls at the time of withdrawing a minted token from L2 to L1. StarkEx is the L2 scalability solution used by Immutable X."*

Read more @ [Link](https://docs.x.immutable.com/docs/introduction-smart-contracts)

 The project's smart contract, named Asset.sol, is to be deployed adhering to the ERC-721 standard. In adherence with Immutable X documentation, Asset.sol contains a **_mintFor()** function which will be used by Immutable X's STARK contract call during the withdrawal of minted token from L2 to L1. The initial minting of the token takes place on L2, and there is no direct interaction with the smart contract (Layer-1) at the time of minting on L2. However, the minted token will have an L1 representation, token ID and immutable metadata.

Asset.sol inherits from the ERC-721 standard, as well as Immutable X's [Mintable.sol](https://github.com/immutable/imx-contracts/blob/main/contracts/Mintable.sol) contract.

### Functions

`contract Asset is ERC721, Mintable {
      constructor(address _owner, string memory _name, string memory _symbol,address _imx) ERC721(_name, _symbol) Mintable(_owner, _imx) {}`

 Asset.sol implements the **_mintFor()** function, which is then called by a function in Mintable.sol. The asset is later minted to L1 ( Mainnet Ethereum ) at the time of withdrawal from Immutable X's L2.

 ` function _mintFor(address user, uint256 id, bytes memory) internal override {
          _safeMint(user, id);}`

 Inside of Asset.sol, within the **_mintFor()** function, we call _safeMint() which is an inherited function from the ERC-721 contract that mints the NFT "in a safe way". The name, symbol, owner, and Immutable X contract address is passed in the constructor. The following then occurs:

**_owner = wallet address which is associated with the deployer of the contract**

* **transferOwnership(_owner)** transfers the ownership of the contract from the contract deployer to the specific wallet address
* The imx address refers to the Immutable X contract address that is interacting with our smart contract to perform minting operations. These addresses can be found in imx-contracts github page.
* This address is used in the onlyIMX modifier, which checks if the sender of the transaction is imx's contract or not. This is a way of whitelisting imx's contract and ensuring that no one else can mint assets through our smart contract.
* The **mintFor()** function is called bu the imx smart contract at the time of withdrawing the NFT to mainnet. The function has the onlyIMX modifier (Please ensure quantity = 1 to keep NFTs being minted as unique)
* The "blueprint" is saved as on-chain immutable metadata in the mapping blueprints.
* The function then emits an event ( **AssetMinted** ) when the mintFor() function completes successfully, which can later be listened on by applications


*** For custom blueprint decoding, you can override the mintFor function in Asset.sol to save it in something like tokenURI, or split the string into different components. ***
*** L1 contract also utilizes open source libraries like OpenZeppelin ***
*** Asset.sol is to initially be deployed onto Ropsten test network for testing to ensure there are no bugs. ***

## Gaea Implementation
[Gaea NFT Script Repo](https://github.com/pontius-varo/G434)

Gaea is a python script developed by @pontius-varo used to generated nft images seamlessly. Within the scope of this project, it is responsible
for created all the NFT images based on the assets provided by the client. Prior to the launch of the Web Application, this script will be ran
with an integer amount of nfts, rarities for each image, and incompatible traits.

Using that information, coupled with the art assets in the ./Assets directory, the script will do the following:

* Gaea will automatically generate categories based on the subdirectories in ./Assets
* Individual images will be pulled from those subdirectories
* Gaea will randomly generate nft images based on the pulled images from the ./Assets directory
* Images will be generated, compiled, and exported to the ./images folder
* Upon generation, Gaea will create a lump metadata json file with general metadata for each generated image
* Lump file will be used to create individual metadata files based on the ERC721-standard for NFTs
* Individual metadata will include a field ("img") which will hold the IPFS link which will be associated with the order each nft image has in the generation

After the script finishes this process, the nft images and data will be stored on a pinata IPFS server.

## React Web Application

The front-end applications which the user will interact with to mint their tokens on Immutable X.

The user will start by connecting their wallet using [Ethers.js](https://docs.ethers.io)

`const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
`
[Source](https://docs.ethers.io/v5/getting-started/)

After connecting their wallet, the DAP will present a notification for the
user to click the Im. X button to continue. Here Link SDK will spring to action and do the following:

* Link SDK prompts user to login to Im. X
  * If user does not have account with Im. X , Link will prompt them to create one
  * Else, if user has already registered with Im. X , the process will continue

After successfully connecting to Im. X, the user will then be prompted to
click the mint button, where the they will be shown a payment screen. The process will then be as follows:

* Link SDK presents the user with a 'purchase' screen
* User will sign off purchase with their metamask
* Mint button will then make a call to backend
* backedn will return random nft metadata that has not been released yet
* metadata will be converted to Im. Standard (data passed to Im. X)
* Converted metadata is passed to Link SDK
* data is compiled (purchase data, metadata)
* data is sent to Imm. X
  * (This process must be clarified)
* Link SDK makes the proper API calls
  * Submits metadata & payment
  * Submits schema
  * Submits token minting request
* Im. X returns OK response, user is informed and prompted to access their newly minted NFT on the Im. X network

## Immutable X API

TBD

## Link UI

As a solution to the fact that there are no APIs in Layer-1 blockchains, Immutable X's API wraps the logic of Immutable X's "exchange engine" so that developers do not need to interact directly with smart contracts via custom logic, and thus can build on the Immutable X platform.

All interactions from minting, to trading to transferring are preformed via API calls. Since IMX's APIs contain read and write functionality, application can be built without needing to build a traditional backend. IMX abstracts the complexity of the blockchain functions as a psuedo backend.

IMX API read functions:
* mints
* trades
* withdrawls and deposits
* assets minted
* orders

For more info, please see the [following](https://docs.x.immutable.com/reference/get_v1-assets-1)
