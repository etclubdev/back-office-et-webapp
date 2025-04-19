import React from 'react';
import "./WelcomePage.css"
import { innovation } from '../../assets/images/welcome';

export const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <img src={innovation} alt="Innovation" />
      <p>CHÀO MỪNG BẠN QUAY TRỞ LẠI!</p>
    </div>
  )
}
