import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { number } from "yup"
import apiSlice from "../api/apiSlice"
import { RootState } from "../store"

interface CartItem {
    count: number
    productInfo: any
}

interface Cart {
    items: CartItem[],
    totalCount: number
}

const initialState: Cart = {
    totalCount: 0,
    items: []
}

// const cartApi = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         setUserCart: builder.mutation<void, {userId: string, cart: any}>({
//             query: ({ userId, cart }) => {
//                 url: `v1/cart/${userId}`
//             }А
//         })
//     })
// })

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItem>) => {
            state.totalCount += action.payload.count
            state.items.push(action.payload)
        },
        modifyProduct: (state, action: PayloadAction<CartItem>) => {
            state.items = state.items.map(item => {
                if (item.productInfo.id === action.payload.productInfo.id) {
                    return { ...item, ...action.payload }
                }
                return item
            })
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.productInfo.id !== action.payload)
        }
    }
})

export const { addProduct, modifyProduct, deleteProduct } = cartSlice.actions


export const getCart = (state: RootState) => state.items
// export const getCartProductById = (state: RootState, id) => state.items.find(item => item.id === id)
export default cartSlice.reducer