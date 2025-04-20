import React from 'react';
import "./MainLayout.css";
import { Navbar } from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}