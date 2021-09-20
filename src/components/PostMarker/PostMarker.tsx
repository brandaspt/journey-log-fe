import { divIcon } from "leaflet"
import { Card, Button, Carousel } from "react-bootstrap"
import { Marker, Popup, Tooltip } from "react-leaflet"
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
        <h5>Post: {post.title}</h5>
      </Tooltip>
      <Popup>
        <Card className="border-0 post-card">
          <Carousel>
            {post.photos.map(photo => (
              <Carousel.Item>
                <img src={photo.url} alt="post item" />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Popup>
    </Marker>
  )
}

export default PostMarker
