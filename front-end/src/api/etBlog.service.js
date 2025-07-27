import { handleHttpError, handleHttpSuccess } from "../utils/handleHttpStatus";
import { api } from "./index";

const getAllETBlogs = async () => {
    try {
        const response = await api.get('/et-blog');
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const getETBlogById = async (id) => {
    try {
        const response = await api.get(`/et-blog/${id}`);
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const createETBlog = async (payload) => {
    try {
        const response = await api.post('/et-blog', payload);
        handleHttpSuccess("Thêm blog thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const updateETBlog = async (id, payload) => {
    try {
        const response = await api.put(`/et-blog/${id}`, payload);
        handleHttpSuccess("Chỉnh sửa blog thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const deleteETBlogById = async (id) => {
    try {
        const response = await api.delete(`/et-blog/${id}`);
        handleHttpSuccess("Xóa blog thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
}

const deleteETBlogs = async (etBlogs) => {
    try {
        const response = await api.delete('/et-blog/bulk-delete', { data: { etBlogs } });
        handleHttpSuccess("Xóa blog thành công");
        return response.data;
    } catch (error) {
        handleHttpError(error?.status);
        console.error(error);
        throw error;
    }
};

export { getAllETBlogs, getETBlogById, createETBlog, updateETBlog, deleteETBlogs, deleteETBlogById }