//const wallet = require("@ethersproject/wallet");
const { ImmutableXClient, MintableERC721TokenType, ERC721TokenType } =  require('@imtbl/imx-sdk');
//const providers = require("@ethersproject/providers");
// const {setMinted} = require("../db/db")
// require("dotenv").config()
import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
//const provider = new providers.AlchemyProvider(process.env.NETWORK, process.env.API_KEY);
const provider = new AlchemyProvider(process.env.ethNetwork, process.env.alchemyApiKey);
// Main wallet
console.log(provider)
const signer = new Wallet(process.env.WALLET_KEY).connect(provider);

// Sleep Function
function sleep(ms) {
  return new Promise(async (resolve,reject) => {
    setTimeout(resolve, ms);4
  });
}

// Declare Base Variables
let IMXURL, STARK, REGISTRATION;

// If in Production, assign variables production values
if(process.env.PROD == true){
  console.log("PRODUCTION")

  IMXURL = "https://api.x.immutable.com/v1"
  STARK = "0x5FDCCA53617f4d2b9134B29090C87D01058e27e9"
  REGISTRATION = "0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c"

// Else, assign variables testing values
}else{
  console.log("TESTING")

  STARK="0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef"
  // Immutable X Ropsten Version
  IMXURL = "https://api.ropsten.x.immutable.com/v1"
  REGISTRATION="0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864"
}

// MintNFT function

const mintNFT = (toAddress, token) => {
  //console.log(toAddress, token)
  //res.status(200).json({Status: "OK"});

  return new Promise(async (resolve, reject) => {
    /*
      Create Immutable X Client instantance with
      either test or production variables
    */
    const client = await ImmutableXClient.build({
      publicAPIUrl: IMXURL,
      signer: signer,
      starkContractAddress: STARK,
      registrationContractAddres: REGISTRATION
    })

    await sleep(5000)

    try{
      const result = await client.mintV2([{

        contractAddress: process.env.CONTRACT.toLowerCase(),

        // Assign royalties to wallet
        // ?How will this be sent if transaction was done
        // on front end?
        royalties:[
          {
            recipient: process.env.ROYALTY.toLowerCase(),
            percentage: parseFloat(process.env.PERCENTAGE)
          }
        ],
        // Users/Addresses being processed?
        users:[
          {
            etherKey: `${toAddress}`.toLowerCase(),
            tokens:[{
                // TokenId
                id: `${token}`,
                // ?On chain metadata?
                blueprint: `${token}`
              }]
          }
        ]
      }])

      resolve({status: "Success", token:token})
    // Catch Error
    }catch(error){
      if(error.message == '{"code":"bad_request","message":"error inserting asset, duplicate id and token address"}'){

        console.log("Duplicate entry for token", token)

        reject({err:"Duplicate entry.", code:409})


      }else{
        console.log(error)
        reject({err: "There was an error.", code: 500})
        console.log(`There was an issue minting token for the address ${toAddress}`)
      }
    }
  })
}

// Responds to POST request Only
export default function mint(req, res){
  // Assuming req
  console.log("initiating mints for", req.body.address)

  // Send Mint Body to Main Function
  try {
    const mintResult = async () => { await mintNFT(
      // Body Addres passed as LowerCase address
      req.body.address.toLowerCase(),
      // Token ID | Needs to be Tracked on front-end
      req.body.tokenID
    )};
    // If no errors, return 200 "OK"
    res.status(200);
  } catch(e) {
    console.log(`The following error occured: ${e}`)
    res.status(500);
  }
}
