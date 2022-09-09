import qs from 'qs'
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { IP_API_URL } from '@/constants/config'
import { extractRehydrationInfo } from './shared'

export type IpData = {
  ip: string
}

const staggeredBaseQuery = retry(
  fetchBaseQuery({ baseUrl: IP_API_URL }),
  { maxRetries: 5 },
)

const ipApi = createApi({
  reducerPath: 'ipApi',
  baseQuery: staggeredBaseQuery,
  extractRehydrationInfo,
  endpoints: (builder) => ({
    getIp: builder.query<IpData, void>({
      query: () => ({
        url: qs.stringify({ format: 'json' }, { addQueryPrefix: true }),
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetIpQuery } = ipApi
export const { endpoints: { getIp } } = ipApi
export default ipApi
