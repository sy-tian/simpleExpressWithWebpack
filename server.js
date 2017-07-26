import path from "path";
import express from "express";
import webpack from "webpack";
import config from "./webpack.config";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const DIST_DIR = path.join(__dirname, "dist"),
    PORT = 3000,
    app = express(),
    compiler = webpack(config);

//Serving the files on the dist folder, for production
// app.use(express.static(DIST_DIR));

//only for development
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

//Send index.html when the user access the web
app.get("*", (req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);