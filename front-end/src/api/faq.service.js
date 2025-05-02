import { api } from "./index";

const getAllFAQs = async () => {
    try {
        const response = await api.get('/faqs');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateFAQsById = async (id, payload) => {
    try {
        const response = await api.put(`/faqs/${id}`, payload);
        return response.message;
    } catch (error) {
        console.log(error);
    }
}

export { getAllFAQs, updateFAQsById }
