import multer from "multer";
import express from "express";
import { auth } from "../middlewares/auth.js";
import { User } from "../../mongodb/models/model.js";

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

const uploadImgProfile = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a Photo'));
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

multerRouter.post('/upload/me/avatar', auth, uploadImgProfile.single('uploadAvatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    let avatar = await User.findById("64e3c093460522209f0f865e", { avatar: 1 });
    res.send(avatar);
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

multerRouter.delete('/upload/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

multerRouter.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});