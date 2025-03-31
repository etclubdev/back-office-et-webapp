import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function RichTextEditor({ setEditorContent, setUploadImages }) {
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

  return (

    <SunEditor
      setOptions={{
        height: 300,
        minWidth: 400,
        buttonList: [["image"]],
      }}
      onImageUploadBefore={handleImageInsert}
      onChange={setEditorContent}
    />

  );
}
