import dynamic from 'next/dynamic';

import Titles from '../components/Titles';
import AboutMe from '../components/AboutMe';
const CanvasMe = dynamic( () => import('../Canvas/CanvasMe'), { ssr: false } );


export const revalidate = 60;

export default function Page() {

  return (
    <>
      <section className='bg-black h-screen w-screen flex flex-col'>
        <CanvasMe />
        <AboutMe />
        <div className="scroll-indicator">
          ↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓
        </div>
      </section>
      <section className='relative bg-white h-fit w-screen z-10'>
        <div className="max-w-7xl flex flex-col md:flex-row lg:mx-auto py-32">
          <Titles />
        </div>
      </section>
    </>
  )
}
