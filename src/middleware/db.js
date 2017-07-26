import monk from "monk";
import database from "../../resource/database";

const db = monk(database.url, function (err) {
    if (err) {
        console.error("Db is not connected", err.message);
    }
    console.log("connect successfully....");
});

export default function connectToDatabase(req, res, next) {
    req.db = db;
    next();
};