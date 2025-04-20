import { faHandshake, faCircleQuestion, faFileLines, faObjectGroup, faShieldHalved, faUserGroup, faArrowRightFromBracket, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const breadcrumbNameMap = {
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
    "faqs": "Quản lý FAQs",
    "et-news": "Quản lý ET News",
    "et-blog": "Quản lý ET Blog",
    "activities": "Quản lý Hoạt động",
    "status": "Cập nhật trạng thái",
    "banner": "Cập nhật biểu ngữ",
    "create": "Thêm mới",
    "edit": "Chỉnh sửa"
};


const navbarContents = [
    { id: "navbar-account", to: "account", icon: faShieldHalved, label: "Quản lý tài khoản", role: ["admin"] },
    {
        id: "navbar-hr",
        to: "",
        icon: faUserGroup,
        label: "Quản lý nhân sự",
        dropdownContent: [
            { id: "dropdown-hr", to: "hr", label: "Ban Nhân sự - Tổ chức", role: ["admin"] },
            { id: "dropdown-tech", to: "tech", label: "Ban Kỹ thuật - Công nghệ", role: ["admin"] },
            { id: "dropdown-pr", to: "pr", label: "Ban Truyền thông", role: ["admin"] },
            { id: "dropdown-event", to: "event", label: "Ban Sự kiện", role: ["admin"] },
            { id: "dropdown-fer", to: "fer", label: "Ban Tài chính - Đối ngoại", role: ["admin"] },
        ],
    },
    { id: "navbar-partners", to: "partners", icon: faHandshake, label: "Quản lý đối tác", role: ["admin"] },
    { 
        id: "navbar-homepage", 
        icon: faObjectGroup, 
        label: "Quản lý trang chủ", 
        dropdownContent: [
            { id: "dropdown-achievements", to: "homepage-achievements", label: "Thành tựu", role: ["admin"] },
            { id: "dropdown-partners", to: "homepage-partners", label: "Đối tác", role: ["admin"] },
            { id: "dropdown-faqs", to: "homepage-faqs", label: "FAQs", role: ["admin"] },
        ], 
    },
    { id: "navbar-faqs", to: "faqs", icon: faCircleQuestion, label: "Quản lý FAQs", role: ["admin"] },
    {
        id: "navbar-posts",
        to: "",
        icon: faFileLines,
        label: "Quản lý Bài đăng",
        dropdownContent: [
            { id: "dropdown-activities", to: "activities", label: "Hoạt động", role: ["admin"] },
            { id: "dropdown-etnews", to: "et-news", label: "ET News" },
            { id: "dropdown-etblog", to: "et-blog", label: "ET Blog", role: ["admin"] },
        ],
    },
    { id: "navbar-collaborator", to: "collaborator", icon: faFaceSmile, label: "Quản lý Tìm kiếm CTV", role: ["admin"] },
];

const UPLOAD_PRESET = "first_upload";
const CLOUD_NAME = "dgqolusci";

export { breadcrumbNameMap, navbarContents, UPLOAD_PRESET, CLOUD_NAME }