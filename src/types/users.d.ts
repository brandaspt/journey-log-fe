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
  data: IUser | null
  loading: boolean
  error: string
}
