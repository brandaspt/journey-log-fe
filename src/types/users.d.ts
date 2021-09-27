import { IMongoDoc } from "./mongo"
import { IPhoto } from "./photos"
import { IPost } from "./posts"

export interface IUser extends IMongoDoc {
  name: string
  surname: string
  email: string
  following: IUser[]
  followers: IUser[]
  avatar?: string
  bio?: string
  refreshToken?: string
  googleId?: string
}

export interface IUserStore {
  profile: IUser | null
  myPosts: IPost[]
  myPhotos: IPhoto[]
  loading: boolean
  error: string
}
