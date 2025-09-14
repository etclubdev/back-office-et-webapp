import { api } from "./index";
import { handleHttpSuccess, handleHttpError } from "../utils/handleHttpStatus";

const getStatusOfFirstRecruitment = async () => {
  try {
    const response = await api.get("/recruitment");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

const updateStatusOfRecruitment = async (id) => {
  try {
    const response = await api.put(`/recruitment/${id}`);
    handleHttpSuccess("Thay đổi trạng thái thành công!");
    return response.data;
  } catch (error) {
    handleHttpError(error.response.data.message || error.response.data);
    console.error(error);
    throw error;
  }
};

export { getStatusOfFirstRecruitment, updateStatusOfRecruitment }