import React, { useEffect, useState } from 'react';
import "./ActivitiesFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Button } from "@mui/material";
import { SelectController } from '../../../components/SelectController';
import { ImageUploadController } from '../../../components/ImageUploadController';
import { DatePickerController } from '../../../components/DatePickerController';
import { TextFieldController } from '../../../components/TextFieldController';
import { Header } from "../../../components/Header";
import { RichTextEditor } from '../../../components/RichTextEditor/RichTextEditor';
import { SwitchController } from '../../../components/SwitchController';
import { getActivityById, createActivity, updateActivity } from '../../../api/activity.service';
import { activitySchema } from '../../../schemas/activitySchema';
import { formatDates } from '../../../utils/formatDatesUtil';
import { handleImageUpload, handleRichTextUpload } from '../../../utils/handleUploadUtil';

export const ActivitiesFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [defaultItems, setDefaultItems] = useState({
        "title": "",
        "meta_description": "",
        "thumbnail_image_url": "",
        "start_date": "",
        "end_date": "",
        "register_number": 0,
        "participated_number": 0,
        "expense_money": 0.00,
        "visible": true,
        "content": "",
        "view_count": 0
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
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(activitySchema),
        defaultValues: defaultItems,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const { data } = await getActivityById(id);
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
        navigate('/activities');
    }

    const onSubmit = async (payload) => {
        try {
            const formatted = formatDates(payload);
            const thumbnailImg = await handleImageUpload(payload.thumbnail_image_url, "thumbnail_image_url", preview, setPreview, setValue);
            const newContent = await handleRichTextUpload(editorContent, setEditorContent, uploadImages, setUploadImages);
            const fullPayload = { ...formatted, thumbnail_image_url: thumbnailImg, content: newContent || editorContent }

            if (action === "create") {
                const response = await createActivity(fullPayload);
                handleClose();
            } else if (action === "edit") {
                const response = await updateActivity(id, fullPayload);
                handleClose();
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="activities-form-page">
            <Header>{action === "create" ? "Thêm Hoạt động mới" : "Chỉnh sửa Hoạt động"}</Header>
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
                                    name="title"
                                    control={control}
                                    label="Tiêu đề"
                                    errors={errors}
                                />
                                <div className='date-controller'>
                                    <div className='date-item'>
                                        <DatePickerController
                                            name="start_date"
                                            label="Ngày bắt đầu"
                                            control={control}
                                        />
                                    </div>
                                    <div className='date-item'>
                                        <DatePickerController
                                            name="end_date"
                                            label="Ngày kết thúc"
                                            control={control}
                                        />
                                    </div>
                                </div>

                                <SelectController
                                    register={register}
                                    name="activity_category"
                                    control={control}
                                    label="Danh mục hoạt động"
                                    menuItems={["Hoạt động truyền thông", "Talkshow/Workshop", "Game", "Cuộc thi", "Hoạt động nội bộ"]}
                                    errors={errors}
                                />


                                <TextFieldController
                                    name="meta_description"
                                    control={control}
                                    label="Mô tả"
                                    errors={errors}
                                    required={false}
                                />
                                <TextFieldController
                                    name="expense_money"
                                    control={control}
                                    label="Chi phí"
                                    errors={errors}
                                    required={false}
                                />
                                <TextFieldController
                                    name="register_number"
                                    control={control}
                                    label="Số người đăng ký"
                                    errors={errors}
                                    required={false}
                                />
                                <TextFieldController
                                    name="participated_number"
                                    control={control}
                                    label="Số người tham gia"
                                    errors={errors}
                                    required={false}
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