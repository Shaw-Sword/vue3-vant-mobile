import { defineStore } from 'pinia'
// import type { LoginData, UserState } from '@/api/user'
import { clearToken } from '@/utils/auth'
import type { Data } from '@suplink/jssdk/lib/types/apis/openApi/getUserInfo'
import { getUserInfo } from '@suplink/jssdk'
// import {
//   getEmailCode,
//   getUserInfo,
//   resetPassword,
//   login as userLogin,
//   logout as userLogout,
//   register as userRegister,
// } from '@/api/user'

// const InitUserInfo = {
//   uid: 0,
//   nickname: '',
//   avatar: '',
// }

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Partial<Data>>({})
  const appAlive = ref<boolean>(true)

  // Set user's information
  const setInfo = (partial: Partial<Data>) => {
    userInfo.value = { ...partial }
  }

  // const login = async (loginForm: LoginData) => {
  //   try {
  //     const { data } = await userLogin(loginForm)
  //     setToken(data.token)
  //   }
  //   catch (error) {
  //     clearToken()
  //     throw error
  //   }
  // }

  const info = async () => {
    try {
      const { data } = await getUserInfo()
      setInfo(data)
    }
    catch (error) {
      clearToken()
      throw error
    }
  }

  // const logout = async () => {
  //   try {
  //     await userLogout()
  //   }
  //   finally {
  //     clearToken()
  //     setInfo({ ...userInfo.value })
  //   }
  // }

  // const getCode = async () => {
  //   try {
  //     const data = await getEmailCode()
  //     return data
  //   }
  //   catch {}
  // }

  // const reset = async () => {
  //   try {
  //     const data = await resetPassword()
  //     return data
  //   }
  //   catch {}
  // }

  // const register = async () => {
  //   try {
  //     const data = await userRegister()
  //     return data
  //   }
  //   catch {}
  // }

  return {
    userInfo,
    setInfo,
    info,
    appAlive,
    // login,
    // logout,
    // getCode,
    // reset,
    // register,
  }
}, {
  persist: true,
})

export default useUserStore
