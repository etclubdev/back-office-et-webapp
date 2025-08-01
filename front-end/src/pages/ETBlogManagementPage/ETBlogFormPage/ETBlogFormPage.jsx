import React, { useEffect, useState } from 'react';
import "./ETBlogFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Button } from "@mui/material";
import { SwitchController } from '../../../components/SwitchController';
import { ImageUploadController } from '../../../components/ImageUploadController';
import { TextFieldController } from '../../../components/TextFieldController';
import { Header } from "../../../components/Header";
import { RichTextEditor } from '../../../components/RichTextEditor/RichTextEditor';
import { getETBlogById, createETBlog, updateETBlog } from '../../../api/etBlog.service';
import { etBlogSchema } from '../../../schemas/etBlogSchema';
import { handleImageUpload, handleRichTextUpload } from '../../../utils/handleUploadUtil';

export const ETBlogFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [defaultItems, setDefaultItems] = useState({
        title: "",
        blog_author: "",
        meta_description: "",
        thumbnail_image_url: "",
        visible: true,
        content: "",
    });

    const [editorContent, setEditorContent] = useState("");
    const [uploadImages, setUploadImages] = useState([]);
    const [preview, setPreview] = useState(null);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(etBlogSchema),
        defaultValues: defaultItems,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const { data } = await getETBlogById(id);
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
        navigate('/et-blog');
    };

    const onSubmit = async (payload) => {
        try {
            const thumbnailImg = await handleImageUpload(payload.thumbnail_image_url, "thumbnail_image_url", preview, setPreview, setValue);
            const newContent = await handleRichTextUpload(editorContent, setEditorContent, uploadImages, setUploadImages);
            const fullPayload = { ...payload, thumbnail_image_url: thumbnailImg, content: newContent || editorContent }

            if (action === "create") {
                const response = await createETBlog(fullPayload);
                handleClose();
            } else if (action === "edit") {
                const response = await updateETBlog(id, fullPayload);
                handleClose();
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="etblog-form-page">
            <Header>{action === "create" ? "Thêm ET Blog" : "Chỉnh sửa ET Blog"}</Header>
            <div className="form-container">
                <div className="form">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                <TextFieldController
                                    name="blog_author"
                                    control={control}
                                    label="Tên tác giả"
                                    errors={errors}
                                />
                                <TextFieldController
                                    name="meta_description"
                                    control={control}
                                    label="Mô tả"
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

                            <div className="form-button">
                                <Button disabled={isSubmitting} variant="outlined" onClick={handleClose}>
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
    );
};
