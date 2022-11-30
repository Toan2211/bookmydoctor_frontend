import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

function DoctorItem({ data, mode }) {
    return (
        <div className="doctorItem">
            <div className={`${mode === 'listColumn' ? 'listColumn-item ': ''}doctorItem__container`}>
                <div className="doctorItem__content">
                    <div className="doctorItem__content-img">
                        <img src = {data.user.image} alt = "doctor img"/>
                    </div>
                    <div className="doctorItem__content-main">
                        <span className="doctorItem__content-main-position">Bác sĩ</span>
                        <span className="doctorItem__content-main-name">{data.user.firsname} {data.user.lastname}</span>
                        <span className="doctorItem__content-main-clinic">{`${data.specialty.name} • ${data.clinic.name}`}</span>
                    </div>
                </div>
                <div className={`${mode === 'listColumn' ? 'doctorItem__action--column ': ''}doctorItem__action`}>
                    <button ><Link to={`/detailDoctor/${data.id}`} className = "doctorItem__action-link">Đặt lịch</Link></button>
                </div>
            </div>
        </div>
    )
}

export default DoctorItem