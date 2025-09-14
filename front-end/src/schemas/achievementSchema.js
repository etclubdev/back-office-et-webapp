import * as yup from 'yup';

const achievementSchema = yup.object({
    achievement_name: yup
        .string()
        .required("Tên thành tựu không được để trống"),

    highlight_number: yup
        .number()
        .typeError("Thành tích phải là số")
        .integer("Thành tích phải là số nguyên")
        .required("Thành tích không được để trống"),

    visible: yup
        .boolean()
        .default(true)
});

export { achievementSchema };