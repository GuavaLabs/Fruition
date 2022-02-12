import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Components
import MintQuantityComponent from '../Components/MintQuantityComponent'
import PhaseComponent from '../Components/PhaseComponent'

// PUT HEADER in _app.js

// <h2 className='section-1-mid'>MINT-A-MORPHLING</h2>

export default function Home() {
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
                <button className="button-web3-prompts">Click here</button>
                <p>Works with any Ethereum based wallet</p>
              </div>
              <div  className='button-selection'>
                <h2>2. Unlock Immutible</h2>
                <button className='button-web3-prompts'>Click here</button>
                <p>A portal to Immutable X will present itself, follow its prompts</p>
              </div>
              <div  className='button-selection'>
                <h2>3. Select the amount to mint</h2>
                <MintQuantityComponent />
              </div>
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
          <Image src={'/mint_button2.png'} height={340} width={358}/>
          <p  className='mint-blurb'>1 click generates total amount of specified assets</p>
        </div>
        <div  className='box-column'>
          <div>
            <h2 className='section-2-h2-east'>EAST</h2>
          </div>
          <Image src={'/morphs_east.png'} height={250} width={450}/>
        </div>
      </section>
      {/* Section 3 */}
      <section  className='section-row  section-3'>
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
        <div  className='box-row'>
          <PhaseComponent />
          <PhaseComponent />
          <PhaseComponent />
        </div>
      </section>
      {/* footer */}
      <footer>
        <div>
          <p>Footer Text</p>
        </div>
      </footer>
    </>
  )
}
