import { api } from "./index";
import { handleHttpError, handleHttpSuccess } from "../utils/handleHttpStatus";

const getAllBannners = async () => {
  try {
    const response = await api.get("/banners");
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

const getBannerById = async (id) => {
  try {
    const response = await api.get(`/banners/${id}`);
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

const createBanner = async (payload) => {
  try {
    const response = await api.post("/banners", payload);
    handleHttpSuccess("Thêm banner thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

const updateBanner = async (id, payload) => {
  try {
    const response = await api.put(`/banners/${id}`, payload);
    handleHttpSuccess("Chỉnh sửa banner thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

const deleteBannerById = async (id) => {
  try {
    const response = await api.delete(`/banners/${id}`);
    handleHttpSuccess("Xóa banner thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

const deleteBannners = async (banners) => {
  try {
    const response = await api.delete("/banners/bulk-delete", { data: { banners } });
    handleHttpSuccess("Xóa banner thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

export {
  getAllBannners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBannners,
  deleteBannerById,
};