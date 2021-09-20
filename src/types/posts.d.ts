import { IUser } from "./users"

interface IPostPhoto {
  photoFile: File | Blob
  blobURL: string
}

export type IPostPhotosArray = IPostPhoto[]

export interface IPost {
  title: string
  likes?: Schema.Types.ObjectId[]
  photos: Schema.Types.ObjectId[]
  isPrivate: boolean
  _id: Schema.Types.ObjectId
  lat: number
  lng: number
  userId: Schema.Types.ObjectId | IUser
  description?: string
}

export interface IPostsStore {
  selectedUserPosts: IPost[]
  loading: boolean
}
