import { api } from "./index";

const loginUser = async ({ username, password }) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    const token = response.data.accessToken;
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};


export { loginUser };
