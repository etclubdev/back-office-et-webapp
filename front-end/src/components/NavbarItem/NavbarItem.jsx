import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/useAuth";
import { ConfirmedDialog } from "../ConfirmedDialog";

export const NavbarItem = ({ id, to, icon, label, requiredPermissions, dropdownContent, userInfo, isLogoutItem, setIsExpanded }) => {
    const { user, logout } = useAuth();
    const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
    const permissions = user?.permissions || [];

    const handleLogout = () => {
        logout();
        setIsConfirmingLogout(false);
    }

    if (userInfo) {
        return user ? (
            <NavLink to="/profile" className="navbar-item user" id={id}>
                <img className="user-avatar" src={userInfo.avatar_url} alt="User Avatar" />
                <div className="user-info">
                    <p className="user-name">{userInfo.personnel_name}</p>
                    <p className="user-id">{user.sysrole_name}</p>
                </div>
            </NavLink>
        ) : <div className="loading-user">Đang tải...</div>;
    }

    if (isLogoutItem) {
        return (
            <>
                {isConfirmingLogout &&
                    <ConfirmedDialog
                        title="Xác nhận đăng xuất"
                        alertType="warning"
                        desc="Bạn có chắc chắn muốn đăng xuất?"
                        onConfirm={handleLogout}
                        onClose={() => setIsConfirmingLogout(false)}
                    />
                }
                <div onClick={() => { setIsConfirmingLogout(true) }} className="navbar-item" id="navbar-logout">
                    <FontAwesomeIcon className="navbar-item-icon" icon={faArrowRightFromBracket} />
                    <p className="navbar-item-label">Đăng xuất</p>
                </div>
            </>
        );
    }

    let filteredDropdownContent;
    if (dropdownContent) {
        filteredDropdownContent = dropdownContent.filter(item => {
            return item.requiredPermissions.every(p => permissions.includes(p))
        })
        if (filteredDropdownContent.length === 0) return;

    } else {
        const hasAccess = requiredPermissions?.every(p => permissions.includes(p));
        if (!hasAccess)
            return;
    }

    return (
        <div className="navbar-item-wrapper">
            {!filteredDropdownContent ? (
                <NavLink
                    id={id}
                    to={to}
                    className={({ isActive }) =>
                        `navbar-item ${isActive ? "active" : ""}`
                    }
                >
                    <FontAwesomeIcon className="navbar-item-icon" icon={icon} />
                    <p className="navbar-item-label">{label}</p>
                </NavLink>
            ) : (
                <div>
                    <div
                        id={id}
                        className="navbar-item"
                        onClick={() => {
                            const dropdown = document.getElementById(id + "-dropdown");
                            const item = document.getElementById(id);
                            dropdown?.classList.toggle("show");
                            item?.classList.toggle("show");
                            if (typeof setIsExpanded === "function") {
                                setIsExpanded(true);
                            }
                        }}
                    >
                        <FontAwesomeIcon className="navbar-item-icon" icon={icon} />
                        <p className="navbar-item-label">{label}</p>
                        <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
                    </div>

                    <div id={id + "-dropdown"} className="dropdown-container">
                        {filteredDropdownContent.map((item) => {
                            return (
                                <NavLink
                                    key={item.id}
                                    id={item.id}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `dropdown-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    <p>{item.label}</p>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};