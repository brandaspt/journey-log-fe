import L, { LatLngBounds } from "leaflet"
import { v4 as uuidv4 } from "uuid"
import { useEffect } from "react"
import { MapContainer, TileLayer, LayersControl } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getSelectedUserPostsAction, selectedUserPostsStore } from "../../redux/posts/postsSlice"
import { userMyPhotosStore, userMyPostsStore, userProfileStore } from "../../redux/user/userSlice"
import MapLegend from "../MapLegend/MapLegend"
import NewPost from "../NewPost/NewPost"
import MapMarker from "../MapMarker/MapMarker"
import UploadPhotos from "../UploadPhotos/UploadPhotos"
import { getSelectedUserPhotosAction, selectedUserPhotosStore } from "../../redux/photos/photosSlice"
import "./Map.css"

const maxBounds = new LatLngBounds([-85, -180], [85, 180])

const Map = () => {
  const userData = useAppSelector(userProfileStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const myPhotos = useAppSelector(userMyPhotosStore)
  const selectedUserPosts = useAppSelector(selectedUserPostsStore)
  const selectedUserPhotos = useAppSelector(selectedUserPhotosStore)
  const dispatch = useAppDispatch()

  const params = useParams<{ userId: string }>()
  const isMe = params.userId === userData?._id

  useEffect(() => {
    dispatch(getSelectedUserPostsAction(params.userId))
    dispatch(getSelectedUserPhotosAction(params.userId))
    L.markerClusterGroup().clearLayers()
  }, [dispatch, params.userId, isMe])

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
        </LayersControl>

        {isMe && <NewPost />}

        <MarkerClusterGroup maxClusterRadius={35} key={uuidv4()}>
          {isMe
            ? myPosts.map(post => <MapMarker key={post._id} content={post} type="post" />)
            : selectedUserPosts.map(post => <MapMarker key={post._id} content={post} type="post" />)}
          {isMe
            ? myPhotos.map(photo => <MapMarker key={photo._id} content={photo} type="photo" />)
            : selectedUserPhotos.map(photo => <MapMarker key={photo._id} content={photo} type="photo" />)}
        </MarkerClusterGroup>
      </MapContainer>
      {isMe && <UploadPhotos />}
      {isMe && <MapLegend />}
    </div>
  )
}

export default Map
