import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// PUT HEADER in _app.js


export default function Home() {
  return (
    <div>
      {/* Section 1 */}
      <section>
        <div>
          <h2>East</h2>
        </div>
        <div>
          {/* IMAGE GOES HERE*/}
          <h2>Mint-a-morphling</h2>
        </div>
        <div>
          <h2>West</h2>
        </div>
      </section>
      {/* Section 2 */}
      <section>
        <div>
          <h2>Steps to mint</h2>
          <h2>Sale = Active</h2>
        </div>
        {/* MINTING BUTTONS*/}
        <div>
          <div>
            <h2>1. Connect Wallet</h2>
            <button>Click here</button>
          </div>
          <div>
            <h2>2. Unlock Immutible</h2>
            <button>Click here</button>
          </div>
          <div>
            <h2>3. Click big mint token</h2>
            <button>Click here</button>
          </div>
        </div>
      </section>
      {/* Section 3 */}
      <section>
        <div>
          <h2>STORY</h2>
          <h3>Lorem</h3>
          <div>
            <p>Text Goes Here</p>
          </div>
        </div>
        {/*IMAGE GOES HERE*/}
      </section>
      {/* Section 4 */}
      <section>
        <div>
          <h2>Roadmap</h2>
          <h2>Phase 3</h2>
        </div>
        <div>
          <div>
            <h2>Phase 1</h2>
            <h3>Lorem</h3>
            <p>Lorem</p>
          </div>
          <div>
            <h2>Phase 2</h2>
            <h3>Lorem</h3>
            <p>Lorem</p>
          </div>
          <div>
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
    </div>
  )
}
