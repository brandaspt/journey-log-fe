import { useEffect, useState } from "react"
import { Col, Container, Form, Row, Button } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getUserDataAction, userProfileStore } from "../../redux/user/userSlice"
import { updateUserDetails } from "../../utils/backend/endpoints"

import "./MyProfile.css"

export interface IUpdateUserDetails {
  bio?: string
  name?: string
  surname?: string
}

const MyProfile = () => {
  const userProfile = useAppSelector(userProfileStore)
  const [bio, setBio] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")

  const dispatch = useAppDispatch()

  const handleSaveBio = async () => {
    try {
      await updateUserDetails({ bio })
      dispatch(getUserDataAction())
    } catch (error) {
      console.log(error)
    }
  }
  const handleSaveNameSurname = async () => {
    try {
      await updateUserDetails({ name, surname })
      dispatch(getUserDataAction())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userProfile?.bio) setBio(userProfile?.bio)
    if (userProfile?.name) setName(userProfile?.name)
    if (userProfile?.surname) setSurname(userProfile?.surname)
  }, [userProfile])
  return (
    <Container className="MyProfile py-5">
      <Row className="gy-4">
        <Col xs={12} md={3} className="text-center">
          <img src={userProfile?.avatar} alt="user avatar" />
        </Col>
        <Col xs={12} md={9}>
          <Form.Group>
            <Form.Label>Bio:</Form.Label>
            <Form.Control as="textarea" placeholder="Say something about you" value={bio} onChange={e => setBio(e.target.value)} />
          </Form.Group>
          <Button size="sm" className="mt-2" onClick={handleSaveBio}>
            Save
          </Button>
        </Col>
      </Row>
      <hr />
      <Row className="gy-4">
        <Col xs={12} sm={6}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group>
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Your surname" value={surname} onChange={e => setSurname(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button size="sm" className="mt-2" onClick={handleSaveNameSurname}>
            Save
          </Button>
        </Col>
      </Row>
      <hr />
      <Row className="gy-4">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={userProfile?.email} disabled />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfile
