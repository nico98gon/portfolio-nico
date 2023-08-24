import Image from "next/image";

import documentation from "../../public/img/mibot-documentation.png";
import cornix from "../../public/img/cornix-activation.png";


export default function MiBotDocumentation() {
    return (
        <>
            {/* <Image src={documentation} width={800} height={800} alt="MiBot documentation image" quality={100} />
            <Image src={cornix} width={800} height={800} alt="Cornix activation image" quality={100} /> */}
            <div className="flex flex-col">
                <Image src={documentation} layout="responsive" alt="MiBot documentation image" quality={100} />
                <Image src={cornix} layout="responsive" alt="Cornix activation image" quality={100} />
            </div>
        </>
    )
}