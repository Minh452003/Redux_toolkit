import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from './instance';

export const getProducts = createAsyncThunk(
    'product/get',
    async () => {
        const data: any = await instance.get('/products');
        return data.docs

    }
)
export const addProduct = createAsyncThunk(
    'product/add',
    async (product: any) => {
        const data = await instance.post('/products', product);
        return data
    }
)
export const updateProduct = createAsyncThunk(
    'product/update',
    async (product: any) => {
        const data = await instance.patch(`/products/${product._id}`, product);
        return data
    }
)
export const removeProduct = createAsyncThunk(
    'product/delete',
    async (id: number) => {
        await instance.delete(`/products/${id}`);
        return id
    }
)