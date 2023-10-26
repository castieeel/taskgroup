import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type iProduct, type iLogin, type iToken } from '../models'

export const fakeStoreApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com'
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getProducts: builder.query < iProduct[], { categories: string } >({
      query: (param) => {
        const { categories } = param
        return {
          url: `/products/category/${categories}`
        }
      }
    }),
    authUser: builder.mutation< iToken, { bodyLog: iLogin } >({
      query: (param) => {
        const { bodyLog } = param
        return {
          url: '/auth/login',
          method: 'POST',
          body: bodyLog
        }
      }
    })
  })
})

export const { useLazyGetProductsQuery, useAuthUserMutation } = fakeStoreApi
