import { faHandshake, faCircleQuestion, faFileLines, faObjectGroup, faShieldHalved, faUserGroup, faArrowRightFromBracket, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const navbarContents = [
    { id: "navbar-account", to: "accounts", icon: faShieldHalved, label: "Quản lý tài khoản"},
    {
        id: "navbar-hr",
        to: "",
        icon: faUserGroup,
        label: "Quản lý nhân sự",
        dropdownContent: [
            { id: "dropdown-hr", to: "hr", label: "Ban Nhân sự - Tổ chức"},
            { id: "dropdown-tech", to: "tech", label: "Ban Kỹ thuật - Công nghệ"},
            { id: "dropdown-pr", to: "pr", label: "Ban Truyền thông"},
            { id: "dropdown-event", to: "event", label: "Ban Sự kiện"},
            { id: "dropdown-fer", to: "fer", label: "Ban Tài chính - Đối ngoại"},
        ],
    },
    { id: "navbar-partners", to: "partners", icon: faHandshake, label: "Quản lý đối tác"},
    { 
        id: "navbar-homepage", 
        icon: faObjectGroup, 
        label: "Quản lý trang chủ", 
        dropdownContent: [
            { id: "dropdown-achievements", to: "homepage-achievements", label: "Thành tựu"},
            { id: "dropdown-partners", to: "homepage-partners", label: "Đối tác"},
            { id: "dropdown-faqs", to: "homepage-faqs", label: "FAQs"},
            { id: "dropdown-banners", to: "homepage-banners", label: "Banner"},
        ], 
    },
    { id: "navbar-faqs", to: "faqs", icon: faCircleQuestion, label: "Quản lý FAQs"},
    {
        id: "navbar-posts",
        to: "",
        icon: faFileLines,
        label: "Quản lý Bài đăng",
        dropdownContent: [
            { id: "dropdown-activities", to: "activities", label: "Hoạt động"},
            { id: "dropdown-etnews", to: "et-news", label: "ET News"},
            { id: "dropdown-etblog", to: "et-blog", label: "ET Blog"},
        ],
    },
    { 
        id: "navbar-collaborator", 
        to: "", 
        icon: faFaceSmile, 
        label: "Quản lý Tìm kiếm CTV", 
        dropdownContent: [
            { id: "dropdown-status", to: "collaborator-status", label: "Trạng thái"},
            { id: "dropdown-archive", to: "collaborator-archive", label: "Lưu trữ"},
        ],
     },
];


export { navbarContents }