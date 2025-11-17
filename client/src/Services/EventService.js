
import api from "../utilis/Api"

export const getEvents = async () => {
    const response = await api.get('/eventos/')
    return response.data
}