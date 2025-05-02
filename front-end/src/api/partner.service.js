import { api } from "./index";

const getAllPartners = async () => {
  try {
    const response = await api.get("/partners");
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
    console.error(error);
    throw error;
  }
};

const createPartner = async (payload) => {
  try {
    const response = await api.post("/partners", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePartner = async (id, payload) => {
  try {
    const response = await api.put(`/partners/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePartnerById = async (id) => {
  try {
    const response = await api.delete(`/partners/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePartners = async (partners) => {
  try {
    const response = await api.delete("/partners/bulk-delete", { data: { partners } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartners,
  deletePartnerById,
};