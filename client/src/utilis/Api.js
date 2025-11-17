import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }
});

export default api;