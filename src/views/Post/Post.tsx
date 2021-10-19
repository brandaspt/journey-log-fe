import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { Container, Button, Spinner, Modal, Form, Row, Col } from "react-bootstrap"
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai"
import { useParams, useHistory } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { userMyPostsStore, userProfileStore } from "../../redux/user/userSlice"
import { addComment, addPhotos, deletePhoto, deletePost, editPost } from "../../utils/backend/endpoints"
import TimeAgo from "timeago-react"
import UserCard from "../../components/UserCard/UserCard"
import Comment from "../../components/Comment/Comment"
import { heic2jpeg } from "../../utils/helpers/helpers"

import "./Post.css"
import { getSelectedPostData, selectedPostDataStore } from "../../redux/selectedPost/selectedPost"
import ToggleLikePost from "../../components/ToggleLikePost/ToggleLikePost"

const Post = () => {
  const userProfile = useAppSelector(userProfileStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const postDetails = useAppSelector(selectedPostDataStore)
  const params = useParams<{ postId: string }>()
  const postId = params.postId
  const isMyPost = myPosts.find(myPost => myPost._id === postId)

  const dispatch = useAppDispatch()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const history = useHistory()

  const [isLoading, setIsLoading] = useState("")
  const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false)
  const [isLoadingAddPhotos, setIsLoadingAddPhotos] = useState(false)
  const [isLoadingEditTitle, setIsLoadingEditTitle] = useState(false)
  const [isLoadingEditDescription, setIsLoadingEditDescription] = useState(false)
  const [showPost, setShowPost] = useState(false)
  const [showLastPhoto, setShowLastPhoto] = useState(false)
  const [showEditTitle, setShowEditTitle] = useState(false)
  const [showEditDescription, setShowEditDescription] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newComment, setNewComment] = useState("")
  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false)

  const handleClosePost = () => setShowPost(false)
  const handleShowPost = () => setShowPost(true)
  const handleCloseLastPhoto = () => setShowLastPhoto(false)
  const handleShowLastPhoto = () => setShowLastPhoto(true)
  const handleCloseEditTitle = () => setShowEditTitle(false)
  const handleShowEditTitle = () => setShowEditTitle(true)
  const handleCloseEditDescription = () => setShowEditDescription(false)
  const handleShowEditDescription = () => setShowEditDescription(true)

  const getPost = useCallback(() => dispatch(getSelectedPostData(postId)), [postId, dispatch])

  useEffect(() => {
    getPost()
  }, [getPost])

  const handleEditTitle = async () => {
    setIsLoadingEditTitle(true)
    try {
      await editPost(postId, { title: newTitle })
      getPost()
      setNewTitle("")
      handleCloseEditTitle()
      setIsLoadingEditTitle(false)
    } catch (error) {
      setIsLoadingEditTitle(false)
      console.log(error)
    }
  }

  const handleEditDescription = async () => {
    setIsLoadingEditDescription(true)
    try {
      await editPost(postId, { description: newDescription })
      getPost()
      setNewDescription("")
      handleCloseEditDescription()
      setIsLoadingEditDescription(false)
    } catch (error) {
      setIsLoadingEditDescription(false)
      console.log(error)
    }
  }

  const handleDeletePhoto = async (photoId: string) => {
    if (postDetails?.photos.length === 1) return handleShowLastPhoto()
    try {
      setIsLoading(photoId)
      await deletePhoto(photoId)
      getPost()
      setIsLoading("")
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async () => {
    setIsLoadingDeletePost(true)
    try {
      await deletePost(postId)
      setIsLoadingDeletePost(false)
      handleClosePost()
      history.push(`/users/${userProfile?._id}/map`)
    } catch (error) {
      setIsLoadingDeletePost(false)
      console.log(error)
    }
  }

  const handleAddPhotos = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setIsLoadingAddPhotos(true)
    const photosArr: (Blob | File)[] = []
    try {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes("heic")) {
          const jpeg = await heic2jpeg(files[i])
          photosArr.push(jpeg)
        } else photosArr.push(files[i])
      }
      const formData = new FormData()
      photosArr.forEach(photo => formData.append("photos", photo))
      await addPhotos(postId, formData)
      getPost()
      e.target.value = ""
      setIsLoadingAddPhotos(false)
    } catch (error) {
      setIsLoadingAddPhotos(false)
      console.log(error)
    }
  }

  const handleNewComment = async () => {
    try {
      setIsLoadingNewComment(true)
      await addComment(postId, { comment: newComment })
      getPost()
      setNewComment("")
      setIsLoadingNewComment(false)
    } catch (error) {
      console.log(error)
      setIsLoadingNewComment(false)
    }
  }

  if (!postDetails) return <div></div>

  return (
    <Container className="Post pt-5">
      <Row>
        {!isMyPost && (
          <Col xs={12} md={5}>
            <p>Author:</p>
            <UserCard userId={postDetails.userId._id} />
          </Col>
        )}
        <Col xs={12} md={isMyPost ? 12 : 7}>
          <div className="d-flex justify-content-center align-items-center">
            <h2 className="text-center mt-4 mb-0">
              <span>{postDetails.title}</span>
            </h2>
            {isMyPost && <AiOutlineEdit className="edit-btn" onClick={handleShowEditTitle} />}
            <div className="ms-3">
              <ToggleLikePost />
            </div>
          </div>
          <p className="text-muted text-center">
            Published: <TimeAgo datetime={postDetails.createdAt} />
          </p>
          {isMyPost && (
            <div className="text-end">
              <Button variant="danger" size="sm" onClick={handleShowPost}>
                Delete Post
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <div className="d-flex align-items-center">
        <h5>
          <strong>Description</strong>
        </h5>
        {isMyPost && <AiOutlineEdit className="edit-btn" onClick={handleShowEditDescription} />}
      </div>
      <p>{postDetails.description ? postDetails.description : "This post has no description."}</p>
      <h5>
        <strong>Photos</strong>
      </h5>
      <div className="photos-wrapper py-3">
        {postDetails.photos.map(photo => (
          <div key={photo._id} className="d-flex flex-column align-items-center me-3 photo-item position-relative">
            <img src={photo.url} alt="item" />
            {isMyPost && (
              <Button variant="warning" size="sm" className="mt-2 delete-photo-btn" onClick={() => handleDeletePhoto(photo._id)}>
                {isLoading === photo._id ? <Spinner animation="border" size="sm" /> : "Delete Photo"}
              </Button>
            )}
          </div>
        ))}
        {isMyPost && (
          <div className="add-photo-btn-wrapper">
            <div className="add-photo-btn" onClick={() => inputFileRef.current?.click()}>
              {isLoadingAddPhotos ? <Spinner animation="border" /> : <AiOutlinePlus />}
              <input type="file" ref={inputFileRef} multiple onChange={handleAddPhotos} />
            </div>
          </div>
        )}
      </div>
      <div className="pb-5">
        <h5>
          <strong>Comments</strong>
        </h5>
        <div>
          {!postDetails.comments || postDetails.comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            postDetails.comments.map(comment => <Comment key={comment._id} comment={comment} />)
          )}
        </div>
        {userProfile && (
          <div>
            <Form.Group className="mb-1 mt-3">
              <Form.Label>New Comment:</Form.Label>
              <Form.Control
                className="comment-input"
                as="textarea"
                rows={3}
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
            </Form.Group>
            <div className="text-end">
              <Button size="sm" onClick={handleNewComment}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
      <Modal show={showPost} onHide={handleClosePost} centered>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This action will delete the current post and all photos associated with it. You will be redirected to your Map.</p>
          <p>Are you sure you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeletePost}>
            {isLoadingDeletePost ? <Spinner animation="border" size="sm" /> : "Yes, Delete"}
          </Button>
          <Button variant="secondary" onClick={handleClosePost}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLastPhoto} onHide={handleCloseLastPhoto} centered>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This action will delete the current post because posts without photos are not allowed. You will be redirected to your Map.</p>
          <p>Are you sure you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeletePost}>
            {isLoadingDeletePost ? <Spinner animation="border" size="sm" /> : "Yes, Delete"}
          </Button>
          <Button variant="secondary" onClick={handleCloseLastPhoto}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditTitle} onHide={handleCloseEditTitle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editing Post Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" defaultValue={postDetails.title} onChange={e => setNewTitle(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditTitle}>
            {isLoadingEditTitle ? <Spinner animation="border" size="sm" /> : "Save"}
          </Button>
          <Button variant="secondary" onClick={handleCloseEditTitle}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditDescription} onHide={handleCloseEditDescription} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editing Post Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" defaultValue={postDetails.description} onChange={e => setNewDescription(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditDescription}>
            {isLoadingEditDescription ? <Spinner animation="border" size="sm" /> : "Save"}
          </Button>
          <Button variant="secondary" onClick={handleCloseEditDescription}>
            {isLoadingNewComment ? <Spinner animation="border" size="sm" /> : "Cancel"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Post
