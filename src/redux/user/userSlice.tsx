import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IUserStore } from "../../types/users"
import { fetchMe } from "../../utils/backend/endpoints"

const initialState: IUserStore = {
  data: null,
  loading: false,
  error: "",
}

export const getUserData = createAsyncThunk("user/getMe", async () => await fetchMe())

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutAction: state => {
      state.data = null
      state.loading = false
      state.error = ""
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.pending, state => {
        state.loading = true
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false
        state.error = ""
        state.data = action.payload
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || ""
        state.data = null
      })
  },
})

export const { logoutAction } = userSlice.actions

export const userDataStore = (state: RootState) => state.user.data
export const userLoadingStore = (state: RootState) => state.user.loading
export const userErrorStore = (state: RootState) => state.user.error

export default userSlice.reducer
