import axios from "axios"

export const getGroupById = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/grupos/${id}`)
    return response.data
}
