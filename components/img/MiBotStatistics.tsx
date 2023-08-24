import Image from "next/image";

import sheet from "../../public/img/mibot-statistics.png";
import statistics2 from "../../public/img/mibot-statistics-telegram-2.png";
import statistics1 from "../../public/img/mibot-statistics-telegram-1.png";
import statistics3 from "../../public/img/mibot-statistics-telegram-3.png";

export default function MiBotStatistics () {
    return (
        <>
            {/* <div className="flex flex-col">
                <Image src={sheet} width={800} height={800} alt="MiBot Google sheet statistic image" quality={100} />
            </div> */}
            <Image className="mt-24 mr-[-100px]" src={statistics2} width={400} height={600} alt="MiBot statistic telegram 2 image" quality={100} />
            <Image className="z-10" src={statistics3} width={500} height={600} alt="MiBot statistic telegram 3 image" quality={100} />
            <Image className="mt-24 ml-[-60px]" src={statistics1} width={400} height={600} alt="MiBot statistic telegram 1 image" quality={100} />
        </>
    )
}