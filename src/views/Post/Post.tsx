import { useCallback, useEffect, useState } from "react"
import { Container, Button, Spinner, Modal } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userMyPostsStore } from "../../redux/user/userSlice"
import { IPost } from "../../types/posts"
import { deletePhoto, fetchPostById } from "../../utils/backend/endpoints"
import TimeAgo from "timeago-react"

import "./Post.css"

const Post = () => {
  const myPosts = useAppSelector(userMyPostsStore)
  const params = useParams<{ postId: string }>()
  const postId = params.postId
  const isMyPost = myPosts.find(myPost => myPost._id === postId)

  const [postDetails, setPostDetails] = useState<IPost | null>(null)
  const [isLoading, setIsLoading] = useState("")
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getPost = useCallback(async () => {
    try {
      setPostDetails(await fetchPostById(postId))
    } catch (error) {
      console.log(error)
    }
  }, [postId])

  useEffect(() => {
    getPost()
  }, [postId, getPost])

  const handleDeletePhoto = async (photoId: string) => {
    try {
      setIsLoading(photoId)
      await deletePhoto(photoId)
      getPost()
      setIsLoading("")
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async () => {}

  if (!postDetails) return <div></div>

  return (
    <Container className="Post">
      <h2 className="text-center my-2">{postDetails.title}</h2>
      <div className="d-flex align-items-center">
        <img src={postDetails.userId.avatar} alt="user avatar" className="user-avatar" />
        <div className="d-flex flex-column ms-2">
          <p className="m-0 text-muted">
            {postDetails.userId.name} {postDetails.userId.surname}
          </p>
          <p className="text-muted">
            <TimeAgo datetime={postDetails.createdAt} />
          </p>
        </div>
        {isMyPost && (
          <Button variant="danger" className="ms-auto" size="sm" onClick={handleShow}>
            Delete Post
          </Button>
        )}
      </div>
      {postDetails.description && <p className="my-3">{postDetails.description}</p>}
      <div className="photos-wrapper">
        {postDetails.photos.map(photo => (
          <div key={photo._id} className="d-flex flex-column align-items-center">
            <img src={photo.url} alt="item" />
            {isMyPost && (
              <Button variant="danger" size="sm" className="mt-2" onClick={() => handleDeletePhoto(photo._id)}>
                {isLoading === photo._id ? <Spinner animation="border" size="sm" /> : "Delete"}
              </Button>
            )}
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeletePost}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Post
