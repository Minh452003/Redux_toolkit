import { InputCart } from '@/interfaces/cart';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cartApi = createApi({
    reducerPath: 'carts',
    tagTypes: ['Cart'],
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
        getCarts: builder.query<any, string>({
            query: (userId) => `/cart/${userId}`,
            providesTags: ['Cart']
        }),
        // 
        addCart: builder.mutation({
            query: ({ data, userId }: { data: InputCart; userId: string }) => ({
                url: `/cart/${userId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Cart']
        }),
        removeProductInCart: builder.mutation<any, { userId: string, productId: string }>({
            query: ({ userId, productId }) => ({
                url: `/cart/${userId}?idProduct=${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),

        changeQuantity: builder.mutation({
            query: ({ data, userId, productId }: { data: InputCart; userId: string, productId: string }) => ({
                url: `/cart/${userId}?idProduct=${productId}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Cart']
        }),
        removeAllCart: builder.mutation<any, string | number>({
            query: (userId) => ({
                url: `/cart/clear/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),
    })
});

export const {
    useGetCartsQuery,
    useAddCartMutation,
    useRemoveProductInCartMutation,
    useChangeQuantityMutation,
    useRemoveAllCartMutation
} = cartApi;
export const cartReducer = cartApi.reducer;
export default cartApi