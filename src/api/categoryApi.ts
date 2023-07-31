import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from './instance';
import { ICategory } from '@/interfaces/category';

export const getCategories = createAsyncThunk(
    'category/get',
    async () => {
        const data = await instance.get('/categories');
        return data

    }
)
export const addCategory = createAsyncThunk(
    'category/add',
    async (category: ICategory) => {
        const data = await instance.post('/categories', category);
        return data
    }
)
export const updateCategory = createAsyncThunk(
    'category/update',
    async (category: ICategory) => {
        const data = await instance.patch(`/categories/${category._id}`, category);
        return data
    }
)
export const removeCategory = createAsyncThunk(
    'category/delete',
    async (id: number) => {
        await instance.delete(`/categories/${id}`);
        return id
    }
)