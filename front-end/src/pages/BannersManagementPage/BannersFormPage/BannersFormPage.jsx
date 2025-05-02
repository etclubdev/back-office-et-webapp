import React, { useEffect, useState, useCallback } from 'react';
import "./BannersFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { ConfirmedDialog } from '../../../components/ConfirmedDialog';
import { SwitchController } from '../../../components/SwitchController'
import { ImageUploadController } from '../../../components/ImageUploadController';
import { TextFieldController } from '../../../components/TextFieldController';
import { Header } from "../../../components/Header";
import { getBannerById, createBanner, updateBanner } from '../../../api/banner.service';
import { bannerSchema } from '../../../schemas/bannerSchema';
import { handleImageUpload } from '../../../utils/handleUploadUtil';

export const BannersFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [preview, setPreview] = useState(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(bannerSchema),
        defaultValues: {
            "banner_name": "",
            "image_url": "",
            "visible": true
        },
    });

    const fetchData = useCallback(async () => {
        if (id) {
            const { data } = await getBannerById(id);
            reset(data);
        }
      }, [id, reset]);


    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    const handleClose = () => {
        setIsOpenDialog(false);
    }

    const handleCancel = () => {
        navigate('/homepage-banners');
    }

    const onSubmit = async (payload) => {
        try {
            let imgUrl = await handleImageUpload(payload.image_url, "image_url", preview, setPreview, setValue);

            const fullPayload = { ...payload, image_url: imgUrl };
            console.log(fullPayload);

            if (action === "create") {
                const response = await createBanner(fullPayload);
                setIsOpenDialog(true);
            } else if (action === "edit") {
                const response = await updateBanner(id, fullPayload);
                setIsOpenDialog(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="form-page">
            {
                isOpenDialog && (
                    <ConfirmedDialog
                        title={`${action === "create" ? "Thêm" : "Sửa"} thành công`}
                        alertType="info"
                        onClose={handleClose}
                    />
                )
            }
            <Header>{action === "create" ? "Thêm Banner mới" : "Chỉnh sửa Banner"}</Header>
            <div className="form-container">
                <div className="form">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-top">
                            <div className="form-left">
                                <ImageUploadController
                                    name="image_url"
                                    control={control}
                                    preview={preview}
                                    setPreview={setPreview}
                                    setValue={setValue}
                                    errors={errors}
                                />

                            </div>

                            <div className="form-right">
                                <SwitchController
                                    name="visible"
                                    control={control}
                                    label="Hiển thị trang chủ"
                                />

                                <TextFieldController
                                    name="banner_name"
                                    control={control}
                                    label="Tên Banner"
                                    errors={errors}
                                />
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
            </div>
        </div>
    )
}