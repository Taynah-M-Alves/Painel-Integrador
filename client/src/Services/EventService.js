
import api from "../utilis/Api"

export const getEvents = async () => {
    const response = await api.get('/eventos/')
    return response.data
}

export const getEventsById = async (id) => {
    try {
        const response = await api.get(`/eventos/${id}`)
        return response.data
    } catch (err) {
        console.error(err)
    }

}