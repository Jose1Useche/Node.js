import multer from "multer";
import express from "express";

export const multerRouter = new express.Router();

const upload = multer({
    dest: 'images'
});

multerRouter.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});

