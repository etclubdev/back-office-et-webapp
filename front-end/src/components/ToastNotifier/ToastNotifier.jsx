import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastNotifier = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export const notifySuccess = (message) => toast.success(message);
export const notifyError = (message) => toast.error(message);
export const notifyWarning = (message) => toast.warning(message);
export const notifyInfo = (message) => toast.info(message);

