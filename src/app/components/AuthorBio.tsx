import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";

interface AuthorBioProps {
	author: {
		name: string;
		image: {
			asset: string;
		};
		bio: PortableTextBlock[];
	};
}

export default function AuthorBio({ author }: AuthorBioProps) {
	return (
		<div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
			<Image
				src={author.image ? urlFor(author.image.asset).auto("format").url() : "/loader.svg"}
				alt={author.name}
				width={80}
				height={80}
				className="rounded-full"
			/>
			<div>
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					{author.name}
				</h3>
				<div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-400">
					<PortableText value={author.bio} />
				</div>
			</div>
		</div>
	);
}
