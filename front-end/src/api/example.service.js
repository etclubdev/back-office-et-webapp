import { api } from "./index";

const getExample = async () => {
    try {
        const response = await api.get('/example');
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getExample }