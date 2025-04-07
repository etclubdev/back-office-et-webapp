import React, { useEffect, useState } from 'react';
import './TableDialog.css';
import { getAllPersonnels } from "../../api/personnel.service";
import { DataTable } from "../../components/DataTable";
import { SearchBar } from '../SearchBar';
import { Button } from "@mui/material";


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

export const TableDialog = ({ setDefaultItems, setIsOpenTableDialog }) => {
    const [personnel, setPersonnel] = useState([]);
    const [filteredPersonnel, setFilteredPersonnel] = useState([]);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPersonnels();
            setPersonnel(data);
            setFilteredPersonnel(data);
        }
        fetchData();

    }, []);

    if (selected.length > 1) {
        setSelected(prev => [prev[prev.length - 1]]);
    }

    const handleSearch = (query) => {
        setSearchTerm(query);

        if (query.trim() === "") {
            setFilteredPersonnel(personnel);
            return;
        }

        const filtered = personnel.filter(item => {
            return item.personnel_name.toLowerCase().includes(query.toLowerCase())
        });

        setFilteredPersonnel(filtered);
    };

    const handleCancel = () => {
        setIsOpenTableDialog(false);
    }

    const handleSelect = () => {
        if (selected.length < 1) return;
        const selectedPersonnel = personnel.filter((item) => item.personnel_id === selected[0]);
        const { personnel_id, personnel_name, student_id, email } = selectedPersonnel[0]
        setDefaultItems({
            personnel_id,
            personnel_name,
            student_id,
            username: email,
            sysrole_name: ""
        });
        setIsOpenTableDialog(false);
    }

    return (
        <div className="table-modal-overlay">
            <div className="table-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="table-modal-header">
                    <button className="close-button" onClick={handleCancel}>X</button>
                </div>
                <div className="table-modal-content">
                    <div className="search-container">
                        <SearchBar
                            onSearch={handleSearch}
                        />
                    </div>
                    <DataTable
                        data={filteredPersonnel}
                        columns={columns}
                        itemId="personnel_id"
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
                <div className="table-modal-button">
                    <Button onClick={handleCancel} variant="outlined" color="primary">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleSelect} variant="contained" color="primary">
                        Chọn
                    </Button>
                </div>
            </div>
        </div>
    );
};

