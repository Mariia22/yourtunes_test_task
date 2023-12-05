import { type AxiosRequestConfig } from 'axios'

export interface ReleaseType {
  created_at: string
  updated_at: string
  uid: string
  upc: string
  avalink: string
  name: string
  main_singers: string[]
  type: string
  public_date: string
  status: number
  code: string
  questions_adit: null
  deleted_status_date: null
}

export interface AxiosParams {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

export interface ReleaseAvaType {
  uid: string
  ava_link: string
}
