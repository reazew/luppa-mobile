import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { router } from 'expo-router'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_DEV_URL,
})

api.interceptors.request.use(
  async (config) => {
    console.log({ url: config.url, method: config.method })
    const token = await AsyncStorage.getItem('token')
    // console.log({ tokenAxios: token });
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error.response)
    if (error.response.status === 401) {
      await AsyncStorage.removeItem('token')
      router.replace('/(public)/(login)')
    }

    return Promise.reject(error)
  }
)

export { api }
