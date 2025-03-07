import { faHandshake, faCircleQuestion, faFileLines, faObjectGroup, faShieldHalved, faUserGroup, faArrowRightFromBracket, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const navbarContents = [
    { id: "navbar-account", to: "account", icon: faShieldHalved, label: "Quản lý tài khoản", role: ["admin"] },
    {
        id: "navbar-hr",
        to: "",
        icon: faUserGroup,
        label: "Quản lý nhân sự",
        dropdownContent: [
            { id: "dropdown-hr", to: "hr", label: "Ban Nhân sự - Tổ chức", role: [] },
            { id: "dropdown-tech", to: "tech", label: "Ban Kỹ thuật - Công nghệ", role: ["admin"] },
            { id: "dropdown-pr", to: "pr", label: "Ban Truyền thông", role: ["admin"] },
            { id: "dropdown-event", to: "event", label: "Ban Sự kiện", role: ["admin"] },
            { id: "dropdown-fer", to: "fer", label: "Ban Tài chính - Đối ngoại", role: ["admin"] },
        ],
    },
    { id: "navbar-partners", to: "partners", icon: faHandshake, label: "Quản lý đối tác", role: ["admin"] },
    { id: "navbar-homepage", to: "homepage", icon: faObjectGroup, label: "Quản lý trang chủ", role: ["admin"] },
    { id: "navbar-faqs", to: "faqs", icon: faCircleQuestion, label: "Quản lý FAQs", role: ["admin"] },
    {
        id: "navbar-posts",
        to: "",
        icon: faFileLines,
        label: "Quản lý Bài đăng",
        dropdownContent: [
            { id: "dropdown-activities", to: "activities", label: "Hoạt động", role: [] },
            { id: "dropdown-etnews", to: "et-news", label: "ET News", role: [] },
            { id: "dropdown-etblog", to: "et-blog", label: "ET Blog", role: [] },
        ],
    },
    { id: "navbar-collaborator", to: "collaborator", icon: faFaceSmile, label: "Quản lý Tìm kiếm CTV", role: [] },
];

export { navbarContents }