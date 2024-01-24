const fs = require("fs/promises");
const path = require("path");

// Assuming you have a 'uploads' directory to store images locally
const uploadDirectory = path.join(__dirname, "uploads");

// Create the 'uploads' directory if it doesn't exist
fs.mkdir(uploadDirectory, { recursive: true });

const storeImageFunction = async (file) => {
  try {
    if (!file) {
      // No file provided, return null or throw an error based on your requirements
      return null;
    }

    // Generate a unique filename to avoid conflicts
    const uniqueFilename = `${Date.now()}-${file.originalname}`;

    // Define the path where the file will be stored
    const filePath = path.join(uploadDirectory, uniqueFilename);

    // Use fs.promises to move the file to the specified path
    await fs.rename(file.path, filePath);

    // Return the URL or path where the image is stored
    return `/uploads/${uniqueFilename}`; // Modify this based on your server setup
  } catch (error) {
    console.error("Error storing image:", error);
    throw error; // Handle the error based on your requirements
  }
};

module.exports = storeImageFunction;
