import 'react-toastify/dist/ReactToastify.css'
import { React, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import RoutesComponent from 'routes'
import './_setting.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifies } from 'components/Header/components/Notification/notificationSlice'
function App() {
    const token = localStorage.getItem('access_token')
    const { user } = useSelector(state => state)
    const dispatch = useDispatch()

    // const socket = useMemo(() => io('localhost:3001', { transports: ['websocket'] }), [])
    useEffect(() => {
        if (token) {
            dispatch(
                getNotifies({ userId: user.profile.id, token: token })
            )
        }
    }, [user, token, dispatch])
    return (
        <div className="App">
            <div className='render__app_test'>Render App</div>
            <ToastContainer />
            <RoutesComponent />
        </div>
    )
}

export default App
