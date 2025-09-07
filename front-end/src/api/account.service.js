import { api } from "./index";
import { handleHttpSuccess, handleHttpError } from "../utils/handleHttpStatus";

const getAllAccounts = async () => {
  try {
    const response = await api.get("/accounts");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const getAccountById = async (id) => {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const createAccount = async (payload) => {
  try {
    const response = await api.post("/accounts", payload);
    handleHttpSuccess("Thêm tài khoản thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const updateAccount = async (id, payload) => {
  try {
    const response = await api.put(`/accounts/${id}`, payload);
    handleHttpSuccess("Chỉnh sửa tài khoản thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const deleteAccountById = async (id) => {
  try {
    const response = await api.delete(`/accounts/${id}`);
    handleHttpSuccess("Xóa tài khoản thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const deleteAccounts = async (accounts) => {
  try {
    const response = await api.delete("/accounts/bulk-delete", { data: { accounts } });
    handleHttpSuccess("Xóa tài khoản thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
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
    handleHttpSuccess("Thay đổi mật khẩu thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.log(error);
    throw error;
  }
};

const resetPassword = async (id) => {
  try {
    console.log(id);
    
    const response = await api.put(`/accounts/reset-password/${id}`);
    handleHttpSuccess("Thay đổi mật khẩu thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
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
  resetPassword
};
