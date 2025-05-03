import { api } from "./index";

const getAllAchievements = async () => {
    try {
        const response = await api.get('/achievements');
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách thành tựu:", error);
        throw error;
    }
};

const createAchievement = async (payload) => {
    try {
        const response = await api.post('/achievements', payload);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo thành tựu:", error);
        throw error;
    }
};

const updateAchievementById = async (id, payload) => {
    try {
        const response = await api.put(`/achievements/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thành tựu:", error);
        throw error;
    }
};

const deleteAchievementById = async (id) => {
    try {
        const response = await api.delete(`/achievements/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa thành tựu:", error);
        throw error;
    }
};

const deleteAchievements = async (achievements) => {
    try {
        const response = await api.delete('/achievements/bulk-delete', { data: { achievements } });
        return response.data;
    } catch (error) {
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