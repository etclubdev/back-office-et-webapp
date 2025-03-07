import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

export const NavbarItem = ({ id, to, icon, label, dropdownContent, role, isUserItem, isLogoutItem }) => {
    const { user, logout } = useAuth();
    const isAllowed = role && role.includes(user?.role);

    const toggleActiveClass = (selector, container = "navbar-section") => {
        const containerEle = document.querySelector("." + container);
        const clickedEle = containerEle?.querySelector(selector);

        containerEle?.querySelector(".active")?.classList.remove("active");
        clickedEle?.classList.add("active");
    };

    const toggleDropdownIcon = (selector) => {
        const clickedEle = document.querySelector(selector);
        const dropdownIcon = clickedEle?.querySelector(".dropdown-icon");
        console.log(clickedEle, dropdownIcon);
        
        if (dropdownIcon) {
            dropdownIcon.classList.toggle("show");
        }
    }

    const handleNavBarItem = (id, e, hasRoleCheck = true, isAllowed = role ? role.includes(user?.role) : true) => {
        if (dropdownContent) {
            const dropdownContainer = document.querySelector(`#${id} + .dropdown-container`);
            dropdownContainer?.classList.toggle("show");
        }

        if (!isAllowed) {
            e.preventDefault();
            alert("Bạn không có quyền truy cập mục này.");
            return;
        }

        if (hasRoleCheck) {
            toggleActiveClass(`#${id}`);
        }
        else{
            toggleDropdownIcon(`#${id}`);
        }
    };

    if (isUserItem) {
        return user ? (
            <Link onClick={(e) => toggleActiveClass(`#${e.currentTarget.id}`)} to="user/info" className="navbar-item" id="navbar-user">
                <img className="user-avatar" src={user.image || '/default-avatar.png'} alt="User Avatar" />
                <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-id">@{user.id}</p>
                </div>
            </Link>
        ) : (
            <div className="loading-user">Đang tải...</div>
        );
    }

    if (isLogoutItem) {
        return (
            <Link onClick={logout} to="/" className="navbar-item" id="navbar-logout">
                <FontAwesomeIcon className="navbar-item-icon" icon={faArrowRightFromBracket} />
                <p className="navbar-item-label">Đăng xuất</p>
            </Link>
        );
    }

    return (
        <div className="navbar-item-wrapper">
            {!dropdownContent ? (
                <Link onClick={(e) => handleNavBarItem(id, e)} to={to} className={`navbar-item ${isAllowed ? "" : "disabled"}`} id={id}>
                    <FontAwesomeIcon className="navbar-item-icon" icon={icon} />
                    <p className="navbar-item-label">{label}</p>
                </Link>
            ) : (
                <div>
                    <div onClick={(e) => handleNavBarItem(id, e, false)} className="navbar-item" id={id}>
                        <FontAwesomeIcon className="navbar-item-icon" icon={icon} />
                        <p className="navbar-item-label">{label}</p>
                        <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
                    </div>
                    <div className="dropdown-container">
                        {dropdownContent.map((item) => {
                            const isDropdownAllowed = item.role ? item.role.includes(user?.role) : true;
                            return (
                                <Link key={item.id} onClick={(e) => handleNavBarItem(item.id, e, true, isDropdownAllowed)} to={item.to} className={`dropdown-item ${!isDropdownAllowed ? "disabled" : ""}`} id={item.id}>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
