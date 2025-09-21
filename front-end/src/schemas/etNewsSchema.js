import * as yup from 'yup';

export const etNewsSchema = yup.object().shape({
    title: yup
        .string()
        .max(250, "Tiêu đề không được vượt quá 250 ký tự.")
        .required("Tiêu đề là bắt buộc."),

    etnews_category: yup
        .string()
        .oneOf(
            [
                "Công nghệ Việt Nam",
                "Công nghệ thế giới",
                "Chính phủ số",
                "Khác"
            ],
            "Danh mục tin tức không hợp lệ."
        )
        .required("Danh mục tin tức là bắt buộc."),

    meta_description: yup
        .string()
        .max(160, "Mô tả meta không được vượt quá 160 ký tự.")
        .transform((value) => value ?? "")
        .nullable(),

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

    source: yup 
        .string()
        .required("Nguồn là bắt buộc."),
});