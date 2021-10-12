import { divIcon } from "leaflet"
import { Marker } from "react-leaflet"
import { IPost } from "../../types/posts"
import { IPhoto } from "../../types/photos"
import PostPopup from "../PostPopup/PostPopup"
import PhotoPopup from "../PhotoPopup/PhotoPopup"
import PostTooltip from "../PostTooltip/PostTooltip"
import { useAppDispatch } from "../../redux/hooks"
import { setPostData } from "../../redux/selectedPost/selectedPost"

interface IFriendsMapMarkerProps {
  content: IPost | IPhoto
  type: "post" | "photo"
}

const FriendsMapMarker = ({ content, type }: IFriendsMapMarkerProps) => {
  const dispatch = useAppDispatch()

  return (
    <Marker
      riseOnHover
      position={[content.lat, content.lng]}
      icon={divIcon({
        className: "MapMarker",
        html: `<div style='${
          type === "post" ? "background-color:var(--prim-dark)" : "background-color:var(--prim-light)"
        }' class='marker-pin'></div><img src="${content.userId.avatar}" alt="user avatar"/>`,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -30],
        tooltipAnchor: [0, -30],
      })}
      eventHandlers={{
        click: () => {
          if (type === "post") dispatch(setPostData(content as IPost))
        },
      }}
    >
      {type === "post" && <PostTooltip post={content as IPost} />}
      {type === "post" ? <PostPopup /> : <PhotoPopup photo={content as IPhoto} />}
    </Marker>
  )
}

export default FriendsMapMarker
