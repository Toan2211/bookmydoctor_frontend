import http from 'utils/http'

const scheduleApi = {
    addSchedule(data, config) {
        return http.post('/schedule', data, config)
    },
    addMultiSchedule(data, config) {
        return http.post('/schedule/multi', data, config)
    },
    getSchedule(id, config) {
        return http.get(`/schedule/doctor/${id}`, config)
    },
    getScheduleById(id) {
        return http.get(`/schedule/${id}`)
    },
    deleteSchedule(id, config) {
        return http.delete(`/schedule/${id}`, { id: id }, config)
    }
}
export default scheduleApi
