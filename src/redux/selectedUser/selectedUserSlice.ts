import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { fetchUserPublicInfo } from "../../utils/backend/endpoints"
import { ISelectedUserStore } from "../../types/users"

const initialState: ISelectedUserStore = {
  publicData: null,
  loading: false,
}

export const getSelectedUserData = createAsyncThunk(
  "selectedUser/fetchUserPublicInfo",
  async (userId: string) => await fetchUserPublicInfo(userId)
)

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSelectedUserData.pending, state => {
        state.loading = true
      })
      .addCase(getSelectedUserData.fulfilled, (state, action) => {
        state.loading = false
        state.publicData = action.payload
      })
  },
})

export const selectedUserPublicDataStore = (state: RootState) => state.selectedUser.publicData
export const postsLoadingStore = (state: RootState) => state.selectedUser.loading

export default selectedUserSlice.reducer
