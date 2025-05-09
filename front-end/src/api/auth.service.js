import { api } from "./index";
import { getRefreshToken, setAccessToken, setRefreshToken } from "../utils/jwt";

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

  const response = await api.post(
    "/auth/refresh-token",
    {}, 
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`, 
      },
    }
  );
  const newToken = response.data;
  console.log(newToken);
  
  setAccessToken(newToken.accessToken);
  setRefreshToken(newToken.refreshToken);
  return newToken;
};


export { loginUser, refreshAccessToken };
