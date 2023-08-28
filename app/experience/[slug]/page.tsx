export const dynamic = 'force-dynamic'

import { notFound } from "next/navigation";

import { allProjects } from "contentlayer/generated";
import { Mdx } from "../../../components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const project = allProjects.find((project) => project.slug === slug);

	console.log('slug', slug);
	console.log('project', project);

	if (!project) {
		notFound();
	}

	const views =
		(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} views={views} />
			<ReportView slug={project.slug} />

			<article className="px-8 md:px-16 lg:px-4 py-16 max-w-5xl mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}