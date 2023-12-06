import axios from 'axios'
import { createApi } from '@reduxjs/toolkit/query/react'
import { type ReleaseAvaType, type AxiosParams, type ReleaseType } from './types'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError } from 'axios'
import { queryHeaders } from '../../../shared/api/api'

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
  tagTypes: ['Release', 'UpdateRelease', 'DeleteRelease'],
  endpoints (build) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      getAllReleases: build.query<ReleaseType[], void>({
        query: () => ({
          url: '/release/list',
          method: 'get',
          headers: queryHeaders
        }),
        transformResponse: (rawResult: { result: ReleaseType[] }) => {
          return rawResult.result
        },
        providesTags: (result) => ['Release', 'UpdateRelease', 'DeleteRelease']
      }),
      getReleaseById: build.query<string, Record<'uid', string | undefined>>({
        query: (id) => ({
          url: '/release/get_ava',
          method: 'post',
          params: id,
          headers: queryHeaders
        }),
        transformResponse: (rawResult: { result: ReleaseAvaType }): string => {
          return rawResult.result.ava_link
        },
        providesTags: (result) => ['UpdateRelease']
      }),
      addRelease: build.mutation<ReleaseAvaType, FormData>({
        query: (file) => ({
          url: '/release/add',
          method: 'post',
          data: file,
          headers: queryHeaders
        }),
        invalidatesTags: ['Release']
      }),
      editRelease: build.mutation<ReleaseAvaType, FormData>({
        query: (file) => ({
          url: '/release/update_ava',
          method: 'post',
          data: file,
          headers: queryHeaders
        }),
        invalidatesTags: ['UpdateRelease']
      }),
      deleteRelease: build.mutation<Record<'uid', string>, Record<'uid', string>>({
        query: (uid) => ({
          url: '/release/delete',
          method: 'post',
          data: uid,
          headers: queryHeaders
        }),
        invalidatesTags: ['DeleteRelease']
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
