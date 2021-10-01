import { AxiosResponse } from "axios"
import { IPhoto } from "../../types/photos"
import { IPost } from "../../types/posts"
import { IPublicUserData, IUser } from "../../types/users"
import { ILoginCredentials } from "../../views/Login/Login"
import backend from "./backend"

// AUTH
export const refreshTokens = async () => {
  const { data } = await backend.post("/auth/refreshTokens")
  return data
}
export const loginUser = async (credentials: ILoginCredentials) => await backend.post("/auth/login", credentials)
export const logoutUser = async () => await backend("/auth/logout")

// USERS
export const fetchMe = async () => {
  const { data }: AxiosResponse<IUser> = await backend("/users/me")
  return data
}
export const fetchMyPosts = async () => {
  const { data }: AxiosResponse<IPost[]> = await backend(`/users/myPosts`)
  return data
}
export const fetchMyPhotos = async () => {
  const { data }: AxiosResponse<IPhoto[]> = await backend(`/users/myPhotos`)
  return data
}
export const fetchUserPublicInfo = async (userId: string) => {
  const { data }: AxiosResponse<IPublicUserData> = await backend(`/users/${userId}/publicInfo`)
  return data
}
export const fetchSelectedUserPosts = async (userId: string) => {
  const { data }: AxiosResponse<IPost[]> = await backend(`/users/${userId}/publicPosts`)
  return data
}
export const fetchSelectedUserPhotos = async (userId: string) => {
  const { data }: AxiosResponse<IPhoto[]> = await backend(`/users/${userId}/publicPhotos`)
  return data
}
export const searchUsers = async (query: string) => {
  const { data }: AxiosResponse<IUser[]> = await backend(`/users/search?q=${query}`)
  return data
}
export const toggleFollowUser = async (userToFollowId: string) => await backend.post(`/users/toggleFollow`, { userId: userToFollowId })

// POSTS
export const newPost = async (formData: FormData) => {
  const { data }: AxiosResponse<IPost> = await backend.post("/posts", formData)
  return data
}
export const fetchPostById = async (postId: string) => {
  const { data }: AxiosResponse<IPost> = await backend(`/posts/${postId}`)
  return data
}
export const deletePost = async (postId: string) => await backend.delete(`/posts/${postId}`)
export const addPhotos = async (postId: string, formData: FormData) => await backend.put(`/posts/${postId}/addPhotos`, formData)
export const editPost = async (postId: string, payload: { title?: string; description?: string }) =>
  await backend.put(`/posts/${postId}`, payload)

// PHOTOS
export const uploadPhotos = async (formData: FormData) => await backend.post(`/photos`, formData)
export const deletePhoto = async (photoId: string) => await backend.delete(`/photos/${photoId}`)
