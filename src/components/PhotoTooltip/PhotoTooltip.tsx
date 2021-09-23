import { Tooltip } from "react-leaflet"
import { IPhoto } from "../../types/photos"

import "./PhotoTooltip.css"

interface IPhotoTooltipProps {
  photo: IPhoto
}

const PhotoTooltip = ({ photo }: IPhotoTooltipProps) => {
  return (
    <Tooltip className="PhotoTooltip" direction="top">
      <img src={photo.url} alt="item" />
    </Tooltip>
  )
}

export default PhotoTooltip
