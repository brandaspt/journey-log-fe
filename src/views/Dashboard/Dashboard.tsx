import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import Greeting from "../../components/Greeting/Greeting"
import { useAppSelector } from "../../redux/hooks"
import { userFollowersStore, userFollowingStore, userMyPhotosStore, userMyPostsStore, userProfileStore } from "../../redux/user/userSlice"
import { IUser } from "../../types/users"
import { fetchUserPublicInfo } from "../../utils/backend/endpoints"
import { IoIosPeople } from "react-icons/io"
import { RiUserHeartFill } from "react-icons/ri"
import { FaAnchor, FaCamera } from "react-icons/fa"

import "./Dashboard.css"

const Dashboard = () => {
  const followingIds = useAppSelector(userFollowingStore)
  const followersIds = useAppSelector(userFollowersStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const myPhotos = useAppSelector(userMyPhotosStore)

  const [followingUsers, setFollowingUsers] = useState<IUser[]>([])
  const [followersUsers, setFollowersUsers] = useState<IUser[]>([])

  const getFollowing = useCallback(async () => {
    const following = await Promise.all(followingIds!.map(id => fetchUserPublicInfo(id)))
    setFollowingUsers(following.flat(1))
  }, [followingIds])

  const getFollowers = useCallback(async () => {
    const followers = await Promise.all(followersIds!.map(id => fetchUserPublicInfo(id)))
    setFollowersUsers(followers.flat(1))
  }, [followersIds])

  const numOfPostPhotos = useMemo(() => myPosts.reduce((acc, curr) => acc + curr.photos.length, 0), [myPosts])

  useEffect(() => {
    getFollowing()
    getFollowers()
  }, [getFollowing, getFollowers])

  return (
    <Container className="Dashboard">
      <Greeting />
      <section className="stats-cards-wrapper my-5">
        <Row>
          <Col xs={12} sm={6} md={3}>
            <Card className="text-center h-100">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <IoIosPeople size={42} color="var(--prim-dark)" />
                <div className="d-flex flex-column align-items-end">
                  <p className="text-muted">Followers</p>
                  <h3>{followersIds?.length}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="text-center h-100">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <RiUserHeartFill size={36} color="var(--prim-light)" />
                <div className="d-flex flex-column align-items-end">
                  <p className="text-muted">Following</p>
                  <h3>{followingIds?.length}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="text-center h-100">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <FaAnchor size={36} color="var(--prim-green)" />
                <div className="d-flex flex-column align-items-end">
                  <p className="text-muted">Posts</p>
                  <h3>{myPosts.length}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="text-center">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <FaCamera size={36} color="var(--prim-blue)" />
                <div className="d-flex flex-column align-items-end">
                  <p className="text-muted">Photos</p>
                  <h3>{myPhotos.length + numOfPostPhotos}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}

export default Dashboard
