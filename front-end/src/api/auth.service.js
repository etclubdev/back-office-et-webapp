import { api } from "./index";

const getUser = async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

//loginUser
//logoutUser

export { getUser }