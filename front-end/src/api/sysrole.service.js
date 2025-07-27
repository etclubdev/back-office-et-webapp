import { api } from "./index";
import { handleHttpError } from "../utils/handleHttpStatus";

const getAllSysRoles = async () => {
  try {
    const response = await api.get("/system-role");
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

export {getAllSysRoles}