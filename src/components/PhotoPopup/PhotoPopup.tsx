import { Popup } from "react-leaflet"
import { IPhoto } from "../../types/photos"

import "./PhotoPopup.css"

interface IPhotoPopupProps {
  photo: IPhoto
}

const PhotoPopup = ({ photo }: IPhotoPopupProps) => {
  return (
    <Popup className="PhotoPopup">
      <img src={photo.url} alt="item" />
    </Popup>
  )
}

export default PhotoPopup
