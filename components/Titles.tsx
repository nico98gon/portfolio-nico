import Link from "next/link";

import { ArrowIcon } from "./icons";


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
                <li className="my-8 w-[65%] float-right">
                    <Link href="/formation" passHref>
                        <h1 className="flex items-baseline gap-2 text-black font-bold text-5xl"><ArrowIcon />study formation</h1>
                    </Link>
                    <h1 className="text-rose text-lg mt-5 ml-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse tempore dicta doloribus amet non harum, iste neque! Placeat id assumenda maxime magni vel reiciendis rem perferendis hic aut nostrum?</h1>
                </li>
                <li className="my-8 w-[65%] float-left">
                    <Link href="/mentality" passHref>
                        <h1 className="flex items-baseline gap-2 text-black font-bold text-5xl"><ArrowIcon />work mentality</h1>
                    </Link>
                    <h1 className="text-rose text-lg mt-5 ml-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse tempore dicta doloribus amet non harum, iste neque! Placeat id assumenda maxime magni vel reiciendis rem perferendis hic aut nostrum?</h1>
                </li>
                <li className="my-8 w-[65%] float-right">
                    <Link href="/stack" passHref>
                        <h1 className="flex items-baseline gap-2 text-black font-bold text-5xl"><ArrowIcon />technology stack</h1>
                    </Link>
                    <h1 className="text-rose text-lg mt-5 ml-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse tempore dicta doloribus amet non harum, iste neque! Placeat id assumenda maxime magni vel reiciendis rem perferendis hic aut nostrum?</h1>
                </li>
                <li className="my-8 w-[65%] float-left">
                    <Link href="/aspiration" passHref>
                        <h1 className="flex items-baseline gap-2 text-black font-bold text-5xl"><ArrowIcon />personal aspiration</h1>
                    </Link>
                    <h1 className="text-rose text-lg mt-5 ml-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse tempore dicta doloribus amet non harum, iste neque! Placeat id assumenda maxime magni vel reiciendis rem perferendis hic aut nostrum?</h1>
                </li>
            </ul>
        </>
    )
}
