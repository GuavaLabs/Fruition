import '../styles/globals.css'
// <Component {...pageProps}

function MyApp({ Component, pageProps }) {
  return(
    <div>
      <header className=''>
        <h1></h1>
        {/* time.component */}
        <nav>
          <ul>
            <li>ROADMAP</li>
            <li>WORLD CURRENT</li>
            <li>DISCORD</li>
            <li>TWITTER</li>
            <li>TELEGRAM</li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
