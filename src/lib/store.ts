import { configureStore } from '@reduxjs/toolkit'
import modalReducer from "@/lib/features/modal/modalSlice"
import  showTradeInReducer from './features/tradeIn/showTradeInSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
      showTradeInData: showTradeInReducer 
    }
  }) 
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
