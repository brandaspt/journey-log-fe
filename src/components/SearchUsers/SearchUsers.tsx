import { useEffect, useState } from "react"
import { FormControl } from "react-bootstrap"
import { useHistory } from "react-router"
import { useAppSelector } from "../../redux/hooks"
import { userProfileStore } from "../../redux/user/userSlice"
import { IUser } from "../../types/users"
import { searchUsers } from "../../utils/backend/endpoints"
import FollowBtn from "../FollowBtn/FollowBtn"
import UnfollowBtn from "../UnfollowBtn/UnfollowBtn"
import "./SearchUsers.css"

const SearchUsers = () => {
  const [results, setResults] = useState<IUser[]>([])
  const [query, setQuery] = useState<string>("")
  const history = useHistory()

  const userData = useAppSelector(userProfileStore)

  useEffect(() => {
    if (query.length < 3) setResults([])
    else {
      const getUsers = async () => {
        const users = await searchUsers(query)
        setResults(users)
      }
      getUsers()
    }
  }, [query])

  return (
    <div className="SearchUsers position-relative">
      <FormControl
        type="search"
        size="sm"
        placeholder="Search Users"
        className="me-3"
        aria-label="Search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map(user => (
            <div key={user._id} className="d-flex align-items-center">
              <img src={user.avatar} alt="user avatar" />
              <p
                className="m-0 mx-2"
                onClick={() => {
                  setQuery("")
                  history.push(`/users/${user._id}/map`)
                }}
              >
                {user.name} {user.surname}
              </p>
              {user._id === userData?._id ? (
                <></>
              ) : userData?.following.includes(user._id) ? (
                <UnfollowBtn userId={user._id} />
              ) : (
                <FollowBtn userId={user._id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchUsers
