import axios from "axios"

export const getHistoryByTask = async (taskId) => {
    const response = await axios.get(`http://127.0.0.1:8000/historico/${taskId}`)
    return response.data
}
