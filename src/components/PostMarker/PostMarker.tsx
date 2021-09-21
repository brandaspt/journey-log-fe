import { divIcon } from "leaflet"
import { Card, Button, Carousel } from "react-bootstrap"
import { Marker, Popup, Tooltip } from "react-leaflet"
import { AiFillLike } from "react-icons/ai"
import { Link } from "react-router-dom"
import TimeAgo from "timeago-react"
import { IPost } from "../../types/posts"

import "./PostMarker.css"

interface IPostMarkerProps {
  post: IPost
}

const PostMarker = ({ post }: IPostMarkerProps) => {
  return (
    <Marker
      riseOnHover
      position={[post.lat, post.lng]}
      icon={divIcon({
        className: "PostMarker",
        html: `<div style='${
          post.isPrivate ? "background-color:#c30b82;" : "background-color:#005eff;"
        }' class='marker-pin'></div><img src="${post.userId.avatar}"/>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -30],
        tooltipAnchor: [0, -30],
      })}
    >
      <Tooltip direction="top">
        <h6>Post: {post.title}</h6>
      </Tooltip>
      <Popup className="post-popup">
        <Card className="border-0 post-card">
          <Carousel>
            {post.photos.map(photo => (
              <Carousel.Item className="text-center">
                <img src={photo.url} alt="post item" />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body className="px-3 mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  by{" "}
                  <Link to={`/users/${post.userId._id}/map`}>
                    {post.userId.name} {post.userId.surname}
                  </Link>
                  , <TimeAgo datetime={post.createdAt} />
                </Card.Text>
              </div>
              <AiFillLike size={28} color="coral" />
            </div>
            <hr />
            {post.description && (
              <>
                <Card.Text className="fw-bold">Description</Card.Text>
                <Card.Text>{post.description}</Card.Text>
                <hr />
              </>
            )}
            <div className="text-center">
              <Button variant="primary" size="sm">
                Comment
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Popup>
    </Marker>
  )
}

export default PostMarker
