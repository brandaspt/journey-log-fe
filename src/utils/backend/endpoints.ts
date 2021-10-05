import { AxiosResponse } from "axios"
import { IPhoto } from "../../types/photos"
import { IPost } from "../../types/posts"
import { IPublicUserData, IUser } from "../../types/users"
import { ILoginCredentials } from "../../views/Login/Login"
import { IUpdateUserDetails } from "../../views/MyProfile/MyProfile"
import { IRegisterDetails } from "../../views/Register/Register"
import backend from "./backend"

// AUTH
export const refreshTokens = async () => {
  const { data } = await backend.post("/auth/refreshTokens")
  return data
}
export const loginUser = async (credentials: ILoginCredentials) => await backend.post("/auth/login", credentials)
export const logoutUser = async () => {
  const { data } = await backend("/auth/logout")
  return data
}
export const registerUser = async (payload: IRegisterDetails) => await backend.post("/auth/register", payload)

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
export const searchUsers = async (query: string) => {
  const { data }: AxiosResponse<IUser[]> = await backend(`/users/search?q=${query}`)
  return data
}
export const toggleFollowUser = async (userToFollowId: string) => await backend.post(`/users/toggleFollow`, { userId: userToFollowId })
export const emailExists = async (email: string) => {
  const { data } = await backend.post(`/users/checkEmail`, { email })
  return data
}
export const updateUserDetails = async (payload: IUpdateUserDetails) => await backend.put(`/users/updateProfile`, payload)

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

// COMMENTS
export const addComment = async (postId: string, payload: { comment: string }) => await backend.post(`/posts/${postId}/comments`, payload)

// PHOTOS
export const uploadPhotos = async (formData: FormData) => await backend.post(`/photos`, formData)
export const deletePhoto = async (photoId: string) => await backend.delete(`/photos/${photoId}`)
