import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { userProfileStore } from "../../redux/user/userSlice"
import "./Greeting.css"

const Greeting = () => {
  const [hour, setHour] = useState<number | null>(null)
  const [show, setShow] = useState(false)
  const userData = useAppSelector(userProfileStore)

  const getHour = () => {
    const date = new Date()
    const hour = date.getHours()
    setHour(hour)
  }

  const getGreeting = () => {
    if (hour) {
      if (hour > 12 && hour < 17) return "Good Afternoon"
      if (hour >= 17 && hour < 22) return "Good Evening"
      if (hour >= 22 || hour < 6) return "Good Night"
      return "Good Morning"
    }
  }

  useEffect(() => {
    getHour()
    const timer = setTimeout(() => {
      setShow(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <h3 className={show ? "Greeting show" : "Greeting"}>
      {getGreeting()}, <span>{userData?.name}</span>
    </h3>
  )
}

export default Greeting
