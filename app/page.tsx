import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// import { getBlogViews, getTweetCount, getStarCount } from '../lib/metrics';
import { name, about, bio, avatar } from '../lib/info';
import { ArrowIcon, GitHubIcon, TwitterIcon, ViewsIcon } from '../components/icons';
import Titles from '../components/Titles';

const Canvas = dynamic( () => import('../Canvas/Canvas'), { ssr: false } );


export const revalidate = 60;

export default function Page() {

  // let starCount, views, tweetCount;

  // try {
  //   [starCount, views, tweetCount] = await Promise.all([
  //     getStarCount(),
  //     getBlogViews(),
  //     getTweetCount(),
  //   ]);
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <>
      <section className='bg-black h-screen w-screen flex flex-col'>
        <Canvas />
        <div className='fixed mt-24 flex-grow ml-[38%] z-0'>
          <h1 className="font-bold text-3xl font-serif">{name}</h1>
          <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
            {about()}
          </p>
          <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
            <Image
              alt={name}
              className="rounded-full"
              src={avatar}
              placeholder="blur"
              width={100}
              priority
            />
            <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-500 dark:text-neutral-400">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/leeerob"
                className="flex items-center gap-2"
              >
                <TwitterIcon />
                {/* {`${tweetCount.toLocaleString()} tweets all time`} */}
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/leerob"
                className="flex items-center gap-2"
              >
                <GitHubIcon />
                {/* {`${starCount.toLocaleString()} stars on this repo`} */}
              </a>
              <Link href="/blog" className="flex items-center">
                <ViewsIcon />
                {/* {`${views.toLocaleString()} blog views all time`} */}
              </Link>
            </div>
          </div>
          <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
            {bio()}
          </p>
          <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
            <li>
              <a
                className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/Nicommit_"
              >
                <ArrowIcon />
                <p className="h-7">follow me on Twitter</p>
              </a>
            </li>
            <li>
              <a
                className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/nico98gon"
              >
                <ArrowIcon />
                <p className="h-7">follow me on GitHub</p>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className='absolute bg-white h-fit mt-[100vh] w-[125vw]
        lg:ml-[-15vw]
        xl:ml-[-15vw]
        2xl:ml-[-25vw]
        z-10'>
        <div className="relative md:max-w-5xl xl:max-w-6xl 2xl:max-w-6xl flex flex-col md:flex-row mx-1 lg:mx-auto mt-32">
          <Titles />
        </div>
      </section>
    </>
  )
}
