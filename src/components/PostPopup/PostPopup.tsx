import { Card, Button } from "react-bootstrap"
import { AiFillLike } from "react-icons/ai"
import { Popup } from "react-leaflet"
import { Link } from "react-router-dom"
import TimeAgo from "timeago-react"
import { IPost } from "../../types/posts"

import "./PostPopup.css"

interface IPostPopupProps {
  post: IPost
}

const PostPopup = ({ post }: IPostPopupProps) => {
  return (
    <Popup className="post-popup">
      <Card className="border-0 post-card">
        {post.photos.length > 1 ? (
          <div className="photos-wrapper">
            {post.photos.map(photo => (
              <img key={photo.url} src={photo.url} alt="post item" />
            ))}
          </div>
        ) : (
          <div className="single-photo-wrapper">
            <img src={post.photos[0].url} alt="post item" />
          </div>
        )}

        <Card.Body className="mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column me-3">
              <Card.Title>{post.title}</Card.Title>
              <Card.Text as="div">
                by{" "}
                <Link to={`/users/${post.userId._id}/map`}>
                  {post.userId.name} {post.userId.surname}
                </Link>
                <p className="m-0">
                  <TimeAgo datetime={post.createdAt} />
                </p>
              </Card.Text>
            </div>
            <AiFillLike size={28} color="var(--prim-dark)" />
          </div>
          <hr />
          {post.description && (
            <>
              <Card.Text className="fw-bold mb-1">Description</Card.Text>
              <Card.Text className="post-description">{post.description}</Card.Text>
              <hr />
            </>
          )}
          <div className="text-center">
            <Button variant="primary" size="sm">
              <Link to={`/posts/${post._id}`}>Details</Link>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Popup>
  )
}

export default PostPopup
