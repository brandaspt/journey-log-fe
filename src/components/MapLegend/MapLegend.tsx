import "./MapLegend.css"

const MapLegend = ({ isMe }: { isMe: boolean }) => {
  return (
    <div className="MapLegend d-flex flex-column">
      <h6>Legend:</h6>
      {isMe && (
        <div className="d-flex align-items-center">
          <div className="icon-wrapper">
            <div className="marker-pin private"></div>
          </div>
          <p>Private</p>
        </div>
      )}
      {isMe && (
        <div className="d-flex align-items-center ">
          <div className="icon-wrapper">
            <div className="marker-pin public"></div>
          </div>
          <p>Public</p>
        </div>
      )}
      <div className="d-flex align-items-center">
        <div className="icon-wrapper">
          <i className="fas fa-camera"></i>
        </div>
        <p>Photo</p>
      </div>
      <div className="d-flex align-items-center">
        <div className="icon-wrapper">
          <i className="fas fa-anchor"></i>
        </div>
        <p>Post</p>
      </div>
    </div>
  )
}

export default MapLegend
