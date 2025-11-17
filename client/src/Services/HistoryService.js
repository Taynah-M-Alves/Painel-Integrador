
import api from "../utilis/Api"

export const getHistoryByTask = async (taskId) => {
    const response = await api.get(`/historico/${taskId}`)
    return response.data
}
