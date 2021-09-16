import { Route } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { userDataStore } from "../../redux/user/userSlice"
import Dashboard from "../../views/Dashboard/Dashboard"
import Home from "../../views/Home/Home"
import Login from "../../views/Login/Login"
import Map from "../Map/Map"
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn"
import TopNavbar from "../TopNavbar/TopNavbar"
import "./App.css"

function App() {
  const userData = useAppSelector(userDataStore)
  return (
    <div className="App">
      <Route path="/" component={TopNavbar} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={userData ? Dashboard : NotLoggedIn} />
      <Route path="/users/map/:userId" component={userData ? Map : NotLoggedIn} />
    </div>
  )
}

export default App
