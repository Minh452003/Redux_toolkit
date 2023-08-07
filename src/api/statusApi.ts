import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const statusApi = createApi({
    reducerPath: 'status',
    tagTypes: ['Status'],
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
        getStatus: builder.query<any, void>({
            query: () => `/status`,
            providesTags: ['Status']
        }),

    })
});

export const {
    useGetStatusQuery
} = statusApi;
export const statusReducer = statusApi.reducer;
export default statusApi