import { Route, Redirect } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userProfileStore } from "../../redux/user/userSlice"
import Dashboard from "../../views/Dashboard/Dashboard"
import Login from "../../views/Login/Login"
import MyProfile from "../../views/MyProfile/MyProfile"
import Post from "../../views/Post/Post"
import Register from "../../views/Register/Register"
import FriendsMap from "../FriendsMap/FriendsMap"
import Map from "../Map/Map"
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn"
import TopNavbar from "../TopNavbar/TopNavbar"
import "./App.css"

const App = () => {
  const userData = useAppSelector(userProfileStore)
  return (
    <div className="App">
      <Route path="/" component={TopNavbar} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/">
        {userData ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/dashboard" component={userData ? Dashboard : NotLoggedIn} />
      <Route path="/myProfile" component={userData ? MyProfile : NotLoggedIn} />
      <Route path="/friendsMap" component={userData ? FriendsMap : NotLoggedIn} />
      <Route path="/users/:userId/map" component={Map} />
      <Route path="/posts/:postId" component={Post} />
    </div>
  )
}

export default App
