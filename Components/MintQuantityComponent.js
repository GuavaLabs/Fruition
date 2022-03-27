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

export default function MintQuantityComponent({value, change, price}){

  const decrease = () => {
    if(value === 1){

        change(1)
    }

    else
    {
      change(value - 1)
    }

  }

  const increase = () => {

      if (value === 7)
       {
         change(7)
       }
       else
       {
        change(value + 1)

       }

  }

  return (
    <>
      <div  className={styles['minting-div']}>
      {/* className='box-row  box-center  sub-mint' */}
        <div  className={`${styles['box-row']} ${styles['box-center']} ${styles['sub-mint']} bbn-font`}>
          <button className={styles['mint-button']} onClick={decrease}>-</button>
          <p>{value}</p>
          <Image src={'/morphling_small.png'} height={40} width={40} />
          <p><span className={styles['special']}>@</span> {price * value}</p>
          <button className={styles['mint-button']} onClick={increase}>+</button>
        </div>
        <p className={styles['subbutton-blurb']}>Max of 7 mints per user </p>
      </div>
    </>
  )
}
