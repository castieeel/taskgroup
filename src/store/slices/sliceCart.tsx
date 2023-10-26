import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type iProduct } from '../../models'

export interface iCart {
  arrayProduct: iProduct
  quantity: number
}

interface CartState {
  list: iCart[]
  totalPrice: number
  totalProducts: number
}

const initialState: CartState = {
  list: [],
  totalPrice: 0,
  totalProducts: 0
}

export const sliceCart = createSlice({
  name: 'sliceCart',
  initialState,
  reducers: {
    getProduct: (state, action: PayloadAction<iProduct>) => {
      const existingIndex = state.list.findIndex(({ arrayProduct }) =>
        arrayProduct?.id === action.payload.id
      )

      if (existingIndex >= 0) {
        state.list[existingIndex].quantity++
      } else {
        state.list.push({
          arrayProduct: action.payload,
          quantity: 1
        })
      }

      state.totalPrice = state.list
        .map((item) => item.arrayProduct.price * item.quantity)
        .reduce((acc, cur) => acc + cur, 0)

      state.totalProducts = state.list
        .map((item) => item.quantity)
        .reduce((acc, cur) => acc + cur, 0)
    },
    deleteProduct: (state, action: PayloadAction<iProduct>) => {
      const { id } = action.payload

      for (let i = 0; i < state.list.length; i++) {
        const existingIndex = state
          .list
          .findIndex(product => product.arrayProduct.id === id)

        if (existingIndex > -1) {
          state.list.splice(existingIndex, 1)
        }
      }

      state.totalPrice = state.list
        .map((item) => item.arrayProduct.price * item.quantity)
        .reduce((acc, cur) => acc + cur, 0)

      state.totalProducts = state.list
        .map((item) => item.quantity)
        .reduce((acc, cur) => acc + cur, 0)
    }
  }
})

export const { getProduct, deleteProduct } = sliceCart.actions
export default sliceCart.reducer
