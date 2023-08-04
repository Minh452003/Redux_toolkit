import { IUser } from '@/interfaces/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'users',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => '/user',
            providesTags: ['User']
        }),
        getUserById: builder.query<IUser, number>({
            query: (id) => `/user/${id}`,
            providesTags: ['User']
        }),
        // 
        signIn: builder.mutation({
            query: (user: IUser) => ({
                url: '/signin',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        signUp: builder.mutation({
            query: (user: IUser) => ({
                url: '/signup',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        // 
        removeUser: builder.mutation<IUser, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (user: IUser) => ({
                url: `/user/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['User']
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useSignInMutation,
    useSignUpMutation,
    useRemoveUserMutation,
    useUpdateUserMutation
} = userApi;
export const userReducer = userApi.reducer;
export default userApi