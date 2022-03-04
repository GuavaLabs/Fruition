//const providers = require("@ethersproject/providers");
//
// require("dotenv").config()
// const wallet = require("@ethersproject/wallet");
// const { ImmutableXClient } =  require('@imtbl/imx-sdk');

//const provider = new providers.AlchemyProvider(process.env_backend.NETWORK, process.env_backend.API_KEY);
// const signer = new wallet.Wallet(process.env_backend.WALLET_KEY).connect(provider);
//
//
// function sleep(ms) {
//     return new Promise(async (resolve,reject) => {
//       setTimeout(resolve, ms);4
//     });
//   }
//
//
//   let IMXURL
//   let STARK
//   let REGISTRATION
//
//   if (process.env_backend.PROD == true)
//   {
//        IMXURL = "https://api.x.immutable.com/v1"
//        STARK = "0x5FDCCA53617f4d2b9134B29090C87D01058e27e9"
//        REGISTRATION = "0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c"
//
//   }
//   else
//   {
//
//       STARK="0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef"
//       IMXURL = "https://api.ropsten.x.immutable.com/v1"
//       REGISTRATION="0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864"
//
//     }
//
//
//   const mintNFT = (toAddress,token) => {
//         return new Promise( async (resolve,reject)=> {
//
//         const client = await ImmutableXClient.build({
//             publicApiUrl: IMXURL,
//             signer: signer,
//             starkContractAddress: STARK,
//             registrationContractAddress: REGISTRATION
//         })
//
//
//             await sleep(5000)
//
//             try
//             {
//
//                 const result = await client.mintV2([{
//
//             contractAddress: process.env_backend.CONTRACT.toLowerCase(),
//
//                 royalties: [
//                         {
//                         recipient: process.env_backend.ROYALTY.toLowerCase(),
//                         percentage: parseFloat(process.env_backend.PERCENTAGE)
//                         }
//                     ],
//
//                 users: [
//                     {
//
//                     etherKey: `${toAddress}`.toLowerCase(),
//
//                     tokens: [{
//                         id:`${token}`,
//                         blueprint:`${token}`
//                         }]
//                     }
//                 ]
//                 }])
//
//                 resolve({status:"success",token:token})
//             }
//
//             catch  (err)
//         {
//
//         if (err.message == '{"code":"bad_request","message":"error inserting asset, duplicate id and token address"}')
//         {
//
//         console.log("Duplicate Entry for token",token)
//         reject({err:"There was a duplicate entry now entering into the queue.",code:409})
//
//         }
//         else {
//
//         console.log(err)
//         reject({err:"There was an error",code:500})
//         console.error(`There was an issue minting token for the address ${toAddress}`)
//
//         }
// }
//         })
//   }
//
// module.exports.mintNFT = mintNFT
// module.exports.sleep = sleep
