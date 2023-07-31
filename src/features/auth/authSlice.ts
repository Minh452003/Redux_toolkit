import { getUsers, removeUser, signIn, signUp, updateUser } from '@/api/authApi';
import { IUser } from '@/interfaces/auth';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    isLoading: false,
    error: ''
} as { users: IUser[], isLoading: boolean, error: string }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Fetch
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUsers.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.users = action.payload
        })
        builder.addCase(getUsers.rejected, (state: any) => {
            state.isLoading = false
        })
        // Signin
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true

        })
        builder.addCase(signIn.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            state.users.push(action.payload)
        })
        builder.addCase(signIn.rejected, (state: any) => {
            state.isLoading = false
        })
        // Signin
        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(signUp.fulfilled, (state: any) => {
            state.isLoading = false
        })
        builder.addCase(signUp.rejected, (state: any) => {
            state.isLoading = false
        })
        // Update
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const user = action.payload
            state.users = state.users.map((item: any) => item.id === user.id ? user : item)
        })
        builder.addCase(updateUser.rejected, (state: any) => {
            state.isLoading = false
        })
        // Delete
        builder.addCase(removeUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeUser.fulfilled, (state: any, action: any) => {
            state.isLoading = false
            const id = action.payload
            state.users = state.users.filter((user: any) => user.id != id)
        })
        builder.addCase(removeUser.rejected, (state: any) => {
            state.isLoading = false
        })
    },
})

export const userReducer = userSlice.reducer;