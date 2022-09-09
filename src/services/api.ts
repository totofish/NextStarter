import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import type { ServerData } from '@/pages/api/server-date'
import { BASE_URL } from '@/constants/config'
import { extractRehydrationInfo } from './shared'

const staggeredBaseQuery = retry(
  fetchBaseQuery({ baseUrl: `${BASE_URL}/api/` }),
  { maxRetries: 3 },
)

const api = createApi({
  reducerPath: 'api',
  baseQuery: staggeredBaseQuery,
  extractRehydrationInfo,
  tagTypes: ['Date'],
  endpoints: (builder) => ({
    getDate: builder.query<ServerData, void>({
      query: () => 'server-date',
      // extraOptions: { maxRetries: 0 },
      keepUnusedDataFor: 2,
      providesTags: ['Date'],
    }),
  }),
})

export const { useGetDateQuery, useLazyGetDateQuery } = api
export const { endpoints: { getDate } } = api
export default api
