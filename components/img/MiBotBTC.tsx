import Image from "next/image";

import BTC from "../../public/img/BTC.PNG";


export default function MiBotBTC() {
    return (
        <>
            <Image src={BTC} width={900} height={600} alt="MiBot BTC trading graphic" quality={100} />
        </>
    )
}