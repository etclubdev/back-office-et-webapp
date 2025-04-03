import React, { useEffect, useState } from 'react';
import "./FormPage.css";
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
import { UPLOAD_PRESET, CLOUD_NAME } from '../../../constants';

export const FormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [defaultItems, setDefaultItems] = useState({
        //Object
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
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        // resolver: yupResolver(schema),
        defaultValues: defaultItems,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                // const data = await getById(id);
                // setDefaultItems(data);
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
        // navigate
    }

    const handleUploadToCloud = async (isContent) => {
        if (isContent) {
            if (uploadImages.length === 0) {
                return;
            }

            const uploadedUrls = [];

            for (const img of uploadImages) {
                const data = new FormData();
                data.append("file", img.file);
                data.append("upload_preset", UPLOAD_PRESET);
                data.append("cloud_name", CLOUD_NAME);

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: data,
                    }
                );

                const result = await res.json();
                uploadedUrls.push(result.secure_url);
            }

            let newContent = editorContent;
            uploadImages.forEach((img, index) => {
                newContent = newContent.replace(img.url, uploadedUrls[index]);
            });

            setEditorContent(newContent);
            setUploadImages([]);
            alert("Upload successfully!");

            return newContent;
        } else {
            if (!preview && !preview?.startsWith("http")) return;
            const data = new FormData();
            data.append("file", preview);
            data.append("upload_preset", UPLOAD_PRESET);
            data.append("cloud_name", CLOUD_NAME);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await res.json();
            return result.secure_url;
        }
    };
    
    const onSubmit = async (payload) => {
       try {
            // const thumbnailImg = await handleUploadToCloud();
            // const newContent = await handleUploadToCloud(true);
            // const fullPayload = { ...payload, thumbnail_image_url: thumbnailImg, content: newContent || editorContent }
            // console.log(fullPayload);
            
            // if (action === "create") {
            //     // const response = await createActivity(fullPayload);
            //     alert("Gửi thành công !");
            // } else if (action === "edit") {
            //     const response = await updateActivity(id, fullPayload);
            //     alert("Gửi thành công !");
            // }
       } catch (error) {
            console.log(error);
            
       }
    };

    return (
        <div className="form-page">
            <Header>{action === "create" ? "Thêm Hoạt động mới" : "Chỉnh sửa Hoạt động"}</Header>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-top">
                        <div className="form-left">
                            {/* <ImageUploadController
                                name="thumbnail_image_url"
                                control={control}
                                preview={preview}
                                setPreview={setPreview}
                                setValue={setValue}
                            /> */}

                        </div>

                        <div className="form-right">
                            {/* <TextFieldController
                                name=""
                                control={control}
                                label=""
                                errors={errors}
                            /> */}
                            <div className='date-controller'>
                                {/* <div className='date-item'>
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
                                </div> */}
                            </div>

                            {/* <SelectController
                                name=""
                                control={control}
                                label=""
                                menuItems={[]}
                            /> */}

                        </div>
                    </div>
                    <div className="form-bottom">
                        <FormControl className="rich-text-editor">
                            {/* <RichTextEditor
                                errors={errors}
                                name=""
                                control={control}
                                setValue={setValue}
                                setUploadImages={setUploadImages}
                                setEditorContent={setEditorContent}
                            /> */}
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
    )
}