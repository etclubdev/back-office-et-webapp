import { getAccessToken } from "../../utils/jwt";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export const RequireAuth = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();
    const isAuthenticated = !!getAccessToken(); 
    
    if (!isAuthenticated){
        return <Navigate to="/login" state={{from: location}} replace />
    }

    if (user && allowedRoles && (!user || !allowedRoles.includes(user.sysrole_name))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};
