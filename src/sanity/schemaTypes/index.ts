import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {commentType} from './commentType'
import viewType from './viewType'
import {comparisonTableType} from './comparisonTableType'
import {prosConsType} from './prosConsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, commentType, viewType, comparisonTableType, prosConsType],
}
