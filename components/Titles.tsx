import Link from "next/link";

import { ArrowIcon } from "./icons";
import { allPages } from "../.contentlayer/generated/index.mjs";


const pages = allPages;

export default function Titles() {
    return (
        <>
            <ul>
                <li className="my-12 sm:my-8 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] pl-2 sm:p-4 2xl:p-0 sm:float-left">
                    <h1 className="flex items-baseline sm:gap-2 text-black font-bold text-4xl sm:text-5xl">
                        <Link href="/experience" passHref style={{ display: "flex", alignItems: "end", gap: "0.5rem" }}>
                            <ArrowIcon />
                            <span>work experience</span>
                        </Link>
                    </h1>
                    <h1 className="text-rose text-base sm:text-lg mt-5 sm:ml-12">I invite you to explore into the projects I have been involved in over the past years, as they have been instrumental in developing both my technical and soft skills that I possess today</h1>
                </li>

                {pages.sort((a, b) => b.title.localeCompare(a.title)).map((page) => (
                    <li key={page.slug} className={`my-12 sm:my-8 w-[94%] sm:w-[85%] md:w-[75%] lg:w-[65%] pl-2 sm:p-4 2xl:p-0
                        ${page.title === "work mentality" || page.title === "study formation" ? "sm:float-right" : "sm:float-left"}`}
                    >
                        <h1 className="flex items-baseline gap-2 text-black font-bold text-4xl sm:text-5xl">
                            <Link href={`/${page.slug}`} passHref style={{ display: "flex", alignItems: "end", gap: "0.5rem" }}>
                                <ArrowIcon />
                                <span>{ page.title }</span>
                            </Link>
                        </h1>
                        <h1 className="text-rose text-lg mt-5 sm:ml-12">{page.description}</h1>
                    </li>
                ))}
            </ul>
        </>
    )
}
