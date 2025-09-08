import { faHandshake, faCircleQuestion, faFileLines, faObjectGroup, faShieldHalved, faUserGroup, faArrowRightFromBracket, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const navbarContents = [
    { id: "navbar-account", to: "accounts", icon: faShieldHalved, label: "Quản lý tài khoản" },
    {
        id: "navbar-hr",
        to: "",
        icon: faUserGroup,
        label: "Quản lý nhân sự",
        dropdownContent: [
            { id: "dropdown-hr", to: "/colleague/hr", label: "Ban Nhân sự - Tổ chức" },
            { id: "dropdown-tech", to: "/colleague/tech", label: "Ban Kỹ thuật - Công nghệ" },
            { id: "dropdown-pr", to: "/colleague/pr", label: "Ban Truyền thông" },
            { id: "dropdown-event", to: "/colleague/event", label: "Ban Sự kiện" },
            { id: "dropdown-fer", to: "/colleague/fer", label: "Ban Tài chính - Đối ngoại" },
        ],
    },
    { id: "navbar-partners", to: "partners", icon: faHandshake, label: "Quản lý đối tác" },
    {
        id: "navbar-homepage",
        icon: faObjectGroup,
        label: "Quản lý trang chủ",
        dropdownContent: [
            { id: "dropdown-achievements", to: "homepage-achievements", label: "Thành tựu" },
            { id: "dropdown-partners", to: "homepage-partners", label: "Đối tác" },
            { id: "dropdown-faqs", to: "homepage-faqs", label: "FAQs" },
            { id: "dropdown-banners", to: "homepage-banners", label: "Banner" },
        ],
    },
    { id: "navbar-faqs", to: "faqs", icon: faCircleQuestion, label: "Quản lý FAQs" },
    {
        id: "navbar-posts",
        to: "",
        icon: faFileLines,
        label: "Quản lý Bài đăng",
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
        label: "Quản lý Tìm kiếm CTV",
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
    "tech": "Ban Kỹ thuật - Công nghệ",
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
    collaborators: {
        openForm: {
            title: "Xác nhận thay đổi trạng thái",
            desc: "Bạn có chắc chắn muốn khởi động “chương trình tìm kiếm CTV” trên trang chủ không?"
        },
        approve: {
            title: "Xác nhận phê duyệt",
            desc: "Bạn chắc chắn đồng ý phê duyệt CTV này? Sau khi xác nhận, dữ liệu này di chuyển sang vòng tiếp theo."
        },
        approveLastRound: {
            title: "Xác nhận phê duyệt",
            desc: "Bạn chắc chắn đồng ý phê duyệt CTV này trở thành thành viên chính thức? Sau khi xác nhận, dữ liệu này sẽ được đồng bộ vào bảng nhân sự."
        },
        restore: {
            title: "Xác nhận khôi phục",
            desc: "Bạn có chắc chắn muốn đưa ứng viên này trở lại danh sách chờ phê duyệt Vòng 1 - CV không?"
        },
        archive: {
            title: "Xác nhận lưu trữ",
            desc: "Bạn có chắc chắn muốn loại ứng viên này khỏi chương trình tìm kiếm CTV và chuyển vào mục lưu trữ không?"
        },
        deleteMsg: {
            title: "Xác nhận xóa vĩnh viễn",
            desc: "Bạn chắc chắn muốn xóa thông tin ứng viên này khỏi hệ thống? Sau khi xóa, dữ liệu này sẽ không thể khôi phục lại."
        }
    }
};


const UPLOAD_PRESET = "first_upload";
const CLOUD_NAME = "dgqolusci";

export { confirmContents, filterChipData, breadcrumbNameMap, navbarContents, UPLOAD_PRESET, CLOUD_NAME }
