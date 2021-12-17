import api from './index'
import http from '@/utils/request'

export function list(params) {
  return http.get(api.DataSource.LIST, params)
}

export function table(params) {
  return http.get(api.DataSource.TABLE, params)
}