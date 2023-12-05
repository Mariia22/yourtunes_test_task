import axios from 'axios'
import { createApi } from '@reduxjs/toolkit/query/react'
import { type ReleaseAvaType, type AxiosParams, type ReleaseType } from './types'
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
      }),
      getReleaseById: build.query<ReleaseAvaType, string>({
        query: (id) => ({
          url: '/release/realese_get_ava',
          method: 'get',
          params: id,
          headers: queryHeaders
        })
        // transformResponse: (response) => response.post,
      }),
      addRelease: build.mutation<ReleaseAvaType, FormData>({
        query: (file) => ({
          url: '/release/add',
          method: 'post',
          data: file,
          headers: queryHeaders
        })
      }),
      editRelease: build.mutation({
        query: () => ({
          url: '/release/release_update_ava',
          method: 'put',
          headers: queryHeaders
        })
      }),
      deleteRelease: build.mutation({
        query: () => ({
          url: '/release/release_delete',
          method: 'delete',
          headers: queryHeaders
        })
      })
    }
  }
})

export const {
  useGetAllReleasesQuery,
  useGetReleaseByIdQuery,
  useAddReleaseMutation,
  useEditReleaseMutation,
  useDeleteReleaseMutation
} = releaseApi
