import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import type { Resource } from "@/sanity/types";
export const revalidate = 60;
export const metadata: Metadata = {
  title: "Useful money resources",
  description:
    "Official tools to check benefits, report scams, review credit reports, verify deposit insurance, and save on home energy.",
  alternates: { canonical: "/deals" },
};
export default async function DealsPage() {
  const resources = await client.fetch<Resource[]>(
    '*[_type == "resource" && archived != true && url match "https://*"] | order(order asc, title asc){_id, title, organization, description, url}',
    {}, { next: { revalidate: 60 } },
  );
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">THE USEFUL LINKS</span>
        <h1>
          A good place
          <br />
          <span>to go next.</span>
        </h1>
        <p>
          Official resources, practical tools, and a little less searching
          around. These links are free to visit and are not paid placements.
        </p>
      </div>
      <div className="resource-list">
        {resources.map((resource) => (
          <a
            key={resource._id}
            className="resource"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="section-label">{resource.organization}</span>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <ArrowUpRight size={24} />
          </a>
        ))}
      </div>
      {!resources.length && <p className="empty-state">Find current assistance through <a className="text-link" href="https://www.usa.gov/benefits">USAGov’s official benefits directory →</a>.</p>}
    </main>
  );
}
