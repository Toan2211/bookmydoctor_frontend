import React from 'react'
import { FaClinicMedical } from 'react-icons/fa'
import './index.scss'
function DashboardItem({ count, name, icon }) {
    return (
        <div className="dashboard__itemInstance-item">
            <div className="dashboard__itemInstance-item-content">
                <span>{count}</span>
                <span>{name}</span>
            </div>
            <div className="dashboard__itemInstance-item-icon">
                <span>
                    {icon}
                </span>
            </div>
        </div>
    )
}

export default DashboardItem
