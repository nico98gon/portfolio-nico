import Image from "next/image";

import domestika from "../../public/img/domestika-creative-code-bruno-imbrizi.png";
import leerob from "../../public/img/leerob-portfolio.webp";
import chronark from "../../public/img/chronark-portfolio.webp";


export default function PortfolioInspirations () {
    return (
        <>
            <Image className="mt-24 mr-[-250px]" src={domestika} width={550} height={600} alt="domestika course image" quality={100} />
            <Image className="z-10" src={leerob} width={700} height={600} alt="leerob page image" quality={100} />
            <Image className="mt-24 ml-[-200px]" src={chronark} width={500} height={600} alt="chronark page image" quality={100} />
        </>
    )
}