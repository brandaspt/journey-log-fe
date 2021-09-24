import { divIcon } from "leaflet"
import { Marker } from "react-leaflet"
import { IPost } from "../../types/posts"
import { IPhoto } from "../../types/photos"
import PostPopup from "../PostPopup/PostPopup"

import "./MapMarker.css"
import PhotoPopup from "../PhotoPopup/PhotoPopup"
import PostTooltip from "../PostTooltip/PostTooltip"
import PhotoTooltip from "../PhotoTooltip/PhotoTooltip"

interface IMapMarkerProps {
  content: IPost | IPhoto
  type: "post" | "photo"
}

const MapMarker = ({ content, type }: IMapMarkerProps) => {
  return (
    <Marker
      riseOnHover
      position={[content.lat, content.lng]}
      icon={divIcon({
        className: "MapMarker",
        html: `<div style='${content.isPrivate ? "background-color:#d86e74" : "background-color:#d8b26e"}' class='marker-pin'></div>${
          type === "post" ? `<i class="fas fa-anchor"></i>` : `<i class="fas fa-camera"></i>`
        }`,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -30],
        tooltipAnchor: [0, -30],
      })}
    >
      {type === "post" ? <PostTooltip post={content as IPost} /> : <PhotoTooltip photo={content as IPhoto} />}
      {type === "post" ? <PostPopup post={content as IPost} /> : <PhotoPopup photo={content as IPhoto} />}
    </Marker>
  )
}

export default MapMarker
