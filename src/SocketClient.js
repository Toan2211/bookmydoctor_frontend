import { SocketContext } from 'App'
import { getNotifies } from 'components/Header/components/Notification/notificationSlice'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function SocketClient() {
    const token = localStorage.getItem('access_token')
    const socket = useContext(SocketContext)
    const { user } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        const userSubmit = { _id: user.profile.id }
        socket.emit('joinUser', userSubmit)
    }, [socket, user])
    // Notification
    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch(getNotifies({ userId: user.profile.id, token: token }))
            toast.success(msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        })

        return () => socket.off('createNotifyToClient')
    }, [socket, dispatch, user, token])
    return <></>
}

export default SocketClient
