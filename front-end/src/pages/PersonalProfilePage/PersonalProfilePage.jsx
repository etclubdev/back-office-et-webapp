import React, { useEffect, useState, useRef, useCallback } from 'react';
import "./PersonalProfilePage.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { SelectController } from '../../components/SelectController';
import { ImageUploadController } from '../../components/ImageUploadController';
import { DatePickerController } from '../../components/DatePickerController';
import { TextFieldController } from '../../components/TextFieldController';
import { ConfirmedDialog } from '../../components/ConfirmedDialog';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/useAuth';
import { formatDates } from '../../utils/formatDatesUtil';
import { handleImageUpload } from '../../utils/handleUploadUtil';
import { PasswordController } from '../../components/PasswordController/PasswordController';
import { getPersonnelById, updatePersonnel } from '../../api/personnel.service';
import { updatePassword } from '../../api/account.service';
import { passwordChangeSchema } from '../../schemas/passwordSchema';
import { personnelSchema } from '../../schemas/personnelSchema';

const categories = ["Thông tin cá nhân", "Đổi mật khẩu"];

export const PersonalProfilePage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(0);
    const progressBarRef = useRef(null);
    const tabsRef = useRef([]);
    const handleClick = (e, index) => {
        setActiveTab(index);
        const element = e.target;

        if (progressBarRef.current) {
            progressBarRef.current.style.transform = `translateX(${element.offsetLeft}px)`;
            progressBarRef.current.style.width = `${element.offsetWidth}px`;
        }
    }

    const updateProgressBar = () => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement && progressBarRef.current) {
            progressBarRef.current.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
            progressBarRef.current.style.width = `${activeTabElement.offsetWidth}px`;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            updateProgressBar();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [activeTab]);

    return (
        <div className="personal-profile-page">
            <Header />

            <div className="tabs-container">
                {categories.map((category, index) => (
                    <div
                        ref={(el) => tabsRef.current[index] = el}
                        key={index}
                        className={`tab-item ${activeTab === index ? "active" : ""}`}
                        onClick={(e) => handleClick(e, index)}
                    >
                        {category}
                    </div>
                ))}
                <div className="progress-bar" ref={progressBarRef}></div>
            </div>

            {
                user && (
                    <div className="form-container">
                        {activeTab === 0 && (
                            <PersonalInformation />
                        )}
                        {activeTab === 1 && (
                            <PasswordUpdate />
                        )}
                    </div>
                )
            }


        </div>
    )
}

const PersonalInformation = () => {
    const { user, logout } = useAuth();
    const [preview, setPreview] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(null);
    const [message, setMessage] = useState("");

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(personnelSchema),
        defaultValues: {
            "personnel_name": "",
            "phone_number": "",
            "email": "",
            "dob": "",
            "gender": "",
            "address": "",
            "student_id": "",
            "university": "",
            "faculty": "",
            "major": "",
            "class": "",
            "avatar_url": "",
            "position_name": "",
        },
    });

    const fetchData = useCallback(async () => {
        try {
            if (!user) return;
            const response = await getPersonnelById(user?.personnel_id);
            reset(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleCancel = () => {
        reset();
    }

    const onSubmit = async (payload) => {
        try {
            const formatted = formatDates(payload);
            const imageUrl = await handleImageUpload(payload.avatar_url, "avatar_url", preview, setPreview, setValue);
            let fullPayload = imageUrl ? { ...formatted, avatar_url: imageUrl } : formatted;
            fullPayload = {
                personnel: {
                    "personnel_name": fullPayload.personnel_name,
                    "phone_number": fullPayload.phone_number,
                    "email": fullPayload.email,
                    "dob": fullPayload.dob,
                    "gender": fullPayload.gender,
                    "address": fullPayload.address,
                    "student_id": fullPayload.student_id,
                    "university": fullPayload.university,
                    "faculty": fullPayload.faculty,
                    "major": fullPayload.major,
                    "class": fullPayload.class,
                    "avatar_url": fullPayload.avatar_url,
                },
            }
            user && await updatePersonnel(user.personnel_id, fullPayload);
            setIsDialogOpen(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="form">
            {
                isDialogOpen && (
                    <ConfirmedDialog
                        title="Thay đổi thành công"
                        alertType="info"
                        onClose={() => setIsDialogOpen(false)}
                    />
                )
            }
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="form-top">
                    <div className="form-left">
                        <ImageUploadController
                            name="avatar_url"
                            control={control}
                            preview={preview}
                            setPreview={setPreview}
                            setValue={setValue}
                            errors={errors}
                        />

                    </div>

                    <div className="form-right">
                        <div className="form-control">
                            <TextFieldController
                                name="personnel_name"
                                control={control}
                                label="Họ và tên"
                                errors={errors}
                            />
                            <TextFieldController
                                disabled
                                name="position_name"
                                control={control}
                                label="Vai trò"
                                errors={errors}
                            />
                        </div>

                        <div className="form-control">
                            <TextFieldController
                                name="phone_number"
                                control={control}
                                label="SĐT"
                                errors={errors}
                            />
                            <TextFieldController
                                name="email"
                                control={control}
                                label="Email"
                                errors={errors}
                            />
                        </div>

                        <div className="form-control">
                            <div className='date-item'>
                                <DatePickerController
                                    name="dob"
                                    label="Ngày sinh"
                                    control={control}
                                />
                            </div>
                            <SelectController
                                name="gender"
                                control={control}
                                label="Giới tính"
                                menuItems={["Nam", "Nữ", "Khác"]}
                                errors={errors}
                            />
                        </div>

                        <div className="form-control">
                            <TextFieldController
                                name="faculty"
                                control={control}
                                label="Khoa đào tạo"
                                errors={errors}
                            />
                            <TextFieldController
                                name="university"
                                control={control}
                                label="Trường"
                                errors={errors}
                            />
                        </div>

                        <div className="form-control">
                            <TextFieldController
                                name="address"
                                control={control}
                                label="Địa chỉ"
                                errors={errors}
                            />
                            <TextFieldController
                                name="student_id"
                                control={control}
                                label="MSSV"
                                errors={errors}
                            />
                        </div>

                        <div className="form-control">
                            <TextFieldController
                                name="major"
                                control={control}
                                label="Ngành"
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
                </div>

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
            </form>
        </div>
    )
}

const PasswordUpdate = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user, logout } = useAuth();
    const [message, setMessage] = useState("");

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(passwordChangeSchema),
        defaultValues: {
            "old_password": "",
            "new_password": "",
            "confirmed_password": "",
        },
    });

    const handleCancel = () => {
        reset()
    }

    const onSubmit = async (payload) => {
        try {
            if (!user) return;

            const response = await updatePassword(
                user.account_id,
                payload.old_password,
                payload.new_password
            );

            setMessage({
                title: "Chỉnh sửa thành công",
                alertType: "info"
            });
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Update password error:", error);
            setMessage({
                title: "Chỉnh sửa thất bại",
                desc: "Mật khẩu hiện tại không chính xác",
                alertType: "warning"
            });
            setIsDialogOpen(true);
        }
    }

    return (
        <div className="form">
            {isDialogOpen &&
                <ConfirmedDialog
                    {...message}
                    onClose={() => { setIsDialogOpen(false); }}
                />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="password-container">
                    <PasswordController
                        control={control}
                        name="old_password"
                        label="Mật khẩu hiện tại"
                        setValue={setValue}
                        errors={errors}
                    />
                    <PasswordController
                        control={control}
                        name="new_password"
                        label="Mật khẩu mới"
                        setValue={setValue}
                        errors={errors}
                    />
                    <PasswordController
                        control={control}
                        name="confirmed_password"
                        label="Nhập lại Mật khẩu"
                        setValue={setValue}
                        errors={errors}
                    />

                </div>
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

            </form>
        </div>
    )
}