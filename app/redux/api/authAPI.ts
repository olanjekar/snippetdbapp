import { apiUrl } from '@/app/config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}`,credentials:"include" }),
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: (body:{email:string,password:string}) => {
        return {
            url:"/api/auth/signIn",
            method:"post",
            body
        }
      }
    }),
    signUpUser: builder.mutation({
        query: (body:{name:string,email:string,password:string}) => {
          return {
              url:"/api/auth/signUp",
              method:"post",
              body
          }
        }
      }),
      activateUser: builder.mutation({
        query: (body:{jwtToken:string}) => {
          return {
              url:"/api/auth/activateRegisterUser",
              method:"post",
              body
          }
        }
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignInUserMutation,useSignUpUserMutation ,useActivateUserMutation} = authApi