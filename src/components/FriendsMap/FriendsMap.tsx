import { v4 as uuidv4 } from "uuid"
import { useCallback, useEffect, useState } from "react"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useAppSelector } from "../../redux/hooks"
import { userFollowingStore } from "../../redux/user/userSlice"
import { IPhoto } from "../../types/photos"
import { IPost } from "../../types/posts"
import { fetchUserPublicInfo } from "../../utils/backend/endpoints"
import { maxBounds } from "../../utils/map"
import FriendsMapMarker from "../FriendsMapMarker/FriendsMapMarker"
import FriendsMapLegend from "../FriendsMapLegend/FriendsMapLegend"

const FriendsMap = () => {
  const following = useAppSelector(userFollowingStore)
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>([])
  const [allPosts, setAllPosts] = useState<IPost[]>([])

  const getPostsAndPhotos = useCallback(async () => {
    if (!following) return
    const usersData = await Promise.all(following?.map(userId => fetchUserPublicInfo(userId)))
    setAllPhotos(usersData.map(user => user.publicPhotos).flat(1))
    setAllPosts(usersData.map(user => user.publicPosts).flat(1))
  }, [following])

  useEffect(() => {
    getPostsAndPhotos()
  }, [getPostsAndPhotos])

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
              {allPosts.map(post => (
                <FriendsMapMarker key={post._id} content={post} type="post" />
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Photos" checked>
            <MarkerClusterGroup maxClusterRadius={35} key={uuidv4()}>
              {allPhotos.map(photo => (
                <FriendsMapMarker key={photo._id} content={photo} type="photo" />
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
      <FriendsMapLegend />
    </div>
  )
}

export default FriendsMap
