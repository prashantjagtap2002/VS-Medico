import type { StructureResolver } from 'sanity/structure';

/** One fixed document each; the website reads these IDs at build time. */
export const SINGLETONS = [
  { id: 'companySettings', title: 'Company Settings' },
  { id: 'gallery', title: 'Photo Gallery' },
] as const;

export const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.id));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem().title(s.title).id(s.id).child(S.document().schemaType(s.id).documentId(s.id).title(s.title)),
      ),
      S.divider(),
      S.documentTypeListItem('product').title('Medicines & Products'),
    ]);
