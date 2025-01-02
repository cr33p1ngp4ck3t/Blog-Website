import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Read-only client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Fast Data (Cached): true
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.NEXT_PRIVATE_SANITY_TOKEN, 
  useCdn: false, // Accurate Data
})
