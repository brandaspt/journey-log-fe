import { useAppDispatch } from "../../redux/hooks"
import { toggleFollowUserAction } from "../../redux/user/userSlice"
import "./UnfollowBtn.css"

const UnfollowBtn = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch()
  return (
    <button className="UnfollowBtn" onClick={() => dispatch(toggleFollowUserAction(userId))}>
      Unfollow
    </button>
  )
}

export default UnfollowBtn
