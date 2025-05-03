import { api } from "./index";

const getAllPersonnels = async (personnel_status, department_name) => {
  try {
    const response = await api.get("/personnels", {
        params: {
          status: personnel_status,
            departmentName: department_name
        }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPersonnelById = async (id) => {
    try {
      const response = await api.get(`/personnels/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const createPersonnel = async (payload) => {
  try {
    const response = await api.post("/personnels", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePersonnel = async (id, payload) => {
  try {
    const response = await api.put(`/personnels/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePersonnelById = async (id) => {
  try {
    const response = await api.delete(`/personnels/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePersonnels = async (personnelIds) => {
  try {
    const response = await api.delete("/personnels/bulk-delete", { data: { personnelIds } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUnregisteredAccount = async () => {
    try {
        const response = await api.get("/personnels/unregistered");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export {
  getAllPersonnels,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnels,
  deletePersonnelById,
  getUnregisteredAccount,
};