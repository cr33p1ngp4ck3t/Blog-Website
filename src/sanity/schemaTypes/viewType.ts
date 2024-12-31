import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'view',
  type: 'document',
  title: 'Post View',
  fields: [
    defineField({
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
      title: 'Post',
      description: 'The post this view is associated with',
    }),
    defineField({
      name: 'views',
      type: 'number',
      title: 'Views',
      initialValue: 0,
    }),
    defineField({
      name: 'viewedAt',
      type: 'datetime',
      title: 'Viewed At',
      initialValue: new Date().toISOString(),
    }),
  ],
});
