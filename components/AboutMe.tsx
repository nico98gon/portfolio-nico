'use client'

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useTransform, useScroll  } from "framer-motion";

// import { getBlogViews, getTweetCount, getStarCount } from '../lib/metrics';
import { name, about, bio, avatar } from '../lib/info';
import { ArrowIcon, GitHubIcon, TwitterIcon, ViewsIcon } from '../components/icons';


export default function AboutMe() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0.4, 1.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.5, 1], [1.05, 0.9]);
    // const position = useTransform(scrollYProgress, (pos) => {
    //     return pos === 1 ? "relative" : "fixed";
    // });

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
        <motion.section
            style={{ opacity }}
            ref={targetRef}
            className="fixed mt-[60px] sm:mt-[160px] flex-grow sm:ml-[70%] z-10"
        >
            <motion.div
                style={{ scale, x: "-50%" }}
                className='w-[340px] ml-[60%] sm:w-full sm:ml-0'
            >
                <h1 className="font-bold text-3xl font-serif">{name}</h1>
                <p className="my-5 max-w-[720px] sm:max-w-[460px] text-neutral-800 dark:text-neutral-200">
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
                <p className="my-5 max-w-full sm:max-w-[600px] text-neutral-800 dark:text-neutral-200">
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
            </motion.div>
        </motion.section>
    )
}
