import { LatLngTuple } from "leaflet"
import { ChangeEvent, useEffect, useState } from "react"
import { FormControl, InputGroup, Offcanvas } from "react-bootstrap"
import { Marker, useMap, useMapEvent } from "react-leaflet"
import { IGeocodingResponse } from "../../types/geocoding"

const AddPhotosModal = () => {
  const [clickedPosition, setClickedPosition] = useState<LatLngTuple | null>(null)
  const [address, setAddress] = useState({ level2: "", level1: "", country: "" })
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

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
      setClickedPosition([lat, lng])
      setShow(true)
      _dblClickTimer = null
    }, 200)
  })

  useMapEvent("dblclick", () => {
    if (_dblClickTimer) clearTimeout(_dblClickTimer)
    _dblClickTimer = null
  })

  const getAddress = async (lat: number, long: number) => {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env
        .REACT_APP_GOOGLE_GEOCODING_API_KEY!}&result_type=country|administrative_area_level_1|administrative_area_level_2`
    )
    const body: IGeocodingResponse = await resp.json()
    console.log(body.results[0])
    if (body.results.length > 0) {
      body.results[0].address_components.forEach(comp => {
        if (comp.types.includes("administrative_area_level_2")) setAddress(prevState => ({ ...prevState, level2: comp.long_name }))
        if (comp.types.includes("administrative_area_level_1")) setAddress(prevState => ({ ...prevState, level1: comp.long_name }))
        if (comp.types.includes("country")) setAddress(prevState => ({ ...prevState, country: comp.long_name }))
      })

      // const city = body.results[0].address_components[2] ? body.results[0].address_components[2].long_name : ""
      // const country = body.results[0].address_components[4] ? body.results[0].address_components[4].long_name : ""
      // setAddress({ country, city })
    }
  }

  useEffect(() => {
    if (!clickedPosition) return
    getAddress(clickedPosition[0], clickedPosition[1])
    map.flyTo(clickedPosition)
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
            <h5>Clicked Location</h5>
            <InputGroup size="sm" className="mb-3">
              <FormControl as="textarea" value={`${address.level2}, ${address.level1}, ${address.country}`} readOnly />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text>Latitude:</InputGroup.Text>
              <FormControl
                type="number"
                value={clickedPosition[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePositionChange(e, "lat")}
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
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
