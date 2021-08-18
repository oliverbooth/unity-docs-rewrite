const {series, parallel, dest, src} = require("gulp");
const fs = require("fs");
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const cleanCSS = require("gulp-clean-css");
const named = require("vinyl-named");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("node-sass"));
const sourcemaps = require("gulp-sourcemaps");
const typescript = require("gulp-typescript");
const webpack = require("webpack-stream");

const PATHS = {
    source: "src",
    temp: "tmp",
    destination: "dist",
}

const clean_dist_task = () => {
    if (fs.existsSync(PATHS.destination)) {
        return src(PATHS.destination).pipe(clean());
    }
    return src(".");
};

const clean_temp_task = () => {
    if (fs.existsSync(PATHS.temp)) {
        return src(PATHS.temp).pipe(clean());
    }
    return src(".");
};

const css_task = () =>
    src(`${PATHS.source}/css/site.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: ".min"}))
        .pipe(dest(`${PATHS.destination}/css`));

const js_task = () =>
    src(`${PATHS.temp}/js/site.js`)
        .pipe(named())
        .pipe(webpack({devtool: "source-map", output: {filename: "site.min.js"}}))
        .pipe(dest(`${PATHS.destination}/js`));

const ts_task = () => {
    const project = typescript.createProject("tsconfig.json");
    return project.src()
        .pipe(sourcemaps.init())
        .pipe(project())
        .pipe(sourcemaps.write("", {
            debug: false,
            includeContent: true,
            sourceRoot: `${PATHS.src}/ts/`
        }))
        .pipe(dest(`${PATHS.temp}/js`));
};

exports.build = parallel(css_task, series(ts_task, js_task, clean_temp_task));
exports.default = series(clean_dist_task, exports.build);
