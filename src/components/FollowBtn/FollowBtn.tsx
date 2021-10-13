import { useAppDispatch } from "../../redux/hooks"
import { toggleFollowUserAction } from "../../redux/user/userSlice"
import { FaUserPlus } from "react-icons/fa"

import "./FollowBtn.css"

const FollowBtn = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch()
  return (
    <button className="FollowBtn" onClick={() => dispatch(toggleFollowUserAction(userId))} title="Follow user">
      <FaUserPlus />
    </button>
  )
}

export default FollowBtn
