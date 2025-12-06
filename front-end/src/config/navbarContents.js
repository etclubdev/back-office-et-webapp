import { faHandshake, faCircleQuestion, faFileLines, faObjectGroup, faShieldHalved, faUserGroup, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { routePermissions } from './routePermissions';

export const navbarContents = [
    { id: "navbar-account", to: "/accounts", icon: faShieldHalved, label: "Quản lý tài khoản", requiredPermissions: routePermissions["/accounts"] },
    {
        id: "navbar-hr",
        to: "",
        icon: faUserGroup,
        label: "Quản lý nhân sự",
        dropdownContent: [
            { id: "dropdown-tech", to: "/colleague/tech", label: "Ban Chuyên môn", requiredPermissions: routePermissions["/colleague/tech"] },
            { id: "dropdown-hr", to: "/colleague/hr", label: "Ban Nhân sự - Tổ chức", requiredPermissions: routePermissions["/colleague/hr"] },
            { id: "dropdown-pr", to: "/colleague/pr", label: "Ban Truyền thông", requiredPermissions: routePermissions["/colleague/pr"] },
            { id: "dropdown-event", to: "/colleague/event", label: "Ban Sự kiện", requiredPermissions: routePermissions["/colleague/event"] },
            { id: "dropdown-fer", to: "/colleague/fer", label: "Ban Tài chính - Đối ngoại", requiredPermissions: routePermissions["/colleague/fer"] },
        ],
    },
    { id: "navbar-partners", to: "/partners", icon: faHandshake, label: "Quản lý đối tác", requiredPermissions: routePermissions["/partners"] },
    {
        id: "navbar-homepage",
        icon: faObjectGroup,
        label: "Quản lý trang chủ",
        dropdownContent: [
            { id: "dropdown-achievements", to: "/homepage-achievements", label: "Thành tựu", requiredPermissions: routePermissions["/homepage-achievements"]  },
            { id: "dropdown-partners", to: "/homepage-partners", label: "Đối tác", requiredPermissions: routePermissions["/homepage-partners"]  },
            { id: "dropdown-faqs", to: "/homepage-faqs", label: "FAQs", requiredPermissions: routePermissions["/homepage-faqs"]  },
            { id: "dropdown-banners", to: "/homepage-banners", label: "Banner", requiredPermissions: routePermissions["/homepage-banners"]  },
        ],
    },
    { id: "navbar-faqs", to: "/faqs", icon: faCircleQuestion, label: "Quản lý FAQs", requiredPermissions: routePermissions["/faqs"] },
    {
        id: "navbar-posts",
        to: "",
        icon: faFileLines,
        label: "Quản lý Bài đăng",
        dropdownContent: [
            { id: "dropdown-activities", to: "/activities", label: "Hoạt động", requiredPermissions: routePermissions["/activities"] },
            { id: "dropdown-etnews", to: "/et-news", label: "ET News", requiredPermissions: routePermissions["/et-news"] },
            { id: "dropdown-etblog", to: "/et-blog", label: "ET Blog", requiredPermissions: routePermissions["/et-blog"] },
        ],
    },
    {
        id: "navbar-collaborator",
        to: "",
        icon: faFaceSmile,
        label: "Quản lý Tìm kiếm CTV",
        dropdownContent: [
            { id: "dropdown-overview", to: "/collaborator/overview", label: "Tổng quan", requiredPermissions: routePermissions["/collaborator/overview"] },
            { id: "dropdown-approve", to: "/collaborator/approve", label: "Phê duyệt", requiredPermissions: routePermissions["/collaborator/approve"] },
            { id: "dropdown-archive", to: "/collaborator/archive", label: "Lưu trữ", requiredPermissions: routePermissions["/collaborator/archive"] },
        ],
    },
];
