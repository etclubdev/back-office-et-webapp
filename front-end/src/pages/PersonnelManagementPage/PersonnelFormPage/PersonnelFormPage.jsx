
import React, { useCallback, useEffect, useState } from 'react';
import "./PersonnelFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { DatePickerController } from "../../../components/DatePickerController"
import { SelectController } from '../../../components/SelectController';
import { TextFieldController } from '../../../components/TextFieldController';
import { Header } from "../../../components/Header";
import { getPersonnelById, createPersonnel, updatePersonnel } from '../../../api/personnel.service';
import { getAllTerms } from '../../../api/term.service';
import { getDepartmentNameUtil } from '../../../utils/getDepartmentNameUtil';
import { formatDates } from '../../../utils/formatDatesUtil';
import { personnelSchema } from '../../../schemas/personnelSchema';

export const PersonnelFormPage = ({ action, department_name }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [terms, setTerms] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [message, setMessage] = useState({});

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(personnelSchema),
        defaultValues: {
            "personnel_name": "",
            "phone_number": "",
            "email": "",
            "dob": "1991-11-20",
            "gender": "",
            "address": "",
            "student_id": "",
            "university": "",
            "faculty": "",
            "major": "",
            "class": "",
            "avatar_url": "",
            "cv_type": "",
            "cv_link": "",
            "cohort_name": "",
            "term_id": "",
            "position_name": "",
            "department_name": getDepartmentNameUtil(department_name)
        },
    });

    const fetchData = useCallback(async () => {
        try {
            const termsRes = await getAllTerms();
            setTerms(termsRes.data);

            if (id) {
                const persRes = await getPersonnelById(id);
                reset(persRes.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleCancel = () => {
        navigate(`/${department_name}`);
    }


    const onSubmit = async (payload) => {
        try {
            const formatted = formatDates(payload);
            const fullPayload = {
                personnel: {
                    personnel_name: formatted.personnel_name,
                    phone_number: formatted.phone_number,
                    email: formatted.email,
                    dob: formatted.dob,
                    gender: formatted.gender,
                    address: formatted.address,
                    student_id: formatted.student_id,
                    university: formatted.university,
                    faculty: formatted.faculty,
                    major: formatted.major,
                    class: formatted.class,
                    avatar_url: formatted.avatar_url,
                    cv_type: formatted.cv_type,
                    cv_link: formatted.cv_link,
                    cohort_name: formatted.cohort_name
                },
                status: {
                    term_id: formatted.term_id,
                    position_name: formatted.position_name,
                    department_name: formatted.department_name,
                    personnel_status: formatted.personnel_status
                }
            }
            if (action === "create") {
                const response = await createPersonnel(fullPayload);
                setIsOpenDialog(true);
                setMessage({
                    title: "Thêm nhân sự thành công",
                    alertType: "info"
                })
            } else if (action === "edit") {
                const response = await updatePersonnel(id, fullPayload);
                setIsOpenDialog(true);
                setMessage({
                    title: "Chỉnh sửa nhân sự thành công",
                    alertType: "info"
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="personnel-form-page">
            {
                isOpenDialog && (
                    <ConfirmedDialog 
                        {...message}
                        onClose={() => setIsOpenDialog(false)}
                    />
                )
            }
            <Header>{action === "create" ? "Thêm Nhân sự mới" : "Chỉnh sửa Nhân sự"}</Header>
            <div className="form-container">
                <div className="form">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-top">
                            <div className="form-left">
                                <TextFieldController
                                    name="personnel_name"
                                    control={control}
                                    label="Tên Nhân sự"
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="phone_number"
                                    control={control}
                                    label="SĐT"
                                    errors={errors}
                                />


                                <div className="form-group">
                                    <SelectController
                                        name="gender"
                                        control={control}
                                        label="Giới tính"
                                        menuItems={[
                                            "Nam",
                                            "Nữ"
                                        ]}
                                        errors={errors}

                                    />
                                    <DatePickerController
                                        name="dob"
                                        label="Ngày sinh"
                                        control={control}
                                    />
                                </div>

                                <TextFieldController
                                    name="email"
                                    control={control}
                                    label="Email"
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="address"
                                    control={control}
                                    label="Địa chỉ"
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="university"
                                    control={control}
                                    label="Trường"
                                    errors={errors}
                                />

                                <div className="form-group">
                                    <TextFieldController
                                        name="student_id"
                                        control={control}
                                        label="MSSV"
                                        errors={errors}
                                    />

                                    <TextFieldController
                                        name="cohort_name"
                                        control={control}
                                        label="Khóa đào tạo"
                                        errors={errors}
                                    />
                                </div>

                                <TextFieldController
                                    name="faculty"
                                    control={control}
                                    label="Khoa"
                                    errors={errors}
                                />

                                <div className="form-group">
                                    <TextFieldController
                                        name="major"
                                        control={control}
                                        label="Chuyên ngành"
                                        errors={errors}
                                    />

                                    <TextFieldController
                                        name="class"
                                        control={control}
                                        label="Lớp"
                                        errors={errors}
                                    />
                                </div>

                            </div>

                            <div className="form-right">
                                <SelectController
                                    name="position_name"
                                    control={control}
                                    label="Chức vụ"
                                    menuItems={[
                                        "Chủ nhiệm",
                                        "Phó chủ nhiệm",
                                        "Thành viên ban chủ nhiệm",
                                        "Trưởng ban",
                                        "Phó ban",
                                        "Thành viên",
                                        "Cộng tác viên"
                                    ]}
                                    errors={errors}
                                />

                                <SelectController
                                    name="department_name"
                                    control={control}
                                    label="Ban hoạt động"
                                    menuItems={[
                                        "Ban Kỹ thuật - Công nghệ",
                                        "Ban Truyền thông",
                                        "Ban Nhân sự - Tổ chức",
                                        "Ban Sự kiện",
                                        "Ban Tài chính - Đối ngoại"
                                    ]}
                                    errors={errors}
                                />

                                <SelectController
                                    name="term_id"
                                    control={control}
                                    label="Nhiệm kỳ"
                                    menuItems={terms}
                                />
                                <SelectController
                                    name="cv_type"
                                    control={control}
                                    label="Loại CV"
                                    menuItems={[
                                        "CV mẫu",
                                        "CV tự thiết kế"
                                    ]}
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="cv_link"
                                    control={control}
                                    label="Link CV"
                                    errors={errors}
                                />

                                <SelectController
                                    name="personnel_status"
                                    control={control}
                                    label="Trạng thái"
                                    menuItems={[
                                        "Đang hoạt động",
                                        "Cựu thành viên",
                                        "Ứng viên",
                                        "Ứng viên bị loại"
                                    ]}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div className="form-bottom">
                            <div className="form-bottom">
                                <div className="form-button">
                                    <Button disabled={isSubmitting} variant="outlined" color="primary" onClick={handleCancel}>
                                        Hủy bỏ
                                    </Button>
                                    <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                        {isSubmitting ? "Đang lưu..." : "Lưu"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
