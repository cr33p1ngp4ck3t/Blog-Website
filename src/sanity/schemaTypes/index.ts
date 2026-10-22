import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import viewType from './viewType'
import {comparisonTableType} from './comparisonTableType'
import {prosConsType} from './prosConsType'
import {dealType} from './dealType'
import {resourceType} from './resourceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, resourceType, viewType, comparisonTableType, prosConsType, dealType],
}
