"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Deal } from "@/sanity/types";
import Image from "next/image";

export default function ComparePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedDeals, setSelectedDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const query = `*[_type == "deal"] {
        _id,
        title,
        description,
        link,
        image,
        brand,
        features
      }`;
      const data = await client.fetch(query);
      setDeals(data);
    };

    fetchDeals();
  }, []);

  const handleSelectDeal = (deal: Deal) => {
    setSelectedDeals((prevSelectedDeals) => {
      if (prevSelectedDeals.find((d) => d._id === deal._id)) {
        return prevSelectedDeals.filter((d) => d._id !== deal._id);
      } else {
        return [...prevSelectedDeals, deal];
      }
    });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Compare Deals
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select up to 3 deals to compare their features side-by-side.
        </p>
      </div>
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {deals.map((deal) => (
          <div
            key={deal._id}
            className={`p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 ${
              selectedDeals.find((d) => d._id === deal._id)
                ? "border-blue-500"
                : "border-transparent"
            }`}
            onClick={() => handleSelectDeal(deal)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={urlFor(deal.image)}
                alt={deal.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              {deal.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {deal.description}
            </p>
          </div>
        ))}
      </div>
      {selectedDeals.length > 0 && (
        <div className="mt-12 md:mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Comparison
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b dark:border-gray-700">Feature</th>
                  {selectedDeals.map((deal) => (
                    <th key={deal._id} className="py-2 px-4 border-b dark:border-gray-700">
                      {deal.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b dark:border-gray-700 font-semibold">Brand</td>
                  {selectedDeals.map((deal) => (
                    <td key={deal._id} className="py-2 px-4 border-b dark:border-gray-700">
                      {deal.brand}
                    </td>
                  ))}
                </tr>
                {Array.from(new Set(selectedDeals.flatMap(deal => deal.features?.map(f => f.name))))
                  .map((featureName, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b dark:border-gray-700 font-semibold">{featureName}</td>
                      {selectedDeals.map((deal) => (
                        <td key={deal._id} className="py-2 px-4 border-b dark:border-gray-700">
                          {deal.features?.find(f => f.name === featureName)?.value || '-'}
                        </td>
                      ))}
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
