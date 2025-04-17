import { getAccessToken } from "../../utils/jwt";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {

    const isAuthenticated = !!getAccessToken(); 

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
