import * as yup from 'yup';

const achievementSchema = yup.object({
    achievement_name: yup
        .string()
        .required("Tên thành tựu không được để trống")
        .max(30, "Tên thành tựu tối đa 30 ký tự"),

    highlight_number: yup
        .string()
        .required("Thành tích không được để trống")
        .max(10, "Thành tích tối đa 10 ký tự"),
    
    visible: yup
        .boolean()
        .default(true)
});

export { achievementSchema };