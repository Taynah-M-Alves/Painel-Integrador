
import api from "../utilis/Api";

export const getTasks = async () => {
    const response = await api.get('/tarefas/');
    return response.data;
}

export const getTasksByGroup = async (id) => {
    try {
        const response = await api.get(`/tarefas/${id}`)
        return response.data;
    } catch (err) {
        console.error(err)
    }

}

