import Image from "next/image";

import tShape from "../img/T-shape.jpg";


export default function Tshape() {
    return (
        <Image src={tShape} width={800} height={800} alt="T-shaped diagram" />
    )
}
