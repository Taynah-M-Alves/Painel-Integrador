
import api from "../utilis/Api"

export const getStudentsWithoutGroupByClass = async (id) => {
    try {
        const response = await api.get(`/usuarios/alunos/semgrupo/${id}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}
