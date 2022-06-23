import '../styles/globals.css'
import Image from 'next/image'
import Link from 'next/link';
// import AOS from "aos";
import React, { useEffect } from "react";
// <Component {...pageProps}

function MyApp({ Component, pageProps }) {

  return(
    <>
      <header>
        <div  className="header-title-image">
          <Image src={'/fruition-title.png'} width={340} height={55} className="title-img"/>
        </div>
        {/* Header Title */}
        <h1 className="header-title-text  bngs-font">
          mint-a-morphling
        </h1>
        <nav  className="bbn-font">
          <ul>
            {/* Images */}
            <Link href="#roadmap">
              <li className='list-item'>ROADMAP</li>
            </Link>
            <Link href="https://www.fotd.world/world">
              <li className='list-item'>WORLD CURRENT</li>
            </Link>
            <Link href="https://discord.gg/V2czqvXFUj">
              <li className='list-item-img'>
                <Image src={'/discord.svg'} width={29}  height={24} className='filter'/>
              </li>
            </Link>
            <Link href="https://twitter.com/morphlingsnft?s=21">
              <li className='list-item-img'>
                <Image src={'/twitter.svg'} width={29}  height={24} className='filter'/>
              </li>
            </Link>
            <Link href="https://t.me/+OoZsQhxOa4hiMGFh">
              <li className='list-item-img'>
                <Image src={'/telegram.svg'} width={29}  height={24}  className='filter'/>
              </li>
            </Link>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
