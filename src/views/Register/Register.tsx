import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { getMyPhotosAction, getMyPostsAction, getUserDataAction } from "../../redux/user/userSlice"
import { emailExists, registerUser } from "../../utils/backend/endpoints"
import RegisterImg from "../../images/Register.png"

import "./Register.css"

export interface IRegisterDetails {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword?: string
}

const Register = () => {
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [formInfo, setFormInfo] = useState<IRegisterDetails>({ name: "", surname: "", email: "", password: "", confirmPassword: "" })
  const [validEmail, setValidEmail] = useState(true)

  const history = useHistory()

  const dispatch = useAppDispatch()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setFormInfo(prev => ({ ...prev, [field]: e.target.value }))
    if (field === "email" && !validEmail) setValidEmail(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (formInfo.password !== formInfo.confirmPassword) return

    try {
      const exists = await emailExists(formInfo.email)
      if (exists) {
        setValidEmail(false)
        return
      }

      const payload = { ...formInfo }
      delete payload.confirmPassword
      await registerUser(payload)
      dispatch(getUserDataAction())
      dispatch(getMyPostsAction())
      dispatch(getMyPhotosAction())
      history.push("/dashboard")
    } catch (error) {}
  }

  useEffect(() => {
    setPasswordsMatch(formInfo.password === formInfo.confirmPassword)
  }, [formInfo.password, formInfo.confirmPassword])

  return (
    <Container className="Register py-4">
      <h3 className="text-center py-3">Create Account</h3>
      <div className="text-center">
        <img src={RegisterImg} alt="register" width="200px" />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
                value={formInfo.name}
                onChange={e => handleInputChange(e as ChangeEvent<HTMLInputElement>, "name")}
              />
              <Form.Text className="text-muted">Required</Form.Text>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your surname"
                onChange={e => handleInputChange(e as ChangeEvent<HTMLInputElement>, "surname")}
              />
              <Form.Text className="text-muted">Required</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                onChange={e => handleInputChange(e as ChangeEvent<HTMLInputElement>, "email")}
              />
              {!validEmail ? (
                <Form.Text className="text-danger">Email already exists</Form.Text>
              ) : (
                <Form.Text className="text-muted">Valid email required</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Choose a password"
                onChange={e => handleInputChange(e as ChangeEvent<HTMLInputElement>, "password")}
              />
              {formInfo.password.length === 0 ? (
                <Form.Text className="text-muted">Required</Form.Text>
              ) : passwordsMatch ? (
                <Form.Text className="text-success">Passwords match</Form.Text>
              ) : (
                <Form.Text className="text-danger">Passwords do not match</Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm your password"
                onChange={e => handleInputChange(e as ChangeEvent<HTMLInputElement>, "confirmPassword")}
              />
              {formInfo.confirmPassword?.length === 0 ? (
                <Form.Text className="text-muted">Required</Form.Text>
              ) : passwordsMatch ? (
                <Form.Text className="text-success">Passwords match</Form.Text>
              ) : (
                <Form.Text className="text-danger">Passwords do not match</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <button type="submit" className="main-btn register-btn">
            Register
          </button>
        </div>
      </Form>
    </Container>
  )
}

export default Register
