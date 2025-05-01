import * as yup from 'yup';

const accountSchema = yup.object({
    personnel_name: yup
        .string()
        .required(),
    student_id: yup
        .string()
        .required(),
    personnel_id: yup
        .string()
        .required(),
    sysrole_id: yup
        .string()
        .required(),
    username: yup
        .string()
        .required()
}
)

export { accountSchema }