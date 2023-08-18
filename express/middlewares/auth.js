import jsonwebtoken from "jsonwebtoken";
import { User } from "../../mongodb/models/model.js";

const jwt = jsonwebtoken;

export const auth =  async (req, res, next) => {
    try {
        const token = req.header('Autorizacion').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'palabraClaveSecreta');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }, {password: 0, tokens: 0});

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};