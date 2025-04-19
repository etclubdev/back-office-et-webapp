import * as yup from "yup";

const personnelSchema = yup.object().shape({
    personnel_name: yup
        .string()
        .max(30, "Họ và tên không được vượt quá 30 ký tự.")
        .required("Vui lòng nhập họ và tên của bạn."),

    email: yup
        .string()
        .email("Định dạng email không hợp lệ.")
        .max(320, "Email không được vượt quá 320 ký tự.")
        .required("Vui lòng nhập địa chỉ email."),

    dob: yup
        .date()
        .typeError("Ngày sinh không hợp lệ.")
        .required("Vui lòng chọn ngày sinh."),

    gender: yup
        .string()
        .oneOf(["Nam", "Nữ", "Khác"], "Giới tính không hợp lệ.")
        .required("Vui lòng chọn giới tính."),

    address: yup.string().max(263, "Địa chỉ không được vượt quá 263 ký tự."),

    student_id: yup.string().max(20, "Mã sinh viên không được vượt quá 20 ký tự."),

    faculty: yup.string().max(100, "Tên khoa không được vượt quá 100 ký tự."),

    university: yup.string().max(50, "Tên trường không được vượt quá 50 ký tự."),

    major: yup.string().max(100, "Ngành học không được vượt quá 100 ký tự."),

    class: yup.string().max(10, "Lớp không được vượt quá 10 ký tự."),

    cv_type: yup
        .string()
        .oneOf(["CV mẫu", "CV tự thiết kế"], "Loại CV không hợp lệ."),

    cv_link: yup
        .string()
        .url("Đường dẫn CV không hợp lệ."),

    cohort_name: yup
        .string()
        .matches(/^K([1-9]?[0-9])$/, "Khóa phải có định dạng 'Kxx', ví dụ: K49.")
        .nullable()
        .notRequired(),

    term_id: yup
        .string()
        .nullable()
        .required("Vui lòng chọn nhiệm kỳ."),

    department_name: yup
        .string()
        .required("Vui lòng chọn tên ban.")
        .oneOf(
            [
                "Ban Kỹ thuật - Công nghệ",
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
    phone_number: yup
        .string()
        .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số.")
        .required("Vui lòng nhập số điện thoại."),
    personnel_status: yup
        .string()
        .required("Vui lòng chọn trạng thái hiện tại.")
        .oneOf(
            ["Đang hoạt động", "Cựu thành viên", "Ứng viên"],
            "Trạng thái không hợp lệ."
        )
});

export { personnelSchema };
