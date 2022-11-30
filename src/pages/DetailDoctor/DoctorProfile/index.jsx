import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import './index.scss'
DoctorProfile.propTypes = {}

function DoctorProfile({ doctor }) {
    const arr = [1, 2, 3, 4, 5]
    const navigate = useNavigate()
    const handleMessage = () => {
        navigate(`/messageApp/${doctor.user_id}`)
    }
    return (
        <div className="doctorProfile">
            <div className="doctorProfile__container">
                <div className="doctorProfile__info">
                    <div className="doctorProfile__info-img">
                        <img src={doctor.user.image} alt="doctor" />
                    </div>
                    <div className="doctorProfile__info-content">
                        <span>
                            Bác sĩ {doctor.user.firsname}{' '}
                            {doctor.user.lastname}
                        </span>
                        <p>{doctor.description}</p>
                        <button className = "btnReview" onClick={handleMessage}>Nhắn tin</button>
                    </div>
                </div>
                <div className="doctorProfile__rate">
                    <span className="doctorProfile__rate-point">
                        {doctor.rate} trên 5
                    </span>
                    <span className="doctorProfile__rate-count">
                        {doctor.numberOfReviews} đánh giá
                    </span>
                    <div className="doctorProfile__rate-list">
                        {doctor.rate > 0 && arr.map(item => {
                            if (item <= Math.floor(doctor.rate)) {
                                return (
                                    <span key={item}>
                                        <AiFillStar className="star icon__active" />
                                    </span>
                                )
                            }
                            return (
                                <span key={item}>
                                    <AiFillStar className="star" />
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
