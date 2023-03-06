import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { Cartitem } from "../../interfaces/CartItem"


  interface CartItemsState{
    cartItems:Cartitem[]
  }

const initialState:CartItemsState = {
    cartItems: []
}

export const CartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        ReplaceCartItems:(state,action:PayloadAction<{cartItems:Cartitem[]}>) =>{
            state.cartItems = action.payload.cartItems
        }
    }
})

export default CartItemsSlice.reducer;
export const {ReplaceCartItems}=CartItemsSlice.actions