import Image from "next/image";

import domestika from "../../public/img/domestika-creative-code-bruno-imbrizi.png";
import leerob from "../../public/img/leerob-portfolio.webp";
import chronark from "../../public/img/chronark-portfolio.webp";


export default function PortfolioInspirations () {
    return (
        <>
            <Image className="mt-24 mr-[-250px]" src={domestika} width={550} height={600} alt="miro functionalities tree" quality={100} />
            <Image className="z-10" src={leerob} width={700} height={600} alt="miro functionalities tree" quality={100} />
            <Image className="mt-24 ml-[-200px]" src={chronark} width={500} height={600} alt="miro functionalities tree" quality={100} />
        </>
    )
}