import * as yup from 'yup';

const bannerSchema = yup.object({
    banner_name: yup.string()
        .max(30, "Tên Banner không được vượt quá 30 ký tự.")
        .required("Tên Banner là bắt buộc."),
    image_url : yup
        .string()
        .required("Ảnh đối tác là bắt buộc."),
    visible: yup
        .boolean()
        .required("Trạng thái hiển thị là bắt buộc."),
});

export { bannerSchema };