import { useState } from "react"
import { Card, Col, Container, Row, Button, Spinner } from "react-bootstrap"
import Greeting from "../../components/Greeting/Greeting"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getMyPhotosAction, userFollowersStore, userFollowingStore, userMyPhotosStore, userMyPostsStore } from "../../redux/user/userSlice"
import { IoIosPeople } from "react-icons/io"
import { RiUserHeartFill } from "react-icons/ri"
import { FaAnchor, FaCamera, FaTrashAlt } from "react-icons/fa"
import UserCard from "../../components/UserCard/UserCard"

import "./Dashboard.css"
import { Link } from "react-router-dom"
import { deletePhoto } from "../../utils/backend/endpoints"

const Dashboard = () => {
  const followingIds = useAppSelector(userFollowingStore)
  const followersIds = useAppSelector(userFollowersStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const myPhotos = useAppSelector(userMyPhotosStore)

  const dispatch = useAppDispatch()

  const [deletePhotoLoading, setDeletePhotoLoading] = useState("")

  // const numOfPostPhotos = useMemo(() => myPosts.reduce((acc, curr) => acc + curr.photos.length, 0), [myPosts])

  const handleDeletePhoto = async (photoId: string) => {
    try {
      setDeletePhotoLoading(photoId)
      await deletePhoto(photoId)
      dispatch(getMyPhotosAction())
      setDeletePhotoLoading("")
    } catch (error) {
      setDeletePhotoLoading("")
      console.log(error)
    }
  }

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
                  <h3>{myPhotos.length}</h3>
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
        {myPosts?.length === 0 ? (
          <p>You have no posts yet.</p>
        ) : (
          <Row className="g-2">
            {myPosts?.map(post => (
              <Col key={post._id} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/posts/${post._id}`} className="text-reset">
                  <div className="post-card">
                    <h5>{post.title}</h5>
                    <p className="text-muted">Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <p className="text-muted">
                      {post.photos.length} {post.photos.length === 1 ? "photo" : "photos"}
                    </p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </section>
      <section className="photos">
        <h3>Photos</h3>
        {myPhotos?.length === 0 ? (
          <p>You have no photos yet.</p>
        ) : (
          <Row className="gx-2 gy-4">
            {myPhotos?.map(photo => (
              <Col key={photo._id} xs={12} sm={6} md={4} lg={3}>
                <div className="photo-card">
                  <div className="p-2 d-flex align-items-center justify-content-between">
                    <p className="text-muted">Uploaded: {new Date(photo.createdAt).toLocaleDateString()}</p>
                    <Button variant="danger" size="sm" onClick={() => handleDeletePhoto(photo._id)}>
                      {deletePhotoLoading === photo._id ? <Spinner animation="border" size="sm" /> : <FaTrashAlt />}
                    </Button>
                  </div>
                  <img src={photo.url} className="img-fluid" alt="item" />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </Container>
  )
}

export default Dashboard
