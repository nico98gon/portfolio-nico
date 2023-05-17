"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export interface Props {
    page: Page;
}

interface Page {
    slug: string;
    url?: string;
    title: string;
    description?: string;
}

export const Header: React.FC<Props> = ({ page }) => {
    return (
        <header
            className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
        >
            <div
                className="fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none
                duration-200 border-b lg:bg-transparent bg-zinc-900/0 border-transparent"
            >
                <div className="container flex items-center justify-between p-6 mx-auto ">
                    <Link
                        href="/"
                        className="duration-200 hover:font-medium text-zinc-400 hover:text-zinc-100"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                </div>
            </div>
            <div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
                            {page.title}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-zinc-300">
                            {page.description}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}
