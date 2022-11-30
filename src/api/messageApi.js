import http from 'utils/http'

const messageApi = {
    addMessage(data, config) {
        return http.post('/messagechat', data, config)
    },
    getMessage(params) {
        return http.get('/messagechat', { params: params })
    },
    getListUserChat(idUser, config) {
        return http.get(`/users/${idUser}/userchat`, config)
    }
}
export default messageApi
