'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useTransform, useScroll  } from "framer-motion";
import useSWR from 'swr';

// import { getBlogViews, getTweetCount, getStarCount } from '../lib/metrics';
import { getStarCount } from '../lib/metrics';
import { name, about, bio, avatar } from '../lib/info';
import { ArrowIcon, GitHubIcon, TwitterIcon, ViewsIcon } from '../components/icons';


const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function AboutMe() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const [starCount, setStarCount] = useState<number | null>(null);
    // const [tweetCount, setTweetCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const { data: tweetData, error: tweetError } = useSWR(
        '/pages/api/tweet-count',
        fetcher
    )

    const opacity = useTransform(scrollYProgress, [0.4, 1.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.5, 1], [1.05, 0.9]);
    // const position = useTransform(scrollYProgress, (pos) => {
    //     return pos === 1 ? "relative" : "fixed";
    // });

    useEffect(() => {
        async function fetchData() {
            try {
                // [starCount, views, tweetCount] = await Promise.all([
                const [starCountResult] = await Promise.all([
                    getStarCount(),
                    // getBlogViews(),
                    // getTweetCount(),
                ]);
                setStarCount(starCountResult);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        
        fetchData();
    }, []);

    return (
        <motion.section
            style={{ opacity }}
            ref={targetRef}
            className="fixed mt-[60px] md:mt-[140px] lg:mt-[90px] xl:mt-[130px] 2xl:mt-[160px] flex-grow md:ml-[45%] lg:ml-[70%] z-10"
        >
            <motion.div
                style={{ scale, x: "-50%" }}
                className='w-[85%] ml-[50%] bg-white/10 backdrop-filter backdrop-blur-lg rounded-2xl p-4
                md:ml-[10%] md:w-[140%]
                lg:w-[120%] lg:ml-[25%] lg:bg-transparent lg:backdrop-filter-none lg:backdrop-blur-none
                xl:ml-[15%]
                2xl:w-full 2xl:ml-0'
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
                        href="https://twitter.com/Nicommit_"
                        className="flex items-center gap-2"
                    >
                        <TwitterIcon />
                        { tweetError ? (<p>404</p>) : 
                            !tweetData ? (<p>Loading...</p>) : (
                            <p>{tweetData?.tweetCount?.toLocaleString()}</p>
                        )}
                        <p>tweets all time</p>
                        {/* { loading? 'loading...' : `${tweetData?.tweetCount?.toLocaleString()} tweets all time` } */}
                    </a>
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://github.com/nico98gon/portfolio-nico"
                        className="flex items-center gap-2"
                    >
                        <GitHubIcon />
                        { loading? 'loading...' : `${starCount?.toLocaleString()} stars on this repo` }
                    </a>
                    {/* <Link href="/blog" className="flex items-center">
                        <ViewsIcon />
                        {`${views.toLocaleString()} blog views all time`}
                    </Link> */}
                    </div>
                </div>
                <p className="my-5 max-w-full sm:max-w-[600px] text-neutral-800 dark:text-neutral-200">
                    {bio()}
                </p>
                <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
                    {/* <li>
                        <a
                            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://twitter.com/Nicommit_"
                        >
                            <ArrowIcon />
                            <p className="h-7">follow me on Twitter</p>
                        </a>
                    </li> */}
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
                    <li>
                        <a
                            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/in/nico-gon/"
                        >
                            <ArrowIcon />
                            <p className="h-7">follow me on LinkedIn</p>
                        </a>
                    </li>
                </ul>
            </motion.div>
        </motion.section>
    )
}
