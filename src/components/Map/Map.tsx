import { v4 as uuidv4 } from "uuid"
import { useEffect } from "react"
import { MapContainer, TileLayer, LayersControl } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getSelectedUserData, selectedUserPublicDataStore } from "../../redux/selectedUser/selectedUserSlice"
import { getMyPhotosAction, getMyPostsAction, userMyPhotosStore, userMyPostsStore, userProfileStore } from "../../redux/user/userSlice"
import MapLegend from "../MapLegend/MapLegend"
import NewPost from "../NewPost/NewPost"
import MapMarker from "../MapMarker/MapMarker"
import UploadPhotos from "../UploadPhotos/UploadPhotos"
import { maxBounds } from "../../utils/map"
import UserCard from "../UserCard/UserCard"

import "./Map.css"

const Map = () => {
  const userData = useAppSelector(userProfileStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const myPhotos = useAppSelector(userMyPhotosStore)
  const selectedUserData = useAppSelector(selectedUserPublicDataStore)
  const dispatch = useAppDispatch()

  const params = useParams<{ userId: string }>()
  const isMe = params.userId === userData?._id

  useEffect(() => {
    dispatch(getSelectedUserData(params.userId))
    if (isMe) {
      dispatch(getMyPhotosAction())
      dispatch(getMyPostsAction())
    }
  }, [params.userId, dispatch, isMe])

  return (
    <div className="position-relative">
      <MapContainer center={[30.178, 10.898]} zoom={2.5} minZoom={2} maxBounds={maxBounds}>
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="Smooth Light">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Smooth Dark">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Outdoors">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Posts" checked>
            <MarkerClusterGroup maxClusterRadius={35} key={uuidv4()}>
              {isMe
                ? myPosts.map(post => <MapMarker key={post._id} content={post} type="post" />)
                : selectedUserData?.publicPosts.map(post => <MapMarker key={post._id} content={post} type="post" />)}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Photos" checked>
            <MarkerClusterGroup maxClusterRadius={35} key={uuidv4()}>
              {isMe
                ? myPhotos.map(photo => <MapMarker key={photo._id} content={photo} type="photo" />)
                : selectedUserData?.publicPhotos.map(photo => <MapMarker key={photo._id} content={photo} type="photo" />)}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {isMe && <NewPost />}
      </MapContainer>
      {isMe && <UploadPhotos />}
      <MapLegend isMe={isMe} />
      {!isMe && selectedUserData && (
        <div className="user-widget">
          <UserCard userId={selectedUserData.publicProfile._id} />
        </div>
      )}
    </div>
  )
}

export default Map
