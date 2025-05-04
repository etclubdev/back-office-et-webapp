import React from 'react';
import "./ComingSoonPage.css"
import { innovation } from '../../assets/images/welcome';

export const ComingSoonPage = () => {
  return (
    <div className="welcome-page">
      <img src={innovation} alt="Innovation" />
      <p>COMING SOON!</p>
    </div>
  )
}
