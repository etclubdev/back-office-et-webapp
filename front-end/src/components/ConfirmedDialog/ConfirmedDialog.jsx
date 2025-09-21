import './ConfirmedDialog.css';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export const ConfirmedDialog = ({ title, desc, Icon = PriorityHighIcon, alertType, onClose, onConfirm, isLoading = false }) => {
    
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-close">
                    <button disabled={isLoading} className="close-button" onClick={onClose}>✕</button>
                </div>
                <div className="modal-icon">
                    <div className={`circle ${alertType}`}>
                        <Icon className='icon' />
                    </div>
                </div>
                <div className="modal-content">
                    <h2 className="modal-title">{title}</h2>
                    <p className="modal-text">{desc}</p>
                </div>
                {
                    onConfirm && (
                        <div className="modal-actions">
                            <button disabled={isLoading} className="cancel-button" onClick={onClose}>Hủy bỏ</button>
                            <button
                                onClick={onConfirm}
                                className={(isLoading ? "loading-button" : "confirm-button") + ` ${alertType}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Đang xử lý..." : "Xác nhận"}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
