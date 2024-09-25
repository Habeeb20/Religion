// upload.js
import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the timestamp to the original file name
    },
});

// Initialize upload
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 2 }, // Limit files to 2 MB
    fileFilter: (req, file, cb) => {
        // Accept only images
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    },
}).single('profilePicture'); // Name of the file input

export default upload;
