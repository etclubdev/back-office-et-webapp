import React from 'react';
import './Navbar.css';
import { horizontalLogo } from '../../assets/image/logos';
import { NavbarItem } from '../NavbarItem/NavbarItem';
import { navbarContents } from '../../constants';

export const Navbar = () => {
    return (
        <div className="navbar-section">
            <img className="navbar-logo" src={horizontalLogo} alt="ET Club" />
            <div className="navbar-items">
                <NavbarItem isUserItem/>
                <div className="navbar-items-wrapper">
                    {navbarContents.map(item => (
                        <NavbarItem key={item.id} {...item} />
                    ))}
                    <NavbarItem isLogoutItem />
                </div>
            </div>
        </div>
    );
};