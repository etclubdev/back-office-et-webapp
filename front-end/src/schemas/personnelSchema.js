import * as yup from "yup";

const personnelSchema = yup.object().shape({
    personnel_name: yup
        .string()
        .required("Vui lòng nhập họ và tên của bạn.")
        .matches(/^[^\d]+$/, "Họ và tên không được chứa số."),

    phone_number: yup
        .string()
        .required("Vui lòng nhập số điện thoại.")
        .matches(/^0\d{9,10}$/, "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số."),

    email: yup
        .string()
        .email("Định dạng email không hợp lệ.")
        .required("Vui lòng nhập địa chỉ email.")
        .max(320, "Email không được vượt quá 320 ký tự."),

    dob: yup
        .date()
        .required("Vui lòng chọn ngày sinh.")
        .typeError("Ngày sinh không hợp lệ."),

    gender: yup
        .string()
        .required("Vui lòng chọn giới tính.")
        .oneOf(["Nam", "Nữ", "Khác"], "Giới tính không hợp lệ."),

    address: yup.string().nullable().default(""),

    student_id: yup
        .string()
        .required("Vui lòng nhập MSSV"),

    faculty: yup
        .string()
        .required("Vui lòng nhập tên khoa"),

    university: yup
        .string()
        .required("Vui lòng nhập tên trường"),

    major: yup
        .string()
        .required("Vui lòng nhập tên ngành"),

    class: yup
        .string()
        .required("Vui lòng nhập lớp"),

    avatar_url: yup
        .string()
        .transform((value) => value ?? "")
        .nullable(),

    cv_type: yup
        .string()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .nullable()
        .oneOf(["CV mẫu", "CV tự thiết kế"], "Loại CV không hợp lệ."),

    cv_link: yup
        .string()
        .transform((value) => value ?? "")
        .nullable()
        .url("Đường dẫn CV không hợp lệ."),

    cohort_name: yup
        .string()
        .required("Vui lòng nhập Khóa đào tạo.")
        .matches(/^K\d{1,2}$/, "Khóa phải có định dạng 'Kxx', ví dụ: K49."),

    term_id: yup
        .string()
        .required("Vui lòng chọn nhiệm kỳ."),

    department_name: yup
        .string()
        .required("Vui lòng chọn tên ban.")
        .oneOf(
            [
                "Ban Chuyên môn",
                "Ban Truyền thông",
                "Ban Nhân sự - Tổ chức",
                "Ban Sự kiện",
                "Ban Tài chính - Đối ngoại"
            ],
            "Vui lòng chọn đúng tên ban."
        ),

    position_name: yup
        .string()
        .required("Vui lòng chọn chức vụ.")
        .oneOf(
            [
                "Chủ nhiệm",
                "Phó chủ nhiệm",
                "Thành viên ban chủ nhiệm",
                "Trưởng ban",
                "Phó ban",
                "Thành viên",
                "Cộng tác viên"
            ],
            "Chức vụ không hợp lệ."
        ),

    personnel_status: yup
        .string()
        .required("Vui lòng chọn trạng thái hiện tại.")
        .oneOf(
            ["Đang hoạt động", "Cựu thành viên"],
            "Trạng thái không hợp lệ."
        )
});

export { personnelSchema };
