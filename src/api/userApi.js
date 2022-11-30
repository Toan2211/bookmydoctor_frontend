import http from 'utils/http'

const userApi = {
    changePassword(data) {
        return http.post(`/users/password/${data.id}`, data)
    },
    updateInfoUser(data, config) {
        return http.put(`/users/${data.get('id')}`, data, config)
    },
    toggleStatusUser(id, status, config) {
        if (status) return http.get(`/users/disable/${id}`, config)
        return http.get(`/users/enable/${id}`, config)
    },
    getUserById(idUser, config) {
        return http.get(`/users/${idUser}`, config)
    }
}
export default userApi