import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

export const resourceType = defineType({
  name: "resource",
  title: "Useful resource",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "organization", title: "Provider", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (Rule) => Rule.required().max(300) }),
    defineField({ name: "url", title: "Official link", type: "url", validation: (Rule) => Rule.required().uri({ scheme: ["https"] }) }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: "archived", type: "boolean", initialValue: false, description: "Hide this resource from the public list." }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "organization" } },
});
