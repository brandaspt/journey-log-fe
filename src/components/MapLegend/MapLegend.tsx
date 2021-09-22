import "./MapLegend.css"

const MapLegend = () => {
  return (
    <div className="MapLegend d-flex flex-column">
      <div className="d-flex align-items-center">
        <div className="marker-pin private"></div>
        <p>Private</p>
      </div>
      <div className="d-flex align-items-center mt-2">
        <div className="marker-pin public"></div>
        <p>Public</p>
      </div>
    </div>
  )
}

export default MapLegend
