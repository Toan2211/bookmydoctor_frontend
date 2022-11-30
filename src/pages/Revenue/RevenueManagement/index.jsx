import React, { useEffect, useMemo, useState } from 'react'
import './index.scss'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import strftime from 'strftime'
import revenueApi from 'api/revenueApi'
import Pagination from 'components/Pagination'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

function RevenueManagement() {
    const userInfo = useSelector(state => state.user.profile)
    const userId = userInfo.doctor ? userInfo.doctor.id : userInfo.id
    const userRole = useSelector(state => state.user.profile).role.name
    const location = useLocation()
    const navigate = useNavigate()
    const [listRevenue, setListRevenue] = useState([])
    const [date, setDate] = useState(new Date())
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        return {
            page: Number.parseInt(params.page) || 0,
            size: Number.parseInt(params.size) || 10,
            begin: params.begin || new Date(strftime('%Y-%m-%dT00:00:00', firstDayOfMonth)).toISOString(),
            end: params.end || new Date(strftime('%Y-%m-%dT23:59:00', today)).toISOString()
        }
    }, [location.search])
    const [pagination, setPagination] = useState({
        size: 10,
        totalPages: 3,
        totalElements: 11,
        page: 0
    })


    const handlePageChange = page => {
        const filters = { ...queryParams, page: page }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleMonthChange = (value) => {
        setDate(value)
        const endDateOfMonth = new Date(value.getFullYear(), value.getMonth()+1, 0)
        const filters = {
            ...queryParams,
            begin: new Date(strftime('%Y-%m-%dT00:00:00', value)).toISOString(),
            end: new Date(strftime('%Y-%m-%dT23:59:00', endDateOfMonth)).toISOString()
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    useEffect(() => {
        (async () => {
            try {
                if (userRole === 'ROLE_DOCTOR') {
                    const respone =
                        await revenueApi.getRevenueDoctorById(
                            userId,
                            {
                                params: { ...queryParams },
                                headers: {
                                    Authorization: `${localStorage.getItem(
                                        'access_token'
                                    )}`
                                }
                            }
                        )
                    setListRevenue(respone.doctor)
                } else {
                    const respone =
                        await revenueApi.getAllRevenueDoctor({
                            params: { ...queryParams },
                            headers: {
                                Authorization: `${localStorage.getItem(
                                    'access_token'
                                )}`
                            }
                        })
                    setListRevenue(respone.doctors)
                    setPagination(respone.page)
                }
            } catch (err) {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        })()
    }, [queryParams, userRole, userId])
    return (
        <div className="revenueManagement">
            <div className="revenueManagement__container">
                <header>Quản lí doanh thu</header>
                <div className="addMultiSchedule__content-left-time">
                    <div>
                        <label>Tháng/Năm</label>
                        <ReactDatePicker
                            selected={date}
                            showMonthYearPicker
                            onChange={handleMonthChange}
                        />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Cuộc hẹn hoàn thành</th>
                            <th>Doanh thu (VND)</th>
                            <th>Lợi nhuận (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRole !== 'ROLE_DOCTOR' &&
                            listRevenue.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{`${item['user.firsname']} ${item['user.lastname']}`}</td>
                                    <td>
                                        {item['user.phoneNumber']}
                                    </td>
                                    <td>{item['user.email']}</td>
                                    <td>{item.done}</td>
                                    <td>{item.revenue}</td>
                                    <td>{item.profits}</td>
                                </tr>
                            ))
                        }
                        {userRole === 'ROLE_DOCTOR' &&
                            (
                                <tr key={listRevenue.id}>
                                    <td>{listRevenue.id}</td>
                                    <td>{`${listRevenue['user.firsname']} ${listRevenue['user.lastname']}`}</td>
                                    <td>
                                        {listRevenue['user.phoneNumber']}
                                    </td>
                                    <td>{listRevenue['user.email']}</td>
                                    <td>{listRevenue.done}</td>
                                    <td>{listRevenue.revenue}</td>
                                    <td>{listRevenue.profits}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {userRole !== 'ROLE_DOCTOR' &&
                    listRevenue.length > 0 && (
                    <div className="scheduleDoctorManagement__pagination">
                        <Pagination
                            totalPage={pagination.totalPages}
                            currentPage={pagination.page}
                            onClick={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default RevenueManagement
