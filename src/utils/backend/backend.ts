import axios, { AxiosError, AxiosResponse } from "axios"
import { refreshTokens } from "./endpoints"

const baseURL = process.env.REACT_APP_BACKEND_URL

// Axios instance
const backend = axios.create({ baseURL, withCredentials: true })

backend.interceptors.response.use(
  (response: AxiosResponse) => Promise.resolve(response),
  async (error: AxiosError) => {
    if (!error.response) return Promise.reject(error)
    const failedRequest = error.config

    if (error.response.status === 401 && failedRequest.url !== "/auth/refreshTokens") {
      await refreshTokens()
      return backend(failedRequest)
    } else return Promise.reject(error)
  }
)

export default backend
