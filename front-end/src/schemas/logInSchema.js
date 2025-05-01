import * as yup from 'yup';

const logInSchema = yup.object({
  username: yup
    .string()
    .email("Tên tài khoản là một email")
    .required('Vui lòng nhập Tên tài khoản'),

  password: yup
    .string()
    .min(8, 'Mật khẩu bắt buộc có ít nhất có 8 ký tự')
    .required('Vui lòng nhập Mật khẩu'),
});

export { logInSchema }