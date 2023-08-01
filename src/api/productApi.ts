import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from './instance';
import { IProduct } from '@/interfaces/products';

export const getProducts = createAsyncThunk(
    'product/get',
    async () => {
        const data: any = await instance.get<IProduct[]>('/products');
        return data.docs

    }
)
export const getProductById = createAsyncThunk(
    'product/getbyid',
    async (id: number | string) => {
        const data = await instance.get<IProduct>(`/products/${id}`);
        return data

    }
)
export const addProduct = createAsyncThunk(
    'product/add',
    async (product: any) => {
        const data = await instance.post<IProduct>('/products', product);
        return data
    }
)
export const updateProduct = createAsyncThunk(
    'product/update',
    async (product: any) => {
        const data = await instance.patch<IProduct>(`/products/${product.id}`, product);
        return data
    }
)
export const removeProduct = createAsyncThunk(
    'product/delete',
    async (id: number) => {
        await instance.delete<IProduct>(`/products/${id}`);
        return id
    }
)