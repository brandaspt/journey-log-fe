import { IPost } from "./posts"

export interface IUser {
  name: string
  surname: string
  email: string
  _id: string
  password?: string
  avatar?: string
  bio?: string
  refreshToken?: string
  googleId?: string
}

export interface IUserStore {
  profile: IUser | null
  myPosts: IPost[]
  loading: boolean
  error: string
}
