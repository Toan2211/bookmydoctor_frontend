import http from 'utils/http'

const revenueApi = {
    getAllRevenueDoctor(config) {
        return http.get('/doctor/revenue', config)
    },
    getRevenueDoctorById(id, config) {
        return http.get(`/doctor/${id}/revenue`, config)
    },
    getRevenueByTime(config) {
        return http.get('/revenue', config)
    },
    getRevenueAllSpecialist(config) {
        return http.get('/revenue/specialties', config)
    }
}
export default revenueApi