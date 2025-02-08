// utils/cloudinary.js
export const uploadImagesToCloudinary = async (
  files,
  cloudName,
  uploadPreset
) => {
  const uploadedUrls = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      uploadedUrls.push(data.secure_url); // Save the image URL from Cloudinary
    }
  }
  return uploadedUrls;
};
