import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import AddButton from "../../../components/Buttons/AddButton";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import ResetPasswordButton from '../../../components/Buttons/ResetPasswordButton';
import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { getConfirmDialogConfig } from "../../../utils/confirmDialogUtil"
import "./AccountsOverviewPage.css";

import { getAllAccounts, deleteAccountById, deleteAccounts, resetPassword } from '../../../api/account.service';
import { getAllSysRoles } from '../../../api/sysrole.service';

import { confirmContents } from '../../../constants';

const columns = [
    { field: 'username', headerName: 'Tên tài khoản' },
    { field: 'sysrole_name', headerName: 'Vai trò' },
    { field: 'created_on', headerName: 'Ngày tạo' },
    { field: 'last_modified_on', headerName: 'Chỉnh sửa gần nhất' },
]

const contents = confirmContents.accounts;

export const AccountsOverviewPage = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // dialog state
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        contents: { title: "", desc: "", Icon: null, alertType: "" },
        onConfirm: () => { }
    });

    const fetchData = useCallback(async () => {
        const accountRes = await getAllAccounts();
        const roleRes = await getAllSysRoles();

        const fullData = accountRes.data.map(account => {
            const roles = roleRes.data;
            const role = roles.filter(r => r.sysrole_id === account.sysrole_id)[0];
            return { ...account, ...role }
        })
        setAccounts(fullData);
        setFilteredAccounts(fullData);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    }

    const handleSetDialogProps = (contents, onConfirm) => {
        setDialogProps({ contents, onConfirm });
        setIsOpenConfirmedDialog(true);
    };

    const handleClick = (action) => {
        if (action === "edit") {
            navigate(`/accounts/edit/${selected[0]}`);
        } else if (action === "create") {
            navigate(`/accounts/create`);
        }
    }

    const handleDelete = async () => {
        if (selected.length === 1) {
            await deleteAccountById(selected[0]);
        } else {
            await deleteAccounts(selected);
        }

        setAccounts(prev => prev.filter(item => !selected.includes(item.account_id)));
        setFilteredAccounts(prev => prev.filter(item => !selected.includes(item.account_id)));
        setSelected([]);
    };

    const handleResetPassword = async () => {
        await resetPassword(selected[0]);
    }

    const handleSearch = (query) => {
        setSearchTerm(query);

        if (query.trim() === "") {
            setFilteredAccounts(accounts);
            return;
        }

        const filtered = accounts.filter(item => {
            return item.username.toLowerCase().includes(query.toLowerCase())
        });

        setFilteredAccounts(filtered);
    };

    const handleConfirmDialog = async () => {
        try {
            setIsLoading(true);
            await dialogProps.onConfirm();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="accounts-overview-page">
            {isOpenConfirmedDialog && (
                <ConfirmedDialog
                    onClose={onClose}
                    onConfirm={handleConfirmDialog}
                    {...dialogProps.contents}
                    isLoading={isLoading}
                />
            )}

            <Header />
            <div className="accounts-container">
                <div className="accounts-toolbars">
                    <div className="action-container">
                        <div className="action-container-item">
                            <AddButton onClick={() => handleClick("create")} />
                            <EditButton disabled={selected.length != 1} onClick={() => selected.length === 1 && handleClick("edit")} />
                            <DeleteButton disabled={selected.length < 1} onClick={() => selected.length > 0 && handleSetDialogProps(contents.delete, handleDelete)} />
                        </div>
                        <div className="action-container-item">
                            <ResetPasswordButton disabled={selected.length != 1} onClick={() => selected.length > 0 && handleSetDialogProps(contents.resetPassword, handleResetPassword)} />
                        </div>
                    </div>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <hr className="accounts-division" />
                <DataTable
                    data={filteredAccounts}
                    columns={columns}
                    itemId="account_id"
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    )
}
