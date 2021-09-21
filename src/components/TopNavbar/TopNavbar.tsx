import { useEffect } from "react"
import { Container, Nav, Navbar, NavDropdown, Button, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getUserDataAction, logoutUserAction, userProfileStore, userLoadingStore } from "../../redux/user/userSlice"
import backend from "../../utils/backend/backend"
import "./TopNavbar.css"

const TopNavbar = () => {
  const userData = useAppSelector(userProfileStore)
  const userLoading = useAppSelector(userLoadingStore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserDataAction())
  }, [dispatch])

  return (
    <Navbar fixed="top" className="p-0 TopNavbar">
      <Container fluid className="">
        <Navbar.Brand className="p-0 h100" as="div">
          <Link to="/">
            <img width="150px" src="/JourneyLogLogo.png" alt="" />
          </Link>
        </Navbar.Brand>
        <Nav className="ms-auto">
          {userLoading ? (
            <Spinner animation="border" />
          ) : userData ? (
            <NavDropdown align="end" title={<img className="avatar" src={userData.avatar} alt="avatar" />}>
              <NavDropdown.Item
                as="div"
                onClick={async () => {
                  const resp = await backend.get("/users/me")
                  console.log(resp)
                }}
              >
                My Profile
              </NavDropdown.Item>
              <Link to={`/users/${userData._id}/map`}>
                <NavDropdown.Item as="div">My Map</NavDropdown.Item>
              </Link>
              <Link to="/dashboard">
                <NavDropdown.Item as="div">My Dashboard</NavDropdown.Item>
              </Link>
              <Link to="/">
                <NavDropdown.Item as="div" className="p-0">
                  <Button
                    size="sm"
                    variant="danger"
                    className="w-100 "
                    onClick={() => {
                      dispatch(logoutUserAction())
                    }}
                  >
                    Logout
                  </Button>
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="warning">
                Login
              </Button>
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default TopNavbar
