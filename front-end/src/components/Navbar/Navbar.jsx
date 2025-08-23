import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import { horizontalLogo, noTextLogo } from '../../assets/images/logos';
import { NavbarItem } from '../NavbarItem/NavbarItem';
import { navbarContents } from '../../constants';
import { useAuth } from "../../context/useAuth";
import { getPersonnelById } from "../../api/personnel.service";

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});

    const location = useLocation();

    const fetchUser = useCallback(async () => {
        if (!user) return;
        const response = await getPersonnelById(user.personnel_id);
        setUserInfo(response.data);
    }, [user])

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
        if (isMobile) {
            setIsExpanded(!isExpanded);
        }
    }, [isExpanded]);

    useEffect(() => {
        if (isExpanded && isMobile) {
            setIsExpanded(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleResizeWindow = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsMobile(false);
            }
        };
        window.addEventListener('resize', handleResizeWindow);
        return () => window.removeEventListener('resize', handleResizeWindow);
    }, [isMobile]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser])
    return (
        <div className={`navbar-section ${isExpanded ? 'expanded' : ''}`}>
            <div className='navbar-logo-container'>
                <img className="navbar-logo" src={isMobile && !isExpanded ? noTextLogo : horizontalLogo} alt="ET Club" />
            </div>
            {
                isMobile && (
                    <div className="expand-container" onClick={handleResize}>
                        <FontAwesomeIcon className="expand-icon" icon={isExpanded ? faChevronCircleLeft : faChevronCircleRight} />
                    </div>
                )
            }
            <div className="navbar-items">
                <NavbarItem userInfo={userInfo} />
                <div className="navbar-items-wrapper">
                    {navbarContents.map(item => (
                        <NavbarItem key={item.id} {...item} setIsExpanded={isMobile ? setIsExpanded : {}} />
                    ))}
                </div>
                <NavbarItem isLogoutItem />
            </div>
        </div>
    );
};