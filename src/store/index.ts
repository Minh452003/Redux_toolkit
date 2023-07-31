
import { categoryReducer } from "@/features/category/categorySlice";
import { productReducer } from "@/features/product/productSlice";
import { uploadReducer } from "@/features/upload/uploadSlice";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        uploads: uploadReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default store