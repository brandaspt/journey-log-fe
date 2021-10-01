import { Card } from "react-bootstrap"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userProfileStore } from "../../redux/user/userSlice"
import { IPublicUserData } from "../../types/users"
import FollowBtn from "../FollowBtn/FollowBtn"
import UnfollowBtn from "../UnfollowBtn/UnfollowBtn"

import "./UserCard.css"

const UserCard = ({ user }: { user: IPublicUserData }) => {
  const userData = useAppSelector(userProfileStore)

  const location = useLocation()

  return (
    <Card className="UserCard text-center">
      <Card.Body className="d-flex justify-content-evenly align-items-stretch">
        <div className="d-flex flex-column justify-content-between align-items-center">
          <img className="user-avatar mb-2" src={user.publicProfile.avatar} alt="user avatar" referrerPolicy="no-referrer" />
          {!userData ? (
            <></>
          ) : userData.following?.includes(user.publicProfile._id) ? (
            <UnfollowBtn userId={user.publicProfile._id} />
          ) : (
            <FollowBtn userId={user.publicProfile._id} />
          )}
        </div>
        <div className="d-flex flex-column align-items-start ms-2">
          <Link to={`/users/${user.publicProfile._id}/profile`} className="text-reset">
            <p>
              {user.publicProfile.name} {user.publicProfile.surname}
            </p>
          </Link>
          <div className="d-flex flex-column align-items-start">
            <p className="text-small text-muted mt-1">Joined {new Date(user.publicProfile.createdAt).toLocaleDateString()}</p>
            <p className="text-small text-muted">Public Photos: {user.publicPhotos.length}</p>
            <p className="text-small text-muted mb-1">Public Posts: {user.publicPosts.length}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            {location.pathname.includes("/map") ? (
              <></>
            ) : (
              <Link to={`/users/${user.publicProfile._id}/map`}>
                <button className="map-btn">Map</button>
              </Link>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default UserCard
