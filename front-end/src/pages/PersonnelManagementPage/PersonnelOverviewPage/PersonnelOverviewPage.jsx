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
import { Filter } from '../../../components/Filter';
import { filterChipData } from '../../../constants';
import "./PersonnelOverviewPage.css";

import { getAllPersonnels, deletePersonnelById, deletePersonnels } from '../../../api/personnel.service';

const columns = [
    { field: 'personnel_name', headerName: 'Họ và tên' },
    { field: 'dob', headerName: 'Ngày sinh' },
    { field: 'email', headerName: 'Email' },
    { field: 'gender', headerName: 'Giới tính' },
    { field: 'cohort_name', headerName: 'Khóa đào tạo' },
    { field: 'position_name', headerName: 'Chức vụ' },
    { field: 'department_name', headerName: 'Ban hoạt động' },
]

export const PersonnelOverviewPage = ({ department_name }) => {
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [filteredPersonnel, setFilteredPersonnel] = useState([]);
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const personnelStatus = selectedChips.length === 0 ? null : selectedChips;
            const { data } = await getAllPersonnels(personnelStatus, getDepartmentNameUtil(department_name));
            setPersonnel(data);
            setFilteredPersonnel(data);
        } catch (error) {
            setPersonnel([]);
            setFilteredPersonnel([]);
            return;
        }
    }, [department_name, selectedChips])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    }

    const handleClick = (action) => {
        if (action === "edit") {
            navigate(`/colleague/${department_name}/edit/${selected[0]}`);
        } else if (action === "create") {
            navigate(`/colleague/${department_name}/create`);
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
                        <EditButton disabled={selected.length != 1} onClick={() => selected.length === 1 && handleClick("edit")} />
                        <DeleteButton disabled={selected.length < 1} onClick={() => selected.length > 0 && setIsOpenConfirmedDialog(true)} />
                    </div>
                    <div className="search-container">
                        <Filter chipdata={filterChipData.personnelStatus} setSelectedChips={setSelectedChips}/>
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