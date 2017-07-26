import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import * as config from "webpack.config";


const DIST_DIR = path.join(__dirname, "dist"),
    PORT = 8080,
    app = express(),
    compiler = webpack(config);
;

const server = new webpackDevServer(compiler, {
    stats: {
        colors: true
    }
});

server.listen(8080, "127.0.0.1", function() {
    console.log("Starting server on http://localhost:8080");
});

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);