import authApi from 'api/authApi'
import userApi from 'api/userApi'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

export const login = createAsyncThunk(
    'users/login',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await authApi.login(payload)
            localStorage.setItem('access_token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            return data.user
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const update = createAsyncThunk(
    'users/update',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await userApi.updateInfoUser(payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${localStorage.getItem(
                        'access_token'
                    )}`
                }
            })
            localStorage.setItem('user', JSON.stringify(data.message))
            return data.message
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: JSON.parse(localStorage.getItem('user')) || {}
    },
    reducers: {
        logout(state) {
            localStorage.removeItem('user')
            localStorage.removeItem('access_token')
            state.profile = {}
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.profile = action.payload
        },
        [update.fulfilled]: (state, action) => {
            state.profile = action.payload
        }
    }
})
const { reducer, actions } = userSlice
export const { logout } = actions
export default reducer