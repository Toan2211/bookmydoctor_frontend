import appointmentApi from 'api/appointmentApi'
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { toast } from 'react-toastify'
import './index.scss'
function ReviewDialog({ onClose, appointmentData }) {
    const handleOnClick = e => {
        if (e.target.className === 'reviewDialog') onClose()
    }
    const [rate, setRate] = useState(5)
    const arr = [1, 2, 3, 4, 5]
    const handleSubmitForm = () => {
        try {
            ( async () => {
                await appointmentApi.ratingAppointment(
                    appointmentData.id,
                    { scores: rate },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem(
                                'access_token'
                            )}`
                        }
                    }
                )
                // fetchListAppointment(queryParams)
                toast.success('Đánh giá thành công', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            })()
        }
        catch (err) {
            toast.error(err.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    }
    return (
        <div className="reviewDialog" onClick={handleOnClick}>
            <div className="reviewDialog__container">
                <header>Đánh giá bác sĩ</header>
                <div className="reviewDialog__listStar">
                    {arr.map((item) => {
                        if (item <= rate) {
                            return (
                                <span
                                    key={item}
                                    onClick={() => {
                                        setRate(item)
                                    }}
                                >
                                    <AiFillStar className="star icon__active" />
                                </span>
                            )
                        }
                        return (
                            <span
                                key={item}
                                onClick={() => {
                                    setRate(item)
                                }}
                            >
                                <AiFillStar className="star" />
                            </span>
                        )
                    })}
                </div>
                <div className="reviewDialog__message">
                    Mời bạn đánh giá chất lượng dịch vụ của chúng tôi !
                </div>
                <div className= "reviewDialog__button">
                    <button type="submit" onClick={handleSubmitForm} className = " btnReview">
                        Đánh giá
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ReviewDialog
