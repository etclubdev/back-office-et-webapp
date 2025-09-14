import React, { useEffect } from 'react';
import "./FAQsFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

import { Header } from "../../../components/Header";
import { TextFieldController } from "../../../components/TextFieldController";
import { SelectController } from "../../../components/SelectController";
import { SwitchController } from "../../../components/SwitchController";

import { createFAQSchema, updateFAQSchema } from "../../../schemas/faqsSchema";
import { createFAQs, updateFAQsById, getFAQsById } from '../../../api/faq.service';

export const FAQsFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(action === "create" ? createFAQSchema : updateFAQSchema),
        defaultValues: {
            question: "",
            faq_category: "",
            answer: "",
            visible: true,
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
    }, [id, reset]);

    const handleClose = () => {
        navigate('/faqs');
    };

    const onSubmit = async (payload) => {
        try {
            if (action === "create") {
                await createFAQs(payload);
            } else if (action === "edit") {
                await updateFAQsById(id, payload);
            }
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="faqs-form-page">
            <Header>{action === "create" ? "Thêm FAQs mới" : "Chỉnh sửa FAQs"}</Header>
            <div className="faqs-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="faqs-form-top">
                        <div className="faqs-form-left">
                            <TextFieldController
                                name="question"
                                control={control}
                                label="Câu hỏi"
                                errors={errors}
                            />

                            <SelectController
                                name="faq_category"
                                control={control}
                                label="Nhóm câu hỏi"
                                menuItems={[
                                    "ET Club",
                                    "Hoạt động và sự kiện",
                                    "Quy trình tham gia",
                                    "Khác",
                                ]}
                                errors={errors}
                            />
                        </div>

                        <div className="faqs-form-right">
                            <SwitchController
                                name="visible"
                                control={control}
                                label="Hiển thị trang chủ"
                            />
                        </div>
                    </div>

                    <div className="faqs-form-bottom">
                        <TextFieldController
                            name="answer"
                            control={control}
                            label="Câu trả lời"
                            errors={errors}
                            multiline
                            rows={8}
                        />

                        <div className="faqs-form-button">
                            <Button variant="outlined" color="primary" onClick={handleClose}>
                                Hủy bỏ
                            </Button>
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                {isSubmitting ? "Đang lưu..." : "Lưu"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
