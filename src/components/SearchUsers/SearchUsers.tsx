import { useEffect, useState } from "react"
import { FormControl } from "react-bootstrap"
import { useHistory } from "react-router"
import { IUser } from "../../types/users"
import { searchUsers } from "../../utils/backend/endpoints"
import "./SearchUsers.css"

const SearchUsers = () => {
  const [results, setResults] = useState<IUser[]>([])
  const [query, setQuery] = useState<string>("")
  const history = useHistory()

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
            <div key={user._id} className="d-flex align-items-center" onClick={() => history.push(`/users/${user._id}/map`)}>
              <img src={user.avatar} alt="user avatar" />
              <p className="m-0 mx-2">
                {user.name} {user.surname}
              </p>
              <button className="follow-btn">Follow</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchUsers
