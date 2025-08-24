import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import AddButton from "../../../components/Buttons/AddButton";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { getConfirmDialogConfig } from "../../../utils/confirmDialogUtil"
import { convertToArray } from "../../../utils/convertToArrayUtil";
import "./ActivitiesOverviewPage.css";

import { getAllActivities, deleteActivities, deleteActivity } from "../../../api/activity.service";

const columns = [
    { field: 'title', headerName: 'Tên hoạt động' },
    { field: 'meta_description', headerName: 'Mô tả' },
    { field: 'activity_category', headerName: 'Loại hoạt động' },
    { field: 'start_date', headerName: 'Ngày bắt đầu' },
    { field: 'end_date', headerName: 'Ngày kết thúc' },
    { field: 'visible', headerName: 'Hiển thị trang chủ' },
]

export const ActivitiesOverviewPage = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = useCallback(async () => {
        try {
            const { data } = await getAllActivities();
            let dataArray = convertToArray(data?.completed || []);

            if (data?.ongoing?.length > 0) {
                dataArray = [...dataArray, ...data.ongoing];
            }
            setActivities(dataArray);
            setFilteredActivities(dataArray);
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    }

    const handleClick = (action) => {
        if (action === "edit") {
            navigate(`/activities/edit/${selected[0]}`);
        } else if (action === "create") {
            navigate(`/activities/create`);
        }
    }

    const handleConfirmDialog = async () => {
        if (selected.length > 0) {
            try {
                if (selected.length === 1) {
                    await deleteActivity(selected[0]);
                    fetchData();
                } else {
                    await deleteActivities(selected);
                    fetchData();
                }

            } catch (error) {
                console.error("Errors: ", error);
            }
        }
        onClose();
    };


    const handleSearch = useCallback((query) => {
            setSearchTerm(query);
            if (query.trim() === "") {
                setFilteredActivities(activities);
            } else {
                const filtered = activities.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredActivities(filtered);
            }
        }, [activities]);

    return (
        <div className="activities-overview-page">
            {isOpenConfirmedDialog && (
                <ConfirmedDialog
                    onClose={onClose}
                    onConfirm={handleConfirmDialog}
                    {...getConfirmDialogConfig("delete")}
                />
            )}
            <Header />
            <div className="activities-container">
                <div className="activities-toolbars">
                    <div className="action-container">
                        <AddButton onClick={() => handleClick("create")} />
                        <EditButton disabled={selected.length != 1} onClick={() => selected.length === 1 && handleClick("edit")} />
                        <DeleteButton disabled={selected.length < 1} onClick={() => selected.length > 0 && setIsOpenConfirmedDialog(true)} />
                    </div>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <hr className='activities-division' />
                <DataTable
                    data={filteredActivities}
                    columns={columns}
                    itemId="activity_id"
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    )
}
