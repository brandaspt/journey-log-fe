import { useEffect, useState } from "react"
import { Card, Spinner } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userProfileStore } from "../../redux/user/userSlice"
import { IPublicUserData } from "../../types/users"
import { fetchUserPublicInfo } from "../../utils/backend/endpoints"
import FollowBtn from "../FollowBtn/FollowBtn"
import UnfollowBtn from "../UnfollowBtn/UnfollowBtn"

import "./UserCard.css"

const UserCard = ({ userId }: { userId: string }) => {
  const userData = useAppSelector(userProfileStore)

  const location = useLocation()
  const [publicUserInfo, setPublicUserInfo] = useState<null | IPublicUserData>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const getPublicUserInfo = async () => {
      try {
        setLoading(true)
        const userInfo = await fetchUserPublicInfo(userId)
        if (isMounted) setPublicUserInfo(userInfo)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    getPublicUserInfo()
    return () => {
      isMounted = false
    }
  }, [userId])

  if (loading) return <Spinner animation="border" />

  return (
    <div className="UserCard position-relative">
      {publicUserInfo && (
        <div className="user-details">
          <p className="text-small text-muted mt-1">Joined {new Date(publicUserInfo.publicProfile.createdAt).toLocaleDateString()}</p>
          <p className="text-small text-muted">Public Photos: {publicUserInfo?.publicPhotos.length}</p>
          <p className="text-small text-muted mb-1">Public Posts: {publicUserInfo?.publicPosts.length}</p>
        </div>
      )}
      <Card className="text-center">
        <Card.Body>
          <div className="d-flex justify-content-start align-items-stretch">
            <img className="user-avatar" src={publicUserInfo?.publicProfile.avatar} alt="user avatar" referrerPolicy="no-referrer" />
            <div className="d-flex flex-column flex-grow-1 justify-content-between">
              <Link to={`/users/${publicUserInfo?.publicProfile._id}/profile`} className="text-reset">
                <p className="text-center">
                  {publicUserInfo?.publicProfile.name} {publicUserInfo?.publicProfile.surname}
                </p>
              </Link>
              <div className="d-flex align-items-center justify-content-evenly">
                {!userData ? (
                  <></>
                ) : userData.following?.includes(publicUserInfo?.publicProfile._id) ? (
                  <UnfollowBtn userId={publicUserInfo?.publicProfile._id} />
                ) : (
                  <FollowBtn userId={publicUserInfo?.publicProfile._id} />
                )}
                {location.pathname.includes("/map") ? (
                  <></>
                ) : (
                  <Link to={`/users/${publicUserInfo?.publicProfile._id}/map`}>
                    <button className="map-btn">Map</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default UserCard
