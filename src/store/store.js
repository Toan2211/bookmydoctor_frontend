import userReducer from 'pages/Auth/userSlice'
import notificationReducer from 'components/Header/components/Notification/notificationSlice'
const { configureStore } = require('@reduxjs/toolkit')
const rootReducer = {
    user: userReducer,
    notification: notificationReducer
}
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
export default store
