import { faHandshake, faCircleQuestion, faFileLines, faObjectGroup, faShieldHalved, faUserGroup, faArrowRightFromBracket, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FactCheck, Inventory, Delete, Restore } from '@mui/icons-material';

const navbarContents = [
    { id: "navbar-account", to: "accounts", icon: faShieldHalved, label: "Tài khoản" },
    {
        id: "navbar-hr",
        to: "",
        icon: faUserGroup,
        label: "Nhân sự",
        dropdownContent: [
            { id: "dropdown-tech", to: "/colleague/tech", label: "Ban Chuyên môn" },
            { id: "dropdown-hr", to: "/colleague/hr", label: "Ban Nhân sự - Tổ chức" },
            { id: "dropdown-pr", to: "/colleague/pr", label: "Ban Truyền thông" },
            { id: "dropdown-event", to: "/colleague/event", label: "Ban Sự kiện" },
            { id: "dropdown-fer", to: "/colleague/fer", label: "Ban Tài chính - Đối ngoại" },
        ],
    },
    { id: "navbar-partners", to: "partners", icon: faHandshake, label: "Đối tác" },
    {
        id: "navbar-homepage",
        icon: faObjectGroup,
        label: "Trang chủ",
        dropdownContent: [
            { id: "dropdown-achievements", to: "homepage-achievements", label: "Thành tựu" },
            { id: "dropdown-partners", to: "homepage-partners", label: "Đối tác" },
            { id: "dropdown-faqs", to: "homepage-faqs", label: "FAQs" },
            { id: "dropdown-banners", to: "homepage-banners", label: "Banner" },
        ],
    },
    { id: "navbar-faqs", to: "faqs", icon: faCircleQuestion, label: "FAQs" },
    {
        id: "navbar-posts",
        to: "",
        icon: faFileLines,
        label: "Bài đăng",
        dropdownContent: [
            { id: "dropdown-activities", to: "activities", label: "Hoạt động" },
            { id: "dropdown-etnews", to: "et-news", label: "ET News" },
            { id: "dropdown-etblog", to: "et-blog", label: "ET Blog" },
        ],
    },
    {
        id: "navbar-collaborator",
        to: "",
        icon: faFaceSmile,
        label: "Tìm kiếm CTV",
        dropdownContent: [
            { id: "dropdown-overview", to: "/collaborator/overview", label: "Tổng quan" },
            { id: "dropdown-approve", to: "/collaborator/approve", label: "Phê duyệt" },
            { id: "dropdown-archive", to: "/collaborator/archive", label: "Lưu trữ" },
        ],
    },
];

const breadcrumbNameMap = {
    "profile": "Thông tin cá nhân",
    "accounts": "Quản lý tài khoản",
    "partners": "Quản lý đối tác",
    "tech": "Ban Chuyên môn",
    "event": "Ban Sự kiện",
    "hr": "Ban Nhân sự - Tổ chức",
    "fer": "Ban Tài chính - Đối ngoại",
    "pr": "Ban Truyền thông",
    "homepage-achievements": "Thành tựu",
    "homepage-partners": "Đối tác",
    "homepage-faqs": "FAQs",
    "homepage-banners": "Quản lý Banner",
    "faqs": "Quản lý FAQs",
    "et-news": "Quản lý ET News",
    "et-blog": "Quản lý ET Blog",
    "activities": "Quản lý Hoạt động",
    "collaborator": "Quản lý Tìm kiếm CTV",
    "overview": "Tổng quan",
    "approve": "Phê duyệt",
    "archive": "Lưu trữ",
    "create": "Thêm mới",
};

const filterChipData = {
    partners: ['Đối tác doanh nghiệp', 'Đối tác chuyên gia', 'Đối tác Truyền thông', 'Nghệ sĩ khách mời'],
    personnelStatus: ['Đang hoạt động', 'Cựu thành viên'],
    faqs: ['Về ET Club', 'Về hoạt động và sự kiện', 'Về quy trình tham gia', 'Khác'],
    etNews: ['Công nghệ Việt Nam', 'Công nghệ thế giới', 'Chính phủ số', 'Khác'],
    activities: ['Talkshow/Workshop', 'Cuộc thi', 'Game', 'Hoạt động truyền thông', 'Hoạt động nội bộ'],
    collaborators: ['Ban Chuyên môn', "Ban Sự kiện", "Ban Nhân sự - Tổ chức", "Ban Tài chính - Đối ngoại", "Ban Truyền thông"]
};

const confirmContents = {
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


const UPLOAD_PRESET = "first_upload";
const CLOUD_NAME = "dgqolusci";

const MAX_MB_IMAGE_UPLOAD = 2;
const MAX_MB_BANNER_UPLOAD = 5;

export { confirmContents, filterChipData, breadcrumbNameMap, navbarContents, UPLOAD_PRESET, CLOUD_NAME, MAX_MB_IMAGE_UPLOAD, MAX_MB_BANNER_UPLOAD }
