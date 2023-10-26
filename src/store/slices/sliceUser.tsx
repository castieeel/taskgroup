import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface iUser {
  authorized: boolean
}

const initialState: iUser = {
  authorized: false
}

export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => ({
      ...state,
      authorized: action.payload
    })
  }
})

export const { setLogin } = userData.actions
export default userData.reducer
