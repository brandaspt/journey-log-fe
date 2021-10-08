import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getSelectedPostData, selectedPostDataStore } from "../../redux/selectedPost/selectedPost"
import { userProfileStore } from "../../redux/user/userSlice"
import { toggleLikePost } from "../../utils/backend/endpoints"

import "./ToggleLikePost.css"

const ToggleLikePost = () => {
  const me = useAppSelector(userProfileStore)
  const post = useAppSelector(selectedPostDataStore)
  const dispatch = useAppDispatch()

  const handleToggleLike = async () => {
    try {
      await toggleLikePost(post?._id)
      dispatch(getSelectedPostData(post?._id))
    } catch (error) {
      console.log(error)
    }
  }

  if (!post) return <></>

  return (
    <div className="ToggleLikePost">
      <p className="num-of-likes m-0 fs-6">{post.likes?.length}</p>
      <div onClick={handleToggleLike}>
        {post.likes?.includes(me?._id) ? (
          <AiFillLike size={28} color="var(--prim-dark)" />
        ) : (
          <AiOutlineLike size={28} color="var(--prim-dark)" />
        )}
      </div>
    </div>
  )
}

export default ToggleLikePost
