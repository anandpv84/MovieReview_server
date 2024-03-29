// const multer =require('multer')


// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './uploads')
//     },
//     filename: (req, file, callback) => {
//         const filename = `image-${Date.now()}-${file.originalname}`
//         callback(null, filename)
//     }
// })

// const fileFilter = (req, file, callback) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeng' || file.mimetype === 'image/jpeg') {
//         callback(null, true)
//     }
//     else {
//         callback(null, false)
//         return callback(new ErrorEvent("only png, jpeg, jpg files are alllowed"))
//     }
// }


// const multerConfig = multer({
//     storage,
//     fileFilter
// })

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        // It's better to pass the error as the first argument in the callback for consistency with Node.js conventions
        callback(new Error("Only PNG, JPEG, and JPG files are allowed"), false);
    }
};

const multerConfig = multer({
    storage: storage,
    fileFilter: fileFilter,
   
});

module.exports = multerConfig;
