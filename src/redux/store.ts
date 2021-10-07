import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import selectedPostSlice from "./selectedPost/selectedPost"
import selectedUserSlice from "./selectedUser/selectedUserSlice"
import userSlice from "./user/userSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    selectedUser: selectedUserSlice,
    selectedPost: selectedPostSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
