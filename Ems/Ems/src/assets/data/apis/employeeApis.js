import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
});

export default api; // export the instance

export const getEmployees = async (page=1) => {
    try {
        const response = await api.get(`/employees/?page=${page}`);
        return response.data;
    } catch (error) {
        console.log(error.message);

        throw error;
    }
};


export const updateEmployee = async (id, updates) => {
    try {
        const response = await api.patch(`/employees/${id}/`, updates);
        return response.data;
    } catch (error) {
        console.log(error.message);

        throw error;
    }
};