import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldController } from "../TextFieldController";
import { achievementSchema } from "../../schemas/achievementSchema";

import "./InputDialog.css";

export const InputDialog = ({ open, onClose, onConfirm, title, defaultValues = { achievement_name: "", highlight_number: "", visible: true } }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(achievementSchema),
  });

  const onSubmit = async (data) => {
    await onConfirm(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} disableEnforceFocus>
      <DialogTitle><strong>{title}</strong></DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="input-dialog-content">
            <TextFieldController 
              name={"achievement_name"}
              control={control}
              label={"Tên thành tựu"}
              errors={errors}
            />
            <TextFieldController 
              name={"highlight_number"}
              control={control}
              label={"Thành tích"}
              errors={errors}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" sx={{ backgroundColor: "#E0E0E0", color: "#000", "&:hover": { backgroundColor: "#7E7E7E" } }}>
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
