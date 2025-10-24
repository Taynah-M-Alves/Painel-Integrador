import axios from "axios"

export const getStudentsWithoutGroup = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/usuarios/alunos/semgrupo`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}
