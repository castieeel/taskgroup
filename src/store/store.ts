import { configureStore } from '@reduxjs/toolkit'
import { fakeStoreApi } from '../services/api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import sliceReducer from '../store/slices/sliceCart'
import userReducer from './slices/sliceUser'

export const store = configureStore({
  reducer: {
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    sliceCart: sliceReducer,
    userData: userReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([fakeStoreApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
