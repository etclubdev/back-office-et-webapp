import { api } from "./index";

const getAllSysRoles = async () => {
  try {
    const response = await api.get("/system-role");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {getAllSysRoles}