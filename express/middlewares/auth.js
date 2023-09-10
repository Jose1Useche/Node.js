import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../../mongodb/models/model.js";

config({ path: "../../config/.env" });

const jwt = jsonwebtoken;

export const auth =  async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }, {password: 0, tokens: 0});
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};