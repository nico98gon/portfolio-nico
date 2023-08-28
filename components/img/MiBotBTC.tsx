import Image from "next/image";

import BTC from "../../public/img/btc.png";


export default function MiBotBTC() {
    return (
        <>
            <Image src={BTC} width={900} height={600} alt="MiBot BTC trading graphic" quality={100} />
        </>
    )
}