import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userProfileStore } from "../../redux/user/userSlice"
import { IPublicUserData } from "../../types/users"
import FollowBtn from "../FollowBtn/FollowBtn"
import UnfollowBtn from "../UnfollowBtn/UnfollowBtn"

import "./UserCard.css"

const UserCard = ({ user }: { user: IPublicUserData }) => {
  const userData = useAppSelector(userProfileStore)
  return (
    <Card className="UserCard text-center">
      <Card.Body className="d-flex align-items-center justify-content-evenly">
        <img className="user-avatar" src={user.publicProfile.avatar} alt="user avatar" referrerPolicy="no-referrer" />

        <div className="d-flex flex-column align-items-start ms-1">
          <p>
            {user.publicProfile.name} {user.publicProfile.surname}
          </p>
          <p className="text-small text-muted mt-1">Joined {new Date(user.publicProfile.createdAt).toLocaleDateString()}</p>
          <p className="text-small text-muted">Public Photos: {user.publicPhotos.length}</p>
          <p className="text-small text-muted mb-1">Public Posts: {user.publicPosts.length}</p>
          <div className="d-flex align-items-center justify-content-between">
            {userData?.following?.includes(user.publicProfile._id) ? (
              <UnfollowBtn userId={user.publicProfile._id} />
            ) : (
              <FollowBtn userId={user.publicProfile._id} />
            )}
            <Link to={`/users/${user.publicProfile._id}/map`}>
              <button className="map-btn">Map</button>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default UserCard
