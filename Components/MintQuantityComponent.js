//import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link';

export default function MintQuantityComponent(){
  return (
    <div>
      <div>
        <button>-</button>
        <h3>NUM</h3>
        <Image src={'/morphling_small.png'} height={42} width={41} />
        <button>+</button>
        <p  className='subbutton-blurb'>Max of 7 mints per user </p>
      </div>
    </div>
  )
}
