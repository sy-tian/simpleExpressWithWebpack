console.log("....copy");
require("file-loader?name=index.pug!./index.pug");

if (module.hot) {
    module.hot.accept();
}