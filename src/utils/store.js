import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from 'redux'

//import rootReducer from './reducers'
const persistConfig = {
    timeout: 500,
    key: 'root',
    storage
  };



  const persistProductReducer = persistReducer(persistConfig, productSlice);

  export const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        allproducts: persistProductReducer
    }
  });

  export const persistedStore = persistStore(store);
  
// const store = configureStore({
//     reducer: {
//         cart: cartSlice,
//         wishlist: wishlistSlice,
//         allproducts: persistedReducer
//     }
// });

//export default store;