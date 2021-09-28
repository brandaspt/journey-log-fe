import { v4 as uuidv4 } from "uuid"
import { useCallback, useEffect, useState } from "react"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useAppSelector } from "../../redux/hooks"
import { userFollowingStore } from "../../redux/user/userSlice"
import { IPhoto } from "../../types/photos"
import { IPost } from "../../types/posts"
import { fetchSelectedUserPhotos, fetchSelectedUserPosts } from "../../utils/backend/endpoints"
import { maxBounds } from "../../utils/map"
import FriendsMapMarker from "../FriendsMapMarker/FriendsMapMarker"

const FriendsMap = () => {
  const following = useAppSelector(userFollowingStore)
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>([])
  const [allPosts, setAllPosts] = useState<IPost[]>([])

  const getAllPhotos = useCallback(async () => {
    if (!following) return
    const photos = await Promise.all(following?.map(userId => fetchSelectedUserPhotos(userId)))
    setAllPhotos(photos.flat(1))
  }, [following])

  const getAllPosts = useCallback(async () => {
    if (!following) return
    const posts = await Promise.all(following?.map(userId => fetchSelectedUserPosts(userId)))
    setAllPosts(posts.flat(1))
  }, [following])

  useEffect(() => {
    getAllPhotos()
    getAllPosts()
  }, [getAllPhotos, getAllPosts])

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

        <MarkerClusterGroup maxClusterRadius={35} key={uuidv4()}>
          {allPhotos.map(photo => (
            <FriendsMapMarker key={photo._id} content={photo} type="photo" />
          ))}
          {allPosts.map(post => (
            <FriendsMapMarker key={post._id} content={post} type="post" />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default FriendsMap