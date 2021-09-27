import { Route } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userProfileStore } from "../../redux/user/userSlice"
import Dashboard from "../../views/Dashboard/Dashboard"
import Home from "../../views/Home/Home"
import Login from "../../views/Login/Login"
import FriendsMap from "../FriendsMap/FriendsMap"
import Map from "../Map/Map"
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn"
import TopNavbar from "../TopNavbar/TopNavbar"
import "./App.css"

function App() {
  const userData = useAppSelector(userProfileStore)
  return (
    <div className="App">
      <Route path="/" component={TopNavbar} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={userData ? Dashboard : NotLoggedIn} />
      <Route path="/friendsMap" component={userData ? FriendsMap : NotLoggedIn} />
      <Route path="/users/:userId/map" component={Map} />
    </div>
  )
}

export default App
