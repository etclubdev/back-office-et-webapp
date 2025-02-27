import * as yup from 'yup';

export const LogInSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_]+$/, "Tên đăng nhập chỉ chứa chữ, số và dấu gạch dưới")
    .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự")
    .max(20, "Tên đăng nhập không được vượt quá 20 ký tự")
    .required("Vui lòng nhập tên đăng nhập"),

  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(32, "Mật khẩu không được vượt quá 32 ký tự")
    .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
    .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
    .matches(/[@$!%*?&]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&)")
    .required("Vui lòng nhập mật khẩu"),
});