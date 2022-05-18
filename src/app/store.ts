import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import sectionSlice from '../features/section/sectionSlice'

export const store = configureStore({
  reducer: {
    section: sectionSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
