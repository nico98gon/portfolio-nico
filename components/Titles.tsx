import Link from "next/link";

import { ArrowIcon } from "./icons";
import { allPages } from "../.contentlayer/generated/index.mjs";


const pages = allPages;

export default function Titles() {
    return (
        <>
            <ul>
                <li className="my-12 sm:my-8 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] pl-2 sm:p-4 2xl:p-0 sm:float-left">
                    <Link href="/experience" passHref>
                        <h1 className="flex items-baseline sm:gap-2 text-black font-bold text-4xl sm:text-5xl"><ArrowIcon />work experience</h1>
                    </Link>
                    <h1 className="text-rose text-base sm:text-lg mt-5 sm:ml-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse tempore dicta doloribus amet non harum, iste neque! Placeat id assumenda maxime magni vel reiciendis rem perferendis hic aut nostrum?</h1>
                </li>

                {pages.sort((a, b) => b.title.localeCompare(a.title)).map((page) => (
                    <li key={page.slug} className={`my-12 sm:my-8 w-[94%] sm:w-[85%] md:w-[75%] lg:w-[65%] pl-2 sm:p-4 2xl:p-0 ${page.title === "work mentality" || page.title === "study formation" ? "sm:float-right" : "sm:float-left"}`}>
                        <Link href={`/${page.slug}`} passHref>
                            <h1 className="flex items-baseline gap-2 text-black font-bold text-4xl sm:text-5xl"><ArrowIcon />{page.title}</h1>
                        </Link>
                        <h1 className="text-rose text-lg mt-5 sm:ml-12">{page.description}</h1>
                    </li>
                ))}
            </ul>
        </>
    )
}
