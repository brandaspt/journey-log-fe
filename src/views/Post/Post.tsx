import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { Container, Button, Spinner, Modal, Form } from "react-bootstrap"
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai"
import { useParams, useHistory, Link } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userMyPostsStore, userProfileStore } from "../../redux/user/userSlice"
import { IPost } from "../../types/posts"
import { addPhotos, deletePhoto, deletePost, editPost, fetchPostById } from "../../utils/backend/endpoints"
import TimeAgo from "timeago-react"

import "./Post.css"
import { heic2jpeg } from "../../utils/helpers/helpers"

const Post = () => {
  const userProfile = useAppSelector(userProfileStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const params = useParams<{ postId: string }>()
  const postId = params.postId
  const isMyPost = myPosts.find(myPost => myPost._id === postId)

  const inputFileRef = useRef<HTMLInputElement>(null)

  const history = useHistory()

  const [postDetails, setPostDetails] = useState<IPost | null>(null)
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

  const handleClosePost = () => setShowPost(false)
  const handleShowPost = () => setShowPost(true)
  const handleCloseLastPhoto = () => setShowLastPhoto(false)
  const handleShowLastPhoto = () => setShowLastPhoto(true)
  const handleCloseEditTitle = () => setShowEditTitle(false)
  const handleShowEditTitle = () => setShowEditTitle(true)
  const handleCloseEditDescription = () => setShowEditDescription(false)
  const handleShowEditDescription = () => setShowEditDescription(true)

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

  if (!postDetails) return <div></div>

  return (
    <Container className="Post">
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="text-center mt-4 mb-0">
          <span>{postDetails.title}</span>
        </h2>
        {isMyPost && <AiOutlineEdit className="edit-btn" onClick={handleShowEditTitle} />}
      </div>
      <div className="d-flex align-items-center my-4">
        <img src={postDetails.userId.avatar} alt="user avatar" className="user-avatar" />
        <div className="d-flex flex-column ms-2">
          <Link to={`/users/${postDetails.userId._id}/map`} className="m-0 text-muted">
            {postDetails.userId.name} {postDetails.userId.surname}
          </Link>
          <p className="text-muted">
            <TimeAgo datetime={postDetails.createdAt} />
          </p>
        </div>
        {isMyPost && (
          <Button variant="danger" className="ms-auto" size="sm" onClick={handleShowPost}>
            Delete Post
          </Button>
        )}
      </div>
      <div className="d-flex align-items-center">
        <h5 className="mt-4 mb-0">
          <strong>Description:</strong>
        </h5>
        {isMyPost && <AiOutlineEdit className="edit-btn" onClick={handleShowEditDescription} />}
      </div>
      <p className="mb-3">{postDetails.description ? postDetails.description : "This post has no description."}</p>
      <div className="photos-wrapper mt-4">
        {postDetails.photos.map(photo => (
          <div key={photo._id} className="d-flex flex-column align-items-center me-3">
            <img src={photo.url} alt="item" />
            {isMyPost && (
              <Button variant="warning" size="sm" className="mt-2" onClick={() => handleDeletePhoto(photo._id)}>
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
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Post
