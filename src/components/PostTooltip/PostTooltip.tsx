import { Tooltip } from "react-leaflet"
import { IPost } from "../../types/posts"

interface IPostTooltipProps {
  post: IPost
}

const PostTooltip = ({ post }: IPostTooltipProps) => {
  return (
    <Tooltip direction="top">
      <h6 className="m-0">{post.title}</h6>
      <p className="m-0">{post.photos.length > 1 ? `${post.photos.length} photos` : `${post.photos.length} photo`}</p>
    </Tooltip>
  )
}

export default PostTooltip
