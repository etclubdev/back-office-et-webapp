import React from 'react';
import "./MainLayout.css";
import { Navbar } from '../../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  return (
    <div className="main-layout">
      {isMobile ? (
        <div className="mobile-navbar">
          <Navbar />
        </div>
      ) : (
        <Navbar />
      )}
      <main>
        <Outlet />
      </main>
    </div>
  )
}