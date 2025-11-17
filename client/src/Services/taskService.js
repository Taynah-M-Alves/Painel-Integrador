import axios from "axios"

export const getTasks = async () => {
    const response = await axios.get('http://127.0.0.1:8000/tarefas/');
    return response.data;
}

export const getTasksByGroup = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/tarefas/${id}`)
        return response.data;
    } catch (err) {
        console.error(err)
    }

}

