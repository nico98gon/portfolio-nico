import Image from "next/image";

import community from "../../public/img/mibot-telegram-community.png";
import bots from "../../public/img/mibot-bots.png";
import channel from "../../public/img/mibot-free-channel.png";


export default function MiBotCommunity () {
    return (
        <>
            <Image className="mt-24 mr-[-250px]" src={community} width={550} height={600} alt="MiBot Telegram community image" quality={100} />
            <Image className="z-10" src={bots} width={800} height={600} alt="MiBot telegram bots image" quality={100} />
            <Image className="mt-24 ml-[-200px]" src={channel} width={500} height={600} alt="MiBot free channel image" quality={100} />
        </>
    )
}