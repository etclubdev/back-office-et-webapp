import React, { useCallback, useEffect, useState } from 'react';
import "./AchievementsSelectionPage.css";
import { Header } from "../../components/Header";
import { ConfirmedDialog } from '../../components/ConfirmedDialog';
import { InputDialog } from '../../components/InputDialog';
import AddButton from "../../components/Buttons/AddButton";
import EditButton from "../../components/Buttons/EditButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import { SearchBar } from "../../components/SearchBar";
import { AchievementCardList } from "../../components/AchievementCardList";
import { getAllAchievements, createAchievement, updateAchievementById, deleteAchievementById, deleteAchievements } from '../../api/achievement.service';

import { confirmContents } from '../../constants';

const contents = confirmContents.achievements;

export const AchievementsSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [selected, setSelected] = useState([]);

  const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
  const [isOpenInputDialog, setIsOpenInputDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    contents: { title: "", desc: "", Icon: null, alertType: "" },
    onConfirm: () => {}
  });
  const [actionType, setActionType] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getAllAchievements();
      setAchievements(data);
      setFilteredAchievements(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách thành tựu:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [achievements]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query.trim() === "") {
      setFilteredAchievements(achievements);
      return;
    }

    const filtered = achievements.filter(item =>
      item.achievement_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredAchievements(filtered);
  };

  const onClose = () => {
    setIsOpenConfirmedDialog(false);
    setIsOpenInputDialog(false);
  };

  const handleSetDialogProps = (contents, onConfirm) => {
    setDialogProps({ contents, onConfirm });
    setIsOpenConfirmedDialog(true);
  };

  const handleDelete = async () => {
    if (selected.length === 1) {
      await deleteAchievementById(selected[0]);
    } else {
      await deleteAchievements(selected);
    }
    setSelected([]);
    fetchData();
  };

  const handleInputDialogConfirm = async (input) => {
    try {
      if (actionType === "add" && achievements.length < 6) {
        const newAchievement = await createAchievement(input);
        fetchData();
      } else if (actionType === "edit" && selected.length === 1) {
        const updatedAchievement = await updateAchievementById(selected[0], input);
        fetchData();
      }
    } catch (error) {
      console.error("Lỗi khi xử lý thành tựu:", error);
    }
    onClose();
  };

  return (
    <div className="achievements-selection-page">
      {isOpenConfirmedDialog && (
        <ConfirmedDialog
          onClose={onClose}
          onConfirm={async () => {
            try { await dialogProps.onConfirm(); } 
            finally { onClose(); }
          }}
          {...dialogProps.contents}
        />
      )}

      {isOpenInputDialog && (
        <InputDialog
          open={isOpenInputDialog}
          onClose={onClose}
          onConfirm={handleInputDialogConfirm}
          title={actionType === "add" ? "Thêm Thành tựu" : "Chỉnh sửa Thành tựu"}
          defaultValues={actionType === "edit" && selected.length === 1 ? achievements.filter(item => selected.includes(item.achievement_id))[0] : { achievement_name: "", highlight_number: "" }}
        />
      )}

      <Header>Lựa chọn Thành tựu</Header>

      <div className="achievements-container">
        <div className="achievements-toolbars">
          <div className="action-container">
            <AddButton onClick={() => { setActionType("add"); setIsOpenInputDialog(true); }} />
            <EditButton disabled={selected.length != 1} onClick={() => { setActionType("edit"); setIsOpenInputDialog(true); }} />
            <DeleteButton
              disabled={selected.length < 1}
              onClick={() => handleSetDialogProps(contents.delete, handleDelete)}
            />
          </div>
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <hr className='achievement-card-list-division' />

        <AchievementCardList
          achievements={filteredAchievements}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
