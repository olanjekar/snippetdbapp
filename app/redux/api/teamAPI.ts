import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TeamsState } from '../features/team-slice'
import { apiUrl } from '@/app/config/config'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/api`,credentials:"include" }),
  endpoints: (builder) => ({
    creatNewTeam: builder.mutation({
      query: (body:TeamsState) => {
        return {
            url:"/snippet/createNewTeam",
            method:"post",
            body
        }
      }
    }),
    signUpUser: builder.mutation({
        query: (body:{name:string,email:string,password:string}) => {
          return {
              url:"/api/signUp",
              method:"post",
              body
          }
        }
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreatNewTeamMutation } = teamApi