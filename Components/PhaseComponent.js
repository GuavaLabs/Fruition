import Image from 'next/image'
import Link from 'next/link';

export default function PhaseComponent(){
  return (
    <>
      <div className='phase-component box-column'>
        <div  className='box-row'>
          <Image src={'/phase-box-2.png'} height={100} width={90} />
          <div  className='box-column section-4-header'>
            <h2>Phase X</h2>
            <h3>LOREM IPSUM DOLOR</h3>
          </div>
        </div>
        <div className='box-column section-4-text'>
          <p>Risus nullam eget Risus nullam eget felis eget nunc. Velit ut tortor pretium viverra suspendisse potenti. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Suspendisse ultrices gravida dictum fusce. Sed velit dignissim sodales ut eu sem integer vitae justo.</p>
          <p>Risus nullam eget Risus nullam eget felis eget nunc. Velit ut tortor pretium viverra suspendisse potenti. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Suspendisse ultrices gravida dictum fusce. Sed velit dignissim sodales ut eu sem integer vitae justo.</p>
          <p>Risus nullam eget Risus nullam eget felis eget nunc. Velit ut tortor pretium viverra suspendisse potenti. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Suspendisse ultrices gravida dictum fusce. Sed velit dignissim sodales ut eu sem integer vitae justo.</p>
        </div>
        <div  className='box-row'>
          <p  className='section-4-p'>Read More:&nbsp;</p>
          <Image src={'/discord.svg'} height={35} width={40} className='filter'/>
        </div>
      </div>
    </>
  )
}
