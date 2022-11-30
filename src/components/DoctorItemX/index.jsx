import images from 'assets'
import { path } from 'constants/path'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

function DoctorItemX({ mode }) {
    return (
        <div className="doctorItem">
            <div className={`${mode === 'listColumn' ? 'listColumn-item ': ''}doctorItem__container`}>
                <div className="doctorItem__content">
                    <div className="doctorItem__content-img">
                        <img src = {images.doctorEx} alt = "doctor img"/>
                    </div>
                    <div className="doctorItem__content-main">
                        <span className="doctorItem__content-main-position">Thạc sĩ, bác sĩ</span>
                        <span className="doctorItem__content-main-name">Lê Anh Tuấn</span>
                        <span className="doctorItem__content-main-clinic">Nam Khoa • Phòng khám Pháp Việt</span>
                    </div>
                </div>
                <div className={`${mode === 'listColumn' ? 'doctorItem__action--column ': ''}doctorItem__action`}>
                    <button ><Link to={path.detailDoctor} className = "doctorItem__action-link">Đặt lịch</Link></button>
                </div>
            </div>
        </div>
    )
}

export default DoctorItemX