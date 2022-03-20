//import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/MintQuantityComponent.module.css'


// Temporary Function
function TestFunction(){
  console.log("Success")
}

// Here needs to go a function that calculates the following:
//  amount of tokens user wants (max 7)
//  price foreach token (base price x amount)
// user adjusts AMOUNT based on buttons:
// left button decrements up until 1
// right button encrements up until 7

export default function MintQuantityComponent(){
  return (
    <>
      <div  className={styles['minting-div']}>
      {/* className='box-row  box-center  sub-mint' */}
        <div  className={`${styles['box-row']} ${styles['box-center']} ${styles['sub-mint']} bbn-font`}>
          <button className={styles['mint-button']} onClick={TestFunction}>-</button>
          <p>1</p>
          <Image src={'/morphling_small.png'} height={40} width={40} />
          <p><span className={styles['special']}>@</span> PRICE</p>
          <button className={styles['mint-button']} onClick={TestFunction}>+</button>
        </div>
        <p className={styles['subbutton-blurb']}>Max of 7 mints per user </p>
      </div>
    </>
  )
}
