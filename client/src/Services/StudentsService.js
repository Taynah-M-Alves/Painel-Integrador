import axios from "axios"

export const getStudentsWithoutGroupByClass = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/usuarios/alunos/semgrupo/${id}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}
