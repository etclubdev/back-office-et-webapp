import * as yup from 'yup';

export const partnerSchema = yup.object().shape({
    partner_name: yup
        .string()
        .required("Tên đối tác là bắt buộc."),
    
    partner_category_name: yup
        .string()
        .required("Danh mục đối tác là bắt buộc.")
        .oneOf(
            [
                "Đối tác doanh nghiệp",
                "Đối tác chuyên gia",
                "Đối tác truyền thông",
                "Nghệ sĩ khách mời"
            ],
            "Danh mục đối tác là bắt buộc."
        ),

    short_description: yup
        .string()
        .nullable(),
        
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email không đúng định dạng.")
        .max(320, "Email không được vượt quá 320 ký tự.")
        .required("Email là bắt buộc."),
        
    phone_number: yup.string()
        .matches(/^0[0-9]{9,10}$/, "Số điện thoại không hợp lệ")
        .required(),
    
    avatar_url: yup
        .string()
        .required("Ảnh đối tác là bắt buộc."),

    note: yup
        .string()
        .nullable(),

    visible: yup
        .boolean()
        .required("Trạng thái hiển thị là bắt buộc."),

});