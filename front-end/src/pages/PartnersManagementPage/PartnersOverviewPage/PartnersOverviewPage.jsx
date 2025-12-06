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
import { filterChipData } from '../../../config/filterChipData';
import { confirmContents } from '../../../config/confirmContents';
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

const contents = confirmContents.partners;

export const PartnersOverviewPage = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);

  const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    contents: { title: "", desc: "", Icon: null, alertType: "" },
    onConfirm: () => { }
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getAllPartners(selectedChips);
      const dataArray = !Array.isArray(data) ? convertToArray(data) : data;
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

  const handleClick = (action) => {
    if (action === "edit" && selected.length === 1) {
      navigate(`/partners/edit/${selected[0]}`);
    } else if (action === "create") {
      navigate(`/partners/create`);
    }
  };

  const handleSetDialogProps = (contents, onConfirm) => {
    setDialogProps({ contents, onConfirm });
    setIsOpenConfirmedDialog(true);
  };

  const handleDelete = async () => {
    if (selected.length === 0) return;
    try {
      if (selected.length === 1) {
        await deletePartnerById(selected[0]);
      } else {
        await deletePartners(selected);
      }
      setSelected([]);
      fetchData();
    } catch (error) {
      console.error("Delete partner error:", error);
    }
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

  const onClose = () => {
    setIsOpenConfirmedDialog(false);
  }

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
    <div className="partners-overview-page">
      {isOpenConfirmedDialog && (
        <ConfirmedDialog
          onClose={onClose}
          onConfirm={handleConfirmDialog}
          {...dialogProps.contents}
          isLoading={isLoading}
        />
      )}
      <Header />
      <div className="partners-container">
        <div className="partners-toolbars">
          <div className="action-container">
            <AddButton onClick={() => handleClick("create")} />
            <EditButton disabled={selected.length !== 1} onClick={() => handleClick("edit")} />
            <DeleteButton
              disabled={selected.length < 1}
              onClick={() => handleSetDialogProps(contents.delete, handleDelete)}
            />
          </div>
          <div className="search-container">
            <Filter chipdata={filterChipData.partners} setSelectedChips={setSelectedChips} />
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
