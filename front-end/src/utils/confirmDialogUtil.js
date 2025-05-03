export const getConfirmDialogConfig = (actionType) => {
    switch (actionType) {
      case "switch":
        return {
          title: "Xác nhận thay đổi",
          desc: "Bạn có chắc chắn muốn thay đổi không?",
          alertType: "warning",
        };
      case "delete":
        return {
          title: "Xác nhận xóa",
          desc: "Bạn có chắc chắn muốn xóa không? Hành động này không thể hoàn tác!",
          alertType: "delete",
        };
      default:
        return {
          title: "Xác nhận hành động",
          desc: "Bạn có chắc chắn muốn thực hiện hành động này?",
          alertType: "info",
        };
    }
  };