import { IProduct, ProductResponse } from '@/interfaces/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const productApi = createApi({
    reducerPath: 'products',
    tagTypes: ['Product'],
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
        getProducts: builder.query<any, void>({
            query: () => '/products',
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, number>({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        // 
        addProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<IProduct, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: `/products/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        searchProduct: builder.query({
            query: (searchValue: string) => ({
                url: `/products/?q=${searchValue}`,
                providesTags: ['Product']
            })
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useRemoveProductMutation,
    useUpdateProductMutation,
    useSearchProductQuery
} = productApi;
export const productReducer = productApi.reducer;
export default productApi