
// axiosSecure.ts
import axios from "axios"
import ReduxAuthHoook from "../Hooks/ReduxAuthHoook"





const baseURL = "http://localhost:5000"

export const AxiosSequre = () => {

    const user = ReduxAuthHoook()
    console.log(user,"auth redux")


    const instance = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    })

    // REQUEST INTERCEPTOR
    instance.interceptors.request.use(
        (config) => {
            if (user?.tokens && config.headers) {
                config.headers.Authorization = `Bearar ${user.tokens}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    // RESPONSE INTERCEPTOR
    // instance.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //         const originalRequest = error.config
    //         // token expired → 401
    //         if (error?.response?.data?.message == "jwt expired") {

    //             const res = await axios.post(`${baseURL}auth/refresh`, { refreshToken: user?.refreshToken })

    //             const newToken = res?.data?.data?.newAccessToken
    //             const refreshToken = res?.data?.data?.newRefreshToken

    //             diptach(setTokens({ accessToken: newToken, refreshToken }))
    //             originalRequest.headers.Authorization = `${newToken}`

    //         }

    //         return Promise.reject(error)
    //     }
    // )

    return instance
}