// import 'dotenv/config';
import { config } from "dotenv";

config({ path: "../../config/.env" })

console.log('dotenv: ', process.env.PRIVATE_KEY)   