import Link from "next/link";

import { ArrowIcon } from "./icons";
import { allPages } from "../.contentlayer/generated/index.mjs";


const pages = allPages;

export default function Titles() {
    return (
        <>
            <ul>
                <li className="my-8 w-[65%] float-left">
                    <Link href="/experience" passHref>
                        <h1 className="flex items-baseline gap-2 text-black font-bold text-5xl"><ArrowIcon />work experience</h1>
                    </Link>
                    <h1 className="text-rose text-lg mt-5 ml-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse tempore dicta doloribus amet non harum, iste neque! Placeat id assumenda maxime magni vel reiciendis rem perferendis hic aut nostrum?</h1>
                </li>

                {pages.sort((a, b) => b.title.localeCompare(a.title)).map((page) => (
                    <li key={page.slug} className={`my-8 w-[65%] ${page.title === "work mentality" || page.title === "study formation" ? "float-right" : "float-left"}`}>
                        <Link href={`/${page.slug}`} passHref>
                            <h1 className="flex items-baseline gap-2 text-black font-bold text-5xl"><ArrowIcon />{page.title}</h1>
                        </Link>
                        <h1 className="text-rose text-lg mt-5 ml-12">{page.description}</h1>
                    </li>
                ))}
            </ul>
        </>
    )
}
