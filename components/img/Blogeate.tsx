import Image from "next/image";

import sanityStudio from "../../public/img/sanity-blog-studio-caputre.png";
import sanity from "../../public/img/sanity-blog.png";
import sanityPost from "../../public/img/sanity-blog-post.png";


export default function Blogeate() {
    return (
        <>
            <Image className="mt-24 mr-[-250px]" src={sanityStudio} width={600} height={600} alt="blogeate page image" quality={100} />
            <Image className="z-10" src={sanity} width={600} height={600} alt="blogeate page image" quality={100} />
            <Image className="mt-24 ml-[-275px]" src={sanityPost} width={600} height={600} alt="blogeate page image" quality={100} />
        </>
    )
}