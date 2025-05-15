import { api } from "./index";
import { handleHttpError } from "../utils/handleHttpStatus";

const getAllTerms = async () => {
  try {
    const response = await api.get("/terms");
    return response.data;
  } catch (error) {
    handleHttpError(error?.status);
    console.error(error);
    throw error;
  }
};

export { getAllTerms }