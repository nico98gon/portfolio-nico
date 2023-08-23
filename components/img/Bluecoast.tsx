import Image from "next/image";

import bluecoast from "../../public/img/bluecoast.png";


export default function Bluecoast() {
    return (
        <Image src={bluecoast} width={800} height={800} alt="bluecoast page image" quality={100} />
    )
}