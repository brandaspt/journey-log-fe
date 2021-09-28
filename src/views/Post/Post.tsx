import { useCallback, useEffect, useState } from "react"
import { Container, Button, Spinner } from "react-bootstrap"
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
  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true)
      await deletePhoto(photoId)
      getPost()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (!postDetails) return <div></div>

  return (
    <Container className="Post">
      <h2 className="text-center">{postDetails.title}</h2>
      <p className="m-0 text-muted">
        by {postDetails.userId.name} {postDetails.userId.surname}
      </p>
      <p className="text-muted">
        <TimeAgo datetime={postDetails.createdAt} />
      </p>
      {postDetails.description && <p>{postDetails.description}</p>}
      <div className="photos-wrapper">
        {postDetails.photos.map(photo => (
          <div key={photo._id} className="d-flex flex-column align-items-center">
            <img src={photo.url} alt="item" />
            {isMyPost && (
              <Button variant="danger" size="sm" className="mt-2" onClick={() => handleDeletePhoto(photo._id)}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Delete"}
              </Button>
            )}
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Post
