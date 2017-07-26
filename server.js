import express from "express";
import webpack from "webpack";
import config from "./webpack.config";
import connectToDatabase from "./src/middleware/db";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const PORT = 3000,
    app = express(),
    compiler = webpack(config);

app.use(connectToDatabase);

//Serving the files on the dist folder, for production
// app.use(express.static(DIST_DIR));

//only for development
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get("/", (req, res) => {
    let db = req.db;
    let userCollection = db.get('usercollection');
    userCollection.find({}, {}, function (e, doc) {
        res.send(doc);
    });
});

app.listen(PORT);