import React, { useEffect, useState } from 'react';
import "./PartnersFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Button } from "@mui/material";

import { SwitchController } from '../../../components/SwitchController'
import { SelectController } from '../../../components/SelectController';
import { ImageUploadController } from '../../../components/ImageUploadController';
import { TextFieldController } from '../../../components/TextFieldController';
import { Header } from "../../../components/Header";
import { getPartnerById, updatePartner, createPartner } from '../../../api/partner.service';
import { partnerSchema } from '../../../schemas/partnerSchema';
import { ConfirmedDialog } from '../../../components/ConfirmedDialog';
import { handleImageUpload } from '../../../utils/handleUploadUtil';

export const PartnersFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [defaultItems, setDefaultItems] = useState({
        "partner_name": "",
        "partner_category_name": "",
        "avatar_url": "",
        "short_description": "",
        "email": "",
        "phone_number": "",
        "note": "",
        "visible": true,
    });

    const [preview, setPreview] = useState(null);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(partnerSchema),
        defaultValues: defaultItems,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const { data } = await getPartnerById(id);
                setDefaultItems(data);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (defaultItems && Object.keys(defaultItems).length > 0) {
            reset(defaultItems);
        }
    }, [defaultItems, reset]);

    const handleClose = () => {
        navigate('/partners');
    }

    const onSubmit = async (payload) => {
        try {
            let avatarUrl = await handleImageUpload(payload.avatar_url, "avatar_url", preview, setPreview, setValue);

            const fullPayload = { ...payload, avatar_url: avatarUrl };

            if (action === "create") {
                const response = await createPartner(fullPayload);
                handleClose();
            } else if (action === "edit") {
                const response = await updatePartner(id, fullPayload);
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="partners-form-page">
            <Header>{action === "create" ? "Thêm Đối tác mới" : "Chỉnh sửa Đối tác"}</Header>
            <div className="form-container">
                <div className="form">
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
                                    setError={setError}
                                />

                            </div>

                            <div className="form-right">
                                <SwitchController
                                    name="visible"
                                    control={control}
                                    label="Hiển thị trang chủ"
                                />

                                <TextFieldController
                                    name="partner_name"
                                    control={control}
                                    label="Tên Đối tác"
                                    errors={errors}
                                />

                                <SelectController
                                    name="partner_category_name"
                                    control={control}
                                    label="Danh mục Đối tác"
                                    menuItems={[
                                        "Đối tác doanh nghiệp",
                                        "Đối tác chuyên gia",
                                        "Đối tác truyền thông",
                                        "Nghệ sĩ khách mời"
                                    ]}
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="short_description"
                                    control={control}
                                    label="Mô tả"
                                    errors={errors}
                                    required={false}
                                />

                                <TextFieldController
                                    name="email"
                                    control={control}
                                    label="Email"
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="phone_number"
                                    control={control}
                                    label="Số điện thoại"
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="note"
                                    control={control}
                                    label="Ghi chú"
                                    errors={errors}
                                    required={false}
                                />
                            </div>
                        </div>
                        <div className="form-bottom">
                            <div className="form-bottom">
                                <div className="form-button">
                                    <Button disabled={isSubmitting} variant="outlined" color="primary" onClick={handleClose}>
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