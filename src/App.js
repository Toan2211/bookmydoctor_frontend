import 'react-toastify/dist/ReactToastify.css'
import { createContext, React, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import RoutesComponent from 'routes'
import './_setting.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifies } from 'components/Header/components/Notification/notificationSlice'
import { io } from 'socket.io-client'
import SocketClient from 'SocketClient'
export const SocketContext = createContext()
function App() {
    const token = localStorage.getItem('access_token')
    const { user } = useSelector(state => state)
    const dispatch = useDispatch()

    const socket = useMemo(() => io('https://bookmydoctor.onrender.com', { transports: ['websocket'] }), [])
    useEffect(() => {
        if (token) {
            dispatch(
                getNotifies({ userId: user.profile.id, token: token })
            )
        }
    }, [user, token, dispatch])
    return (
        <SocketContext.Provider value={socket}>
            <div className="App">
                <div className="render__app_test">Render App</div>
                <ToastContainer />
                <RoutesComponent />
                {token && <SocketClient />}
            </div>
        </SocketContext.Provider>
    )
}

export default App
