import { ChangeEvent, useRef, useState } from "react"
import { Button, Form, Offcanvas, Spinner } from "react-bootstrap"
import { AiOutlineUpload } from "react-icons/ai"
import { FaCheck } from "react-icons/fa"
import { FiUpload } from "react-icons/fi"
import { MdAddAPhoto, MdRemoveCircle } from "react-icons/md"
import { uploadPhotos } from "../../utils/backend/endpoints"
import { createBlobURLs, getPhotoCoords } from "../../utils/helpers/helpers"
import "./UploadPhotos.css"

interface INewPhoto {
  blobURL: string
  latitude: number
  longitude: number
  photoFile: File | Blob
  isPrivate: boolean
}

const UploadPhotos = () => {
  const [show, setShow] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<INewPhoto[]>([])
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false)
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)
  const [uploadStatus, setUploadStatus] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setShow(false)
  }

  const resetForm = () => {
    setShow(false)
    setSelectedPhotos([])
    setIsLoadingPhotos(false)
    setUploadStatus("")
    setIsLoadingUpload(false)
  }

  const handleChoosePhotos = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setIsLoadingPhotos(true)
    const coordsArr = await getPhotoCoords(files)
    const urlsArr = await createBlobURLs(files)
    const filesArr = coordsArr.reduce((acc: INewPhoto[], curr, idx) => {
      return [...acc, { ...curr, ...urlsArr[idx], isPrivate: false }]
    }, [])
    setSelectedPhotos(filesArr)
    setIsLoadingPhotos(false)
  }

  const handleRemovePhoto = (idx: number) => {
    const copyArr = [...selectedPhotos]
    copyArr.splice(idx, 1)
    setSelectedPhotos(copyArr)
  }

  const handleSubmitPhotos = async () => {
    const formData = new FormData()
    selectedPhotos.forEach(photo => {
      formData.append("photos", photo.photoFile)
      formData.append("lat", photo.latitude.toString())
      formData.append("lng", photo.longitude.toString())
      formData.append("isPrivate", photo.isPrivate ? "true" : "")
    })
    try {
      setIsLoadingUpload(true)
      await uploadPhotos(formData)
      setIsLoadingUpload(false)
      setUploadStatus("created")
      setTimeout(() => {
        resetForm()
        //   dispatch(getMyPostsAction())
      }, 2000)
    } catch (error) {
      setIsLoadingUpload(false)
      console.log(error)
    }
  }

  return (
    <div className="UploadPhotos">
      <Button variant="warning" className="d-flex align-items-center" onClick={() => setShow(true)}>
        <AiOutlineUpload className="me-3" size={20} />
        Upload Photos
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end" className="UploadPhotosCanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="h2" className="text-center w-100">
            Upload Photos
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button
            size="sm"
            variant="secondary"
            className="d-flex align-items-center mx-auto upload-photos-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            <MdAddAPhoto className="me-3" size={20} />
            Select Photos
          </Button>

          {isLoadingPhotos && (
            <div className="text-center mt-3">
              <Spinner animation="border" />
              <p className="text-muted">Admiring your amazing photos... 👀</p>
            </div>
          )}
          <div className="d-flex justify-content-center flex-wrap">
            {selectedPhotos.map((photo, idx) => (
              <div key={idx} className="position-relative mt-3 mx-1">
                <img src={photo.blobURL} alt="thumbnail" height="150px" />

                <MdRemoveCircle size={20} className="remove-photo-btn" onClick={() => handleRemovePhoto(idx)} />
              </div>
            ))}
          </div>
        </Offcanvas.Body>
        {selectedPhotos.length > 0 &&
          (uploadStatus ? (
            <Button className="rounded-0" size="lg" variant="success">
              <FaCheck />
            </Button>
          ) : isLoadingUpload ? (
            <Button className="rounded-0 d-flex align-items-center justify-content-center" variant="warning" size="lg">
              <p className="m-0">Chewing your photos...</p>
              <div className="ms-4">
                <Spinner animation="border" size="sm"></Spinner>
              </div>
            </Button>
          ) : (
            <Button className="rounded-0 d-flex align-items-center justify-content-center" size="lg" onClick={handleSubmitPhotos}>
              <FiUpload className="me-3" />
              Submit Photos
            </Button>
          ))}
      </Offcanvas>
      <input type="file" ref={fileInputRef} multiple onChange={handleChoosePhotos} />
    </div>
  )
}

export default UploadPhotos
