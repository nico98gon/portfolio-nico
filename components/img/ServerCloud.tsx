import Image from "next/image";

import server from "../../public/img/CloudRig.jpg";


export default function ServerCloud() {
    return (
        <Image src={server} width={800} height={800} alt="bluecoast page image" quality={100} />
    )
}