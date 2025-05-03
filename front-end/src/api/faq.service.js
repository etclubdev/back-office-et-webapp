import { api } from "./index";

const getAllFAQs = async () => {
    try {
        const response = await api.get('/faqs');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getFAQsById = async (id) => {
    try {
        const response = await api.get(`/faqs/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const createFAQs = async (payload) => {
    try {
        const response = await api.post('/faqs', payload);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo thành tựu:", error);
        throw error;
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

const deleteFAQsById = async (id) => {
    try {
        const response = await api.delete(`/faqs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa thành tựu:", error);
        throw error;
    }
};

const deleteFAQs = async (ids) => {
    try {
        const response = await api.delete('/faqs/bulk-delete', { data: { ids } });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa thành tựu:", error);
        throw error;
    }
};

export { getFAQsById, getAllFAQs, createFAQs, updateFAQsById, deleteFAQs, deleteFAQsById }
