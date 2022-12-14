import React, { useContext, useEffect, useState } from 'react'
import './index.scss'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import InputField from 'components/InputFiled'
import { FaUser } from 'react-icons/fa'
import RadioGroup from 'components/RadioGroup'
import { MdEmail, MdLocationPin } from 'react-icons/md'
import {
    BsFillCalendarFill,
    BsFillTelephoneFill
} from 'react-icons/bs'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import scheduleApi from 'api/scheduleApi'
import strftime from 'strftime'
import convertTZ from 'utils/convertTZ'
import doctorApi from 'api/doctorApi'
import Loading from 'components/Loading'
import appointmentApi from 'api/appointmentApi'
import { toast } from 'react-toastify'
import { SocketContext } from 'App'
import { path } from 'constants/path'

function BookAppointment() {
    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const [isLoading, setIsLoading] = useState(true)
    const idSchedule = useParams().id
    const [scheduleDetail, setScheduleDetail] = useState({})
    const [doctorDetail, setDoctorDetail] = useState({})
    const getDoctotDetail = async id => {
        try {
            const respone = await doctorApi.getDetailDoctor(id)
            setDoctorDetail(respone.message)
        } catch (err) {
            return err.message
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const respone = await scheduleApi.getScheduleById(
                    idSchedule
                )
                setScheduleDetail(respone.message)
                await getDoctotDetail(respone.message.doctor_id)
                setIsLoading(false)
            } catch (err) {
                return err.message
            }
        })()
    }, [idSchedule])
    const userData = useSelector(state => state.user.profile)
    const form = useForm({
        defaultValues: {
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            firsname: userData.firsname,
            lastname: userData.lastname,
            gender: userData.gender === true ? '1' : '0',
            birthday: userData.birthday.split('T')[0],
            address: userData.address,
            symptom: '',
            user_id: userData.id,
            schedule_id: +idSchedule
        }
    })
    const handleSubmit = value => {
        const valueSubmit = {
            schedule_id: Number(value.schedule_id),
            symptom: value.symptom
        }
        ;(async () => {
            try {
                const respone = await appointmentApi.createAppointment(
                    valueSubmit,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem(
                                'access_token'
                            )}`
                        }
                    }
                )
                toast.success('T???o cu???c h???n th??nh c??ng', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                respone.notification.forEach(element => {
                    socket.emit('createNotify', element)
                })
                navigate(path.myAppointment)
            } catch (err) {
                return err.message
            }
        })()
    }
    if (isLoading) return <Loading />
    return (
        <div className="bookAppointment">
            <div className="bookAppointment__container">
                <header className="bookAppointment__Info">
                    <div className="bookAppointment__Info-img">
                        <img
                            src={doctorDetail.user.image}
                            alt="bacsi"
                        />
                    </div>
                    <div className="bookAppointment__Info-content">
                        <span>?????t l???ch kh??m</span>
                        <span>
                            B??c s?? CK{' '}
                            {`${doctorDetail.specialty.name} ${doctorDetail.user.firsname} ${doctorDetail.user.lastname}`}
                        </span>
                        <span>
                            {scheduleDetail.id &&
                                `${strftime(
                                    '%H:%M',
                                    convertTZ(scheduleDetail.begin)
                                )} : ${strftime(
                                    '%H:%M',
                                    convertTZ(scheduleDetail.end)
                                )} - ${strftime(
                                    '%d-%m-%Y',
                                    convertTZ(scheduleDetail.end)
                                )}`}
                        </span>
                    </div>
                </header>
                <form
                    className="form"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className="form__element-two-input">
                        <div>
                            <InputField
                                name="firsname"
                                type="input"
                                form={form}
                                placeholder="H???"
                                disabled={true}
                                icon={<FaUser />}
                            />
                        </div>
                        <div>
                            <InputField
                                name="lastname"
                                type="input"
                                form={form}
                                placeholder="T??n"
                                disabled={true}
                                icon={<FaUser />}
                            />
                        </div>
                    </div>
                    <div className="form__element">
                        <RadioGroup
                            name="gender"
                            form={form}
                            disabled={true}
                            mode="gender"
                            optionData={[
                                { label: 'Nam', value: Number(1) },
                                { label: 'N???', value: Number(0) }
                            ]}
                        />
                    </div>
                    <div className="form__element">
                        <InputField
                            name="email"
                            type="email"
                            form={form}
                            placeholder="Email"
                            disabled={true}
                            icon={<MdEmail />}
                        />
                    </div>
                    <div className="form__element">
                        <InputField
                            name="birthday"
                            type="date"
                            form={form}
                            placeholder="Ng??y sinh"
                            disabled={true}
                            icon=<BsFillCalendarFill />
                        />
                    </div>
                    <div className="form__element">
                        <InputField
                            name="phoneNumber"
                            type="input"
                            form={form}
                            placeholder="S??? ??i???n tho???i"
                            disabled={true}
                            icon={<BsFillTelephoneFill />}
                        />
                    </div>
                    <div className="form__element">
                        <InputField
                            name="address"
                            type="input"
                            form={form}
                            placeholder="?????a ch???"
                            disabled={true}
                            icon={<MdLocationPin />}
                        />
                    </div>
                    <div className="form__element">
                        <InputField
                            name="symptom"
                            type="textarea"
                            form={form}
                            placeholder="L?? do kh??m"
                            icon={<AiFillPlusCircle />}
                        />
                    </div>
                    <div className="form__price">
                        <div className="form__price-price">
                            <span>Gi?? kh??m</span>
                            <span>{scheduleDetail.cost} ??</span>
                        </div>
                        <div className="form__price-book">
                            <span>Ph?? ?????t l???ch</span>
                            <span>Mi???n ph??</span>
                        </div>
                        <div className="form__price-total">
                            <span>T???ng c???ng</span>
                            <span>{scheduleDetail.cost} ??</span>
                        </div>
                    </div>
                    <span className="description">
                        Qu?? kh??ch vui l??ng ??i???n ?????y ????? th??ng tin ?????
                        ti???t ki???m th???i gian l??m th??? t???c kh??m
                    </span>
                    <div className="form__btn">
                        <button className="btnSuccess btnBook">
                            X??c nh???n ?????t l???ch kh??m
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookAppointment
