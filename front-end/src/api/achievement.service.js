import { api } from "./index";
import { handleHttpSuccess, handleHttpError } from "../utils/handleHttpStatus";

const getAllAchievements = async () => {
    try {
        const response = await api.get('/achievements');
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error("Lỗi khi lấy danh sách thành tựu:", error);
        throw error;
    }
};

const createAchievement = async (payload) => {
    try {
        const response = await api.post('/achievements', payload);
        handleHttpSuccess("Thêm thành tựu thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error("Lỗi khi tạo thành tựu:", error);
        throw error;
    }
};

const updateAchievementById = async (id, payload) => {
    try {
        const response = await api.put(`/achievements/${id}`, payload);
        handleHttpSuccess("Chỉnh sửa thành tựu thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error("Lỗi khi cập nhật thành tựu:", error);
        throw error;
    }
};

const deleteAchievementById = async (id) => {
    try {
        const response = await api.delete(`/achievements/${id}`);
        handleHttpSuccess("Xóa thành tựu thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error("Lỗi khi xóa thành tựu:", error);
        throw error;
    }
};

const deleteAchievements = async (achievements) => {
    try {
        const response = await api.delete('/achievements/bulk-delete', { data: { achievements } });
        handleHttpSuccess("Xóa thành tựu thành công!");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error("Lỗi khi xóa thành tựu:", error);
        throw error;
    }
};

export {
    getAllAchievements,
    createAchievement,
    updateAchievementById,
    deleteAchievementById,
    deleteAchievements
};