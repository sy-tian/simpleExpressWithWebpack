import path from "path";

export default function FileFinder(compiler, fileName, distDir) {
    const filename = path.join(distDir, fileName);

    console.log("get path...", filename);

    let a = compiler.outputFileSystem.readFile(filename, "utf8", (err, result) => {
        if (err) {
            console.log("error...", err);
        }
        return result;
    });
    console.log("................", a);
};