import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { breadcrumbNameMap } from "../../constants";

export const Header = ({children}) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    
    const lastDisplayName = breadcrumbNameMap[pathnames[pathnames.length - 1]] || "Trang chủ";

    return (
        <div className="header">
            <div className="header-content">
                <Breadcrumbs className="header-breadcrumbs" aria-label="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                        let isLast = index === pathnames.length - 1;
                        const displayName = breadcrumbNameMap[value] || value;

                        if (displayName === "edit" || displayName === "colleague") return;

                        if (displayName === "Quản lý Tìm kiếm CTV") 
                            return (
                            <Typography key={to} color="textPrimary" style={{ textDecoration: "none"}}>
                                {displayName}
                            </Typography>
                        ) 

                        return isLast ? (
                            <Typography key={to} color="textPrimary">
                                {children ? children : displayName}
                            </Typography>
                        ) : (
                            <Link key={to} to={to}>
                                {displayName}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
                <span className="header-title">{children ? children : lastDisplayName}</span>
            </div>
        </div>
    );
};