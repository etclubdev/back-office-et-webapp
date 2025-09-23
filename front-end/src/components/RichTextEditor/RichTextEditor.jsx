import React from "react";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
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
            setContents={field?.value || ""}
            setOptions={{
              attributesWhitelist: {
                all: "class|style"
              },
              height: 400,
              minHeight: 300,
              maxHeight: 800,
              width: "100%",
              mode: "classic", // inline | balloon | balloon-always
              rtl: false,
              katex: katex,
              codeMirror: {
                src: CodeMirror,
                options: {
                  mode: "htmlmixed",
                  lineNumbers: true,
                  lineWrapping: true,
                },
              },
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                ["paragraphStyle", "blockquote"],
                ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                ["fontColor", "hiliteColor", "textStyle", "removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["table", "link", "image", "video", "audio", "math"],
                ["imageGallery"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["save", "template"],
              ],
              resizingBar: true,
              showPathLabel: true,
              // charCounter: true,
              // maxCharCount: 5000,
              imageUploadUrl: "/api/upload/image", // backend API
              videoUploadUrl: "/api/upload/video",
              audioUploadUrl: "/api/upload/audio",
              imageGalleryUrl: "/api/gallery/images",
              defaultStyle: "font-family: Arial; font-size: 14px;",
              placeholder: "Start writing here...",
              templates: [
                {
                  name: "Code Block",
                  html: `<p><br></p><details>
             <summary>Code (Click here!!)</summary>
             <pre><code>
// Write your code here
             </code></pre>
           </details><p><br></p>`
                }
              ]
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
