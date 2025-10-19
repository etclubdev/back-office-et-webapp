import { useEffect, useState, useCallback } from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from '@mui/icons-material/Close';
import { getApplicationById, updateApplicationNote } from "../../../api/application.service";
import BaseButton from "../../../components/Buttons/BaseButton";
import "./RecordDialog.css";

import dayjs from 'dayjs';

export const RecordDialog = ({ setOpenedRecord, id }) => {
    const [application, setApplication] = useState(null);
    const [note, setNote] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            if (id) {
                const { data } = await getApplicationById(id);
                setApplication(data);
                data.note && setNote(data.note);
            }
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onChange = (e) => {
        setNote(e.target.value);
    }

    const onSubmit = async() => {
        try {
            setIsDisabled(true);
            const app = await updateApplicationNote(id, note);
            setIsDisabled(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (!application) {
        return (
            <div className="record-modal-overlay" onClick={() => setOpenedRecord("")}>
                <div
                    className="record-modal-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="record-modal-overlay" onClick={() => setOpenedRecord("")}>
            <div
                className="record-modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <CloseIcon
                    className="exit-icon"
                    onClick={() => setOpenedRecord("")}
                />
                <p className="record-header">Thông tin ứng viên</p>
                <div className="record-info-container">
                    <TextField
                        label="Họ tên"
                        value={application.full_name || ""}
                        InputProps={{
                            readOnly: true,
                        }}
                        size="small"
                        fullWidth
                    />
                    <div className="record-info-container small">
                        <TextField
                            label="Giới tính"
                            value={application.gender || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Ngày sinh"
                            value={dayjs(application.dob).format("DD-MM-YYYY") || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />
                    </div>
                    <div className="record-info-container small">
                        <TextField
                            label="SĐT"
                            value={application.phone_number || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="MSSV"
                            value={application.student_id || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />
                    </div>
                    <TextField
                        label="Email"
                        value={application.email || ""}
                        InputProps={{
                            readOnly: true,
                        }}
                        size="small"
                        fullWidth
                    />

                    <TextField
                        label="Trường"
                        value={application.university || ""}
                        InputProps={{
                            readOnly: true,
                        }}
                        size="small"
                        fullWidth
                    />

                    <TextField
                        label="Khoa"
                        value={application.faculty || ""}
                        InputProps={{
                            readOnly: true,
                        }}
                        size="small"
                        fullWidth
                    />

                    <div className="record-info-container small">
                        <TextField
                            label="Ngành"
                            value={application.major || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />

                        <TextField
                            label="Lớp"
                            value={application.class || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />
                    </div>

                    <div className="record-info-container small">
                        <TextField
                            label="Ban ứng tuyển"
                            value={application.department_name || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />

                        <TextField
                            label="Ngày nộp đơn"
                            value={application.apply_date || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />
                    </div>
                    <div className="record-info-container small">
                        <TextField
                            label="Vòng"
                            value={application.round || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />

                        <TextField
                            label="Trạng thái ứng tuyển"
                            value={application.application_status || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />
                    </div>
                    <div className="record-info-container small">
                        <TextField
                            label="Dạng CV ứng tuyển"
                            value={application.cv_type || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            fullWidth
                        />

                        <TextField
                            label="Link CV"
                            value={application.cv_link || ""}
                            size="small"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                endAdornment: application.cv_link && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            component="a"
                                            href={application.cv_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <TextField
                        label="Ghi chú"
                        value={note || ""}
                        size="small"
                        fullWidth
                        onChange={onChange}
                    />
                </div>
                <div className="button-container" onClick={onSubmit} disabled={isDisabled}>
                    <BaseButton>Lưu</BaseButton>
                </div>
            </div>
        </div>
    );
};
