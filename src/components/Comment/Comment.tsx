import { Link } from "react-router-dom"
import TimeAgo from "timeago-react"
import { IComment } from "../../types/comments"
import { IUser } from "../../types/users"

import "./Comment.css"

interface ICommentProps {
  comment: IComment
}

const Comment = ({ comment }: ICommentProps) => {
  const user = comment.userId as IUser
  return (
    <div className="Comment d-flex mb-1">
      <Link to={`/users/${user._id}/map`}>
        <img src={user.avatar} alt="user avatar" />
      </Link>
      <div className="d-flex flex-column justify-content-center">
        <p className="text-muted text-small">
          <TimeAgo datetime={comment.createdAt} />
        </p>
        <p>{comment.comment}</p>
      </div>
    </div>
  )
}

export default Comment
