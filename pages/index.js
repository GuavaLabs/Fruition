import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// PUT HEADER in _app.js

export default function Home() {
  return (
    <>
      {/* Section 1 */}
      <section  className='section-row  section-1'>
        <div  className='box-column'>
          <h2 className='section-1-h2'>WEST</h2>
          <Image src={'/morphs_west.png'} height={250} width={450}/>
        </div>
        <div  className='box-column'>
          {/* IMAGE GOES HERE WITH LINK*/}
          <Image src={'/mint_button.png'} height={400} width={370}/>
          <h2 className='section-1-mid'>MINT-A-MORPHLING</h2>
        </div>
        <div  className='box-column'>
          <h2 className='section-1-h2-west'>EAST</h2>
          <Image src={'/morphs_east.png'} height={250} width={450}/>
        </div>
      </section>
      {/* Section 2 */}
      <section  className='section-column'>
        <div  className='box-row'>
          <h2>Steps to mint</h2>
          <h2>Sale = Active</h2>
        </div>
        {/* MINTING BUTTONS*/}
        <div  className='box-row'>
          <div  className='box-column'>
            <h2>1. Connect Wallet</h2>
            <button>Click here</button>
          </div>
          <div  className='box-column'>
            <h2>2. Unlock Immutible</h2>
            <button>Click here</button>
          </div>
          <div  className='box-column'>
            <h2>3. Click big mint token</h2>
            <button>Click here</button>
          </div>
        </div>
      </section>
      {/* Section 3 */}
      <section  className='section-row'>
        <div className='box-column'>
          <h2>STORY</h2>
          <h3>Lorem</h3>
          <div>
            <p>Text Goes Here</p>
          </div>
        </div>
        {/*IMAGE GOES HERE*/}
      </section>
      {/* Section 4 */}
      <section  className='section-column'>
        <div  className='box-row'>
          <h2>Roadmap</h2>
          <h2>Phase 3</h2>
        </div>
        <div  className='box-row'>
          <div  className='box-column'>
            <h2>Phase 1</h2>
            <h3>Lorem</h3>
            <p>Lorem</p>
          </div>
          <div  className='box-column'>
            <h2>Phase 2</h2>
            <h3>Lorem</h3>
            <p>Lorem</p>
          </div>
          <div  className='box-column'>
            <h3>Lorem</h3>
            <p>Lorem</p>
          </div>
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
