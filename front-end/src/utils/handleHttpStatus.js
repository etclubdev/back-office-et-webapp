import { notifySuccess, notifyError, notifyWarning } from "../components/ToastNotifier";

export const handleHttpSuccess = (message = "Thành công!") => {
  notifySuccess(message);
};

export const handleHttpError = (status, customMessage = "") => {
  const suffix = customMessage ? `: ${customMessage}` : "";

  switch (status) {
    case 400:
      notifyError(`Yêu cầu không hợp lệ (400)${suffix}`);
      break;
    case 401:
      notifyWarning(`Chưa xác thực (401)${suffix}`);
      break;
    case 403:
      notifyWarning(`Bạn không có quyền (403)${suffix}`);
      break;
    case 404:
      notifyError(`Không tìm thấy dữ liệu (404)${suffix}`);
      break;
    case 500:
      notifyError(`Lỗi máy chủ (500)${suffix}`);
      break;
    default:
      notifyError(`${status}${suffix}`);
  }
};
