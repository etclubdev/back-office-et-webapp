import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import AddButton from "../../../components/Buttons/AddButton";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { getConfirmDialogConfig } from "../../../utils/confirmDialogUtil";
import {
  getAllBannners,
  deleteBannerById,
  deleteBannners
} from '../../../api/banner.service';
import "./BannersOverviewPage.css";

import { confirmContents } from '../../../constants';

const columns = [
  { field: 'banner_name', headerName: 'Tên banner' },
  { field: 'image_url', headerName: 'Banner' },
  { field: 'visible', headerName: 'Hiển thị trang chủ' },
];

const contents = confirmContents.banners;

export const BannersOverviewPage = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getAllBannners();
      setBanners(data);
    } catch (err) {
      console.error("Failed to fetch banners", err);
      setBanners([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClick = useCallback((action) => {
    if (action === "edit" && selected.length === 1) {
      navigate(`/homepage-banners/edit/${selected[0]}`);
    } else if (action === "create") {
      navigate(`/homepage-banners/create`);
    }
  }, [navigate, selected]);

  const handleSearch = useCallback((query) => {
    setSearchTerm(query);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (selected.length === 1) {
        await deleteBannerById(selected[0]);
      } else {
        await deleteBannners(selected);
      }
      setSelected([]);
      fetchData();
    } catch (err) {
      console.error("Delete failed", err);
    }
  }, [selected, fetchData]);

  const filteredBanners = useMemo(() => {
    if (!searchTerm.trim()) return banners;
    return banners.filter((item) =>
      item.banner_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [banners, searchTerm]);

  const onClose = () => {
    setIsOpenConfirmDialog(false);
  }

  const handleConfirmDialog = async () => {
    try {
      setIsLoading(true);
      await handleConfirmDelete();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="banner-overview-page">
      {isOpenConfirmDialog && (
        <ConfirmedDialog
          onClose={onClose}
          onConfirm={handleConfirmDialog}
          {...contents.delete}
          isLoading={isLoading}
        />
      )}

      <Header />

      <div className="banner-container">
        <div className="banner-toolbars">
          <div className="action-container">
            <AddButton onClick={() => handleClick("create")} />
            <EditButton onClick={() => handleClick("edit")} disabled={selected.length !== 1} />
            <DeleteButton onClick={() => setIsOpenConfirmDialog(true)} disabled={selected.length === 0} />
          </div>

          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <hr className="banner-division" />

        <DataTable
          data={filteredBanners}
          columns={columns}
          itemId="banner_id"
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
