
import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";
import modalReducer from "@/redux/features/modal/modalSlice"
import showTradeInReducer from '@/redux/features/tradeIn/showTradeInSlice'
import sellProductSlice from '@/redux/features/sell/SellProductSlice'
import questionReducer from '@/redux/features/questions/QuestionSlice'


export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,

    modal: modalReducer,
    showTradeInData: showTradeInReducer,
    sellProduct: sellProductSlice,
    questionSlice: questionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

// export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;