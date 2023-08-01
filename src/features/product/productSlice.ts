import { addProduct, getProductById, getProducts, removeProduct, updateProduct } from '@/api/productApi';
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
        // Fetch one
        builder.addCase(getProductById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProductById.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.products = [action.payload]; // Lưu sản phẩm tìm thấy vào mảng products

        })
        builder.addCase(getProductById.rejected, (state: any) => {
            state.isLoading = false
        })
        // Add
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addProduct.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.products.push(action.payload)
        })
        builder.addCase(addProduct.rejected, (state: any) => {
            state.isLoading = false
        })
        // Update
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateProduct.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const product = action.payload
            state.products = state.products.map((item: any) => item._id === product._id ? product : item)
        })
        builder.addCase(updateProduct.rejected, (state: any) => {
            state.isLoading = false
        })
        // Delete
        builder.addCase(removeProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeProduct.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const id = action.payload
            state.products = state.products.filter((product: any) => product._id != id)
        })
        builder.addCase(removeProduct.rejected, (state: any) => {
            state.isLoading = false
        })
    },
})

export const productReducer = productSlice.reducer;