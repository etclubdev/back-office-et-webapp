import * as yup from 'yup';

const passwordBaseSchema = (requiredMsg) => {
    return (
        yup.string()
            .required(requiredMsg)
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    )
}

const passwordChangeSchema = yup.object({
    old_password: passwordBaseSchema('Mật khẩu cũ là bắt buộc'),
    new_password: 
        passwordBaseSchema('Mật khẩu mới là bắt buộc')
        .test('password-not-same', 'Mật khẩu mới không được trùng với mật khẩu cũ', function (value) {
            const { old_password } = this.parent;
            return old_password !== value;
        }),
    confirmed_password: yup.string()
        .required('Xác nhận mật khẩu mới là bắt buộc')
        .oneOf([yup.ref('new_password'), null], 'Mật khẩu mới và xác nhận mật khẩu phải giống nhau')

});

export { passwordChangeSchema };