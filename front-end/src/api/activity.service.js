import { api } from "./index";
import { handleHttpError, handleHttpSuccess } from "../utils/handleHttpStatus";

const getAllActivities = async () => {
    try {
        const response = await api.get('/activities');
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const getActivityById = async (id) => {
    try {
        const response = await api.get(`/activities/${id}`);
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const createActivity = async (payload) => {
    try {
        const response = await api.post('/activities', payload);
        handleHttpSuccess("Thêm hoạt động thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const updateActivity = async (id, payload) => {
    try {
        const response = await api.put(`/activities/${id}`, payload);
        handleHttpSuccess("Chỉnh sửa hoạt động thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const deleteActivity = async (id) => {
    try {
        const response = await api.delete(`/activities/${id}`);
        handleHttpSuccess("Xóa hoạt động thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const deleteActivities = async (activities) => {
    try {
        const response = await api.delete('/activities/bulk-delete', { data: { activities } });
        handleHttpSuccess("Xóa hoạt động thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
};

export { getAllActivities, getActivityById, createActivity, updateActivity, deleteActivity, deleteActivities }
