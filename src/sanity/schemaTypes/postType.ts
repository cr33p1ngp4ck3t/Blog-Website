import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Article", default: true },
    { name: "discovery", title: "Discovery & SEO" },
    { name: "editorial", title: "Editorial" },
  ],
  fields: [
    defineField({
      name: "title",
      group: "content",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      group: "discovery",
      description: "Keep published slugs stable so existing links keep working.",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "excerpt",
      group: "discovery",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "seoDescription",
      group: "discovery",
      title: "SEO description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "readingTime",
      group: "discovery",
      title: "Reading time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({ name: "featured", type: "boolean", group: "discovery", initialValue: false }),
    defineField({ name: "imageUrl", title: "Fallback image URL", type: "url", group: "content" }),
    defineField({
      name: "keyTakeaways",
      title: "Key takeaways",
      type: "array",
      group: "content",
      description: "Three to five short, practical points shown before the article.",
      of: [defineArrayMember({ type: "string", validation: (Rule) => Rule.required().max(240) })],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "faqs",
      title: "Reader questions",
      type: "array",
      group: "content",
      of: [defineArrayMember({
        name: "faq",
        type: "object",
        fields: [
          defineField({ name: "question", type: "string", validation: (Rule) => Rule.required().max(200) }),
          defineField({ name: "answer", type: "text", rows: 3, validation: (Rule) => Rule.required().max(1200) }),
        ],
        preview: { select: { title: "question", subtitle: "answer" } },
      })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "relatedPosts",
      title: "Recommended next reads",
      type: "array",
      group: "discovery",
      description: "Choose up to three guides. Topic matches fill any remaining spaces.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }], options: {
        filter: ({ document }) => ({
          filter: "archived != true && _id != $id && _id != $draftId",
          params: { id: document._id.replace(/^drafts\./, ""), draftId: document._id },
        }),
      } })],
      validation: (Rule) => Rule.max(3).unique(),
    }),
    defineField({
      name: "sources",
      group: "editorial",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "author",
      group: "editorial",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      group: "content",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "categories",
      group: "discovery",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      group: "editorial",
      type: "datetime",
      description: "Future dates keep the article off the public site until that time.",
    }),
    defineField({
      name: "body",
      group: "content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "views",
      type: "number",
      title: "Views",
      initialValue: 0,
      readOnly: true,
      hidden: true,
      deprecated: { reason: "Use Vercel Analytics for traffic; legacy view counts are no longer updated." },
    }),
    defineField({
      name: "reviewedAt", title: "Last fact-checked", type: "date", group: "editorial",
      description: "Set this only after checking the article against its sources.",
      validation: (Rule) => Rule.custom((value) => !value || value <= new Date().toISOString().slice(0, 10) || "Review date cannot be in the future."),
    }),
    defineField({
      name: "reviewDueAt", title: "Next review due", type: "date", group: "editorial",
      description: "Used by the Review due queue in Studio.",
    }),
    defineField({
      name: "archived", title: "Archive article", type: "boolean", group: "editorial", initialValue: false,
      description: "Hide from feeds, search, related reading, and the sitemap. Existing article links continue to work with an archive notice.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      archived: "archived",
      featured: "featured",
    },
    prepare(selection) {
      const { author, archived, featured } = selection;
      return { ...selection, subtitle: [archived ? "Archived" : featured ? "Featured" : "Guide", author && `by ${author}`].filter(Boolean).join(" · ") };
    },
  },
});
