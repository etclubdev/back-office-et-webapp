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

    if (allowedRoles && (!user || !allowedRoles.includes(user.sysrole_name))) {
        setTimeout(() => {
            return <Navigate to="/unauthorized" replace />;
        }, 500);
    }

    return <Outlet />;
};
