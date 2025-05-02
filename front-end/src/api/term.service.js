import { api } from "./index";

const getAllTerms = async () => {
  try {
    const response = await api.get("/terms");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getAllTerms }