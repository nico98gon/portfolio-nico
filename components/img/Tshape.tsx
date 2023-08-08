import Image from "next/image";

import tShape from "../../public/img/T-shape.jpg";


export default function Tshape() {
    return (
        <Image src={tShape} width={600} height={600} alt="T-shaped diagram" quality={100} />
    )
}
