import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useAuth } from '../../../context/useAuth';

import { Header } from '../../../components/Header';
import ExportButton from '../../../components/Buttons/ExportButton';
import ApproveButton from '../../../components/Buttons/ApproveButton';
import ArchiveButton from "../../../components/Buttons/ArchiveButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import RestoreButton from '../../../components/Buttons/RestoreButton';

import { SearchBar } from "../../../components/SearchBar";
import { DataTable } from "../../../components/DataTable";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { Tabs } from '../../../components/Tabs';
import { RecordDialog } from '../RecordDialog';
// import { CircularLoading } from '../../../components/CircularLoading';

import { getApplicationById, getAllApplications, approveApplication, rejectApplication, restoreApplication, deleteApplications, exportApplications } from '../../../api/application.service';

import { Filter } from '../../../components/Filter';
import { filterChipData } from '../../../constants';
import { confirmContents } from '../../../constants';

import './CollaboratorsManagementPage.css';

const columns = [
  { field: 'full_name', headerName: 'Họ và tên' },
  { field: 'email', headerName: 'Email' },
  { field: 'phone_number', headerName: 'SĐT' },
  { field: 'department_name', headerName: 'Ban ứng tuyển' },
  { field: 'gender', headerName: 'Giới tính' },
  { field: 'cohort_name', headerName: 'Khóa đào tạo' },
  { field: 'cv_link', headerName: 'Link CV' },
];

const categories = ['Vòng 1 - CV', 'Vòng 2 - Teamwork', 'Vòng 3 - Phỏng vấn', 'Kết quả'];

const { approve, approveLastRound, archive, deleteMsg, restore } = confirmContents.collaborators;

export const CollaboratorsManagementPage = ({ isApprovingPage }) => {
  const { user } = useAuth();
  const isAdministator = user?.sysrole_name === 'Administrator';

  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [isOpenConfirmedDialog, setIsOpenConfirmedDialog] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [dialogProps, setDialogProps] = useState({
    contents: {
      title: "",
      desc: "",
      Icon: null,
      alertType: ""
    },
    onConfirm: () => { }
  });

  const [openedRecord, setOpenedRecord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cacheRef = useRef({});

  const fetchData = useCallback(async () => {
    const key = `${isApprovingPage}-${activeTab}-${selectedChips.join(",")}`;
    if (cacheRef.current[key]) {
      setApplications(cacheRef.current[key]);
      return;
    }

    try {
      let data;
      if (activeTab === 3) {
        const res = await getAllApplications({
          round: activeTab,
          department_name: selectedChips,
          status: "Approved"
        })
        data = res.data;
      } else {
        const res = isApprovingPage
          ? await getAllApplications({
            round: activeTab + 1,
            department_name: selectedChips,
            status: "Pending"
          })
          : await getAllApplications({
            department_name: selectedChips,
            status: "Rejected"
          });
        data = res.data;
      }
      cacheRef.current[key] = data;
      setApplications(data);

      console.log(data);
      
    } catch (err) {
      console.error("Fetch error:", err);
      setApplications([]);
    }
  }, [activeTab, selectedChips, isApprovingPage]);

  useEffect(() => {
    cacheRef.current = {}; // clear cache when switching page
  }, [isApprovingPage]);

  // Debounce API calls when switching tabs or filters
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(timeout);
  }, [fetchData]);

  // Derive filtered applications from search term
  const filteredApplications = useMemo(() => {
    if (!searchTerm.trim()) return applications;

    const lowered = searchTerm.toLowerCase();
    return applications.filter(item =>
      [item.full_name, item.email, item.phone_number, item.department_name]
        .some(field => field?.toLowerCase().includes(lowered))
    );
  }, [applications, searchTerm]);

  const handleSearch = useCallback((query) => {
    setSearchTerm(query);
  }, []);

  const handleConfirmDialog = async () => {
    try {
      setIsLoading(true);
      await dialogProps.onConfirm();
      onClose();
    } catch (error) {
      console.error("Error deleting application:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => setIsOpenConfirmedDialog(false);

  const handleDataAfterActions = async () => {
    cacheRef.current = {};
    await fetchData();
    setSelected([]);
  }

  const handleSetDialogProps = (contents, onConfirm) => {
    setDialogProps({ contents, onConfirm });
    setIsOpenConfirmedDialog(true);
  }

  const handleExport = async () => {
    try {
      isApprovingPage
        ? await exportApplications({
          round: activeTab + 1,
          department_name: selectedChips,
          status: "Pending"
        })
        : await exportApplications({
          department_name: selectedChips,
          status: "Rejected"
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`collaborators-overview-page ${isApprovingPage && "approving-page"}`}>
      {/* {isLoading && <CircularLoading />} */}
      {
        openedRecord != "" && (
          <RecordDialog
            setOpenedRecord={setOpenedRecord}
            id={openedRecord}
          />
        )
      }

      {isOpenConfirmedDialog && (
        <ConfirmedDialog
          onClose={onClose}
          onConfirm={handleConfirmDialog}
          isLoading={isLoading}
          {...dialogProps.contents}
        />
      )}

      <Header>{isApprovingPage ? "Phê duyệt" : "Lưu trữ"}</Header>

      <div className="collaborators-container">
        {isApprovingPage && (
          <Tabs
            categories={categories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        <div className="collaborators-toolbars">
          {isApprovingPage ? (
            <ApprovingToolBar
              handleDataAfterActions={handleDataAfterActions}
              selected={selected}
              handleSetDialogProps={handleSetDialogProps}
              activeTab={activeTab}
              handleExport={handleExport}
              setIsLoading={setIsLoading}
            />
          ) : (
            <ArchivingToolBar
              isAdministator={isAdministator}
              handleDataAfterActions={handleDataAfterActions}
              selected={selected}
              handleSetDialogProps={handleSetDialogProps}
              handleExport={handleExport}
              setIsLoading={setIsLoading}
            />
          )}
          <div className="search-container">
            {isAdministator && <Filter chipdata={filterChipData.collaborators} setSelectedChips={setSelectedChips} />}
            <SearchBar onSearch={handleSearch} value={searchTerm} />
          </div>
        </div>

        <hr className="collaborators-division" />

        <DataTable
          data={filteredApplications}
          columns={columns}
          itemId="application_id"
          selected={selected}
          setSelected={setSelected}
          setOpenedRecord={setOpenedRecord}
        />
      </div>
    </div>
  );
};

const ApprovingToolBar = ({ handleDataAfterActions, selected, handleSetDialogProps, activeTab, handleExport, setIsLoading }) => {
  const handleApprove = async () => {
    try {
      await approveApplication(selected, activeTab + 1);
      await handleDataAfterActions();
    } catch (error) {
      console.log(error);
    }
  }

  const handleReject = async () => {
    try {
      await rejectApplication(selected);
      await handleDataAfterActions();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="action-container">
      <ExportButton onClick={handleExport} />
      <ApproveButton disabled={selected.length < 1} onClick={() => { handleSetDialogProps(activeTab + 1 === 3 ? approveLastRound : approve, handleApprove) }} />
      <ArchiveButton disabled={selected.length < 1} onClick={() => { handleSetDialogProps(archive, handleReject) }} />
    </div>
  )
}

const ArchivingToolBar = ({ isAdministator, handleDataAfterActions, selected, handleSetDialogProps, handleExport, setIsLoading }) => {
  const handleRestore = async () => {
    try {
      await restoreApplication(selected);
      await handleDataAfterActions();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteApplications(selected);
      await handleDataAfterActions();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="action-container">
      <ExportButton onClick={handleExport} />
      <RestoreButton disabled={selected.length < 1} onClick={() => { handleSetDialogProps(restore, handleRestore) }} />
      <DeleteButton color="#D32F2F"
        disabled={!isAdministator || selected.length < 1}
        onClick={() => { handleSetDialogProps(deleteMsg, handleDelete) }}
      />
    </div>
  )
}
