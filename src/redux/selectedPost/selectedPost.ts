import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { fetchPostById } from "../../utils/backend/endpoints"
import { IPost, ISelectedPostStore } from "../../types/posts"

const initialState: ISelectedPostStore = {
  postData: null,
  loading: false,
}

export const getSelectedPostData = createAsyncThunk("selectedPost/fetchPostById", async (postId: string) => await fetchPostById(postId))

export const selectedPostSlice = createSlice({
  name: "selectedPost",
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<IPost>) => {
      state.postData = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSelectedPostData.pending, state => {
        state.loading = true
      })
      .addCase(getSelectedPostData.fulfilled, (state, action) => {
        state.loading = false
        state.postData = action.payload
      })
  },
})

export const { setPostData } = selectedPostSlice.actions

export const selectedPostDataStore = (state: RootState) => state.selectedPost.postData
export const postsLoadingStore = (state: RootState) => state.selectedPost.loading

export default selectedPostSlice.reducer
