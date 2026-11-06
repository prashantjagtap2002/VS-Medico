import { defineCliConfig } from 'sanity/cli';

// The Sanity CLI loads .env / .env.local itself, so either variable name works here.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  // Hosted editor address: https://vs-medico.sanity.studio
  studioHost: 'vs-medico',
  deployment: { appId: 'iuqac2tp1jseb4urg3nvwzx2' },
});
