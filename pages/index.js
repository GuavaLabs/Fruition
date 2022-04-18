import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Components
import MintQuantityComponent from '../Components/MintQuantityComponent'
import PhaseComponent from '../Components/PhaseComponent'
import Modal from '../Components/modal'

// LINK Imports
import { ImmutableXClient, Link, ETHTokenType} from '@imtbl/imx-sdk';

// Import State
import { React, useState, useEffect } from "react";

// Web3 Import for transactions
import Web3 from "web3";
// Axios request handlers
import axios from "axios";

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

export default function Home(props) {
  // Auxiliary Function which returns a number rounded up
  function roundToTwo(num) {
    return +(Math.ceil(num + "e+2")  + "e-2");
  }

  let phase_1, phase_2, phase_3;

  phase_1 = ['You’re in it. We come prepared with the comic, the TV pilot, the series bible, and the Morphling NFTs with a ton of fun stats and a fun 50/50 minting event that will write itself into our world.', 'At a bare minimum, owning a FotD NFT means permanent, premium access to our highest resolution content, as early as possible, even the anime some day.']
  phase_2 = ['If we can get over 50% minted, we can commit to hiring developers to turn the Morphlings into the principle assets of an open playing-cards game environment. ',
  'Over promise and under deliver much?', 'We still want to try! We want this to be an entirely free to play games environment for community members, not P2E but P2P — and gather and socialize with 800-year old playing cards that have stood the test of time. Play classic games with people from around the world using the metadata of your Morphlings to build depth into medieval-era playing cards, that’s the end goal. We can start small with solitaire, 1 player games, and hire devs in the community to build from there!']
  phase_3 = ['If we can get 100% minted, we can say full-heartedly that we will be using the majority of those proceeds on making a web3 remote-studio animated series pilot... we wanna be on TV Ma!', 'But seriously we are going to pay creators directly using the power of web3, and excited to explore new territory with transparent creator smart-contracts, hiring a ton of cool web3 artists to join forces on a wild animated series super-project.', 'We’ll need a lot of help on this part if it comes to pass, but there’s an opportunity here to help evolve the way animated series are made altogether.']

  // Default value is 10, setValue modifies
  const [value, setValue] = useState(1);
  // Base price is retrived from database on render
  let eth = props['main_data']['price'];
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
  /* Modal Config */
  const[isOpen, setIsOpen] = useState(false)


  function handleSubmit(e) {
    e.preventDefault();
  }

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
  // Checks if user is registered in local postgres DB
  const isUserRegistered = async() =>{

    let status;

    // Body to be sent in request
    const body_data = {
      address: localStorage.getItem("address")
    };

    try{
      // Using metamask address, make a POST request to the database to see if address is in whitelist
      status = await axios.post(`${process.env.REACT_APP_URL}/api/v1/whitelist`, body_data)

      // If status == true
      if(status['data']['whitelist_status']){
        // Address is in DB
        return true;
      }else{
        // Address is not in DB
        return false;
      }

    }catch (e){
      console.log(`Something happened ${e}`);
      return false;
    }
  }

  // Returns token number in database |
  async function tokenNum(type){
    let mint_val;

    // If type is true, return the number
    if(type){
      try{
        mint_val = await axios.get(`${process.env.REACT_APP_URL}/api/v1/token`)
        return mint_val.data.success
      }catch(e){
        console.log(e)
        return 0
      }

    }// Else, increment by 1
    else{
      try{
        mint_val = await axios.post(`${process.env.REACT_APP_URL}/api/v1/token`)
        return 1
      }catch(e){
        console.log(e)
        return 0
      }

    }
  };

  async function currentPrice(type){
    let price;

    // If type is true, return the price
    if(type){
      try{
        price = await axios.get(`${process.env.REACT_APP_URL}/api/v1/currentprice`)
        return price
      }catch(e){
        console.log(e)
        return 0
      }

    }// Else, make a post request and increment by 1
    else{
      try{
        price = await axios.post(`${process.env.REACT_APP_URL}/api/v1/currentprice`)
        return 1
      }catch(e){
        console.log(e)
        return 0
      }

    }
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

        console.log(`An error occured ${error}`)
      }
    }
    else if(registered){
      console.log(`USER ${address} is registered`);

      // Set Variables
      setEligable(true);
      setLogged(true);
    }
    // Temporary
  };

  // Mint Token | This Function is a total mess...
  const mintToken = async () =>{
    //Grab client window
    const web3 = new Web3(window.ethereum);
    // Default Payment is ETH

    // Check if User is Registered
    let registered = await isUserRegistered();
    // Get Current Token Number
    let tokenid = await tokenNum(true);

    // If User is registered
    if(registered){
      try {
        const accounts = await web3.eth.getAccounts();
        console.log(eth)
        // Reciever gets the funds
        let receiver = process.env.TREASURY

        web3.eth.sendTransaction(
          /* Body for Transaction */
          {
            to: receiver,
            from: accounts[0],
            // value: web3.utils.toWei(eth.toString(), "ether"),
            value: web3.utils.toWei('0', "ether"),
          },
          /* Call Back */
          async function (err, res) {

            if(res){
              // Alert upon successful transaction | Create Pop-up
              // Get Current Token Number | SET TO TRUE IF MINTING

              // Object to be passed to the API
              const body_data = {
              address: localStorage.getItem("address"),
              hash: res,
              type: "ETH",
              // How many tokens are being minted
              quantity: 1,
              // Token ID number
              tokenID: tokenid,
              }


              setEligable(false)
              setLoading(true)

              try {

                  const mint_request = await axios.post(`${process.env.REACT_APP_URL}/api/v1/mint`, body_data);

                  // Make requests to increment price & tokennum
                  let increment_price = await axios.post(`${process.env.REACT_APP_URL}/api/v1/currentprice`);

                  let increment_tokennum = await axios.post(`${process.env.REACT_APP_URL}/api/v1/token`);

                  // Upon success, change state variables
                  setLoading(false);
                  setEligable(true);
                  setIsOpen(true)
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

    }else{
      window.alert("You're not registered")
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
          {/* <div  className='button-selection'> */}
            {/* <h2>3. Select the amount to mint</h2> */}
            {/* <MintQuantityComponent value={value} change={setValue} price={eth}/> */}
          {/* </div> */}
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
          <h2 className='mint-blurb head-blurb fngr-font'>3. Mint by clicking the button below</h2>
          <div>
            <h2 className='section-2-h2 east-text bngs-font'>EAST</h2>
          </div>
        </div>
        <div  className='box-row mint-images'>
          {/* IMAGE GOES HERE WITH LINK*/}
          <div  className="rug-image">
            <Image src={'/morphs_west.png'} height={250} width={480}/>
          </div>
          <Image src={'/mint_button2.png'} height={340} width={358} onClick={mintToken}/>
          <div  className="rug-image">
            <Image src={'/morphs_east.png'} height={250} width={480}/>
          </div>
        </div>
        <div className='box-row fngr-font num-box'>
          {/* <h2>Mints Left: <span className='mint-num'>{number_of_mints}</span></h2> */}
          <h2>Mints Left: <span className='mint-num'>{ 10000 - parseInt(props['main_data']['tokenNum'])}</span></h2>
        </div>
      </section>
      {/* Phases Section */}
      <section  className="section-2" id="roadmap">
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
        {/* <button onClick={() => {setIsOpen(true);}}>Open Modal</button> */}
      </footer>
      {/* Modal */}
      <Modal show={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  )
}

export async function getStaticProps() {
  let main_data = {}
  // Get Price From DB
  const data = await axios.get(`${process.env.REACT_APP_URL}/api/v1/currentprice`);
  // Get Current Token
  const tokenData = await axios.get(`${process.env.REACT_APP_URL}/api/v1/token`);
  // Grab string from request ONLY
  main_data['price'] = data['data']['success'];
  main_data['tokenNum']= tokenData['data']['success'];

  // Value of props will be passed to Home()
  return {
    props: {
      main_data
    },
  }
}
