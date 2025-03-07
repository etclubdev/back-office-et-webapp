import React, { useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

export const NavbarItem = ({ id, to, icon, label, dropdownContent, role, isUserItem, isLogoutItem }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isAllowed = role && role.includes(user?.role); 
    const navigate = useNavigate();
    console.log("Current path:", location.pathname);

    useEffect(() => {
        if (!user) return; 

        const toggleActiveClass = (element) => {
            element?.classList.toggle("active", location.pathname === element.pathname);
        }

        const element = document.getElementById(id);
        if (dropdownContent){
            const dropdownEle = element.parentElement?.querySelector(".dropdown-container");
            const elements = dropdownEle.querySelectorAll(".dropdown-item");
            elements.forEach(ele => {
                toggleActiveClass(ele);
                if (ele.classList.contains("active") && !dropdownEle.classList.contains("show")){
                    dropdownEle.classList.add("show");
                }
            })
            
        } else {
            toggleActiveClass(element)
        }
        
    }, [location.pathname, to, id, user]);

     useEffect(() => {
        if (user && location.pathname === to && !isAllowed) {
            console.log(1);
            
            alert("Bạn không có quyền truy cập trang này!");
            navigate("/");
        }
    }, [user, location.pathname, to, isAllowed, navigate]);

    const handleClick = (e, isAllowed = role && role.includes(user?.role)) => {
        if (!isAllowed) {
            alert("Bạn không có quyền truy cập mục này!");
            e.preventDefault();
        }
    };

    if (isUserItem) {
        return user ? (
            <Link to="user/info" className="navbar-item" id="navbar-user">
                <img className="user-avatar" src={user.image || '/default-avatar.png'} alt="User Avatar" />
                <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-id">@{user.id}</p>
                </div>
            </Link>
        ) : <div className="loading-user">Đang tải...</div>;
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
                <Link id={id} to={to} onClick={handleClick} className={`navbar-item ${isAllowed ? "" : "disabled"}`}>
                    <FontAwesomeIcon className="navbar-item-icon" icon={icon} />
                    <p className="navbar-item-label">{label}</p>
                </Link>
            ) : (
                <div>
                    <div id={id} className="navbar-item" onClick={() => document.getElementById(id + "-dropdown")?.classList.toggle("show")}>
                        <FontAwesomeIcon className="navbar-item-icon" icon={icon} />
                        <p className="navbar-item-label">{label}</p>
                        <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
                    </div>

                    <div id={id + "-dropdown"} className="dropdown-container">
                        {dropdownContent.map((item) => {
                            const isDropdownAllowed = !item.role || item.role.includes(user?.role);
                            return (
                                <Link 
                                    key={item.id} 
                                    id={item.id} 
                                    to={item.to} 
                                    onClick={(e) => handleClick(e, isDropdownAllowed)} 
                                    className={`dropdown-item ${isDropdownAllowed ? "" : "disabled"}`}
                                >
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
