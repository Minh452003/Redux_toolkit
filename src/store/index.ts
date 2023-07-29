// import { CartReducer } from '@/reducer/cart';
// import { CounterReducer } from '@/reducer/counter'
// import { productReducer } from '@/reducer/products';
// import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'

// const composeEnhancers =
//     typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//             // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
//         })
//         : compose;

// const enhancer = composeEnhancers(
//     applyMiddleware(thunk),
//     // other store enhancers if any
// );


// const rootStore = combineReducers({
//     count: CounterReducer,
//     products: productReducer,
//     carts: CartReducer
// })

// const store = createStore(rootStore, enhancer);

// export default store



import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {

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