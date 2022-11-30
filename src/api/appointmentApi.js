import http from 'utils/http'

const appointmentApi = {
    createAppointment(data, config) {
        return http.post('/appointment', data, config)
    },
    getAllAppointment(config) {
        return http.get('/appointment/', config)
    },
    getAllAppointmentOfUser(id, config) {
        return http.get(`/appointment/user/${id}`, config)
    },
    confirmAppointment(id, config) {
        return http.put(`/appointment/confirm/${id}`, { id: id }, config)
    },
    cancelAppointment(id, config) {
        return http.put(`/appointment/cancel/${id}`, { id: id }, config)
    },
    reportAppointment(id, config) {
        return http.put(`/appointment/report/${id}`, { id: id }, config)
    },
    resolveReport(idAppointment, data, config) {
        return http.put(`/appointment/violate/${idAppointment}`, data, config)
    },
    ratingAppointment(idAppointment, data, config) {
        return http.put(`/appointment/rate/${idAppointment}`, data, config)
    }
}
export default appointmentApi
