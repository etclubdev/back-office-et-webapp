import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import AddButton from "../../../components/Buttons/AddButton";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { getConfirmDialogConfig } from "../../../utils/confirmDialogUtil"
import "./OverviewPage.css";

const columns = [
    // { field: 'question', headerName: 'Câu hỏi' },
    // { field: 'answer', headerName: 'Câu trả lời' },
]

export const OverviewPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            //call API get all items
            //setItems
            //setFilteredItems
        }
        fetchData();

    }, []);

    const onClose = () => {
        setIsOpenConfirmedDialog(false);
    }

    const handleClick = (action) => {
        if (action === "edit") {
            // navigate(`/items/edit/${selected[0]}`);
        } else if (action === "create") {
            // navigate(`/items/create`);
        }
    }

    const handleConfirmDialog = async () => {
        if (selected.length > 0) {
            try {
                if (selected.length === 1) {
                    //call API delete item by id
                } else {
                    //call API delete items
                }

                // setItems(prev => prev.filter(item => !selected.includes(item.id)));
                // setFilteredItems(prev => prev.filter(item => !selected.includes(item.id)));
                // setSelected([]);
            } catch (error) {
                console.error("Errors: ", error);
            }
        }
        onClose();
    };


    const handleSearch = (query) => {
        setSearchTerm(query);
        if (query.trim() === "") {
            // setFilteredItems(items);
            return;
        }

        const filtered = items.filter(item => {
            // return item.question.toLowerCase().includes(query.toLowerCase()) ||
            // item.answer.toLowerCase().includes(query.toLowerCase())
        });

        // setFilteredItems(filtered);
    };

    return (
        <div className="overview-page">
            {/* {isOpenConfirmedDialog && (
                <ConfirmedDialog
                    onClose={onClose}
                    onConfirm={handleConfirmDialog}
                    {...getConfirmDialogConfig("delete")}
                />
            )} */}
            <Header />
            <div className="container">
                <div className="toolbars">
                    {/* <div className="action-container">
                        <AddButton onClick={() => handleClick("create")} />
                        <EditButton onClick={() => selected.length === 1 && handleClick("edit")} />
                        <DeleteButton onClick={() => selected.length > 0 && setIsOpenConfirmedDialog(true)} />
                    </div>
                    <div className="search-container">
                        <SearchBar onSearch={handleSearch} />
                    </div> */}
                </div>
                <hr className='division' />
                {/* <DataTable
                    data={filteredItems}
                    columns={columns}
                    itemId="id"
                    selected={selected}
                    setSelected={setSelected}
                /> */}
            </div>
        </div>
    )
}
