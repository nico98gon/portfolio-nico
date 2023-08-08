import Image from "next/image";

import trello from "../../public/img/trello-comerciosj.png";


export default function TrelloComercioSJ() {
    return (
        <Image src={trello} width={800} height={600} alt="miro functionalities tree" quality={100} />
    )
}