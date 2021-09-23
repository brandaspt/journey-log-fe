import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { fetchSelectedUserPhotos } from "../../utils/backend/endpoints"
import { IPhotosStore } from "../../types/photos"

const initialState: IPhotosStore = {
  selectedUserPhotos: [],
  loading: false,
}

export const getSelectedUserPhotosAction = createAsyncThunk(
  "posts/fetchSelectedUserPhotos",
  async (userId: string) => await fetchSelectedUserPhotos(userId)
)

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSelectedUserPhotosAction.pending, state => {
        state.loading = true
      })
      .addCase(getSelectedUserPhotosAction.fulfilled, (state, action) => {
        state.loading = false
        state.selectedUserPhotos = action.payload
      })
  },
})

export const selectedUserPhotosStore = (state: RootState) => state.photos.selectedUserPhotos
export const photosLoadingStore = (state: RootState) => state.photos.loading

export default photosSlice.reducer
