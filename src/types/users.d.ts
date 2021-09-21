import { IMongoDoc } from "./mongo"
import { IPost } from "./posts"

export interface IUser extends IMongoDoc {
  name: string
  surname: string
  email: string
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
