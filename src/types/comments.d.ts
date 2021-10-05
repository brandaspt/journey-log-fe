import { IMongoDoc } from "./mongo"

export interface IComment extends IMongoDoc {
  comment: string
  userId: Schema.Types.ObjectId | IUser
}
