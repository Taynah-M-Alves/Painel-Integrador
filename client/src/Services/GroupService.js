
import api from "../utilis/Api"

export const getGroupById = async (id) => {
    const response = await api.get(`/grupos/${id}`)
    return response.data
}
