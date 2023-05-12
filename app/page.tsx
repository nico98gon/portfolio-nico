import dynamic from 'next/dynamic';

import Titles from '../components/Titles';
import AboutMe from '../components/AboutMe';
const Canvas = dynamic( () => import('../Canvas/Canvas'), { ssr: false } );


export const revalidate = 60;

export default function Page() {

  return (
    <>
      <section className='bg-black h-fit w-screen flex flex-col'>
        <Canvas />
        <AboutMe />
      </section>
      <section className='relative bg-white h-fit w-screen z-10'>
        <div className="max-w-7xl flex flex-col md:flex-row lg:mx-auto mt-32">
          <Titles />
        </div>
      </section>
    </>
  )
}
