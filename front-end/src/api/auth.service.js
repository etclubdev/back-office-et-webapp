import { api } from "./index";
import { jwtDecode } from "jwt-decode";
import { getRefreshToken, setAccessToken, removeAccessToken, removeRefreshToken } from "../utils/jwt";

const loginUser = async ({ username, password }) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    const { accessToken, refreshToken } = response.data;
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error("Refresh token không tồn tại");
  }

  try {
    const response = await api.post(
      "/auth/refresh-token",
      {}, 
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`, 
        },
      }
    );
    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken);  
    return newAccessToken;
  } catch (error) {
    console.error(error);
    removeAccessToken();
    removeRefreshToken();
  }
};


export { loginUser, refreshAccessToken };
