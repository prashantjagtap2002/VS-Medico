import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gallery', title: 'Photo Gallery', type: 'document',
  preview: { prepare: () => ({ title: 'Photo Gallery' }) },
  fields: [
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'caption', media: 'image' } },
      }],
    }),
  ],
});
