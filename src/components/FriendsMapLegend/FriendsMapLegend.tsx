const FriendsMapLegend = () => {
  return (
    <div>
      <div className="MapLegend d-flex flex-column">
        <h6>Legend:</h6>

        <div className="d-flex align-items-center">
          <div className="icon-wrapper">
            <div className="marker-pin private"></div>
          </div>
          <p>Post</p>
        </div>

        <div className="d-flex align-items-center ">
          <div className="icon-wrapper">
            <div className="marker-pin public"></div>
          </div>
          <p>Photo</p>
        </div>
      </div>
    </div>
  )
}

export default FriendsMapLegend
