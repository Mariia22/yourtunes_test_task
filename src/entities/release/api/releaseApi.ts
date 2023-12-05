import axios from 'axios'
import { createApi } from '@reduxjs/toolkit/query/react'
import { type AxiosParams, type ReleaseType } from './types'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError } from 'axios'
import { queryHeaders } from '../../../shared/api'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<AxiosParams, unknown, unknown> =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers
        })
        return { data: result.data }
      } catch (axiosError) {
        const err = axiosError as AxiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data ?? err.message
          }
        }
      }
    }

export const releaseApi = createApi({
  reducerPath: 'releaseAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://dev-api-v2.yourtunes.net/api/v2'
  }),
  endpoints (build) {
    return {
      getAllReleases: build.query<ReleaseType[], void>({
        query: () => ({
          url: '/release/list',
          method: 'get',
          headers: queryHeaders
        }),
        transformResponse: (rawResult: { result: ReleaseType[] }) => {
          return rawResult.result
        }
      })
      // mutation: build.mutation({
      //   query: () => ({ url: '/mutation', method: 'post' }),
      // }),
    }
  }
})

export const { useGetAllReleasesQuery } = releaseApi
