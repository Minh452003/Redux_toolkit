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
// Trong file api.ts (hoặc instance.ts) của bạn

export const updateImage = createAsyncThunk(
    "image/update",
    async ({ publicId, files }: { publicId: string, files: any }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            if (Array.isArray(files)) {
                files.forEach((file, index) => {
                    formData.append(`images[${index}]`, file);
                });
            } else {
                formData.append("images", files);
            }

            const response = await instance.put(`/images/${publicId}`, formData, {
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

