import Image from "next/image";

import comerciosanjuan from "../../public/img/comerciosanjuan.png";


export default function ComercioSanJuanComp() {
    return (
        <Image src={comerciosanjuan} width={900} height={600} alt="here is a comercio san juan home page image" quality={100} />
    )
}
