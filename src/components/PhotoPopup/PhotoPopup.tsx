import { Popup } from "react-leaflet"
import { useAppSelector } from "../../redux/hooks"
import { userMyPhotosStore } from "../../redux/user/userSlice"
import { IPhoto } from "../../types/photos"
import { Button } from "react-bootstrap"

import "./PhotoPopup.css"

interface IPhotoPopupProps {
  photo: IPhoto
}

const PhotoPopup = ({ photo }: IPhotoPopupProps) => {
  const myPhotos = useAppSelector(userMyPhotosStore)
  return (
    <Popup>
      <div className="PhotoPopup">
        <img src={photo.url} alt="item" />
        {myPhotos.find(myPhoto => myPhoto._id === photo._id) && (
          <Button size="sm" variant="danger" className="mt-2">
            Delete
          </Button>
        )}
      </div>
    </Popup>
  )
}

export default PhotoPopup
