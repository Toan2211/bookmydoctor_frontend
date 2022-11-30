import doctorApi from 'api/doctorApi'
import Loading from 'components/Loading'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookTimeTable from './components/BookTimeTable'
import DoctorReviews from './components/DoctorReviews'
import DoctorProfile from './DoctorProfile'

function DetailDoctor() {
    const { id } = useParams()
    const [doctor, setDoctor] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                const respone = await doctorApi.getDetailDoctor(id)
                setDoctor(respone.message)
                setIsLoading(false)
            } catch (err) {
                alert(err)
            }
        })()
    }, [id])
    if (isLoading) return <Loading />
    return (
        <div className="detailDoctor">
            <div className="detailDoctor__container">
                <DoctorProfile doctor = {doctor} />
                <BookTimeTable doctor = {doctor} />
                <DoctorReviews />
            </div>
        </div>
    )
}

export default DetailDoctor
