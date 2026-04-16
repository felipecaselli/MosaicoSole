import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemas'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Store Factory',

  projectId: 'ste8q9xb',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: structure,
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'product-by-store',
        title: 'Product by Store',
        schemaType: 'product',
        parameters: [{ name: 'storeId', type: 'string' }],
        value: (params) => ({
          store: { _type: 'reference', _ref: params.storeId }
        })
      }
    ]
  },
})
