import Image from 'next/image'
import Link from 'next/link';
import style from '../styles/PhaseComponent.module.css'


export default function PhaseComponent({text, num}){
  return (
    <>
      <div className={`${style['phase-component']}`}>
        <div  className={`box-row ${style['section-4-header']}`}>
          {/* <Image src={'/phase-box-2.png'} height={90} width={120} />
          <div  className={`box-column ${style['section-4-header']}`}>
            <h2>Phase X</h2>
          </div> */}
          <Image src={'/phase-box-2.png'} height={90} width={90} />
          <h2>Phase {num}</h2>
        </div>
        <div className={style['section-4-text']}>
          {
            text.map((value) =>{
              return (<p>{value}</p>)
            })
          }
        </div>
        <div  className='box-row'>
          <p  className={style['section-4-p']}>Read More:&nbsp;</p>
          <Image src={'/discord.svg'} height={35} width={40} className='filter'/>
        </div>
      </div>
    </>
  )
}
