import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { RequestType, RequestConfig, ResponseType } from './types'
import { interceptorRequesthandler } from './interceptor'

const instance: AxiosInstance = axios.create({
  baseURL: '',
  // 添加默认默认header
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

instance.interceptors.request.use(interceptorRequesthandler.onFulfilled, interceptorRequesthandler.onRejected)
instance.interceptors.response.use()

const request: RequestType = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    const mergedConfig = {
      ...config,
      ...requestConfig,
      headers: {
        ...config.headers,
        ...requestConfig?.headers
      }
    }
    try {
      const response: AxiosResponse<T, RequestConfig> = await instance.request<T>(mergedConfig)
      const { data } = response
      return { err: null, data, response } as unknown as ResponseType<T>
    } catch (err: any) {
      return { err, data: null, response: null } as unknown as ResponseType<T>
    }
  }
}

export default request

// use
//import makeRequest from '../request';
// export default {
//   '/admins': makeRequest<{ admins: string[] }>({
//     url: '/admins',
//   }),
//   '/delay': makeRequest({
//     url: '/delay',
//   }),
//   '/500-error': makeRequest({
//     url: '/500-error',
//   }),
//   '/account/{username}': makeRequest<
//     { id: string; name: string; role: string },
//     undefined,
//     undefined,
//     { username: string }
//   >({
//     url: '/account/{username}',
//   }),
// };

// import apis from './api';
// const getAdmins = async () => {
//   const { err, data } = await apis['/admins']();
//   if (err) return;
//   setAdmins(data!.admins);
// };