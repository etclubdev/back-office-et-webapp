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

import { getAllETNews, deleteETNewsById, deleteETNews } from "../../../api/etNews.service";

import { Filter } from '../../../components/Filter';
import { filterChipData, confirmContents } from '../../../constants';

import "./ETNewsOverviewPage.css";

const contents = confirmContents.etNews;

const columns = [
  { field: 'title', headerName: 'Tiêu đề' },
  { field: 'meta_description', headerName: 'Mô tả' },
  { field: 'etnews_category', headerName: 'Danh mục' },
  { field: 'source', headerName: 'Nguồn' },
  { field: 'visible', headerName: 'Hiển thị trang chủ' },
];

export const ETNewsOverviewPage = () => {
  const navigate = useNavigate();

  const [etNews, setETNews] = useState([]);
  const [filteredETNews, setFilteredETNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getAllETNews(selectedChips);
      const dataArray = convertToArray(data.groupedNews);
      setETNews(dataArray);
      setFilteredETNews(dataArray);
    } catch (error) {
      setETNews([]);
      setFilteredETNews([]);
    }
  }, [selectedChips]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClick = (action) => {
    if (action === "create") {
      navigate("/et-news/create");
    } else if (action === "edit" && selected.length === 1) {
      navigate(`/et-news/edit/${selected[0]}`);
    }
  };

  const handleSearch = useCallback((query) => {
    setSearchTerm(query);

    if (query.trim() === "") {
      setFilteredETNews(etNews);
    } else {
      const filtered = etNews.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredETNews(filtered);
    }
  }, [etNews]);

  const handleDelete = async () => {
    try {
      if (selected.length === 1) {
        await deleteETNewsById(selected[0]);
      } else {
        await deleteETNews(selected);
      }
      await fetchData();
      setSelected([]);
    } catch (error) {
      console.error("Lỗi khi xóa ETNews:", error);
    }
  };

  const onClose = () => setIsOpenConfirmedDialog(false);

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
    <div className="etnews-overview-page">
      {isOpenConfirmedDialog && (
        <ConfirmedDialog
          onClose={onClose}
          onConfirm={handleConfirmDialog}
          {...contents.delete}
          isLoading={isLoading}
        />
      )}

      <Header>Quản lý ET News</Header>

      <div className="etnews-container">
        <div className="etnews-toolbars">
          <div className="action-container">
            <AddButton onClick={() => handleClick("create")} />
            <EditButton disabled={selected.length != 1} onClick={() => handleClick("edit")} disabled={selected.length !== 1} />
            <DeleteButton disabled={selected.length < 1} onClick={() => setIsOpenConfirmedDialog(true)} disabled={selected.length === 0} />
          </div>
          <div className="search-container">
            <Filter chipdata={filterChipData.etNews} setSelectedChips={setSelectedChips} />
            <SearchBar onSearch={handleSearch} value={searchTerm} />
          </div>
        </div>

        <hr className="etnews-division" />

        <DataTable
          data={filteredETNews}
          columns={columns}
          itemId="etnews_id"
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
