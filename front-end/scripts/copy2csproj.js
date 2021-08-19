const fs = require("fs-extra");

fs.copy("dist", "../UnityDocs/wwwroot", { overwrite: true }, (err => {
    if (err) return console.error(err);
    console.log("Copied successfully");
}));
