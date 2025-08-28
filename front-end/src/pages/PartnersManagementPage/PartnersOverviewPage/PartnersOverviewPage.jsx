import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import AddButton from "../../../components/Buttons/AddButton";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { getConfirmDialogConfig } from "../../../utils/confirmDialogUtil";
import { convertToArray } from "../../../utils/convertToArrayUtil";
import { Filter } from '../../../components/Filter';
import { filterChipData } from '../../../constants';
import "./PartnersOverviewPage.css";

import {
    getAllPartners,
    deletePartnerById,
    deletePartners
} from '../../../api/partner.service';

const columns = [
    { field: 'partner_name', headerName: 'Tên đối tác' },
    { field: 'partner_category_name', headerName: 'Danh mục đối tác' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone_number', headerName: 'Số điện thoại' },
    { field: 'visible', headerName: 'Hiển thị' },
    { field: 'note', headerName: 'Ghi chú' },
];

export const PartnersOverviewPage = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [filteredPartners, setFilteredPartners] = useState([]);
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const { data } = await getAllPartners(selectedChips);
            let dataArray;
            dataArray = !Array.isArray(data) ? convertToArray(data) : data;
            setPartners(dataArray);
            setFilteredPartners(dataArray);
        } catch (error) {
            setPartners([]);
            setFilteredPartners([]);
            console.error("Fetch partners failed:", error);
        }
    }, [selectedChips]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    };

    const handleClick = (action) => {
        if (action === "edit" && selected.length === 1) {
            navigate(`/partners/edit/${selected[0]}`);
        } else if (action === "create") {
            navigate(`/partners/create`);
        }
    };

    const handleConfirmDialog = async () => {
        if (selected.length === 0) return;

        try {
            if (selected.length === 1) {
                await deletePartnerById(selected[0]);
            } else {
                await deletePartners(selected);
            }
            fetchData();
            setSelected([]);
        } catch (error) {
            console.error("Delete partner error:", error);
        }

        onClose();
    };

    const handleSearch = useCallback((query) => {
        setSearchTerm(query);
        if (query.trim() === "") {
            setFilteredPartners(partners);
        } else {
            const filtered = partners.filter(partner =>
                partner.partner_name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPartners(filtered);
        }
    }, [partners]);

    return (
        <div className="partners-overview-page">
            {isOpenConfirmedDialog && (
                <ConfirmedDialog
                    onClose={onClose}
                    onConfirm={handleConfirmDialog}
                    {...getConfirmDialogConfig("delete")}
                />
            )}
            <Header />
            <div className="partners-container">
                <div className="partners-toolbars">
                    <div className="action-container">
                        <AddButton onClick={() => handleClick("create")} />
                        <EditButton disabled={selected.length != 1} onClick={() => selected.length === 1 && handleClick("edit")} />
                        <DeleteButton disabled={selected.length < 1} onClick={() => selected.length > 0 && setIsOpenConfirmedDialog(true)} />
                    </div>
                    <div className="search-container">
                        <Filter chipdata={filterChipData.partners} setSelectedChips={setSelectedChips}/>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <hr className="partners-division" />
                <DataTable
                    data={filteredPartners}
                    columns={columns}
                    itemId="partner_id"
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    );
};
