import http from 'utils/http'

const specialistApi = {
    getAllSpecialist(params) {
        return http.get('/specialty', { params: params })
    },
    addSpecialist(data, config) {
        return http.post('/specialty', data, config)
    },
    updateSpecialist(data, config) {
        return http.put(`/specialty/${data.get('id')}`, data, config)
    },
    getDetailSpecialist(id) {
        return http.get(`/specialty/${id}`)
    }
}
export default specialistApi
