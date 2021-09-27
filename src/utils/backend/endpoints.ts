import { AxiosResponse } from "axios"
import { IPhoto } from "../../types/photos"
import { IPost } from "../../types/posts"
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

export const loginUser = async (credentials: ILoginCredentials) => await backend.post("/auth/login", credentials)

export const logoutUser = async () => await backend("/auth/logout")

export const newPost = async (formData: FormData) => {
  const { data }: AxiosResponse<IPost> = await backend.post("/posts", formData)
  return data
}

export const fetchMyPosts = async () => {
  const { data }: AxiosResponse<IPost[]> = await backend(`/posts/me`)
  return data
}

export const fetchSelectedUserPosts = async (userId: string) => {
  const { data }: AxiosResponse<IPost[]> = await backend(`/posts/${userId}`)
  return data
}

export const fetchMyPhotos = async () => {
  const { data }: AxiosResponse<IPhoto[]> = await backend(`/photos/me`)
  return data
}
export const fetchSelectedUserPhotos = async (userId: string) => {
  const { data }: AxiosResponse<IPhoto[]> = await backend(`/photos/${userId}`)
  return data
}
export const uploadPhotos = async (formData: FormData) => await backend.post(`/photos`, formData)

export const searchUsers = async (query: string) => {
  const { data }: AxiosResponse<IUser[]> = await backend(`/users/search?q=${query}`)
  return data
}
export const toggleFollowUser = async (userToFollowId: string) => await backend.post(`/users/toggleFollow`, { userId: userToFollowId })
