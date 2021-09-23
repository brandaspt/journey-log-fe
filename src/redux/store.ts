import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import photosSlice from "./photos/photosSlice"
import postsSlice from "./posts/postsSlice"
import userSlice from "./user/userSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
    photos: photosSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
