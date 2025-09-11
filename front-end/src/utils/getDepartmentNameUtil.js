const departments = {
    "tech": "Ban Chuyên môn",
    "event": "Ban Sự kiện",
    "hr": "Ban Nhân sự - Tổ chức",
    "fer": "Ban Tài chính - Đối ngoại",
    "pr": "Ban Truyền thông"
}

export const getDepartmentNameUtil = (to) => {
    return departments[to];
}

export const getDepartmentShortName = (fullName) => {
    const entry = Object.entries(departments).find(([key, value]) => value === fullName);
    return entry ? entry[0].toUpperCase() : fullName;
}