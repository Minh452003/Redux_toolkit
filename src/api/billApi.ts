import { IBill } from '@/interfaces/bill';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const billApi = createApi({
    reducerPath: 'bills',
    tagTypes: ['Bill'],
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
        getBills: builder.query<IBill[], void>({
            query: () => `/bills`,
            providesTags: ['Bill']
        }),
        getBillsByUser: builder.query<IBill[], void>({
            query: (userId) => `/bills/${userId}`,
            providesTags: ['Bill']
        }),
        getBillById: builder.query<IBill, string | number>({
            query: (id) => `/bill/${id}`,
            providesTags: ['Bill']
        }),
        // 
        createBill: builder.mutation({
            query: (bill: IBill) => ({
                url: '/bills',
                method: 'POST',
                body: bill
            }),
            invalidatesTags: ['Bill']
        }),
        removeBill: builder.mutation<IBill, string | number>({
            query: (id) => ({
                url: `/bills/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Bill']
        }),
        updateStatus: builder.mutation({
            query: (order) => ({
                url: `/bills/${order.id}`,
                method: 'PATCH',
                body: order
            }),
            invalidatesTags: ['Bill']
        }),
    })
});

export const {
    useGetBillsByUserQuery,
    useGetBillByIdQuery,
    useCreateBillMutation,
    useRemoveBillMutation,
    useGetBillsQuery,
    useUpdateStatusMutation
} = billApi;
export const billReducer = billApi.reducer;
export default billApi