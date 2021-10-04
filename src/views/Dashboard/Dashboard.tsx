import { useMemo } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import Greeting from "../../components/Greeting/Greeting"
import { useAppSelector } from "../../redux/hooks"
import { userFollowersStore, userFollowingStore, userMyPhotosStore, userMyPostsStore } from "../../redux/user/userSlice"
import { IoIosPeople } from "react-icons/io"
import { RiUserHeartFill } from "react-icons/ri"
import { FaAnchor, FaCamera } from "react-icons/fa"
import UserCard from "../../components/UserCard/UserCard"

import "./Dashboard.css"

const Dashboard = () => {
  const followingIds = useAppSelector(userFollowingStore)
  const followersIds = useAppSelector(userFollowersStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const myPhotos = useAppSelector(userMyPhotosStore)

  const numOfPostPhotos = useMemo(() => myPosts.reduce((acc, curr) => acc + curr.photos.length, 0), [myPosts])

  return (
    <Container className="Dashboard">
      <Greeting />
      <section className="at-a-glance">
        <h3>At a glance</h3>
        <Row className="g-2">
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
      <section className="followers">
        <h3>Followers</h3>
        {followersIds?.length === 0 ? (
          <p>You have no followers yet.</p>
        ) : (
          <Row className="g-2">
            {followersIds?.map(id => (
              <Col key={id} xs={12} sm={6} md={4} lg={3}>
                <UserCard userId={id} />
              </Col>
            ))}
          </Row>
        )}
      </section>
      <section className="following">
        <h3>Following</h3>
        {followingIds?.length === 0 ? (
          <p>You are not following anyone yet.</p>
        ) : (
          <Row className="g-2">
            {followingIds?.map(id => (
              <Col key={id} xs={12} sm={6} md={4}>
                <UserCard userId={id} />
              </Col>
            ))}
          </Row>
        )}
      </section>
      <section className="posts">
        <h3>Posts</h3>
      </section>
      <section className="photos">
        <h3>Photos</h3>
      </section>
    </Container>
  )
}

export default Dashboard
