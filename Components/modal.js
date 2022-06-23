import Image from 'next/image'
import Link from 'next/link';
import ReactDOM from "react-dom";
import {useState, useEffect} from "react";
//import '../styles/globals.css'

const modalStyle = {
  width: '50%',
  position: 'fixed',
  textAlign: 'center',
  fontSize: '20px',
  borderRadius: '25px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: "black",
  padding: '50px',
  zIndex: 1000
}

const modalOverLay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(214, 221, 223, 0.3)',
  zIndex: 1000
}

const holder = {
  cursor: 'pointer',
  // backgroundColor: '#cd00f3',
  // width: '100%',
  // borderRadius: '25px',
  // textAlign: 'center',
}

const mainDiv = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  width: '100%'
}

const buttonColor = {
  backgroundColor: '#B434C0',
  "&:hover": {
    backgroundColor:'#cd68d6',
  },
}

export default function Modal({ show, onClose, children }) {
  // isActive, default is false
  const[isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <>
      <div style={modalOverLay} />
      <div  style={modalStyle}>
        <div  style={mainDiv}>
          <h1>TRANSACTION COMPLETE</h1>
          <h3>Check out your Morphlings in your <span>Immutable X</span> Inventory</h3>
          <Link href="https://market.immutable.com/">
            <div  style={holder}>
              <Image src={'/immu_x_logoimmutable.png'} height={25} width={166}/>
            </div>
          </Link>
          <h3>Track your transaction here:</h3>
          <Link href="https://etherscan.io/">
            <div  style={holder}>
              <Image src={'/etherscan.png'} height={49} width={49}/>
            </div>
          </Link>
          <button onClick={onClose} style={buttonColor} className='button-web3-prompts'>Close</button>
        </div>
      </div>
    </>
  ) : null;

  if(isBrowser){
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    )
  } else {
    return null;
  }
};
