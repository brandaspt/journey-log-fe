import { useEffect, useState } from "react"
import { Card, Col, Container, Row, Button, Spinner } from "react-bootstrap"
import Greeting from "../../components/Greeting/Greeting"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  getMyPhotosAction,
  getMyPostsAction,
  userFollowersStore,
  userFollowingStore,
  userMyPhotosStore,
  userMyPostsStore,
} from "../../redux/user/userSlice"
import { IoIosPeople } from "react-icons/io"
import { RiUserHeartFill } from "react-icons/ri"
import { FaAnchor, FaCamera, FaTrashAlt } from "react-icons/fa"
import UserCard from "../../components/UserCard/UserCard"

import "./Dashboard.css"
import { Link } from "react-router-dom"
import { deletePhoto } from "../../utils/backend/endpoints"
import { MdInsertComment } from "react-icons/md"
import { AiFillLike } from "react-icons/ai"

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

  useEffect(() => {
    dispatch(getMyPhotosAction())
    dispatch(getMyPostsAction())
  }, [dispatch])

  return (
    <Container className="Dashboard">
      <Greeting />
      <section className="at-a-glance">
        <Row className="g-2">
          <Col xs={12} sm={6} md={3}>
            <a href="#followers" className="text-reset">
              <Card className="text-center h-100">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <IoIosPeople color="var(--prim-dark)" />
                  <div className="d-flex flex-column align-items-end">
                    <p className="text-muted">Followers</p>
                    <h3>{followersIds?.length}</h3>
                  </div>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <a href="#following" className="text-reset">
              <Card className="text-center h-100">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <RiUserHeartFill color="var(--prim-light)" />
                  <div className="d-flex flex-column align-items-end">
                    <p className="text-muted">Following</p>
                    <h3>{followingIds?.length}</h3>
                  </div>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <a href="#posts" className="text-reset">
              <Card className="text-center h-100">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <FaAnchor color="var(--prim-green)" />
                  <div className="d-flex flex-column align-items-end">
                    <p className="text-muted">Posts</p>
                    <h3>{myPosts.length}</h3>
                  </div>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <a href="#photos" className="text-reset">
              <Card className="text-center">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <FaCamera color="var(--prim-blue)" />
                  <div className="d-flex flex-column align-items-end">
                    <p className="text-muted">Photos</p>
                    <h3>{myPhotos.length}</h3>
                  </div>
                </Card.Body>
              </Card>
            </a>
          </Col>
        </Row>
      </section>
      <section className="followers" id="followers">
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
      <section className="following" id="following">
        <h3>Following</h3>
        {followingIds?.length === 0 ? (
          <p>You are not following anyone yet.</p>
        ) : (
          <Row className="g-2">
            {followingIds?.map(id => (
              <Col key={id} xs={12} sm={6} md={4} lg={3}>
                <UserCard userId={id} />
              </Col>
            ))}
          </Row>
        )}
      </section>
      <section className="posts" id="posts">
        <h3>Posts</h3>
        {myPosts?.length === 0 ? (
          <p>You have no posts yet.</p>
        ) : (
          <Row className="g-2">
            {myPosts?.map(post => (
              <Col key={post._id} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/posts/${post._id}`} className="text-reset">
                  <div className="post-card">
                    <h5 className="post-title" title={post.title}>
                      {post.title}
                    </h5>
                    <p className="text-muted post-created">Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="d-flex align-items-center">
                        <FaCamera size={18} color="var(--prim-blue)" className="me-1" title="Photos" /> {post.photos.length}
                      </div>
                      <div className="d-flex align-items-center">
                        <MdInsertComment size={18} className="me-1" color="#808080" title="Comments" /> {post.comments.length}
                      </div>
                      <p className="d-flex align-items-center">
                        <AiFillLike size={18} color="var(--prim-dark)" className="me-1" title="Likes" /> {post.likes?.length}
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </section>
      <section className="photos" id="photos">
        <h3>Photos</h3>
        {myPhotos?.length === 0 ? (
          <p>You have no photos yet.</p>
        ) : (
          <Row className="g-2">
            {myPhotos?.map(photo => (
              <Col key={photo._id} xs={12} sm={6} md={4} lg={3} className="mb-2">
                <div className="photo-card">
                  <div className="pb-1 d-flex align-items-end justify-content-between">
                    <p className="text-muted photos-uploaded">Uploaded: {new Date(photo.createdAt).toLocaleDateString()}</p>
                    <Button
                      className="delete-photo-btn"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeletePhoto(photo._id)}
                      title="Delete photo"
                    >
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
