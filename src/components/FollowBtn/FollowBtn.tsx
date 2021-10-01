import { useAppDispatch } from "../../redux/hooks"
import { toggleFollowUserAction } from "../../redux/user/userSlice"

import "./FollowBtn.css"

const FollowBtn = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch()
  return (
    <button className="FollowBtn" onClick={() => dispatch(toggleFollowUserAction(userId))}>
      Follow
    </button>
  )
}

export default FollowBtn
