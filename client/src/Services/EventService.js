import axios from "axios"

export const getEvents = async () => {
    const response = await axios.get('http://127.0.0.1:8000/eventos/')
    return response.data
}