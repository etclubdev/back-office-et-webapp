import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/useAuth";

export const NavbarItem = ({ id, to, icon, label, dropdownContent, userInfo, isLogoutItem }) => {
    const { user, logout } = useAuth();

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
            <NavLink onClick={logout} to="/" className="navbar-item" id="navbar-logout">
                <FontAwesomeIcon className="navbar-item-icon" icon={faArrowRightFromBracket} />
                <p className="navbar-item-label">Đăng xuất</p>
            </NavLink>
        );
    }

    return (
        <div className="navbar-item-wrapper">
            {!dropdownContent ? (
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
                        }}
                    >
                        <FontAwesomeIcon className="navbar-item-icon" icon={icon} />
                        <p className="navbar-item-label">{label}</p>
                        <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
                    </div>

                    <div id={id + "-dropdown"} className="dropdown-container">
                        {dropdownContent.map((item) => {
                            return (
                                <NavLink
                                    key={item.id}
                                    id={item.id}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `dropdown-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );

};
