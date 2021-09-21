import { Button } from "react-bootstrap"
import { MdAddAPhoto } from "react-icons/md"
import "./UploadPhotos.css"

const UploadPhotos = () => {
  return (
    <div className="UploadPhotos">
      <Button variant="warning" className="d-flex align-items-center" onClick={e => e.stopPropagation()}>
        <MdAddAPhoto className="me-3" size={20} />
        Upload Photos
      </Button>
    </div>
  )
}

export default UploadPhotos
