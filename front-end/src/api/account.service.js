import { api } from "./index";

const getAllAccounts = async () => {
  try {
    const response = await api.get("/accounts");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAccountById = async (id) => {
    try {
      const response = await api.get(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const createAccount = async (payload) => {
  try {
    const response = await api.post("/accounts", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAccount = async (id, payload) => {
  try {
    const response = await api.put(`/accounts/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAccountById = async (id) => {
  try {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAccounts = async (accounts) => {
  try {
    const response = await api.delete("/accounts/bulk-delete", { data: { accounts } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePassword = async (id, oldPassword, newPassword) => {
  try {
      const response = await api.put(`/accounts/change-password/${id}`, {
          oldPassword,
          newPassword
      });
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};


export {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccounts,
  deleteAccountById,
  updatePassword,
};
