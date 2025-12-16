import axios from "axios"

/**
 * Gets the base URL for the backend API from environment variables.
 * 
 * In production (Vercel), set REACT_APP_API_URL to your Railway backend URL.
 * For local development, you can set it in a .env file or it will default to localhost:5000.
 * 
 * @throws {Error} In development mode, throws an error if REACT_APP_API_URL is not set
 * @returns {string} The base URL for the API
 */
const getBaseURL = () => {
  const apiUrl = process.env.REACT_APP_API_URL

  // In development, throw a clear error if missing for easy debugging
  if (process.env.NODE_ENV === "development" && !apiUrl) {
    throw new Error(
      "REACT_APP_API_URL is not set. " +
      "Please create a .env file in the frontend directory with: REACT_APP_API_URL=http://localhost:5000"
    )
  }

  // In production, require the env variable
  if (process.env.NODE_ENV === "production" && !apiUrl) {
    throw new Error(
      "REACT_APP_API_URL is required in production. " +
      "Please set it in your Vercel environment variables to your Railway backend URL."
    )
  }

  return apiUrl
}

/**
 * Axios instance configured with the backend API base URL.
 * The base URL is read from REACT_APP_API_URL environment variable.
 * 
 * @type {import('axios').AxiosInstance}
 */
const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Performs a GET request to the API.
 * 
 * @param {string} endpoint - The API endpoint (e.g., "/movies/all")
 * @param {import('axios').AxiosRequestConfig} [config] - Optional axios config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const get = async (endpoint, config = {}) => {
  return apiClient.get(endpoint, config)
}

/**
 * Performs a POST request to the API.
 * 
 * @param {string} endpoint - The API endpoint (e.g., "/reviewers/register")
 * @param {any} data - The request body data
 * @param {import('axios').AxiosRequestConfig} [config] - Optional axios config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const post = async (endpoint, data = {}, config = {}) => {
  return apiClient.post(endpoint, data, config)
}

/**
 * Performs a PUT request to the API.
 * 
 * @param {string} endpoint - The API endpoint
 * @param {any} data - The request body data
 * @param {import('axios').AxiosRequestConfig} [config] - Optional axios config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const put = async (endpoint, data = {}, config = {}) => {
  return apiClient.put(endpoint, data, config)
}

/**
 * Performs a DELETE request to the API.
 * 
 * @param {string} endpoint - The API endpoint
 * @param {import('axios').AxiosRequestConfig} [config] - Optional axios config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const del = async (endpoint, config = {}) => {
  return apiClient.delete(endpoint, config)
}

/**
 * The configured axios instance for advanced usage.
 * 
 * @type {import('axios').AxiosInstance}
 */
export default apiClient

