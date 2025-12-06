import { Box, Typography, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./ImageUploadController.css";
import { MAX_MB_IMAGE_UPLOAD } from '../../config/cloudinary';

export const ImageUploadController = ({ name, control, preview, setPreview, setValue, setError, maxMBImageUpload = MAX_MB_IMAGE_UPLOAD }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <div className="image-upload-container">
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            Tải ảnh <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Box
                            className="image-upload-box"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/jpeg, image/png"
                                style={{ display: "none" }}
                                onChange={(event) => {
                                    const file = event.target.files[0];

                                    const MAX_SIZE = maxMBImageUpload * 1024 * 1024;

                                    if (file.size > MAX_SIZE) {
                                        setError(name, {
                                            type: "manual",
                                            message: `Vui lòng chọn hình ảnh có dung lượng <= ${maxMBImageUpload}MB`,
                                        });
                                        return;
                                    }

                                    if (file) {
                                        setPreview(file);
                                        setValue(name, URL.createObjectURL(file));
                                    }
                                }}
                            />
                            {(preview || field.value) ? (
                                <img
                                    className="thumbnail-img"
                                    src={
                                        preview
                                            ? preview instanceof File
                                                ? URL.createObjectURL(preview)
                                                : preview
                                            : field.value
                                    }
                                    alt="Preview"
                                    style={{ width: "100%", borderRadius: "4px" }}
                                />
                            ) : (
                                <>
                                    <CloudUploadIcon fontSize="large" color="disabled" />
                                    <Typography color="primary" fontWeight="bold">
                                        Click to upload
                                    </Typography>
                                    <Typography color="textSecondary">or drag and drop</Typography>
                                    <Typography color="textSecondary" fontSize="12px">
                                        JPG, JPEG, PNG
                                    </Typography>
                                </>
                            )}
                        </Box>
                        <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                    </div>
                </>
            )}
        />

    );
};
