import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import "./PartnerCard.css";
import {
    Switch,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Checkbox,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { updateVisible } from "../../api/partner.service";
import { ConfirmedDialog } from "../ConfirmedDialog";
import { getConfirmDialogConfig } from "../../utils/confirmDialogUtil";

export const PartnerCard = ({ category, data, setData }) => {
    const { visible, invisible } = useMemo(() => data, [data]);
    const [selectedCard, setSelectedCard] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [toList, setToList] = useState(null);

    const transferListRef = useRef(null);

    const handleTransfer = async (destination) => {
        if (selectedItems?.length === 0) return;
        setToList(destination);
        setIsOpenDialog(true);
    };

    const onConfirm = async (destination) => {
        const response = await updateVisible(getPayload(destination === "visible"));
        const fromList = destination === "visible" ? "invisible" : "visible";
        setData({
            [destination]: [...data[destination], ...selectedItems],
            [fromList]: data[fromList].filter(item => !selectedItems.includes(item))
        });
    };

    const getPayload = (isVisible) => {
        return selectedItems.map(item => ({
            partner_id: item.partner_id,
            visible: isVisible,
        }));
    };

    const handleCardClick = () => {
        setIsActive(prev => !prev);
    };

    return (
        <div className={`partner-card ${isActive ? "active" : ""}`}>
            {isOpenDialog && (
                <ConfirmedDialog
                    {...getConfirmDialogConfig("switch")}
                    onClose={() => {
                        setIsOpenDialog(false);
                        setToList(null);
                    }}
                    onConfirm={async () => {
                        await onConfirm(toList);
                        setIsOpenDialog(false);
                        setToList(null);
                    }}
                />
            )}

            <div className="card-top" onClick={handleCardClick}>
                <div className="card-name">
                    <FontAwesomeIcon className="card-icon" icon={faChevronDown} />
                    <span>{category}</span>
                </div>
            </div>

            <CSSTransition
                in={isActive}
                timeout={300}
                classNames="transfer"
                unmountOnExit
                nodeRef={transferListRef}
            >
                <div className="transfer-list" ref={transferListRef}>
                    <TransferList
                        cardId="invisible-list"
                        data={invisible}
                        title="Danh sách ẩn"
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        setSelectedItems={setSelectedItems}
                    />
                    <div className="transfer-button">
                        <Button
                            onClick={() => handleTransfer("visible")}
                            size="small"
                            variant="contained"
                            disabled={selectedCard && selectedCard === "visible-list"}
                        >
                            {">"}
                        </Button>
                        <Button
                            onClick={() => handleTransfer("invisible")}
                            size="small"
                            variant="outlined"
                            disabled={selectedCard && selectedCard === "invisible-list"}
                        >
                            {"<"}
                        </Button>
                    </div>
                    <TransferList
                        cardId="visible-list"
                        title="Danh sách hiện có"
                        data={visible}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        setSelectedItems={setSelectedItems}
                    />
                </div>
            </CSSTransition>
        </div>
    );
};

const TransferList = ({ cardId, title, data, selectedCard, setSelectedCard, setSelectedItems }) => {
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (selected.length > 0) {
            setSelectedCard(cardId);
        } else {
            setSelectedCard("");
        }

        setSelectedItems(() => {
            return data?.filter(i => selected.includes(i.partner_id));
        });
    }, [selected]);

    useEffect(() => {
        setSelected([]);
    }, [data]);

    const isAllSelected = data?.length > 0 && data?.every(item => selected.includes(item.partner_id));

    const handleSelectedAll = () => {
        setSelected(isAllSelected ? [] : data?.map((item) => item.partner_id));
    };

    const handleSelected = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const filteredData = useMemo(() => {
        return data?.filter((row) => row.partner_name.toLowerCase().includes(search));
    }, [search, data]);

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value.toLowerCase());
    }, []);

    return (
        <Paper id={cardId} sx={{ width: "35%", padding: 1, minHeight: "300px" }}>
            <TextField
                label="Tìm kiếm..."
                variant="outlined"
                fullWidth
                margin="small"
                size="small"
                onChange={handleSearch}
            />
            <TableContainer sx={{ maxHeight: "300px", overflowY: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    disabled={selectedCard && selectedCard !== cardId}
                                    checked={isAllSelected}
                                    onClick={handleSelectedAll}
                                    color="primary"
                                    inputProps={{ "aria-label": "select all items" }}
                                />
                            </TableCell>
                            <TableCell>
                                <strong>{title}</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData?.map((row) => (
                            <TableRow key={row.partner_id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        disabled={selectedCard && selectedCard !== cardId}
                                        checked={selected.includes(row.partner_id)}
                                        onClick={() => handleSelected(row.partner_id)}
                                        color="primary"
                                        inputProps={{ "aria-label": `select ${row.partner_name}` }}
                                    />
                                </TableCell>
                                <TableCell>{row.partner_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
