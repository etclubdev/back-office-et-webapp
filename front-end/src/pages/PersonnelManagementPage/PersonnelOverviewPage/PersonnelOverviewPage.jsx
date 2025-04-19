import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import AddButton from "../../../components/Buttons/AddButton";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { getConfirmDialogConfig } from "../../../utils/confirmDialogUtil";
import { getDepartmentNameUtil } from '../../../utils/getDepartmentNameUtil';
import "./PersonnelOverviewPage.css";
import axios from 'axios';

import { getAllPersonnels, deletePersonnelById, deletePersonnels } from '../../../api/personnel.service';

const columns = [
    { field: 'personnel_name', headerName: 'Họ và tên' },
    { field: 'email', headerName: 'Email' },
    { field: 'dob', headerName: 'Ngày sinh' },
    { field: 'address', headerName: 'Địa chỉ' },
    { field: 'gender', headerName: 'Giới tính' },
    { field: 'student_id', headerName: 'MSSV' },
    { field: 'faculty', headerName: 'Khoa' },
    { field: 'university', headerName: 'Trường' },
    { field: 'major', headerName: 'Chuyên ngành' },
    { field: 'class', headerName: 'Lớp' },
    { field: 'cv_type', headerName: 'Loại CV' },
    { field: 'cv_link', headerName: 'Link CV' },
    { field: 'cohort_name', headerName: 'Khóa đào tạo' },
    { field: 'term_name', headerName: 'Nhiệm kỳ' },
    { field: 'position_name', headerName: 'Chức vụ' },
    { field: 'department_name', headerName: 'Ban hoạt động' },
]

export const PersonnelOverviewPage = ({ personnel_status, department_name }) => {
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [filteredPersonnel, setFilteredPersonnel] = useState([]);
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = useCallback(async () => {
        try {
            const { data } = await getAllPersonnels(personnel_status, getDepartmentNameUtil(department_name));
            setPersonnel(data);
            setFilteredPersonnel(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setPersonnel([]);
                    setFilteredPersonnel([]);
                    return;
                }
            }
        }
    }, [personnel_status, department_name])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    }

    const handleClick = (action) => {
        if (action === "edit") {
            navigate(`/${department_name}/edit/${selected[0]}`);
        } else if (action === "create") {
            navigate(`/${department_name}/create`);
        }
    }

    const handleConfirmDialog = async () => {
        if (selected.length > 0) {
            try {
                if (selected.length === 1) {
                    await deletePersonnelById(selected[0]);
                    fetchData();
                } else {
                    await deletePersonnels(selected);
                    fetchData();
                }

                setPersonnel(prev => prev.filter(item => !selected.includes(item.partner_id)));
                setFilteredPersonnel(prev => prev.filter(item => !selected.includes(item.partner_id)));
                setSelected([]);
            } catch (error) {
                console.error("Errors: ", error);
            }
        }
        onClose();
    };


    const handleSearch = (query) => {
        setSearchTerm(query);

        if (query.trim() === "") {
            setFilteredPersonnel(personnel);
            return;
        }

        const filtered = personnel.filter(item => {
            return item.partner_name.toLowerCase().includes(query.toLowerCase())
        });

        setFilteredPersonnel(filtered);
    };

    return (
        <div className="personnel-overview-page">
            {isOpenConfirmedDialog && (
                <ConfirmedDialog
                    onClose={onClose}
                    onConfirm={handleConfirmDialog}
                    {...getConfirmDialogConfig("delete")}
                />
            )}
            <Header />
            <div className="personnel-container">
                <div className="personnel-toolbars">
                    <div className="action-container">
                        <AddButton onClick={() => handleClick("create")} />
                        <EditButton onClick={() => selected.length === 1 && handleClick("edit")} />
                        <DeleteButton onClick={() => selected.length > 0 && setIsOpenConfirmedDialog(true)} />
                    </div>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <hr className="personnel-division" />
                <DataTable
                    data={filteredPersonnel}
                    columns={columns}
                    itemId="personnel_id"
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    )
}