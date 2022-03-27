import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Components
import MintQuantityComponent from '../Components/MintQuantityComponent'
import PhaseComponent from '../Components/PhaseComponent'

// LINK Imports
import { ImmutableXClient, Link, ETHTokenType} from '@imtbl/imx-sdk';

// Import State
import { React, useState, useEffect } from "react";

// Web3 Import for transactions
import Web3 from "web3";
// Axios request handlers
import axios from "axios";

//require('dotenv').config()

/* Local API */

let localAPI = 'http://localhost:3000/api/mint'

/* Declare Production Variables before assignment */

let _link, apiAddress;

/* Determine if in Production */

if(process.env.PRODUCTION == "True"){
  console.log("Web App in Production")
  _link = new Link("https://link.x.immutable.com");
  apiAddress = 'https://api.x.immutable.com/v1/'

}else{
  console.log("Web App in Testing")
  console.log(process.env.PRODUCTION)
  _link = new Link('https://link.ropsten.x.immutable.com')
  apiAddress = 'https://api.ropsten.x.immutable.com/v1/'

}

export default function Home() {

  let phase_1, phase_2, phase_3;

  phase_1 = ['You’re in it. We come prepared with the comic, the TV pilot, the series bible, and the Morphling NFTs with a ton of fun stats and a fun 50/50 minting event that will write itself into our world.', 'At a bare minimum, owning a FotD NFT means permanent, premium access to our highest resolution content, as early as possible, even the anime some day.']
  phase_2 = ['If we can get over 50% minted, we can commit to hiring developers to turn the Morphlings into the principle assets of an open playing-cards game environment. ',
  'Over promise and under deliver much?', 'We still want to try! We want this to be an entirely free to play games environment for community members, not P2E but P2P — and gather and socialize with 800-year old playing cards that have stood the test of time. Play classic games with people from around the world using the metadata of your Morphlings to build depth into medieval-era playing cards, that’s the end goal. We can start small with solitaire, 1 player games, and hire devs in the community to build from there!']
  phase_3 = ['If we can get 100% minted, we can say full-heartedly that we will be using the majority of those proceeds on making a web3 remote-studio animated series pilot... we wanna be on TV Ma!', 'But seriously we are going to pay creators directly using the power of web3, and excited to explore new territory with transparent creator smart-contracts, hiring a ton of cool web3 artists to join forces on a wild animated series super-project.', 'We’ll need a lot of help on this part if it comes to pass, but there’s an opportunity here to help evolve the way animated series are made altogether.']

  // Default value is 10, setValue modifies
  //const eth = process.env.REACT_APP_PRICE * value;
  const [value, setValue] = useState(1);
  const eth = 0.01 * value;
  // Default value is false, setEligable modifies
  const [eligable, setEligable] = useState(false);
  // Default value is false, setLogged modifies
  const [loggedIn, setLogged] = useState(false);
  // Default value is empty string, setCurrent Address modifies
  const [currentAddress, setCurrentAddress] = useState("");
  // Default value is false, setLoading modifies
  const [loading, setLoading] = useState(false);
  // Default value is ETH, setType modifies
  const [paymentType, setType] = useState("ETH");
  // Default value is empty string, changeMsg modifies
  const [msg, changeMsg] = useState("");
  // Default value is false, msgChange modifies
  const [msgState, msgChange] = useState(false);
  // Default value is 0, setCounter modifies
  const [counter, setCounter] = useState(0);
  // Default Value is false
  let [connectedWallet, setConnection] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  // Counter for tokens

  // const counterRequest = () => {
  //   return new Promise(async (resolve, reject) => {
  //     const count = await axios.get(
  //       // REACT_APP_URL = localhost:5000/ | Why?
  //       `${process.env.REACT_APP_URL}/api/v1/count`
  //     );
  //     setCounter(count.data.count);
  //     resolve("Done");
  //   });
  // };

  //counterRequest();

  const accountRegistered = async (address) => {
    //This will check if the user is registered with IMX.. If not prompt them to register
    return new Promise(async (resolve, reject) => {
      try {
        await axios.get(
          `${apiAddress}users/${address.toLowerCase()}`
        );
        resolve(true);
      } catch {
        resolve(false);
      }
    });
  };

  /*Connects to Web3 ethereum*/
  const connectWallet = async() =>{

    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

    // waits for account address from metamask
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    // saves address in local storage
    localStorage.setItem("address", account[0]);
    // Set connectWallet to true
    setConnection(true)
  }

  const connectWalletImx = async() =>{

    // Get Local Address From Storage
    let address = localStorage.address;

    // Try and See If User is Registered | Returns Bool
    const registered = await accountRegistered(address.toLowerCase());

    // If not registered
    if(!registered){
      try{
        //register the user via link
        const address = await _link.setup({});

        //current address is set in state
        setCurrentAddress(address.address);

        console.log("USER REGISTERED")
        // Set StateVariables
        setEligable(true);
        setCurrentAddress(address[0]);
        setLogged(true);
        localStorage.setItem("address", account[0]);
      }
      catch(error){
        setLogged(true);
        setEligable(false);
        msgChange(true);

        console.log(error)
        console.log(`An error occured ${error}`)
      }
    }
    else if(registered){
      console.log(`USER ${address} is registered`);

      // Set Variables
      setEligable(true);
      setLogged(true);
    }
    window.alert("You have unlocked I M M U T I B L E  X")
  };

  // Mint Token
  const mintToken = async () =>{
    //Grab client window
    const web3 = new Web3(window.ethereum);
    // Default Payment is ETH
    window.alert("Inside Function");

    // Attempt transaction

    try {
      const accounts = await web3.eth.getAccounts();

      let receiver = process.env.TREASURY
      console.log(receiver)

      web3.eth.sendTransaction(
        /* Body for Transaction */
        {
          to: receiver,
          from: accounts[0],
          value: web3.utils.toWei(eth.toString(), "ether"),
        },
        /* Call Back */
        async function (err, res) {
          if(res){
            // test Alert
            window.alert('Response given, check console')
            console.log(res)

            // Object to be passed to the API
            const body_data = {
              address: localStorage.getItem("address"),
              hash: res,
              type: "ETH",
              quantity: value,
              // 5
              tokenID: 5
            };

            setEligable(false)
            setLoading(true)

            try {
              window.alert('Making an API request')

              // `${process.env.REACT_APP_URL}/api/mint`
              const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/mint`, body_data)
              console.log(response)
              setLoading(false);
              setEligable(true);
              console.log(response);
            } catch(err){

              window.alert('Error, check console')
              console.log(err)
              setLoading(false);
              setEligable(true);
            }
          }
        }
      )
    } catch(e) {
      console.log(`Something happened ${e}`)
      // Testing Alert
      window.alert('Something Happened, Check console.')
    }
  }

  // Disconnect wallet button, wipe everything
  const disconnectWallet = () => {
    localStorage.removeItem("address");
    setLogged(false);
    setEligable(false);
    msgChange(false);
  };

  useEffect(() =>{
    // Local DOM window
    const { ethereum } = window;

    // Prompt User for ethereum window
    let web3 = new Web3(window.ethereum);

  });


  // Returns
  async function getMintNum(){
    let mint_val = await axios.get(`${process.env.REACT_APP_URL}/api/v1/tokennum`)

    return mint_val
  };

  //let number_of_mints = getMintNum();

  return (
    <div  className="container">
      {/* Main */}
      <section  className="section-1">
        <div  className='box-column steps-box'>
              <h1 className='bbn-font'>Steps to mint</h1>
              <div  className='box-row button-box-major'>
                <div  className='button-box button-box-1'>
                  <h2 className='fngr-font'>1. Connect Wallet</h2>
                  {
                    (connectedWallet) ? (<button className= "button-connected button-web3-prompts bbn-font">Connected</button>) :
                    (<button className="button-web3-prompts  bbn-font" onClick={connectWallet} >Click here</button>)
                  }
                  <p>Works with any Ethereum based wallet</p>
                </div>
                <div  className='button-box button-box-2'>
                  <h2 className='fngr-font'>2. Unlock Immutible</h2>
                  {
                    (eligable) ? (<button className= "button-connected button-web3-prompts bbn-font">Connected!</button>) :
                    (<button className='button-web3-prompts  bbn-font' onClick={connectWalletImx} >Click here</button>)
                  }
                  <p>A portal to Immutable X will present itself, follow its prompts</p>
                </div>
              </div>
          </div>
          <div  className='button-selection'>
            <h2>3. Select the amount to mint</h2>
            <MintQuantityComponent value={value} change={setValue} price={eth}/>
          </div>
          <div className='text-container'>
            <div  className='text-box'>
              <h2 className="bbn-font">WTF am I minting?</h2>
              <p>A Morphling Character Token. IMG: Morphling on a penny</p>
            </div>
            <div  className='text-box'>
              <h2 className="bbn-font">WTF Are morphlings? </h2>
              <p>A new fantasy civilization in the FotD universe, premiered via ten thousand NFT PFPs. The results of your mint will become cannon.</p>
            </div>
            <div  className='text-box'>
              <h2 className="bbn-font">WTF DOES THE TOKeN DO? </h2>
              <p>Morphlings are medieval peasant farmers and craftsman, with RPG stats, playing card identities, and owning one is a permanent, lifetime all-access pass to the best of the Fruition of the Damned universe..</p>
            </div>
          </div>
      </section>
      {/* Mint Section */}
      <section  className="section-2">
        <div  className="box-row mint-text-box">
          <div>
            <h2 className='section-2-h2 west-text bngs-font'>WEST</h2>
          </div>
          <h2 className='mint-blurb head-blurb fngr-font'>4. Mint by clicking the button below</h2>
          <div>
            <h2 className='section-2-h2 east-text bngs-font'>EAST</h2>
          </div>
        </div>
        <div  className='box-row mint-images'>
          {/* IMAGE GOES HERE WITH LINK*/}
          <div  className="rug-image">
            <Image src={'/morphs_west.png'} height={250} width={480}/>
          </div>
          <Image src={'/mint_button2.png'} height={340} width={358}/>
          <div  className="rug-image">
            <Image src={'/morphs_east.png'} height={250} width={480}/>
          </div>
        </div>
        <div className='box-row fngr-font num-box'>
          {/* <h2>Mints Left: <span className='mint-num'>{number_of_mints}</span></h2> */}
          <h2>Mints Left: <span className='mint-num'>1000</span></h2>
        </div>
      </section>
      {/* Phases Section */}
      <section  className="section-2">
        <div  className="bbn-font">
          <h1 className="section-3-head">Road Map</h1>
        </div>
        <div className="box-row phase-row">
            <PhaseComponent text={phase_1} num='1'/>
            <div  className='arrow'>
              <Image src={'/arrows.png'} height={175} width={103}/>
            </div>
            <PhaseComponent text={phase_2} num='2'/>
            <div  className='arrow'>
              <Image src={'/arrows.png'} height={175} width={103}/>
            </div>
            <PhaseComponent text={phase_3} num='3'/>
        </div>
      </section>
      {/* Base Section */}
      <footer className='footer box-row'>
        <div>
          <Image src={'/immu_x_logo_2.png'} height={35} width={224}/>
        </div>
        <p className="footer-text">+</p>
        <div>
          <Image src={'/fruition_title_transparent.png'} height={44} width={298}/>
        </div>
        <span className="footer-text">+</span>
        <div>
          <Image src={'/guava_logo.png'} height={61} width={63}/>
        </div>
        <span className="footer-text">=</span>
        <div>
          <Image src={'/web_3_heart.png'} height={123} width={123}/>
        </div>
        <div>
          <Image src={'/air_things.png'} height={59} width={95}/>
        </div>
      </footer>
    </div>
  )
}
