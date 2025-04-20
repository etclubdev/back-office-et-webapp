import React, { useCallback, useEffect, useState } from 'react';
import './Navbar.css';
import { horizontalLogo } from '../../assets/images/logos';
import { NavbarItem } from '../NavbarItem/NavbarItem';
import { navbarContents } from '../../constants';
import { useAuth } from "../../context/useAuth";
import { getPersonnelById } from "../../api/personnel.service";

export const Navbar = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});

    const fetchUser = useCallback(async () => {
        if (!user) return;
        const response = await getPersonnelById(user.personnel_id);
        setUserInfo(response.data);
        
    }, [user])

    useEffect(() => {
        fetchUser();
    }, [fetchUser])
    return (
        <div className="navbar-section">
            <img className="navbar-logo" src={horizontalLogo} alt="ET Club" />
            <div className="navbar-items">
                <NavbarItem userInfo={userInfo}/>
                <div className="navbar-items-wrapper">
                    {navbarContents.map(item => (
                        <NavbarItem key={item.id} {...item} />
                    ))}
                </div>
                <NavbarItem isLogoutItem />
            </div>
        </div>
    );
};