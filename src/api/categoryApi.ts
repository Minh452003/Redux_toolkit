import { ICategory } from '@/interfaces/category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: 'categories',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            // Thêm logic xử lý headers ở đây nếu cần
            const accessToken = JSON.parse(localStorage.getItem('accessToken')!);
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },

    }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => '/categories',
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<ICategory, number | string>({
            query: (id) => `/categories/${id}`,
            providesTags: ['Category']
        }),
        // 
        addCategory: builder.mutation({
            query: (category: ICategory) => ({
                url: '/categories',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        removeCategory: builder.mutation<ICategory, number>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: (category: ICategory) => ({
                url: `/categories/${category.id}`,
                method: 'PATCH',
                body: category
            }),
            invalidatesTags: ['Category']
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useRemoveCategoryMutation,
    useUpdateCategoryMutation
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi