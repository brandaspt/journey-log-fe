import { IComment } from "./comments"
import { IMongoDoc } from "./mongo"
import { IUser } from "./users"

interface IPostPhoto {
  photoFile: File | Blob
  blobURL: string
}

export type IPostPhotosArray = IPostPhoto[]

export interface IPost extends IMongoDoc {
  title: string
  likes?: Schema.Types.ObjectId[]
  photos: Schema.Types.ObjectId[]
  isPrivate: boolean
  lat: number
  lng: number
  userId: Schema.Types.ObjectId | IUser
  description?: string
  comments: IComment[]
}

export interface IPostsStore {
  selectedUserPosts: IPost[]
  loading: boolean
}

export interface ISelectedPostStore {
  postData: IPost | null
  loading: boolean
}
