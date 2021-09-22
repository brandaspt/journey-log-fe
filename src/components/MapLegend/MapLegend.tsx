import "./MapLegend.css"

const MapLegend = () => {
  return (
    <div className="MapLegend d-flex flex-column">
      <div className="d-flex align-items-center">
        <div style={{ backgroundColor: "#c30b82" }} className="marker-pin"></div>
        <p>Private</p>
      </div>
      <div className="d-flex align-items-center mt-2">
        <div style={{ backgroundColor: "#005eff" }} className="marker-pin"></div>
        <p>Public</p>
      </div>
    </div>
  )
}

export default MapLegend
