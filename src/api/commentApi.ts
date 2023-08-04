import { IComment } from '@/interfaces/comment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentApi = createApi({
    reducerPath: 'comments',
    tagTypes: ['Comment'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            // Thêm logic xử lý headers ở đây nếu cần
            const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getComments: builder.query<any, void>({
            query: () => '/comment',
            providesTags: ['Comment']
        }),
        getCommentById: builder.query<IComment, string | number>({
            query: (id) => `/comment/${id}`,
            providesTags: ['Comment']
        }),
        addComment: builder.mutation<IComment, IComment>({
            query: (comment) => ({
                url: '/comment',
                method: 'POST',
                body: comment
            }),
            invalidatesTags: ['Comment']
        }),
        removeComment: builder.mutation<IComment, number | string>({
            query: (id) => ({
                url: `/comment/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Comment']
        }),
        updateComment: builder.mutation<IComment, IComment>({
            query: (comment) => ({
                url: `/comment/${comment.id}`,
                method: 'PATCH',
                body: comment
            }),
            invalidatesTags: ['Comment']
        })
    })
});

export const {
    useGetCommentsQuery,
    useGetCommentByIdQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useRemoveCommentMutation
} = commentApi;
export const commentReducer = commentApi.reducer;
export default commentApi