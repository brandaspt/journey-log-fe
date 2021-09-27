import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IUserStore } from "../../types/users"
import { fetchMe, fetchMyPhotos, fetchMyPosts, logoutUser, toggleFollowUser } from "../../utils/backend/endpoints"

const initialState: IUserStore = {
  profile: null,
  myPosts: [],
  myPhotos: [],
  loading: false,
  error: "",
}

export const getUserDataAction = createAsyncThunk("user/fetchMe", async () => await fetchMe())
export const getMyPostsAction = createAsyncThunk("posts/fetchMyPosts", async () => await fetchMyPosts())
export const getMyPhotosAction = createAsyncThunk("posts/fetchMyPhotos", async () => await fetchMyPhotos())
export const logoutUserAction = createAsyncThunk("user/logout", async () => await logoutUser())
export const toggleFollowUserAction = createAsyncThunk("user/toggleFollowUser", async (userToFollowId: string) => {
  await toggleFollowUser(userToFollowId)
  return await fetchMe()
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserDataAction.pending, state => {
        state.loading = true
      })
      .addCase(getUserDataAction.fulfilled, (state, action) => {
        state.loading = false
        state.error = ""
        state.profile = action.payload
      })
      .addCase(getUserDataAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || ""
        state.profile = null
      })
      .addCase(getMyPostsAction.pending, state => {
        state.loading = true
      })
      .addCase(getMyPostsAction.fulfilled, (state, action) => {
        state.loading = false
        state.myPosts = action.payload
      })
      .addCase(getMyPhotosAction.pending, state => {
        state.loading = true
      })
      .addCase(getMyPhotosAction.fulfilled, (state, action) => {
        state.loading = false
        state.myPhotos = action.payload
      })
      .addCase(logoutUserAction.pending, state => {
        state.loading = true
      })
      .addCase(logoutUserAction.fulfilled, state => {
        state.loading = false
        state.profile = null
        state.myPosts = []
        state.error = ""
      })
      .addCase(toggleFollowUserAction.fulfilled, (state, action) => {
        if (state.profile) state.profile.following = action.payload.following
      })
  },
})

export const userProfileStore = (state: RootState) => state.user.profile
export const userMyPostsStore = (state: RootState) => state.user.myPosts
export const userMyPhotosStore = (state: RootState) => state.user.myPhotos
export const userFollowingStore = (state: RootState) => state.user.profile?.following
export const userLoadingStore = (state: RootState) => state.user.loading
export const userErrorStore = (state: RootState) => state.user.error

export default userSlice.reducer
