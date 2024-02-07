import mongoose from "mongoose";
import { mongoDBURI, dbName } from "../config.js";


export const con = async () => {
    try {
        await mongoose.connect(`${mongoDBURI}/${dbName}`);
        console.log("connection Established!!");
    } catch (error) {
        console.log("Failed to connect", error);
    }
}
