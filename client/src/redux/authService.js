import axios from 'axios'

export const BASE_URL = 'http://localhost:5000/api/'
export const authApi = axios.create({
    baseURL: BASE_URL,
})



authApi.defaults.headers.common['Content-Type'] = 'application/json'

const signUpUserFn = async user => {
    return authApi.post('/auth/register', user)
}

const loginUserFn = async user => {
    return authApi.post('/auth/login', user).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
    })
}

// export const verifyEmailFn = async confirmationCode => {
//     const response = await authApi.get(`user/confirm/${confirmationCode}`)
//     return response.data
// }

const logOutFn = ( ) => {
    localStorage.removeItem("user")
}


const authService = { signUpUserFn, loginUserFn, logOutFn }

export default authService
