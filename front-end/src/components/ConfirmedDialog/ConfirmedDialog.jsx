import React from 'react';
import './ConfirmedDialog.css';

export const ConfirmedDialog = ({ title, desc, type }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-close">
                    <button className="close-button">✕</button>
                </div>
                <div className="modal-icon">
                    <div className={`circle ${type}`}>
                        <span className="mark">!</span>
                    </div>
                </div>
                <div className="modal-content">
                    <h2 className="modal-title">{title}</h2>
                    <p className="modal-text">{desc}</p>
                </div>
                <div className="modal-actions">
                    <button className="cancel-button">Hủy bỏ</button>
                    <button className={`confirm-button ${type}`}>Xác nhận</button>
                </div>
            </div >
        </div >
    );
}
