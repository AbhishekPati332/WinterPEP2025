const cloudinary = require('cloudinary').v2;
require("dotenv").config();


exports.uploadMultipleImages = async (imageFiles) => {
    try {
        const uploadPromises = imageFiles.map(file => 
            cloudinary.uploader.upload(file.tempFilePath, {
                folder: process.env.CLOUDINARY_FOLDER_NAME // Optional: Set a folder
            })
        );

        const results = await Promise.all(uploadPromises);
        return results.map(res => res.secure_url); // Returns an array of uploaded image URLs
    } catch (error) {
        console.error("Error uploading images:", error);
        return [];
    }
};