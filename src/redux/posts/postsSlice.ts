import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { fetchSelectedUserPosts } from "../../utils/backend/endpoints"
import { IPostsStore } from "../../types/posts"

const initialState: IPostsStore = {
  selectedUserPosts: [],
  loading: false,
}

export const getSelectedUserPostsAction = createAsyncThunk(
  "posts/fetchSelectedUserPosts",
  async (userId: string) => await fetchSelectedUserPosts(userId)
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSelectedUserPostsAction.pending, state => {
        state.loading = true
      })
      .addCase(getSelectedUserPostsAction.fulfilled, (state, action) => {
        state.loading = false
        state.selectedUserPosts = action.payload
      })
  },
})

export const selectedUserPostsStore = (state: RootState) => state.posts.selectedUserPosts
export const postsLoadingStore = (state: RootState) => state.posts.loading

export default postsSlice.reducer
