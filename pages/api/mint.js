const { ImmutableXClient, MintableERC721TokenType, ERC721TokenType, ImmutableMethodParams } =  require('@imtbl/imx-sdk');
require("dotenv").config()
import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';

const provider = new AlchemyProvider(process.env.ethNetwork, process.env.alchemyApiKey);
// Main wallet
const signer = new Wallet(process.env.WALLET_KEY).connect(provider);
//console.dir(signer, {depth: null})

// Sleep Function
function sleep(ms) {
  return new Promise(async (resolve,reject) => {
    setTimeout(resolve, ms);4
  });
}

// Declare Base Variables
let IMXURL, STARK, REGISTRATION;


console.log(process.env)

// If in Production, assign variables production values
if(process.env.PRODUCTION == "True"){
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

//console.log(STARK, IMXURL, REGISTRATION)

// MintNFT function

const mintNFT = (toAddress, token) => {
  console.log(toAddress, token)
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

    //console.dir(client, {depth: null})
    //await sleep(5000)

    try{

      //console.log("within")
      // console.log(toAddress)
      // console.log(token)
      // console.log(process.env.CONTRACT, process.env.ROYALTY, process.env.PERCENTAGE)
      const tokens = Array.from({ length: 1 }, (_, i) => i).map(i => ({
        id: (token).toString(),
        blueprint: `${token}`,
      }));

      const payload = [
        {
          contractAddress: process.env.CONTRACT.toLowerCase(),
          users: [
            {
              etherKey: toAddress.toLowerCase(),
              tokens,
            },
          ],
        },
      ];


      // console.log(payload)
      // console.log(payload[0]['users'][0]['tokens'])
      console.dir(payload, {depth: null})

      const result = await client.mintV2(payload)

      //console.dir(payload, {depth: null})

      console.log("Resolved?")

      resolve({status: "Success", token:token})
    // Catch Error
    }catch(error){
      if(error.message == '{"code":"bad_request","message":"error inserting asset, duplicate id and token address"}'){

        console.log("Duplicate entry for token", token)

        reject()


      }else{
        console.log(error)
        reject()
        console.log(`There was an issue minting token for the address ${toAddress}`)
      }
    }
  })
}

// Responds to POST request Only
export default async function mint(req, res){
  // Assuming req
  //console.log(req.body)
  //console.log("initiating mints for", req.body.address)

  // Send Mint Body to Main Function
  try {
    console.log("TRY")
    const mintResult = await mintNFT(
      // Body Addres passed as LowerCase address
      req.body.address.toLowerCase(),
      // Token ID | Needs to be Tracked on front-end
      req.body.tokenID
    );
  } catch(e) {
    console.log(`The following error occured: ${e}`)
    //.json({status: "ERROR"});
    res.status(500).json({status: "ERROR"});
  }
  // If no errors, return 200 "OK"
  res.status(200).json({status: "OK"});
}
