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
// Local DOM window
//const { ethereum } = window;

/* Production addresses */
const _link = new Link("https://link.x.immutable.com");
//const apiAddress = 'https://api.x.immutable.com/v1'

/*Z Ropsten/Test addresses */
//const linkAddress = 'https://link.ropsten.x.immutable.com';
//const apiAddress = 'https://api.ropsten.x.immutable.com/v1'

// Link SDK
//const link = new Link(linkAddress);

// IMX Client
//const client = await ImmutableXClient.build({ publicApiUrl: apiAddress});


// PUT HEADER in _app.js

// Home == Main for DAP

export default function Home() {

  // Default value is 10, setValue modifies
  const [value, setValue] = useState(10);
  //const eth = process.env.REACT_APP_PRICE * value;
  const eth = 2.5
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

  function handleSubmit(e) {
    e.preventDefault();
  }

  //TODO
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
          // Production
          //`https://api.x.immutable.com/v1/users/${address.toLowerCase()}`
          // Testing
          `https://api.ropsten.x.immutable.com/v1/users/${address.toLowerCase()}`
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
  };

  // Mint Token
  const mintToken = async () =>{
    // Default Payment will be ETH
    try{
      const accounts = await web3.eth.getAccounts();
      let reciever = process.env.REACT_APP_TREASUREY

      // Create Transaction
      web3.eth.sendTransaction({
        to: reciever,
        from: accounts[0],
        // value: web3.utils.toWei(eth.toString(), "ether")
        // TESTING VAL
        value: web3.utils.toWei(eth.toString(), "ether")
      }, async (err, res) => {

        if(res){
          console.log(res);

          const body_data = {
            // Get local address
            address: localStorage.getItem("address"),
            // Hash == Transaction Hash from Res
            hash: res,
            type: "ETH",
            // Value = Num of NFT/Tokens purchased by User
            quantity: 1
          };

          // Set StateVariables
          setEligable(false);
          setLoading(true);

          try{

            const response = await axios.post(
              `${process.env.REACT_APP_URL}/api/v1/mint`,
              body_data
            );

            console.log(response);
            // Upon success, change state vars to defaults
            setLoading(false);
            setEligable(true);

            console.log(response);

            window.alert("YOUR TOKEN HAS BEEN MINTED")
          } catch(error){
            console.log(error);

            setLoading(false);
            setEligable(true);
          }
        }
      })
    }catch(error){
      console.log(`Something happened: ${error}`)
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
    <>
      {/* Section 1 */}
      <section  className='section-column'>
        <div  className='section-1-header'>
          <h1>MINT-A-MORPHLING</h1>
        </div>
        {/* MINTING BUTTONS | SHOULD BE COMPONENT*/}
        <div  className='box-row  section-1-spacing section-1-prompts'>
          <div  className='box-column'>
            <h2 className='section-1-h1'>Steps to mint</h2>
            <div  className='box-row section-1-spacing section-1-gap'>
              <div  className='button-selection'>
                <h2>1. Connect Wallet</h2>
                <button className="button-web3-prompts" onClick={connectWallet}>Click here</button>
                <p>Works with any Ethereum based wallet</p>
              </div>
              <div  className='button-selection'>
                <h2>2. Unlock Immutible</h2>
                <button className='button-web3-prompts' onClick={connectWalletImx}>Click here</button>
                <p>A portal to Immutable X will present itself, follow its prompts</p>
              </div>
              {/*
                <div  className='button-selection'>
                  <h2>3. Select the amount to mint</h2>
                  <MintQuantityComponent />
                </div>
                */}
            </div>
          </div>
          <div  className='text-box'>
            <h2 className='section-1-h1 section-1-alt-h1'>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section  className='section-row  section-2'>
        <div  className='box-column'>
          <div>
              <h2 className='section-2-h2-west'>WEST</h2>
          </div>
          <Image src={'/morphs_west.png'} height={250} width={450}/>
        </div>
        <div  className='box-column'>
          {/* IMAGE GOES HERE WITH LINK*/}
          <h2 className='mint-blurb head-blurb'>4. Mint by clicking the button below</h2>
          <Image src={'/mint_button2.png'} onClick={mintToken} height={340} width={358}/>
          <p  className='mint-blurb'>1 click generates total amount of specified assets</p>
        </div>
        <div  className='box-column'>
          <div  className='section-2-east'>
            <h2 className='section-2-h2-east'>EAST</h2>
          </div>
          <Image src={'/morphs_east.png'} height={250} width={450}/>
        </div>
      </section>
      {/* Section 3 */}
      <section  className='section-row  section-3 wrap'>
        <div className='box-column' style={{width: "50%"}}>
          <h1 className='section-3-h1'>STORY</h1>
          <h3 className='section-3-h3'>Lorem</h3>
          <div  className='box-row  section-3-text'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        {/*IMAGE GOES HERE*/}
        <div  className='image-thing'>
          <Image src={'/morphling_big.png'} height={790} width={776}  layout="responsive"/>
        </div>
      </section>
      {/* Section 4 */}
      <section  className='section-column section-4'>
        <div  className='box-row'>
          <h1 className='section-4-h1'>ROAD MAP</h1>
        </div>
        <div  className='box-row wrap'>
          <PhaseComponent />
          <div  className='arrow'>
            <Image src={'/arrows.png'} height={175} width={103}/>
          </div>
          <PhaseComponent />
          <div  className='arrow'>
            <Image src={'/arrows.png'} height={175} width={103}/>
          </div>
          <PhaseComponent />
        </div>
      </section>
      {/* Footer */}
      <footer className='footer section-row'>
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
    </>
  )
}
