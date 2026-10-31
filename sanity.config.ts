import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { SINGLETON_TYPES, structure } from './sanity/structure';

// The Studio bundle only receives SANITY_STUDIO_* variables (from .env / .env.local),
// so NEXT_PUBLIC_* values are not visible here.
export default defineConfig({
  name: 'vs-medico',
  title: 'VS Medico Content Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Company Settings and Gallery are singletons: hide them from "Create new".
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action === 'publish' || action === 'discardChanges' || action === 'restore')
        : actions,
  },
});
