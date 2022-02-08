import '../styles/globals.css'
import Image from 'next/image'
import Link from 'next/link';
// <Component {...pageProps}

function MyApp({ Component, pageProps }) {
  return(
    <>
      <header className='section-row header'>
        <Image src={'/fruition-title.png'} width={340} height={55} className="title-img"/>
        {/* time.component */}
        <nav  className='header-nav'>
          <ul>
            {/* FIX IMAGES! */}
            <Link href="/">
              <li className='list-item'>ROADMAP</li>
            </Link>
            <Link href="/">
              <li className='list-item'>WORLD CURRENT</li>
            </Link>
            <Link href="/">
              <li className='list-item-img'>
                <Image src={'/discord.svg'} width={29}  height={24} className='filter'/>
              </li>
            </Link>
            <Link href="/">
              <li className='list-item-img'>
                <Image src={'/twitter.svg'} width={29}  height={24} className='filter'/>
              </li>
            </Link>
            <Link href="/">
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
