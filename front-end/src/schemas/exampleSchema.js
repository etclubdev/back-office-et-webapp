import * as yup from 'yup';

const exampleSchema = yup.object({
    // faq_category: yup.string()
    //     .oneOf(["Về ET Club", "Về hoạt động và sự kiện", "Về quy trình tham gia", "Khác"], "Invalid category")
    //     .required("FAQ category is required"),
    // question: yup.string()
    //     .max(255, "Question must be at most 255 characters")
    //     .required("Question is required"),
    // answer: yup.string()
    //     .min(1, "Answer cannot be empty")
    //     .required("Answer is required"),
    // visible: yup.boolean()
    //     .default(true)
});

export { exampleSchema };