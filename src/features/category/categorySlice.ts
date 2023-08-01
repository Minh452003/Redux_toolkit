import { addCategory, getCategories, removeCategory, updateCategory } from '@/api/categoryApi';
import { ICategory } from '@/interfaces/category';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    isLoading: false,
    error: ''
} as { categories: ICategory[], isLoading: boolean, error: string }

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Fetch
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.categories = action.payload
        })
        builder.addCase(getCategories.rejected, (state: any) => {
            state.isLoading = false
        })
        // Add
        builder.addCase(addCategory.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addCategory.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.categories.push(action.payload)
        })
        builder.addCase(addCategory.rejected, (state: any) => {
            state.isLoading = false
        })
        // Update
        builder.addCase(updateCategory.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateCategory.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const category = action.payload
            state.categories = state.categories.map((item: any) => item.id === category.id ? category : item)
        })
        builder.addCase(updateCategory.rejected, (state: any) => {
            state.isLoading = false
        })
        // Delete
        builder.addCase(removeCategory.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeCategory.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const id = action.payload
            state.categories = state.categories.filter((category: any) => category.id != id)
        })
        builder.addCase(removeCategory.rejected, (state: any) => {
            state.isLoading = false
        })
    },
})

export const categoryReducer = categorySlice.reducer;