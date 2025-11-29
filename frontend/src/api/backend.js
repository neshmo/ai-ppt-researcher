import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const generateReport = async (topic) => {
    const response = await axios.post(`${API_BASE_URL}/generate`, {
        topic,
        max_sources: 5,
    });
    return response.data;
};
