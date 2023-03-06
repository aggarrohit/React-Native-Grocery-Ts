// import {createStore} from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import rootReducer from './reducers/index'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from "@reduxjs/toolkit"
import { CartItemsSlice } from './features/CartItemSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { WishlistItemsSlice } from "./features/WishlistSlice";

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage
//   }


  // const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:{
    cartItems:CartItemsSlice.reducer,
    wishlistItems:WishlistItemsSlice.reducer
  }
})

export const useAppDispatch:()=>typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector

// export const store=createStore(persistedReducer)
// export const persistor = persistStore(store)

