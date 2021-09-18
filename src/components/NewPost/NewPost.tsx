import { LatLngTuple } from "leaflet"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { FormControl, InputGroup, Offcanvas, Button, Spinner } from "react-bootstrap"
import { FiUpload } from "react-icons/fi"
import { MdAddAPhoto, MdRemoveCircle } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import { Marker, useMap, useMapEvent } from "react-leaflet"
import { IPostPhotosArray } from "../../types/newPost"
import { newPost } from "../../utils/backend/endpoints"
import { createBlobURLs, getAddressFromCoords } from "../../utils/helpers/helpers"
import "./NewPost.css"

const NewPost = () => {
  const [currentLocation, setcurrentLocation] = useState<LatLngTuple | null>(null)
  const [address, setAddress] = useState({ level2: "", level1: "", country: "" })
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false)
  const [isLoadingNewPost, setIsLoadingNewPost] = useState(false)
  const [newPostStatus, setNewPostStatus] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postDescription, setPostDescription] = useState("")
  const [selectedPhotos, setSelectedPhotos] = useState<IPostPhotosArray>([])
  const [show, setShow] = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setAddress({ level2: "", level1: "", country: "" })
    setShow(false)
  }

  let _dblClickTimer: NodeJS.Timeout | null = null

  const map = useMap()

  useMapEvent("click", e => {
    if (_dblClickTimer !== null) {
      return
    }
    _dblClickTimer = setTimeout(() => {
      const lat = Number(e.latlng.lat.toFixed(4))
      const lng = Number(e.latlng.lng.toFixed(4))
      // real 'click' event handler here
      setcurrentLocation([lat, lng])
      setShow(true)
      _dblClickTimer = null
    }, 200)
  })

  useMapEvent("dblclick", () => {
    if (_dblClickTimer) clearTimeout(_dblClickTimer)
    _dblClickTimer = null
  })

  const getAddress = useCallback(async () => {
    setAddress(await getAddressFromCoords(currentLocation![0], currentLocation![1]))
  }, [currentLocation])

  const resetForm = () => {
    setcurrentLocation(null)
    setAddress({ level2: "", level1: "", country: "" })
    setNewPostStatus("")
    setPostTitle("")
    setPostDescription("")
    setSelectedPhotos([])
    setShow(false)
  }

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>, coord: string) => {
    if (coord === "lat") setcurrentLocation([Number(e.target.value), currentLocation![1]])
    else setcurrentLocation([currentLocation![0], Number(e.target.value)])
  }

  const handleSelectedPhotos = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setSelectedPhotos([])
    if (!files) return
    setIsLoadingPhotos(true)
    const photosArr = await createBlobURLs(files)
    setSelectedPhotos(photosArr)
    setIsLoadingPhotos(false)
  }

  const handleRemovePhoto = (idx: number) => {
    const copyArr = [...selectedPhotos]
    copyArr.splice(idx, 1)
    setSelectedPhotos(copyArr)
  }

  const handleSubmitPost = async () => {
    const formData = new FormData()
    selectedPhotos.forEach(photo => {
      formData.append("photos", photo.photoFile)
    })
    formData.append("lat", currentLocation![0].toString())
    formData.append("lng", currentLocation![1].toString())
    formData.append("title", postTitle)
    formData.append("description", postDescription)
    try {
      setIsLoadingNewPost(true)
      await newPost(formData)
      setIsLoadingNewPost(false)
      setNewPostStatus("created")
      setTimeout(() => {
        resetForm()
      }, 3000)
    } catch (error) {
      setIsLoadingNewPost(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!currentLocation) return
    getAddress()
    map.flyTo(currentLocation)
  }, [currentLocation, map, getAddress])

  return (
    currentLocation && (
      <>
        <Marker position={currentLocation}></Marker>
        <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "35vw" }} className="NewPostCanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title as="h2" className="text-center w-100">
              New Post
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h5 className="fw-bold">Current Location</h5>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                as="textarea"
                value={`${address.level2 ? `${address.level2}, ` : ""}${address.level1 ? `${address.level1}, ` : ""}${
                  address.country ? `${address.country}` : ""
                }`}
                readOnly
              />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Latitude:</InputGroup.Text>
              <FormControl
                type="number"
                value={currentLocation[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePositionChange(e, "lat")}
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Longitude:</InputGroup.Text>
              <FormControl
                type="number"
                value={currentLocation[1]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePositionChange(e, "lng")}
              />
            </InputGroup>
            <hr />
            <h5 className="fw-bold">Post Info</h5>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Title:</InputGroup.Text>
              <FormControl type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Description:</InputGroup.Text>
              <FormControl as="textarea" value={postDescription} onChange={e => setPostDescription(e.target.value)} />
            </InputGroup>
            <hr />
            <h5 className="fw-bold">Photos</h5>
            <input type="file" ref={fileRef} multiple onChange={handleSelectedPhotos} />
            <Button
              size="sm"
              variant="secondary"
              className="d-flex align-items-center mx-auto upload-photos-btn"
              onClick={() => fileRef.current?.click()}
            >
              <MdAddAPhoto className="me-3" size={20} />
              Select Photos
            </Button>
            {isLoadingPhotos && (
              <div className="text-center mt-3">
                <Spinner animation="border" />
                <p className="text-muted">Admiring your amazing photos...</p>
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
          {postTitle &&
            currentLocation &&
            selectedPhotos.length > 0 &&
            (newPostStatus ? (
              <Button className="rounded-0" size="lg" variant="success">
                <FaCheck />
              </Button>
            ) : isLoadingNewPost ? (
              <Button className="rounded-0 d-flex align-items-center justify-content-center" variant="warning" size="lg">
                Chewing your photos...
              </Button>
            ) : (
              <Button className="rounded-0 d-flex align-items-center justify-content-center" size="lg" onClick={handleSubmitPost}>
                <FiUpload className="me-3" />
                Create Post
              </Button>
            ))}
        </Offcanvas>
      </>
    )
  )
}

export default NewPost
