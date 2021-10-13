import { useAppDispatch } from "../../redux/hooks"
import { toggleFollowUserAction } from "../../redux/user/userSlice"
import { FaUserMinus } from "react-icons/fa"

import "./UnfollowBtn.css"

const UnfollowBtn = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch()
  return (
    <button className="UnfollowBtn" onClick={() => dispatch(toggleFollowUserAction(userId))} title="Unfollow user">
      <FaUserMinus />
    </button>
  )
}

export default UnfollowBtn
