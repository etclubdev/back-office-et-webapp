import React from "react";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";
import katex from "katex";
import "./RichTextEditor.css"

export const RichTextEditor = ({ name, control, setValue, setEditorContent, setUploadImages }) => {
  const handleImageInsert = (files, info, uploadHandler) => {
    const file = files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      uploadHandler({ result: [{ url: imageURL, name: file.name }] });
      setUploadImages((prev) => {
        const isDuplicate = prev.some((item) => item.name === file.name);
        if (!isDuplicate) {
          return [...prev, { file, url: imageURL, name: file.name }];
        }
        return prev;
      });
    }
  };

  const onChange = (e) => {
    setEditorContent(e);
    setValue(name, e);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <SunEditor
            setContents={field.value}
            setOptions={{
              minHeight: 300,
              minWidth: 400,
              buttonList: [
                ["undo", "redo"],
                ["bold", "italic", "underline", "subscript", "superscript"],
                ["font", "fontSize", "formatBlock"],
                ["align", "list", "lineHeight", "horizontalRule"],
                ["image", "link", "table", "math"],
                ["fullScreen", "preview"]
              ],
              katex: katex
            }}
            onImageUploadBefore={handleImageInsert}
            onChange={onChange}
          />
          <FormHelperText error>{fieldState.error?.message}</FormHelperText>
        </>
      )}
    />
  );
}
