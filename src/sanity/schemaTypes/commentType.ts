import { defineField, defineType } from "sanity";

export const commentType = defineType({
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "comment",
            title: "Comment",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "post",
            title: "Post",
            type: "reference",
            to: [{ type: "post" }],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "comment",
        },
    },
});