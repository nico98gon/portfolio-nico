import Link from "next/link";
import Image from "next/image.js";

import { allPages } from "../.contentlayer/generated/index.mjs";
import experienceImage from "../public/img/sanity-blog-studio-caputre.png"
import mentality from "../public/img/work-mentality.jpg"
import stack from "../public/img/tech-stack.png"
import formation from "../public/img/study-formation.jpg"
import aspiration from "../public/img/personal-aspiration.png"


const pages = allPages;

const images = {
    mentality: mentality,
    stack: stack,
    formation: formation,
    aspiration: aspiration
}

export default function Titles() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 2xl:gap-12 mx-auto cursor-pointer">
            <div className="max-w-sm overflow-hidden relative duration-200 border rounded hover:bg-slate-200 md:gap-8 shadow-lg">
                <Link href="/experience" passHref>
                    <Image className="w-full h-40" src={experienceImage} alt=""></Image>
                    <div className="px-6 py-4">
                        <h1 className="font-bold text-2xl mb-2 text-gray-700">work experience</h1>
                        <p className="text-rose text-base">I invite you to explore into the projects I have been involved in over the past years, as they have been instrumental in developing both my technical and soft skills that I possess today</p>
                    </div>
                    <div className="h-full"></div>
                </Link>
            </div>

            {pages.sort((a, b) => b.title.localeCompare(a.title)).map((page) => (
                <div key={page.slug} className="max-w-sm overflow-hidden relative duration-200 border rounded hover:bg-slate-200 md:gap-8 shadow-lg">
                    <Link href={`/${page.slug}`} passHref>
                        <Image className="w-full h-40" src={images[page.slug as keyof typeof images]} alt=""></Image>
                        <div className="px-6 py-4">
                            <h1 className="font-bold text-2xl mb-2 text-gray-700">{ page.title }</h1>
                            <p className="text-rose text-base">{page.description}</p>
                        </div>
                        <div className="h-full"></div>
                    </Link>
                </div>
            ))}
        </div>
    )
}
