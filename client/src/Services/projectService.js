import axios from "axios"


export const getProjects = async () => {
    const response = await axios.get('http://127.0.0.1:8000/projetos')
    return response.data
}


export const getProjectById = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/projetos/${id}/`)
    return response.data
}

export const getGroupsByProject = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/projetos/${id}/grupos/`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}