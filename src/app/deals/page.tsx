import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface Deal {
  title: string;
  description: string;
  link: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  brand: string;
}

const getDeals = async () => {
  const query = `*[_type == "deal"] {
    title,
    description,
    link,
    image,
    brand
  }`;

  const deals = await client.fetch(query);
  return deals;
};

export const metadata: Metadata = {
  title: "Top Deals",
  description: "The best deals on financial products and services.",
};

export default async function DealsPage() {
  const deals: Deal[] = await getDeals();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Top Deals
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We&apos;ve curated the best deals on financial products and services to help you save money.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((deal) => (
          <Link key={deal.title} href={deal.link} target="_blank" rel="noopener noreferrer" className="border rounded-lg overflow-hidden block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Image
              src={urlFor(deal.image).url()}
              alt={deal.title}
              width={400}
              height={200}
              className="object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{deal.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{deal.description}</p>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  {deal.brand}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
