import * as yup from 'yup';

const faqSchemaBase = yup.object({
    faq_category: yup.string()
        .oneOf(["Về ET Club", "Về hoạt động và sự kiện", "Về quy trình tham gia", "Khác"], "Invalid category")
        .required("FAQ category is required"),
    question: yup.string()
        .max(255, "Question must be at most 255 characters")
        .required("Question is required"),
    answer: yup.string()
        .min(1, "Answer cannot be empty")
        .required("Answer is required"),
    visible: yup.boolean()
        .default(true)
});

const createFAQSchema = faqSchemaBase.shape({
    faq_category: faqSchemaBase.fields.faq_category.required(),
    question: faqSchemaBase.fields.question.required(),
    answer: faqSchemaBase.fields.answer.required(),
    visible: faqSchemaBase.fields.visible.default(true)
});

const updateFAQSchema = faqSchemaBase;

export { createFAQSchema, updateFAQSchema };
