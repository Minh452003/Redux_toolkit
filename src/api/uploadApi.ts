import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./instance";

export const addImage = createAsyncThunk(
    "image/add",
    async (files: any, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            if (Array.isArray(files)) {
                files.forEach((file, index) => {
                    formData.append(`images[${index}]`, file);
                });
            } else {
                formData.append("images", files);
            }

            const response = await instance.post("/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response;

        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
