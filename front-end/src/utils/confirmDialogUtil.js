export const getConfirmDialogConfig = (content) => {
  switch (content.actionType) {
    case "switch":
      return {
        title: content?.title || "Xác nhận thay đổi",
        desc: content?.desc || "Bạn có chắc chắn muốn thay đổi không?",
        alertType: "warning",
      };
    case "delete":
      return {
        title: content?.title || "Xác nhận xóa",
        desc: content?.desc || "Bạn có chắc chắn muốn xóa không? Hành động này không thể hoàn tác!",
        alertType: "delete",
      };
    default:
      return {
        title: content?.title || "Xác nhận hành động",
        desc: content?.desc || "Bạn có chắc chắn muốn thực hiện hành động này?",
        alertType: "info",
      };
  }
};