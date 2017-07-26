import path from "path";
import webpack from "webpack";

const DIST_DIR = path.join(__dirname, "dist"),
    CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
    context: CLIENT_DIR,
    entry: [
        "webpack-hot-middleware/client",
        "./main"
    ],
    output: {
        path: DIST_DIR,
        publicPath: "/",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};