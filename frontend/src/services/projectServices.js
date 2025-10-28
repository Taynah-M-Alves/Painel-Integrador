
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export async function getProjects() {
    const response = await axios.get(`${API_URL}/projetos/`);
    return response.data;
}