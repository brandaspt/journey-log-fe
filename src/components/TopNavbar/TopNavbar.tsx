import { useEffect } from "react"
import { Container, Nav, Navbar, NavDropdown, Button, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  getUserDataAction,
  logoutUserAction,
  userProfileStore,
  userLoadingStore,
  getMyPostsAction,
  getMyPhotosAction,
} from "../../redux/user/userSlice"
import { FaUserSecret } from "react-icons/fa"
import { GoDashboard } from "react-icons/go"
import { RiRoadMapLine } from "react-icons/ri"
import { IoShareSocialOutline } from "react-icons/io5"
import { BiLogOut } from "react-icons/bi"
import SearchUsers from "../SearchUsers/SearchUsers"
import "./TopNavbar.css"

const TopNavbar = () => {
  const userData = useAppSelector(userProfileStore)
  const userLoading = useAppSelector(userLoadingStore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserDataAction())
    dispatch(getMyPostsAction())
    dispatch(getMyPhotosAction())
  }, [dispatch])

  return (
    <Navbar fixed="top" className="p-0 TopNavbar">
      <Container fluid className="">
        <Navbar.Brand className="p-0 h100" as="div">
          <Link to="/">
            <img width="150px" src="/images/JourneyLogLogo.png" alt="" />
          </Link>
        </Navbar.Brand>
        <Nav className="ms-auto">
          {userLoading ? (
            <Spinner animation="border" />
          ) : userData ? (
            <div className="d-flex align-items-center">
              <SearchUsers />
              <NavDropdown align="end" title={<img className="avatar" src={userData.avatar} alt="avatar" />}>
                <Link to="/myProfile">
                  <NavDropdown.Item as="div">
                    <FaUserSecret />
                    <p>Profile</p>
                  </NavDropdown.Item>
                </Link>
                <Link to="/dashboard">
                  <NavDropdown.Item as="div">
                    <GoDashboard />
                    <p>Dashboard</p>
                  </NavDropdown.Item>
                </Link>
                <Link to={`/users/${userData._id}/map`}>
                  <NavDropdown.Item as="div">
                    <RiRoadMapLine />
                    <p>Map</p>
                  </NavDropdown.Item>
                </Link>
                <Link to="/friendsMap">
                  <NavDropdown.Item as="div">
                    <IoShareSocialOutline />
                    <p>Friends Map</p>
                  </NavDropdown.Item>
                </Link>
                <Link to="/">
                  <NavDropdown.Item as="div" className="p-0">
                    <Button
                      size="sm"
                      variant="danger"
                      className="w-100 d-flex align-items-center justify-content-center"
                      as="div"
                      onClick={() => {
                        dispatch(logoutUserAction())
                      }}
                    >
                      <BiLogOut className="me-2" />
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="warning">
                Login / Register
              </Button>
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default TopNavbar
