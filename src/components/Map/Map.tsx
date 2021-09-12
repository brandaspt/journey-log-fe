import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import AddPhotosModal from "../AddPhotosModal/AddPhotosModal"
import "./Map.css"

const Map = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />

      <AddPhotosModal />
    </MapContainer>
  )
}

export default Map
