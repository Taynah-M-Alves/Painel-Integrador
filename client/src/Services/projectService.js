import api from "../utilis/Api"

export const getProjects = async () => {
    const response = await api.get('/projetos')
    return response.data
}


export const getProjectById = async (id) => {
    const response = await api.get(`/projetos/${id}/`)
    return response.data
}

export const getGroupsByProject = async (id) => {
    try {
        const response = await api.get(`/projetos/${id}/grupos/`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}