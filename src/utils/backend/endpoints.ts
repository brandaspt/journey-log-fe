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

export const newPost = async (formData: FormData) => {
  const { data }: AxiosResponse = await backend.post("/posts", formData)
  return data
}

export const fetchMyPosts = async () => {
  const { data }: AxiosResponse = await backend(`/posts/me`)
  return data
}

export const fetchSelectedUserPosts = async (userId: string) => {
  const { data }: AxiosResponse = await backend(`/posts/${userId}`)
  return data
}

export const fetchMyPhotos = async () => {
  const { data }: AxiosResponse = await backend(`/photos/me`)
  return data
}
export const fetchSelectedUserPhotos = async (userId: string) => {
  const { data }: AxiosResponse = await backend(`/photos/${userId}`)
  return data
}
export const uploadPhotos = async (formData: FormData) => {
  const { data }: AxiosResponse = await backend.post(`/photos`, formData)
  return data
}

export const searchUsers = async (query: string) => {
  const { data }: AxiosResponse = await backend(`/users/search?q=${query}`)
  return data
}
