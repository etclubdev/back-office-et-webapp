import React, { useEffect, useState } from 'react';
import "./FAQsFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Button } from "@mui/material";
import { createFAQSchema, updateFAQSchema } from "../../../schemas/faqsSchema";
import { ConfirmedDialog } from '../../../components/ConfirmedDialog';

import { Header } from "../../../components/Header";

import { createFAQs, updateFAQsById, getFAQsById } from '../../../api/faq.service';

export const FAQsFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(action === "create" ? createFAQSchema : updateFAQSchema),
        defaultValues: {
            question: "",
            faq_category: "",
            answer: "",
            visible: false,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const { data } = await getFAQsById(id);
                reset(data);
            }
        };
        fetchData();
    }, [id]);

    const handleCancel = () => {
        navigate('/faqs');
    }

    const handleClose = () => {
        setIsOpenDialog(false);
        navigate('/faqs');
    }

    const onSubmit = async (payload) => {
        try {
            if (action === "create") {
                const response = await createFAQs(payload);
                setIsOpenDialog(true);

            } else if (action === "edit") {
                const response = await updateFAQsById(id, payload);
                setIsOpenDialog(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="faqs-form-page">
            {
                isOpenDialog && (
                    <ConfirmedDialog
                        title={`${action === "create" ? "Thêm" : "Sửa"} thành công`}
                        alertType="info"
                        onClose={handleClose}
                    />
                )
            }

            <Header>{action === "create" ? "Thêm FAQs mới" : "Chỉnh sửa FAQs"}</Header>
            <div className="faqs-form">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="faqs-form-top">
                        <div className="faqs-form-left">
                            <Controller
                                name="question"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Câu hỏi" fullWidth error={!!errors.question} helperText={errors.question?.message} required />
                                )}
                            />

                            <FormControl fullWidth error={!!errors.faq_category}>
                                <Controller
                                    name="faq_category"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <InputLabel>Nhóm câu hỏi</InputLabel>
                                            <Select {...field} label="Nhóm câu hỏi">
                                                <MenuItem value="Về ET Club">Về ET Club</MenuItem>
                                                <MenuItem value="Về hoạt động và sự kiện">Về hoạt động và sự kiện</MenuItem>
                                                <MenuItem value="Về quy trình tham gia">Về quy trình tham gia</MenuItem>
                                                <MenuItem value="Khác">Khác</MenuItem>
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </div>
                        <div className="faqs-form-right">
                            <Controller
                                name="visible"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel control={<Switch {...field} checked={field.value} />} label="Hiển thị trang chủ" />
                                )}
                            />
                        </div>
                    </div>

                    <div className="faqs-form-bottom">
                        <Controller
                            name="answer"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Câu trả lời" multiline rows={8} fullWidth error={!!errors.answer} helperText={errors.answer?.message} required />
                            )}
                        />

                        <div className="faqs-form-button">
                            <Button variant="outlined" color="primary" onClick={handleCancel}>
                                Hủy bỏ
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Lưu
                            </Button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
