import * as yup from 'yup';

export const activitySchema = yup.object().shape({
    title: yup
        .string()
        .matches(/^\p{L}/u, "Tiêu đề phải bắt đầu bằng chữ cái.")
        .max(60, "Tiêu đề không được vượt quá 60 ký tự.")
        .required("Tiêu đề là bắt buộc."),

    activity_category: yup
        .string()
        .oneOf(
            [
                "Talkshow/Workshop",
                "Cuộc thi",
                "Game",
                "Hoạt động truyền thông",
                "Hoạt động nội bộ"
            ],
            "Danh mục hoạt động không hợp lệ."
        )
        .required("Danh mục hoạt động là bắt buộc."),

    meta_description: yup
        .string()
        .max(160, "Mô tả meta không được vượt quá 160 ký tự.")
        .nullable(),

    thumbnail_image_url: yup
        .string()
        .required("Ảnh bìa là bắt buộc."),

    start_date: yup
        .date()
        .typeError("Ngày bắt đầu là bắt buộc.")
        .required("Ngày bắt đầu là bắt buộc."),

    end_date: yup
        .date()
        .typeError("Ngày kết thúc là bắt buộc.")
        .min(yup.ref("start_date"), "Ngày kết thúc phải sau ngày bắt đầu.")
        .required("Ngày kết thúc là bắt buộc."),

    register_number: yup
        .number()
        .typeError("Số lượng đăng ký phải là một số.")
        .nullable()
        .integer("Số lượng đăng ký phải là số nguyên.")
        .min(0, "Số lượng đăng ký không thể âm.")
        .default(0),
    
    participated_number: yup
        .number()
        .typeError("Số lượng tham gia phải là một số.")
        .nullable()
        .integer("Số người tham gia phải là số nguyên.")
        .min(0, "Số người tham gia không thể âm.")
        .default(0),
    
    expense_money: yup
        .number()
        .typeError("Chi phí phải là một số.")
        .nullable()
        .min(0, "Chi phí không thể âm.")
        .default(0),

    visible: yup
        .boolean()
        .required("Trạng thái hiển thị là bắt buộc."),

    content: yup
        .string()
        .min(50, "Nội dung phải có ít nhất 50 ký tự.")
        .required("Nội dung là bắt buộc."),

    view_count: yup
        .number()
        .integer("Lượt xem phải là số nguyên.")
        .min(0, "Lượt xem không thể âm.")
        .default(0),
});

