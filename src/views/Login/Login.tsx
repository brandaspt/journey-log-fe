import { FormEvent, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { getUserData } from "../../redux/user/userSlice"
import { loginUser } from "../../utils/backend/endpoints"
import { FcGoogle } from "react-icons/fc"
import "./Login.css"

export interface ILoginCredentials {
  email: string
  password: string
}

const Login = () => {
  const [credentials, setCredentials] = useState<ILoginCredentials>({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const dispatch = useAppDispatch()

  const history = useHistory()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await loginUser(credentials)
      dispatch(getUserData())
      history.push("/dashboard")
    } catch (err) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            autoComplete="email"
            value={credentials.email}
            onChange={e => setCredentials({ ...credentials, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            value={credentials.password}
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          />
        </Form.Group>
        <div className="d-flex flex-column align-items-center">
          <Button variant="primary" type="submit">
            Login
          </Button>

          <Button variant="light" as="a" href={`${process.env.REACT_APP_BACKEND_URL}/auth/googleLogin`} className="mt-3 w-100 border">
            <FcGoogle className="me-3" size={22} />
            Login with Google
          </Button>

          {error && (
            <Alert className="p-1 mb-0 mt-3" variant="danger">
              {error}
            </Alert>
          )}
          <hr />
          <Button variant="secondary">Register</Button>
        </div>
      </Form>
    </div>
  )
}

export default Login
