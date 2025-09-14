import * as yup from 'yup';

const faqSchemaBase = yup.object({
    faq_category: yup.string()
        .required("Vui lòng chọn danh mục câu hỏi")
        .oneOf(
            ["ET Club", "Hoạt động và sự kiện", "Quy trình tham gia", "Khác"],
            "Vui lòng chọn danh mục câu hỏi"
        ),

    question: yup.string()
        .required("Vui lòng nhập câu hỏi")
        .max(255, "Câu hỏi không được vượt quá 255 ký tự"),

    answer: yup.string()
        .required("Vui lòng nhập câu trả lời")
        .min(1, "Câu trả lời không được để trống"),

    visible: yup.boolean()
        .default(true),
});

const createFAQSchema = faqSchemaBase.shape({
    faq_category: faqSchemaBase.fields.faq_category.required(),
    question: faqSchemaBase.fields.question.required(),
    answer: faqSchemaBase.fields.answer.required(),
    visible: faqSchemaBase.fields.visible.default(true),
});

const updateFAQSchema = faqSchemaBase;

export { createFAQSchema, updateFAQSchema };
