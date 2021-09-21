import { LatLngBounds } from "leaflet"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, LayersControl } from "react-leaflet"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getSelectedUserPostsAction, selectedUserPostsStore } from "../../redux/posts/postsSlice"
import { getMyPostsAction, userMyPostsStore, userProfileStore } from "../../redux/user/userSlice"
import NewPost from "../NewPost/NewPost"
import PostMarker from "../PostMarker/PostMarker"
import UploadPhotos from "../UploadPhotos/UploadPhotos"
import "./Map.css"

const maxBounds = new LatLngBounds([-85, -180], [85, 180])

const Map = () => {
  const [isMe, setIsMe] = useState(false)
  const userData = useAppSelector(userProfileStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const selectedUserPosts = useAppSelector(selectedUserPostsStore)
  const dispatch = useAppDispatch()
  const params = useParams<{ userId: string }>()

  useEffect(() => {
    setIsMe(params.userId === userData?._id)
  }, [userData?._id, params.userId])

  useEffect(() => {
    if (isMe) dispatch(getMyPostsAction())
    else dispatch(getSelectedUserPostsAction(params.userId))
  }, [dispatch, params.userId, isMe])

  return (
    <div className="position-relative">
      <MapContainer center={[11.178, 10.898]} zoom={3} minZoom={2} maxBounds={maxBounds}>
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

        {isMe
          ? myPosts.map(post => <PostMarker key={post._id} post={post} />)
          : selectedUserPosts.map(post => <PostMarker key={post._id} post={post} />)}
      </MapContainer>
      {isMe && <UploadPhotos />}
    </div>
  )
}

export default Map
