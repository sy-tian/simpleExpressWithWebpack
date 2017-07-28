import path from "path";
import express from "express";
import webpack from "webpack";
import config from "./webpack.config";
import connectToDatabase from "./src/middleware/db";
import fileFinder from "./src/utils/fileFinder";
import pug from "pug";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const PORT = 3000,
    app = express(),
    DIST_DIR = path.join(__dirname, "dist"),
    compiler = webpack(config);

app.use(connectToDatabase);

//Serving the files on the dist folder, for production
// app.use(express.static(DIST_DIR));

app.set("view engine", "pug");
app.set('views', DIST_DIR);

//only for development
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    index: "./src/index.pug"
}));

app.use(webpackHotMiddleware(compiler));

app.get("/", (req, res) => {
    console.log("get request....");
    let db = req.db;
    let userCollection = db.get('usercollection');
    // const result = fileFinder(compiler, "index.pug", DIST_DIR);
    let filename = path.join(DIST_DIR, "index.pug");
    // console.log("result....", result);
    console.log("...path", compiler.options.output.path);
    console.log("...path", compiler.options.output.filename);
    compiler.outputFileSystem.readFile(filename, "utf8", function (err, result) {
        if (err) {
            return next(err);
        }
        console.log("result....", result);
        res.set('content-type', 'text/html');
        // res.send(result);
        console.log(pug.render(result, {a: "All users"}));
        res.send(pug.render(result));
        res.end();
    });
    // userCollection.find({}, {}, function (e, doc) {
    //     // res.send(result);
    //     // res.render(fileName, {title: "All Users", content: doc});
    //     res.set('content-type', 'text/html');
    //     res.send(result);
    //     res.end();
    // });
});

app.listen(PORT);