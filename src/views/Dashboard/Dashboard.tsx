import { useCallback, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import Greeting from "../../components/Greeting/Greeting"
import { useAppSelector } from "../../redux/hooks"
import { userFollowersStore, userFollowingStore, userMyPhotosStore, userMyPostsStore, userProfileStore } from "../../redux/user/userSlice"
import { IUser } from "../../types/users"
import { fetchUserPublicInfo } from "../../utils/backend/endpoints"

const Dashboard = () => {
  const followingIds = useAppSelector(userFollowingStore)
  const followersIds = useAppSelector(userFollowersStore)
  const myPosts = useAppSelector(userMyPostsStore)
  const myPhotos = useAppSelector(userMyPhotosStore)
  const myProfile = useAppSelector(userProfileStore)

  const [followingUsers, setFollowingUsers] = useState<IUser[]>([])
  const [followersUsers, setFollowersUsers] = useState<IUser[]>([])
  const [numOfStandalonePhotos, setNumOfStandalonePhotos] = useState<number | null>(null)
  const [numOfPostPhotos, setNumOfPostPhotos] = useState<number | null>(null)
  const [numOfPosts, setNumOfPosts] = useState<number | null>(null)

  const getFollowing = useCallback(async () => {
    const following = await Promise.all(followingIds!.map(id => fetchUserPublicInfo(id)))
    setFollowingUsers(following.flat(1))
  }, [followingIds])

  const getFollowers = useCallback(async () => {
    const followers = await Promise.all(followersIds!.map(id => fetchUserPublicInfo(id)))
    setFollowersUsers(followers.flat(1))
  }, [followersIds])

  useEffect(() => {
    if (myPhotos && myPosts) {
      getFollowing()
      getFollowers()
      setNumOfPosts(myPosts.length)
      setNumOfStandalonePhotos(myPhotos.length)
      setNumOfPostPhotos(myPosts.reduce((acc, curr) => acc + curr.photos.length, 0))
    }
    // eslint-disable-next-line
  }, [getFollowing, getFollowers])

  return (
    <Container className="Dashboard">
      <Greeting />
      <section className="stats-cards-wrapper"></section>
    </Container>
  )
}

export default Dashboard
