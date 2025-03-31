import React, { useEffect, useState } from 'react';
import "./FormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Button } from "@mui/material";
import { Header } from "../../../components/Header";
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import { UPLOAD_PRESET, CLOUD_NAME } from '../../../constants';

export const FormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [defaultItems, setDefaultItems] = useState({
        question: "",
        // faq_category: "",
        // answer: "",
        // visible: false,
    });

    const [editorContent, setEditorContent] = useState("");
    const [uploadImages, setUploadImages] = useState([]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        // resolver: yupResolver(action === "create" ? createItemschema : updateItemschema),
        // defaultValues: id ? defaultItems : {
        //     question: "",
        //     faq_category: "",
        //     answer: "",
        //     visible: false,
        // },
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                //call API get by id
                // setDefaultItems
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
        // navigate('/items');
    }

    const handleUploadToCloud = async () => {
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
    };

    const onSubmit = async (payload) => {
        /*  // if rich text editor exists
            const newContent = await handleUploadToCloud();
            const fullPayload = { ...payload, content: newContent }
            console.log(fullPayload); 
        */

        if (action === "create") {
            // const response = await createItems(payload);
            // navigate('/items');
        } else if (action === "edit") {
            // const response = await updateItemsById(id, payload);
            // navigate('/items');
        }
    };

    return (
        <div className="form-page">
            <Header>{action === "create" ? "Thêm Items mới" : "Chỉnh sửa Items"}</Header>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)} >
                    {/* TextField */}
                    {/* <Controller
                        name="question"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Câu hỏi" fullWidth error={!!errors.question} helperText={errors.question?.message} required />
                        )}
                    /> */}

                    {/* Selection */}
                    {/* <FormControl fullWidth error={!!errors.faq_category}>
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
                    </FormControl> */}

                    {/* RichTextEditor */}
                    <FormControl className="rich-text-editor">
                        <RichTextEditor
                            setUploadImages={setUploadImages}
                            setEditorContent={setEditorContent}
                        />
                    </FormControl>

                    {/* Buttons */}
                    {/* <div className="form-bottom">
                        <div className="form-button">
                            <Button variant="outlined" color="primary" onClick={handleCancel}>
                                Hủy bỏ
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Lưu
                            </Button>
                        </div>
                    </div> */}
                </form>
            </div>
        </div>
    )
}