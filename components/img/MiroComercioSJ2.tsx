import Image from "next/image";

import miro2 from "../../public/img/miro-comerciosj2.png";


export default function MiroComercioSJ2() {
    return (
        <Image src={miro2} width={900} height={600} alt="miro functionalities tree" quality={100} />
    )
}
