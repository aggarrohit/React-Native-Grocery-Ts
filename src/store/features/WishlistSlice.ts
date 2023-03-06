import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { Cartitem } from "./CartItemSlice"

  interface WishlistItemsState{
    wishlistItems:Cartitem[]
  }

const initialState:WishlistItemsState = {
    wishlistItems: []
}

export const WishlistItemsSlice = createSlice({
    name: 'wishlistItems',
    initialState,
    reducers: {
        ReplaceWishlistItems:(state,action:PayloadAction<{wishlistItems:Cartitem[]}>) =>{
            state.wishlistItems = action.payload.wishlistItems
        }
    }
})

export default WishlistItemsSlice.reducer;
export const {ReplaceWishlistItems}=WishlistItemsSlice.actions