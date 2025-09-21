import React, { useEffect, useState } from 'react';
import "./AccountsFormPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { TableDialog } from '../../../components/TableDialog';
import BaseButton from '../../../components/Buttons/BaseButton';
import { SelectController } from '../../../components/SelectController';
import { TextFieldController } from '../../../components/TextFieldController';
import { Header } from "../../../components/Header";
import { getAccountById, createAccount, updateAccount } from '../../../api/account.service';
import { getAllSysRoles } from '../../../api/sysrole.service';
import { accountSchema } from '../../../schemas/accountSchema';

export const AccountsFormPage = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [sysrole, setSysrole] = useState([]);

    const [isOpenTableDialog, setIsOpenTableDialog] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            "personnel_name": "",
            "student_id": "",
            "username": "",
            "sysrole_id": "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const rolesRes = await getAllSysRoles();
            const roles = rolesRes.data;
            if (id) {
                const accountRes = await getAccountById(id);
                const account = accountRes.data;
                const role = roles.filter(r => r.sysrole_id === account.sysrole_id);
                reset({...account, ...role})
            }
            setSysrole(roles);
        };
        fetchData();
    }, [id]);

    const handleClose = () => {
        navigate('/accounts');
    }

    const onSubmit = async (payload) => {
        try {
            const { personnel_id, sysrole_id, username } = payload
            const fullPayload = { personnel_id, sysrole_id, username }

            if (action === "create") {
                const response = await createAccount(fullPayload);
                handleClose();
            } else if (action === "edit") {
                const response = await updateAccount(id, { sysrole_id });
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="account-form-page">
            {
                isOpenTableDialog && (
                    <TableDialog
                        setIsOpenTableDialog={setIsOpenTableDialog}
                        setDefaultItems={reset}
                    />
                )
            }
            <Header>{action === "create" ? "Thêm Tài khoản mới" : "Chỉnh sửa Tài khoản"}</Header>
            <div className="form-container">
                <div className="form">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-top">
                            <div className="form-control">
                                <TextFieldController
                                    name="personnel_name"
                                    control={control}
                                    label="Chủ sở hữu"
                                    disabled
                                    errors={errors}
                                />
                                {action === "create" && (
                                    <div className="select-button">
                                        <BaseButton onClick={() => setIsOpenTableDialog(true)}>Chọn</BaseButton>
                                    </div>
                                )}
                            </div>
                            <TextFieldController
                                name="student_id"
                                control={control}
                                label="MSSV"
                                disabled
                                errors={errors}
                            />
                            <TextFieldController
                                name="username"
                                control={control}
                                label="Tên tài khoản"
                                disabled
                                errors={errors}
                            />
                            <SelectController
                                name="sysrole_id"
                                control={control}
                                label="Vai trò"
                                menuItems={sysrole || []}
                            />
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