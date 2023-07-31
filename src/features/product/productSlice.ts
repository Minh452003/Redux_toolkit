import { addProduct, getProducts, removeProduct, updateProduct } from '@/api/productApi';
import { IProduct } from '@/interfaces/products';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    isLoading: false,
    error: ''
} as { products: IProduct[], isLoading: boolean, error: string }

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Fetch
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.products = action.payload
        })
        builder.addCase(getProducts.rejected, (state: any) => {
            state.isLoading = false
        })
        // Add
        builder.addCase(addProduct.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.products.push(action.payload)
        })
        // Update
        builder.addCase(updateProduct.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const product = action.payload
            state.products = state.products.map((item: any) => item.id === product.id ? product : item)
        })
        // Delete
        builder.addCase(removeProduct.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const id = action.payload
            state.products = state.products.filter((product: any) => product.id != id)
        })
    },
})

export const productReducer = productSlice.reducer;