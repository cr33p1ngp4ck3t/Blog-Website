import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

// Read-only client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token, 
  useCdn: false, 
})
