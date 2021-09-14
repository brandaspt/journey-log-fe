import { useEffect } from "react"
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getUserData, logoutAction, userDataStore } from "../../redux/user/userSlice"
import backend from "../../utils/backend/backend"
import "./TopNavbar.css"

const TopNavbar = () => {
  const userData = useAppSelector(userDataStore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  return (
    <div className="TopNavbar wrapper">
      <Navbar fixed="top" className="p-0">
        <Container fluid>
          <Navbar.Brand className="p-0" as="div">
            <Link to="/">
              <img width="200" src="/JourneyLogLogo.png" alt="" />
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            {userData ? (
              <NavDropdown align="end" title={<img className="avatar" src={userData.avatar} alt="avatar" />}>
                <NavDropdown.Item
                  as="div"
                  onClick={async () => {
                    const resp = await backend.get("/users/me")
                    console.log(resp)
                  }}
                >
                  Profile
                </NavDropdown.Item>
                <Link to="/users/map/me">
                  <NavDropdown.Item as="div">My Map</NavDropdown.Item>
                </Link>
                <Link to="/">
                  <NavDropdown.Item as="div" className="p-0">
                    <Button
                      size="sm"
                      variant="danger"
                      className="w-100"
                      onClick={() => {
                        dispatch(logoutAction())
                      }}
                    >
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="primary">
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default TopNavbar
