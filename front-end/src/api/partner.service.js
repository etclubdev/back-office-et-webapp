import { handleHttpError, handleHttpSuccess } from "../utils/handleHttpStatus";
import { api } from "./index";

const getAllPartners = async (category) => {
  try {
    console.log(category);
    
    const response = await api.get("/partners", {
      params: {
        category
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPartnerById = async (id) => {
  try {
    const response = await api.get(`/partners/${id}`);
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const createPartner = async (payload) => {
  try {
    const response = await api.post("/partners", payload);
    handleHttpSuccess("Thêm đối tác thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const updatePartner = async (id, payload) => {
  try {
    const response = await api.put(`/partners/${id}`, payload);
    handleHttpSuccess("Chỉnh sửa đối tác thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const deletePartnerById = async (id) => {
  try {
    const response = await api.delete(`/partners/${id}`);
    handleHttpSuccess("Xóa đối tác thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const deletePartners = async (partners) => {
  try {
    const response = await api.delete("/partners/bulk-delete", { data: { partners } });
    handleHttpSuccess("Xóa đối tác thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const updateVisible = async (partners) => {
  try {
    const response = await api.put('/partners/bulk-update', { partners });
    handleHttpSuccess("Chỉnh sửa hiển thị đối tác thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
}

export {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartners,
  deletePartnerById,
  updateVisible,
};