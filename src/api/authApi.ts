// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { instance } from './instance';
// import { IUser } from '@/interfaces/auth';

// export const getUsers = createAsyncThunk(
//     'auth/get',
//     async () => {
//         try {
//             const data = await instance.get<IUser[]>('/user');
//             return data
//         } catch (error) {
//             console.log(error);

//         }


//     }
// )
// export const getUserById = createAsyncThunk(
//     'auth/getbyid',
//     async (id: number | string) => {
//         const data = await instance.get<IUser>(`/user/${id}`);
//         return data

//     }
// )
// export const signIn = createAsyncThunk(
//     'auth/signin',
//     async (user: IUser) => {
//         const data = await instance.post<IUser>('/signin', user);
//         return data
//     }
// )
// export const signUp = createAsyncThunk(
//     'auth/signup',
//     async (user: IUser) => {
//         const data = await instance.post<IUser>('/signup', user);
//         return data
//     }
// )
// export const updateUser = createAsyncThunk(
//     'auth/update',
//     async (user: IUser) => {
//         const data = await instance.patch<IUser>(`/user/${user._id}`, user);
//         return data
//     }
// )
// export const removeUser = createAsyncThunk(
//     'auth/delete',
//     async (id: | string) => {
//         await instance.delete<IUser>(`/user/${id}`);
//         return id
//     }
// )

// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { instance } from './instance';
// import { IUser } from '@/interfaces/User';

// export const getCategories = createAsyncThunk(
//     'User/get',
//     async () => {
//         const data = await instance.get('/categories');
//         return data

//     }
// )
// export const addUser = createAsyncThunk(
//     'User/add',
//     async (User: IUser) => {
//         const data = await instance.post('/categories', User);
//         return data
//     }
// )
// export const updateUser = createAsyncThunk(
//     'User/update',
//     async (User: IUser) => {
//         const data = await instance.patch(`/categories/${User._id}`, User);
//         return data
//     }
// )
// export const removeUser = createAsyncThunk(
//     'User/delete',
//     async (id: number) => {
//         await instance.delete(`/categories/${id}`);
//         return id
//     }
// )


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