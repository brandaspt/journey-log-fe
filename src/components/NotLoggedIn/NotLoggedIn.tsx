import { Spinner } from "react-bootstrap"
import { useAppSelector } from "../../redux/hooks"
import { userLoadingStore } from "../../redux/user/userSlice"
import "./NotLoggedIn.css"

const NotLoggedIn = () => {
  const userLoading = useAppSelector(userLoadingStore)

  if (userLoading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    )

  return (
    <div className="NotLoggedIn">
      <h3>Please log in to see content</h3>
    </div>
  )
}

export default NotLoggedIn
