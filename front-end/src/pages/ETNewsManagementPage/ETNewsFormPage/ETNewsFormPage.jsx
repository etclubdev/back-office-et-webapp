import React, { useEffect, useState } from 'react';
import "./ETNewsFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Button } from "@mui/material";
import { ConfirmedDialog } from '../../../components/ConfirmedDialog';
import { SwitchController } from '../../../components/SwitchController'
import { SelectController } from '../../../components/SelectController';
import { ImageUploadController } from '../../../components/ImageUploadController';
import { TextFieldController } from '../../../components/TextFieldController';
import { Header } from "../../../components/Header";
import { RichTextEditor } from '../../../components/RichTextEditor/RichTextEditor';
import { UPLOAD_PRESET, CLOUD_NAME } from '../../../constants';
import { getETNewsById, createETNews, updateETNews } from '../../../api/etNews.service';
import { etNewsSchema } from '../../../schemas/etNewsSchema';
import { handleImageUpload, handleRichTextUpload } from '../../../utils/handleUploadUtil';

export const ETNewsFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [defaultItems, setDefaultItems] = useState({
        title: "",
        etnews_category: "",
        meta_description: "",
        thumbnail_image_url: "",
        visible: true,
        content: "",
        source: ""
    });

    const [editorContent, setEditorContent] = useState("");
    const [uploadImages, setUploadImages] = useState([]);
    const [preview, setPreview] = useState(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        register,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(etNewsSchema),
        defaultValues: defaultItems,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const { data } = await getETNewsById(id);
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

    const handleCancel = () => {
        navigate('/et-news');
    }

    const handleClose = () => {
        setIsOpenDialog(false);
        navigate('/et-news');
    }

    const onSubmit = async (payload) => {
        try {
            const thumbnailImg = await handleImageUpload(payload.thumbnail_image_url, "thumbnail_image_url", preview, setPreview, setValue);
            const newContent = await handleRichTextUpload(editorContent, setEditorContent, uploadImages, setUploadImages);
            const fullPayload = { ...payload, thumbnail_image_url: thumbnailImg, content: newContent || editorContent }

            if (action === "create") {
                const response = await createETNews(fullPayload);
                setIsOpenDialog(true);
            } else if (action === "edit") {
                const response = await updateETNews(id, fullPayload);
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
            <Header>{action === "create" ? "Thêm ET News" : "Chỉnh sửa ET News"}</Header>
            <div className="form-container">
                <div className="form">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-top">
                            <div className="form-left">
                                <ImageUploadController
                                    name="thumbnail_image_url"
                                    control={control}
                                    preview={preview}
                                    setPreview={setPreview}
                                    setValue={setValue}
                                />

                            </div>

                            <div className="form-right">
                                <SwitchController 
                                    name="visible"
                                    control={control}
                                    label="Hiển thị trang chủ"
                                />

                                <TextFieldController
                                    name="title"
                                    control={control}
                                    label="Tiêu đề"
                                    errors={errors}
                                />

                                <SelectController
                                    register={register}
                                    name="etnews_category"
                                    control={control}
                                    label="Danh mục tin tức"
                                    menuItems={[
                                        "Công nghệ Việt Nam",
                                        "Công nghệ thế giới",
                                        "Chính phủ số",
                                        "Khác"
                                    ]}
                                    errors={errors}
                                />


                                <TextFieldController
                                    name="meta_description"
                                    control={control}
                                    label="Mô tả"
                                    errors={errors}
                                />
                                <TextFieldController
                                    name="source"
                                    control={control}
                                    label="Nguồn"
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div className="form-bottom">
                            <FormControl className="rich-text-editor">
                                <RichTextEditor
                                    errors={errors}
                                    name="content"
                                    control={control}
                                    setValue={setValue}
                                    setUploadImages={setUploadImages}
                                    setEditorContent={setEditorContent}
                                />
                            </FormControl>

                            <div className="form-bottom">
                                <div className="form-button">
                                    <Button disabled={isSubmitting} variant="outlined" color="primary" onClick={handleCancel}>
                                        Hủy bỏ
                                    </Button>
                                    <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                        {isSubmitting ? "Đang lưu..." : "Gửi"}
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