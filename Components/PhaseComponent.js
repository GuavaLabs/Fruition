import Image from 'next/image'
import Link from 'next/link';
import style from '../styles/PhaseComponent.module.css'

/* <Image src={'/phase-box-2.png'} height={90} width={120} />
<div  className={`box-column ${style['section-4-header']}`}>
  <h2>Phase X</h2>
</div> */

export default function PhaseComponent({text, num}){
  return (
    <>
      <div className={(num == 1) ? (`${style['phase-component']} ${style['p-1']}`) : ( (num == 3) ? (`${style['phase-component']} ${style['p-3']}`) : (`${style['phase-component']}`) )}>
        <div  className={`special-box box-row ${style['section-4-header']}`}>
          {(num == 3) ? (true) : (<div  className='image-wrapper'><Image src={'/phase-box-2.png'} height={90} width={95} /></div>)}
          {(num == 3) ? ( <h2 className={`${style['final-phase']}`}>Phase 3</h2> ) : (<h2>Phase {num}</h2>)}
        </div>
        <div className={style['section-4-text']}>
          {
            text.map((value) =>{
              return (<p>{value}</p>)
            })
          }
        </div>
        <div  className='special-box box-row'>
          <p  className={style['section-4-p']}>Read More:&nbsp;</p>
          <Image src={'/discord.svg'} height={35} width={40} className='filter'/>
        </div>
      </div>
    </>
  )
}
