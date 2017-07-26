require("file-loader?name=index.html!./index.html");

let hello = document.getElementById("hello");
hello.innerHTML = "Hello World!";
