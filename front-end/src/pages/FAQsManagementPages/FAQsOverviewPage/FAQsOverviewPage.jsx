import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./FAQsOverviewPage.css";

import { Header } from "../../../components/Header";
import AddButton from "../../../components/Buttons/AddButton";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";

import { getAllFAQs } from '../../../api/faq.service';
import { deleteFAQs, deleteFAQsById } from '../../../api/faq.service';

import { convertToArray } from '../../../utils/convertToArray';
import { getConfirmDialogConfig } from "../../../utils/confirmDialogUtil"

const columns = [
    { field: 'question', headerName: 'Câu hỏi' },
    { field: 'answer', headerName: 'Câu trả lời' },
    { field: 'faq_category', headerName: 'Nhóm câu hỏi' },
    { field: 'visible', headerName: 'Hiển thị trang chủ' },
]

export const FAQsOverviewPage = () => {
    const navigate = useNavigate();
    const [faqs, setFAQs] = useState([]);
    const [filteredFAQs, setFilteredFAQs] = useState([]);
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = useCallback(async () => {
        const { data }  = await getAllFAQs();
        const array = convertToArray(data);
        setFAQs(array);
        setFilteredFAQs(array);
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    }

    const handleClick = (action) => {
        if (action === "edit") {
            navigate(`/faqs/edit/${selected[0]}`);
        } else if (action === "create") {
            navigate(`/faqs/create`);
        }
    }

    const handleConfirmDialog = async () => {
        if (selected.length > 0) {
            try {
                if (selected.length === 1) {
                    await deleteFAQsById(selected[0]);
                } else {
                    await deleteFAQs(selected);
                }
                
                setFAQs(prev => prev.filter(item => !selected.includes(item.faq_id)));
                setFilteredFAQs(prev => prev.filter(item => !selected.includes(item.faq_id)));
                setSelected([]);
            } catch (error) {
                console.error("Lỗi khi xóa thành tựu:", error);
            }
        }
        onClose();
    };


    const handleSearch = (query) => {
        setSearchTerm(query);
        if (query.trim() === "") {
            setFilteredFAQs(faqs);
            return;
        }

        const filtered = faqs.filter(item =>
            item.question.toLowerCase().includes(query.toLowerCase()) ||
            item.faq_category.toLowerCase().includes(query.toLowerCase()) ||
            item.answer.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredFAQs(filtered);
    };

    return (
        <div className="faqs-overview-page">
            {isOpenConfirmedDialog && (
                <ConfirmedDialog
                    onClose={onClose}
                    onConfirm={handleConfirmDialog}
                    {...getConfirmDialogConfig("delete")}
                />
            )}
            <Header />
            <div className="faqs-container">
                <div className="faqs-toolbars">
                    <div className="action-container">
                        <AddButton onClick={() => handleClick("create")} />
                        <EditButton onClick={() => selected.length === 1 && handleClick("edit")} />
                        <DeleteButton onClick={() => selected.length > 0 && setIsOpenConfirmedDialog(true)}/>
                    </div>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <hr className='faqs-division' />
                <DataTable
                    data={filteredFAQs}
                    columns={columns}
                    itemId="faq_id"
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    )
}

