import Link from "next/link";
import { allProjects } from "contentlayer/generated";
import { Redis } from "@upstash/redis";
import { ArrowLeft, Eye } from "lucide-react";

import { Article } from "./article";
import { Card } from "../../components/card.tsx";



const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function page() {

    const views = (
        await redis.mget<number[]>(
            ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
        )
    ).reduce((acc, v, i) => {
        acc[allProjects[i].slug] = v ?? 0;
        return acc;
    }, {} as Record<string, number>);

    const featured = allProjects.find(
        (project) => project.slug === "comercioSJ",
    )!;
    const top2 = allProjects.find((project) => project.slug === "blogeate")!;
    const top3 = allProjects.find((project) => project.slug === "nicogon")!;
    const noCode1 = allProjects.find((project) => project.slug === "MiBot")!;
    const noCode2 = allProjects.find((project) => project.slug === "MiningGPU")!;
    const noCode3 = allProjects.find((project) => project.slug === "ServerCloudGPU")!;
    const sorted = allProjects
        // .filter((p) => p.published)
        .filter(
            (project) =>
                project.slug !== featured.slug &&
                project.slug !== top2.slug &&
                project.slug !== top3.slug &&
                project.slug !== noCode1.slug &&
                project.slug !== noCode2.slug &&
                project.slug !== noCode3.slug,
        )
        .sort(
            (a, b) =>
                new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );
    const sortedNoCode = allProjects
        // .filter((p) => p.published)
        .filter(
            (project) =>
                project.slug === noCode1.slug ||
                project.slug === noCode2.slug ||
                project.slug === noCode3.slug,
        )
        .sort(
            (a, b) =>
                new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

    return (
        <section className="bg-black">
            <div className="relative pb-16">
                <div className="px-6 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16">
                    <Link href="/" className="duration-200 text-zinc-300 hover:text-zinc-100">
                        <ArrowLeft className="w-6 h-6 mt-6" />
                    </Link>
                    <h1 className="text-white font-bold text-5xl font-sans mt-8 ml-16">My work experience</h1>
                    <h2 className="text-white text-3xl font-bold tracking-tight sm:text-4xl">
                        Code projects
                    </h2>
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <p className="mt-4 text-zinc-400">
                            Software development projects with learning and business goals
                        </p>
                    </div>
                    <div className="w-full h-px bg-zinc-800" />
    
                    <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
                        <Card>
                            <Link href={`/experience/${featured.slug}`} prefetch={false}>
                                <article className="relative h-full w-full z-10 p-4 md:p-8">
                                    <div className="flex justify-between gap-2 items-center">
                                        <div className="text-xs text-zinc-100">
                                            {featured.date ? (
                                                <time dateTime={new Date(featured.date).toISOString()}>
                                                    {Intl.DateTimeFormat(undefined, {
                                                        dateStyle: "medium",
                                                    }).format(new Date(featured.date))}
                                                </time>
                                            ) : (
                                                <span>SOON</span>
                                            )}
                                        </div>
                                        <span className="text-rose text-xs  flex items-center gap-1">
                                            <Eye className="w-4 h-4" />{" "}
                                            {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                                                views[featured.slug] ?? 0,
                                            )}
                                        </span>
                                    </div>
    
                                    <h2
                                        id="featured-post"
                                        className="mt-4 text-3xl font-bold  text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                                    >
                                        {featured.title}
                                    </h2>
                                    <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                                        {featured.description}
                                    </p>
                                    <div className="absolute bottom-4 md:bottom-8">
                                    <p className="text-zinc-200 hover:text-zinc-50 hidden lg:block">
                                            Read more <span aria-hidden="true">&rarr;</span>
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        </Card>

                        <div className="flex flex-col w-full  gap-8 mx-auto border-t border-gray-900/10  lg:mx-0  lg:border-t-0 ">
                            {[top2, top3].map((project) => (
                                <Card key={project.slug}>
                                    <Article project={project} views={views[project.slug] ?? 0} />
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="hidden w-full h-px md:block bg-zinc-800" />

                    <div className="grid  grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
                        <div className="grid grid-cols-1 gap-4">
                            {sorted
                                .filter((_, i) => i % 3 === 0)
                                .map((project) => (
                                    <Card key={project.slug}>
                                        <Article project={project} views={views[project.slug] ?? 0} />
                                    </Card>
                                ))}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {sorted
                                .filter((_, i) => i % 3 === 1)
                                .map((project) => (
                                    <Card key={project.slug}>
                                        <Article project={project} views={views[project.slug] ?? 0} />
                                    </Card>
                                ))}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {sorted
                                .filter((_, i) => i % 3 === 2)
                                .map((project) => (
                                    <Card key={project.slug}>
                                        <Article project={project} views={views[project.slug] ?? 0} />
                                    </Card>
                                ))}
                        </div>
                    </div>

                    <div className="w-full h-px bg-zinc-800" />

                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-white text-3xl font-bold tracking-tight sm:text-4xl">
                            No code projects
                        </h2>
                        <p className="mt-4 text-zinc-400">
                            Software no code and hardware projects with business goals
                        </p>
                    </div>

                    <div className="w-full h-px bg-zinc-800" />

                    <div className="grid  grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
                        <div className="grid grid-cols-1 gap-4">
                            {sortedNoCode
                                .filter((_, i) => i % 3 === 0)
                                .map((project) => (
                                    <Card key={project.slug}>
                                        <Article project={project} views={views[project.slug] ?? 0} />
                                    </Card>
                                ))}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {sortedNoCode
                                .filter((_, i) => i % 3 === 1)
                                .map((project) => (
                                    <Card key={project.slug}>
                                        <Article project={project} views={views[project.slug] ?? 0} />
                                    </Card>
                                ))}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {sortedNoCode
                                .filter((_, i) => i % 3 === 2)
                                .map((project) => (
                                    <Card key={project.slug}>
                                        <Article project={project} views={views[project.slug] ?? 0} />
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
