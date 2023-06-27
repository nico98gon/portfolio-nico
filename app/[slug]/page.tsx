import { notFound } from "next/navigation";

import { allPages } from "contentlayer/generated";
import { Header } from "../../components/Header";
import { Mdx } from "../../components/mdx";


type Props = {
    params: {
        slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allPages
		.map((p) => ({
			slug: p.slug,
		}));
}

export default function page({ params }: Props) {
    const slug = params?.slug;
    const foundPage = allPages.find((page) => page.slug === slug);

    if (!foundPage) {
		notFound();
	}

    return (
        <div className="bg-zinc-50 min-h-screen">
            <Header page={foundPage} />

            <article className="px-4 py-12 max-w-7xl mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={foundPage.body.code} />
			</article>
        </div>
    )
}
