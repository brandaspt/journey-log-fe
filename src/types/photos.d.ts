import { IMongoDoc } from "./mongo"
import { IPost } from "./posts"
import { IUser } from "./users"

export interface IPhoto extends IMongoDoc {
  likes?: Schema.Types.ObjectId[]
  isPrivate: boolean
  lat: number
  lng: number
  userId: Schema.Types.ObjectId | IUser
  postId?: Schema.Types.ObjectId | IPost
  url: string
}

export interface IPhotosStore {
  selectedUserPhotos: IPhoto[]
  loading: boolean
}
