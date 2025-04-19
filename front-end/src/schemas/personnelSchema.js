import * as yup from 'yup';

const genderEnum = ['Nam', 'Nữ', 'Khác'];

const personnelSchema = yup.object().shape({
    personnel_id: yup.string()
        .length(7, "Mã nhân viên phải có 7 ký tự")
        .required("Mã nhân viên là bắt buộc"),

    personnel_name: yup.string()
        .matches(/^[^\d]*$/, "Họ và tên không được chứa số")
        .required("Họ và tên là bắt buộc"),

    phone_number: yup.string()
        .matches(/^0[0-9]{9}$/, "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0")
        .nullable(),

    email: yup.string()
        .email("Định dạng email không hợp lệ")
        .required("Email là bắt buộc"),

    dob: yup.date()
        .required("Ngày sinh là bắt buộc"),

    gender: yup.string()
        .oneOf(genderEnum, "Giới tính không hợp lệ")
        .required("Giới tính là bắt buộc"),

    address: yup.string()
        .nullable(),

    student_id: yup.string()
        .required("MSSV là bắt buộc"),

    university: yup.string()
        .required("Trường là bắt buộc"),

    faculty: yup.string()
        .required("Khoa là bắt buộc"),

    major: yup.string()
        .required("Ngành là bắt buộc"),

    class: yup.string()
        .required("Lớp là bắt buộc"),

    avatar_url: yup.string()
        .nullable(),

    cohort_name: yup.string()
        .required("Tên khóa học là bắt buộc")
});

export { personnelSchema };
