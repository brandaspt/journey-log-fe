import { LatLngTuple } from "leaflet"
import { ChangeEvent, useEffect, useState } from "react"
import { FormControl, InputGroup, Offcanvas } from "react-bootstrap"
import { Marker, useMapEvent } from "react-leaflet"

const AddPhotosModal = () => {
  const [clickedPosition, setClickedPosition] = useState<LatLngTuple | null>(null)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const map = useMapEvent("click", e => {
    setClickedPosition([Number(e.latlng.lat.toFixed(4)), Number(e.latlng.lng.toFixed(4))])
    setShow(true)
  })

  useEffect(() => {
    clickedPosition && map.flyTo(clickedPosition)
  }, [clickedPosition, map])

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>, coord: string) => {
    if (coord === "lat") setClickedPosition([Number(e.target.value), clickedPosition![1]])
    else setClickedPosition([clickedPosition![0], Number(e.target.value)])
  }

  return (
    clickedPosition && (
      <>
        <Marker position={clickedPosition}></Marker>
        <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "35vw" }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title as="h2">Add Photos</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h4>Clicked Location</h4>
            <InputGroup className="mb-3">
              <InputGroup.Text>Latitude:</InputGroup.Text>
              <FormControl
                type="number"
                value={clickedPosition[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePositionChange(e, "lat")}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Longitude:</InputGroup.Text>
              <FormControl
                type="number"
                value={clickedPosition[1]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePositionChange(e, "lng")}
              />
            </InputGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  )
}

export default AddPhotosModal
