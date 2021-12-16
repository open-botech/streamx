import api from './index'
import http from '@/utils/request'

export function list(params) {
  return http.get(api.DataSource.LIST, {
    params: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function table(params) {
  return http.get(api.DataSource.TABLE, params)
}