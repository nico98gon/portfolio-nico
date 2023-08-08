import Image from "next/image";

import miro from "../../public/img/miro-comerciosj.png";


export default function MiroComercioSJ() {
    return (
        <Image src={miro} width={900} height={600} alt="miro functionalities tree" quality={100} />
    )
}
