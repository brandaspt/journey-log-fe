import { Popup } from "react-leaflet"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getMyPhotosAction, userMyPhotosStore } from "../../redux/user/userSlice"
import { IPhoto } from "../../types/photos"
import { Button, Spinner } from "react-bootstrap"

import "./PhotoPopup.css"
import { deletePhoto } from "../../utils/backend/endpoints"
import { useState } from "react"

interface IPhotoPopupProps {
  photo: IPhoto
}

const PhotoPopup = ({ photo }: IPhotoPopupProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const myPhotos = useAppSelector(userMyPhotosStore)
  const dispatch = useAppDispatch()

  const handleDeletePhoto = async (photoId: string) => {
    setIsLoading(true)
    await deletePhoto(photoId)
    dispatch(getMyPhotosAction())
    setIsLoading(false)
  }

  return (
    <Popup>
      <div className="PhotoPopup">
        <img src={photo.url} alt="item" />
        {myPhotos.find(myPhoto => myPhoto._id === photo._id) && (
          <Button size="sm" variant="danger" className="mt-2" disabled={isLoading} onClick={() => handleDeletePhoto(photo._id)}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Delete"}
          </Button>
        )}
      </div>
    </Popup>
  )
}

export default PhotoPopup
