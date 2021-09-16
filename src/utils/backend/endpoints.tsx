import { AxiosResponse } from "axios"
import { IUser } from "../../types/users"
import { ILoginCredentials } from "../../views/Login/Login"
import backend from "./backend"

export const refreshTokens = async () => {
  const { data } = await backend.post("/auth/refreshTokens")
  return data
}

export const fetchMe = async () => {
  const { data }: AxiosResponse<IUser> = await backend("/users/me")
  return data
}

export const loginUser = async (credentials: ILoginCredentials) => {
  const { data }: AxiosResponse = await backend.post("/auth/login", credentials)
  return data
}

export const googleLogin = async () => {
  const { data }: AxiosResponse = await backend("/auth/googleLogin")
  return data
}

export const logoutUser = async () => {
  const { data }: AxiosResponse = await backend("/auth/logout")
  return data
}
