import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import qs from "qs"

const baseURL = process.env.NEXT_PUBLIC_API_URL

const apikey =
  Cookies.get("x-access-apikey") ||
  process.env.NEXT_PUBLIC_LOCAL_ACCESS_APIKEY ||
  ""

const token =
  Cookies.get("x-access-token") ||
  process.env.NEXT_PUBLIC_LOCAL_ACCESS_TOKEN ||
  ""

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "x-access-token": token,
    "x-access-apikey": apikey,
  },
})

const SnuttApi = {
  async get<R, T = any>(
    url: string,
    queryParams: T | undefined = undefined,
  ): Promise<R> {
    var path = url
    if (queryParams !== undefined) {
      path = `${url}?${qs.stringify(queryParams)}`
    }
    try {
      const result = await axiosInstance
        .get<R, AxiosResponse<R>, T>(path)
        .then((response) => response.data)
      return result
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },

  async post<R, T>(url: string, body: T): Promise<R> {
    try {
      return await axiosInstance
        .post<R, AxiosResponse<R>, T>(url, body)
        .then((response) => response.data)
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },

  async delete<R, T>(url: string, body: T): Promise<R> {
    try {
      return await axiosInstance
        .delete<R, AxiosResponse<R>, T>(url, body)
        .then((response) => response.data)
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },

  async put<R, T>(url: string, body: T): Promise<R> {
    try {
      return await axiosInstance
        .put<R, AxiosResponse<R>, T>(url, body)
        .then((response) => response.data)
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },
}

export default SnuttApi
