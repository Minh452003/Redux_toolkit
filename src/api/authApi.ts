import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from './instance';
import { IUser } from '@/interfaces/auth';

export const getUsers = createAsyncThunk(
    'auth/get',
    async () => {
        try {
            const data = await instance.get<IUser[]>('/user');
            return data
        } catch (error) {
            console.log(error);

        }


    }
)
export const getUserById = createAsyncThunk(
    'auth/getbyid',
    async (id: number | string) => {
        const data = await instance.get<IUser>(`/user/${id}`);
        return data

    }
)
export const signIn = createAsyncThunk(
    'auth/signin',
    async (user: IUser) => {
        const data = await instance.post<IUser>('/signin', user);
        return data
    }
)
export const signUp = createAsyncThunk(
    'auth/signup',
    async (user: IUser) => {
        const data = await instance.post<IUser>('/signup', user);
        return data
    }
)
export const updateUser = createAsyncThunk(
    'auth/update',
    async (user: IUser) => {
        const data = await instance.patch<IUser>(`/user/${user._id}`, user);
        return data
    }
)
export const removeUser = createAsyncThunk(
    'auth/delete',
    async (id: | string) => {
        await instance.delete<IUser>(`/user/${id}`);
        return id
    }
)