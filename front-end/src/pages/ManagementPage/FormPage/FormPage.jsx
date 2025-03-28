import React, { useEffect, useState } from 'react';
import "./FormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Button } from "@mui/material";
import { Header } from "../../../components/Header";


export const FormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [defaultItems, setDefaultItems] = useState({
        // question: "",
        // faq_category: "",
        // answer: "",
        // visible: false,
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
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
        navigate('/items');
    }

    const onSubmit = async (payload) => {
        if (action === "create") {
            const response = await createFAQs(payload);
            navigate('/items');
        } else if (action === "edit") {
            const response = await updateFAQsById(id, payload);
            navigate('/items');
        }
    };

    return (
        <div className="form-page">
            <Header>{action === "create" ? "Thêm Items mới" : "Chỉnh sửa Items"}</Header>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)} >
                    {/* <Controller
                                name="question"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Câu hỏi" fullWidth error={!!errors.question} helperText={errors.question?.message} required />
                                )}
                            /> */}

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


                    <div className="form-bottom">
                        <div className="form-button">
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