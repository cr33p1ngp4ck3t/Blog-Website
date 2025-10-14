import {defineType, defineField, defineArrayMember} from 'sanity'

export const prosConsType = defineType({
  name: 'prosCons',
  title: 'Pros & Cons',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
})
