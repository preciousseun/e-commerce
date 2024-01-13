// actions for login , register, logout
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'
import { setMessage } from './message'

// assume we are getting data from localstorage
const user = JSON.parse(localStorage.getItem('user'))

export const signUpUser = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.signUpUserFn(userData)
            thunkAPI.dispatch(response.data.message)
            return response.data
        } catch (error) {
            const status = error.response.status
            let message
            if (status === 404) {
                message = error.response.data.message
            } else if (status === 400) {
                message = 'User already exists'
            } else {
                message = 'created'
            }

            thunkAPI.dispatch(setMessage(message))
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.loginUserFn(userData)
            return response.data
        } catch (error) {
            const status = error.response.status
            const message =
                status === 401
                    ? 'Invalid Credentials'
                    : 'Please Enter email and password'
            thunkAPI.dispatch(setMessage(message))
            return thunkAPI.rejectWithValue()
        }
    },
)

export const logOutUser = createAsyncThunk("auth/logout", async () => {
    await authService.logOutFn()
})

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(signUpUser.fulfilled, state => {
                state.isLoggedIn = false
            })
            .addCase(signUpUser.rejected, state => {
                state.isLoggedIn = false
            })

        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.user = action.payload.user
            })
            .addCase(loginUser.rejected, state => {
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(logOutUser.fulfilled, state => {
                state.isLoggedIn = false
                state.user = null
            })
    },
})

const { reducer } = authSlice
export default reducer
