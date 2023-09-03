import multer from "multer";
import express from "express";

export const multerRouter = new express.Router();

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // if(!file.originalname.endsWith('.pdf')) {
        //     return cb(new Error('Please upload a PDF'));
        // }

        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'));
        }

        cb(undefined, true);
    }
});

// const myMiddleware = () => {
//     throw new Error('Error from middleware');
// }

multerRouter.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

