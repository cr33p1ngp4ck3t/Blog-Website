'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

if (!projectId || !dataset) {
  throw new Error(
    'Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET'
  );
}

export default defineConfig({
  name: 'finaid-hub',
  title: 'FinAid Hub editorial',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { ...schema, templates: (templates) => templates.filter((template) => !['view', 'deal'].includes(template.schemaType)) },
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
});
