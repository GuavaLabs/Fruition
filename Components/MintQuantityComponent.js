//import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link';

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
      <div  className='minting-div'>
        <div  className='box-row  box-center  sub-mint'>
          <button className='mint-button' onClick={TestFunction}>-</button>
          <h3>NUM</h3>
          <Image src={'/morphling_small.png'} height={40} width={50} />
          <h3>@ PRICE</h3>
          <button className='mint-button' onClick={TestFunction}>+</button>
        </div>
        <p className='subbutton-blurb'>Max of 7 mints per user </p>
      </div>
    </>
  )
}
