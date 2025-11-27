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
import "./ETBlogOverviewPage.css";

import { getAllETBlogs, deleteETBlogById, deleteETBlogs } from '../../../api/etBlog.service';
import { confirmContents } from '../../../config/confirmContents';

const columns = [
    { field: 'title', headerName: 'Tiêu đề' },
    { field: 'meta_description', headerName: 'Mô tả' },
    { field: 'blog_author', headerName: 'Tác giả' },
    { field: 'visible', headerName: 'Hiển thị trang chủ' },
];

const contents = confirmContents.etBlog;

export const ETBlogOverviewPage = () => {
    const navigate = useNavigate();
    const [etBlog, setETBlog] = useState([]);
    const [filteredETBlog, setFilteredETBlog] = useState([]);
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const { data } = await getAllETBlogs();

            setETBlog(data.all);
            setFilteredETBlog(data.all);
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    };

    const handleClick = (action) => {
        if (action === "edit") {
            navigate(`/et-blog/edit/${selected[0]}`);
        } else if (action === "create") {
            navigate(`/et-blog/create`);
        }
    };

    const handleDelete = async () => {
        if (selected.length > 0) {
            try {
                if (selected.length === 1) {
                    await deleteETBlogById(selected[0]);
                } else {
                    await deleteETBlogs(selected);
                }
                fetchData();
                setSelected([]);
            } catch (error) {
                console.error("Errors: ", error);
            }
        }
        onClose();
    };

    const handleSearch = useCallback((query) => {
        setSearchTerm(query);
        if (query.trim() === "") {
            setFilteredETBlog(etBlog);
        } else {
            const filtered = etBlog.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredETBlog(filtered);
        }
    }, [etBlog]);

    const handleConfirmDialog = async () => {
        try {
            setIsLoading(true);
            await handleDelete();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="etblog-overview-page">
            {isOpenConfirmedDialog && (
                <ConfirmedDialog
                    onClose={onClose}
                    onConfirm={handleConfirmDialog}
                    {...contents.delete}
                    isLoading={isLoading}
                />
            )}
            <Header />
            <div className="etblog-container">
                <div className="etblog-toolbars">
                    <div className="action-container">
                        <AddButton onClick={() => handleClick("create")} />
                        <EditButton disabled={selected.length != 1} onClick={() => selected.length === 1 && handleClick("edit")} />
                        <DeleteButton disabled={selected.length < 1} onClick={() => selected.length > 0 && setIsOpenConfirmedDialog(true)} />
                    </div>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <hr className='etblog-division' />
                <DataTable
                    data={filteredETBlog}
                    columns={columns}
                    itemId="blog_id"
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    );
};
