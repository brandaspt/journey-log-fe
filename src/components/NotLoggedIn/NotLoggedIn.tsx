import { useAppSelector } from "../../redux/hooks"
import { userLoadingStore } from "../../redux/user/userSlice"
import "./NotLoggedIn.css"

const NotLoggedIn = () => {
  const userLoading = useAppSelector(userLoadingStore)

  if (userLoading) return <h2 className="mt-4">Loading...</h2>

  return (
    <div className="NotLoggedIn">
      <h3>Please log in to see content</h3>
    </div>
  )
}

export default NotLoggedIn
