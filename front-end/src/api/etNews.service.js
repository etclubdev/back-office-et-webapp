import { api } from "./index";

const getAllETNews = async () => {
    try {
        const response = await api.get('/et-news');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getETNewsById = async (id) => {
    try {
        const response = await api.get(`/et-news/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createETNews = async (payload) => {
    try {
        const response = await api.post('/et-news', payload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateETNews = async (id, payload) => {
    try {
        const response = await api.put(`/et-news/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteETNewsById = async (id) => {
    try {
        const response = await api.delete(`/et-news/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteETNews = async (etNews) => {
    try {
        const response = await api.delete('/et-news/bulk-delete', { data: { etNews } });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllETNews, getETNewsById, createETNews, updateETNews, deleteETNews, deleteETNewsById }