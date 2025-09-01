import { useState, useEffect } from "react";
import { getAccessToken, setAccessToken, setRefreshToken, getRefreshToken } from "../../utils/jwt";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { refreshAccessToken } from "../../api/auth.service";

export const RequireAuth = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [loading, setLoading] = useState(true); // State to track loading process

    useEffect(() => {
        const verifyAuth = async () => {
            const token = getAccessToken();
            
            if (!user) {
                try {
                    const newToken = await refreshAccessToken();
                } catch (err) {
                    console.error("Refresh token failed:", err);
                }
            } 
            setLoading(false);
        };
        verifyAuth();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user && allowedRoles && !allowedRoles.includes(user.sysrole_name)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};
