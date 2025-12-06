import { FactCheck, Inventory, Delete, Restore } from '@mui/icons-material';

export const confirmContents = {
    accounts: {
        delete: {
            title: "Xác nhận xóa tài khoản",
            desc: "Bạn chắc chắn muốn xóa tài khoản này? Sau khi xóa, tài khoản này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
        resetPassword: {
            title: "Xác nhận khởi tạo lại mật khẩu",
            desc: "Bạn có chắc chắn muốn khởi tạo lại mật khẩu tài khoản đã chọn? Mật khẩu mới sẽ được gửi vào email của tài khoản này.",
            alertType: "warning"
        }
    },
    achievements: {
        update: {
            title: "Xác nhận thay đổi trạng thái thành tựu",
            desc: "Bạn chắc chắn muốn thay đổi trạng thái thành tựu này? Sau khi thay đổi, thành tựu này sẽ được ẩn/hiển thị trên trang chủ.",
            alertType: "info"
        },
        delete: {
            title: "Xác nhận xóa thành tựu",
            desc: "Bạn chắc chắn muốn xóa thành tựu này? Sau khi xóa, thành tựu này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
    },
    activities: {
        delete: {
            title: "Xác nhận xóa hoạt động",
            desc: "Bạn chắc chắn muốn xóa hoạt động này? Sau khi xóa, hoạt động này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
    },
    banners: {
        delete: {
            title: "Xác nhận xóa banner",
            desc: "Bạn chắc chắn muốn xóa banner này? Sau khi xóa, banner này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
    },
    collaborators: {
        openForm: {
            title: "Xác nhận thay đổi trạng thái",
            desc: "Bạn có chắc chắn muốn khởi động “chương trình tìm kiếm CTV” trên trang chủ không?",
        },
        approve: {
            title: "Xác nhận phê duyệt",
            desc: "Bạn chắc chắn đồng ý phê duyệt CTV này? Sau khi xác nhận, dữ liệu này di chuyển sang vòng tiếp theo.",
            Icon: FactCheck,
            alertType: "info"
        },
        approveLastRound: {
            title: "Xác nhận phê duyệt",
            desc: "Bạn chắc chắn đồng ý phê duyệt CTV này trở thành thành viên chính thức? Sau khi xác nhận, dữ liệu này sẽ được đồng bộ vào bảng nhân sự.",
            Icon: FactCheck,
            alertType: "info"
        },
        restore: {
            title: "Xác nhận khôi phục",
            desc: "Bạn có chắc chắn muốn đưa ứng viên này trở lại danh sách chờ phê duyệt Vòng 1 - CV không?",
            Icon: Restore,
            alertType: "info"
        },
        archive: {
            title: "Xác nhận lưu trữ",
            desc: "Bạn có chắc chắn muốn loại ứng viên này khỏi chương trình tìm kiếm CTV và chuyển vào mục lưu trữ không?",
            Icon: Inventory,
            alertType: "danger"
        },
        deleteMsg: {
            title: "Xác nhận xóa vĩnh viễn",
            desc: "Bạn chắc chắn muốn xóa thông tin ứng viên này khỏi hệ thống? Sau khi xóa, dữ liệu này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        }
    },
    etBlog: {
        delete: {
            title: "Xác nhận xóa blog",
            desc: "Bạn chắc chắn muốn xóa blog này? Sau khi xóa, blog này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
    },
    etNews: {
        delete: {
            title: "Xác nhận xóa tin",
            desc: "Bạn chắc chắn muốn xóa tin này? Sau khi xóa, tin này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
    },
    faqs: {
        delete: {
            title: "Xác nhận xóa FAQs",
            desc: "Bạn chắc chắn muốn xóa FAQs này? Sau khi xóa, FAQs này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
        update: {
            title: "Xác nhận thay đổi trạng thái FAQs",
            desc: "Bạn chắc chắn muốn thay đổi trạng thái FAQs này? Sau khi thay đổi, FAQs này sẽ được ẩn/hiển thị trên trang chủ.",
            alertType: "info"
        }
    },
    partners: {
        delete: {
            title: "Xác nhận xóa đối tác",
            desc: "Bạn chắc chắn muốn xóa đối tác này? Sau khi xóa, đối tác này sẽ không thể khôi phục lại.",
            Icon: Delete,
            alertType: "danger"
        },
        update: {
            title: "Xác nhận thay đổi trạng thái đối tác",
            desc: "Bạn chắc chắn muốn thay đổi trạng thái đối tác này? Sau khi thay đổi, đối tác này sẽ được ẩn/hiển thị trên trang chủ.",
            alertType: "info"
        }
    },
    personnels: {
        delete: {
            title: "Xác nhận xóa nhân sự",
            desc: "Bạn chắc chắn muốn xóa nhân sự này? Sau khi xóa, nhân sự này sẽ không thể khôi phục lại. Đồng thời, nếu họ có tài khoản đăng nhập, tài khoản cũng sẽ bị xóa.",
            Icon: Delete,
            alertType: "danger"
        }
    },
    recruitment: {
        opened: {
            title: "Xác nhận thay đổi trạng thái",
            desc: "Bạn có chắc chắn muốn khởi động “Chương trình tìm kiếm CTV” trên trang chủ không?",
            alertType: "danger"
        },
        closed: {
            title: "Xác nhận thay đổi trạng thái",
            desc: "Bạn có chắc chắn muốn đóng “Chương trình tìm kiếm CTV” trên trang chủ không?",
            alertType: "danger"
        }
    }
};