import { api } from "./index";

const getAllBannners = async () => {
  try {
    const response = await api.get("/banners");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBannerById = async (id) => {
  try {
    const response = await api.get(`/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createBanner = async (payload) => {
  try {
    const response = await api.post("/banners", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateBanner = async (id, payload) => {
  try {
    const response = await api.put(`/banners/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteBannerById = async (id) => {
  try {
    const response = await api.delete(`/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteBannners = async (banners) => {
  try {
    const response = await api.delete("/banners/bulk-delete", {data: { banners }});
    return response.data;
  } catch (error) {
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