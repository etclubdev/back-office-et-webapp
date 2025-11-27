import { UPLOAD_PRESET, CLOUD_NAME } from "../config/cloudinary";

const handleUploadToCloud = async ({ isContent, preview, editorContent, setEditorContent, uploadImages, setUploadImages }) => {
    if (isContent) {
        if (uploadImages.length === 0) {
            return;
        }

        const uploadedUrls = [];

        for (const img of uploadImages) {
            const data = new FormData();
            data.append("file", img.file);
            data.append("upload_preset", UPLOAD_PRESET);
            data.append("cloud_name", CLOUD_NAME);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await res.json();
            uploadedUrls.push(result.secure_url);
        }

        let newContent = editorContent;
        uploadImages.forEach((img, index) => {
            newContent = newContent.replace(img.url, uploadedUrls[index]);
        });

        setEditorContent(newContent);
        setUploadImages([]);

        return newContent;
    } else {
        if (!preview && !preview?.startsWith("http")) return;
        const data = new FormData();
        data.append("file", preview);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("cloud_name", CLOUD_NAME);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: data,
            }
        );

        const result = await res.json();
        return result.secure_url;
    }
};

export const handleImageUpload= async (imageUrl, field, preview, setPreview, setValue) => {
        let url = imageUrl;
        if (url && url.startsWith("blob")) {
            url = await handleUploadToCloud({preview});
            setPreview(url);
            setValue(field, url);
        }
        return url;


}

export const handleRichTextUpload = async (editorContent, setEditorContent, uploadImages, setUploadImages) => {
    const content = await handleUploadToCloud({
        isContent: true,
        editorContent,
        setEditorContent,
        uploadImages,
        setUploadImages
    });
    return content;
}