import { addImage } from '@/api/uploadApi'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    images: [],
    isLoading: false,
    error: ''
} as { images: any, isLoading: boolean, error: string }

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Add
        builder.addCase(addImage.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.images.push(action.payload)
        })
        // // Update
        // builder.addCase(updateProduct.fulfilled, (state: any, action: any) => {
        //     state.isLoading = false
        //     const product = action.payload
        //     state.products = state.products.map((item: any) => item.id === product.id ? product : item)
        // })
        // // Delete
        // builder.addCase(removeProduct.fulfilled, (state: any, action: any) => {
        //     state.isLoading = false
        //     const id = action.payload
        //     state.products = state.products.filter((product: any) => product.id != id)
        // })
    },
})

export const uploadReducer = imageSlice.reducer;