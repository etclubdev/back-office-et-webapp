import * as yup from 'yup';

export const etBlogSchema = yup.object().shape({
    title: yup
        .string()
        .max(250, "Tiêu đề không được vượt quá 60 ký tự.")
        .required("Tiêu đề là bắt buộc."),
    
    blog_author: yup
        .string()
        .max(60, "Tên tác giả không được vượt quá 60 ký tự.")
        .required("Tên tác giả là bắt buộc."),

    meta_description: yup
        .string()
        .required("Mô tả là bắt buộc."),

    thumbnail_image_url: yup
        .string()
        .required("Ảnh bìa là bắt buộc."),

    visible: yup
        .boolean()
        .required("Trạng thái hiển thị là bắt buộc."),

    content: yup
        .string()
        .min(50, "Nội dung phải có ít nhất 50 ký tự.")
        .required("Nội dung là bắt buộc."),

});