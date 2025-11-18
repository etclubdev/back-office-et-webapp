import React, { useEffect, useState, useCallback } from 'react';
import "./BannersFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
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

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(bannerSchema),
        defaultValues: {
            "banner_name": "",
            "image_url": "",
            "hypertext_link": "",
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
        navigate('/homepage-banners');
    }

    const onSubmit = async (payload) => {
        try {
            let imgUrl = await handleImageUpload(payload.image_url, "image_url", preview, setPreview, setValue);

            const fullPayload = { ...payload, image_url: imgUrl };

            if (action === "create") {
                const response = await createBanner(fullPayload);
                handleClose();
            } else if (action === "edit") {
                const response = await updateBanner(id, fullPayload);
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="banner-form-page">
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
                                    name="banner_name"
                                    control={control}
                                    label="Tên Banner"
                                    errors={errors}
                                />

                                <TextFieldController
                                    name="hypertext_link"
                                    control={control}
                                    label="Đường dẫn"
                                    errors={errors}
                                    required={false}
                                />
                            </div>
                        </div>
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
                    </form>
                </div>
            </div>
        </div>
    )
}