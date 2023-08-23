import Image from "next/image";

import farm from "../../public/img/farm.jpg";


export default function Farm() {
    return (
        <Image src={farm} width={800} height={800} alt="bluecoast page image" quality={100} />
    )
}
