"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface TocEntry {
	_key: string;
	text: string;
	level: number;
}

interface Block {
	_key: string;
	style?: string;
	children: { text: string }[];
}

interface TableOfContentsProps {
	body: Block[];
}

export default function TableOfContents({ body }: TableOfContentsProps) {
	const headings = body
		.filter((block) => block.style && ["h1", "h2", "h3"].includes(block.style))
		.map((block) => {
			const text = block.children.map((child: { text: string }) => child.text).join("");
			return {
				_key: block._key,
				text,
				level: Number(block.style!.replace("h", "")),
			};
		});

	if (headings.length === 0) {
		return null;
	}

	return (
		<div className="sticky top-24 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
			<h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
				Table of Contents
			</h2>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger className="text-gray-900 dark:text-white">
						On this page
					</AccordionTrigger>
					<AccordionContent>
						<ul className="space-y-2">
							{headings.map((heading: TocEntry) => (
								<li
									key={heading._key}
									className={
										heading.level === 2
											? "pl-4"
											: heading.level === 3
												? "pl-8"
												: ""
									}
								>
									<a
										href={`#${heading.text.toLowerCase().replace(/ /g, "-")}`}
										className="block py-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
									>
										{heading.text}
									</a>
								</li>
							))}
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
