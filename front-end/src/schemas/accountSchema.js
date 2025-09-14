import * as yup from 'yup';

const accountSchema = yup.object({
    personnel_name: yup
        .string()
        .required('Vui lòng nhập họ và tên nhân sự'),
    student_id: yup
        .string()
        .required('Vui lòng nhập mã số sinh viên'),
    personnel_id: yup
        .string()
        .required('Vui lòng nhập mã nhân sự'),
    sysrole_id: yup
        .string()
        .required('Vui lòng chọn vai trò hệ thống'),
    username: yup
        .string()
        .required('Vui lòng nhập tên đăng nhập'),
});

export { accountSchema };
