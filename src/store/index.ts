
import userApi, { userReducer } from "@/api/authApi";
import cartApi, { cartReducer } from "@/api/cartApi";
import categoryApi, { categoryReducer } from "@/api/categoryApi";
import commentApi, { commentReducer } from "@/api/commentApi";
import productApi, { productReducer } from "@/api/productApi";
import { uploadReducer } from "@/features/upload/uploadSlice";
import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: [''],

}
const rootReducer = combineReducers({
    products: productReducer,
    categories: categoryReducer,
    uploads: uploadReducer,
    users: userReducer,
    comments: commentReducer,
    carts: cartReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const additionalMiddlewares: any = [
    productApi.middleware,
    categoryApi.middleware,
    userApi.middleware,
    commentApi.middleware,
    cartApi.middleware
];

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...additionalMiddlewares),
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default persistStore(store);
