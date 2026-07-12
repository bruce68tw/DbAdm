const gulp = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const esbuild = require("esbuild");
const fs = require("fs");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const path = require("path");

const dirBase = "../Base/BaseTs/";
const dirSrc = `${dirBase}_src/`;

// Clean
function cleanTask() {
    return gulp.src([
        "wwwroot/base.min.js",
        "wwwroot/lib.min.js",
        "wwwroot/base.min.css",
        "wwwroot/lib.min.css"
    ], {
        read: false,
        allowEmpty: true
    })
        .pipe(clean());
}

// tsBase to w3/base.min.js
async function doTsBase() {
    await esbuild.build({
        entryPoints: [`${dirBase}index.ts`],
        bundle: true,
        minify: true,
        sourcemap: true,
        outfile: "wwwroot/base.min.js",
        format: "iife",
        target: ["es2018"]
    });
}

// tsView to w3/jsView
async function doTsView() {
    const src = "_src/tsView";
    const files = fs.readdirSync(src)
        .filter(x => x.endsWith(".ts"));

    for (const file of files) {
        const name = path.basename(file, ".ts");
        await esbuild.build({
            entryPoints: [`${src}/${file}`],
            //temp remark
            //bundle: true,
            //minify: true,
            bundle: false,
            minify: false,
            sourcemap: true,
            outfile: `wwwroot/jsView/${name}.js`,
            //format: "esm",
            format: "iife",
            target: ["es2018"]
        });
    }
}

// jsLib to w3/lib.min.js
function doJsLib() {
    //JS 順序很重要
    const dirLib = `${dirSrc}jsLib/`;
    return gulp.src([
            `${dirLib}jquery-3.7.1.js`,
            `${dirLib}bootstrap.bundle-5.2.3.js`,
            `${dirLib}bootstrap-datepicker-1.9.js`,
            `${dirLib}datatables-2.3.2.js`,
            `${dirLib}jquery.validate-1.19.3-bruce.js`,
            `${dirLib}jquery.pjax-2.0.1-bruce.js`,
            `${dirLib}moment-2.30.1.js`,
            `${dirLib}mustache-3.1.js`,
            `${dirLib}chart-4.4.1.js`
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("lib.min.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("wwwroot"));
}

// cssBase to w3/base.min.css
function doCssBase() {
    return gulp.src(`${dirSrc}cssBase/*.css`)
        .pipe(sourcemaps.init())
        .pipe(concat("base.min.css"))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("wwwroot"));
}

// cssLib to w3/lib.min.css
function doCssLib() {
    const dirLib = `${dirSrc}cssLib/`;
    return gulp.src([
        `${dirLib}bootstrap-5.2.3.css`,
        `${dirLib}datatables-2.3.2.css`,
        `${dirLib}bootstrap-datepicker-1.9.css`,
        //`${dirLib}summernote-bs5.css`,
        `${dirLib}icomoon.css`
        ])
        .pipe(concat("lib.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("wwwroot"));
}

// copy locale to w3/locale
function doLocale() {
    return gulp.src(`${dirSrc}locale/**/*`)
        .pipe(gulp.dest("wwwroot/locale"));
}

// locale to w3/locale/zh-TW.js...(不必壓縮)
function doLang(lang) {
    return function () {
        return gulp.src(`${dirSrc}locale/${lang}/*.js`)
            .pipe(concat(`${lang}.min.js`))
            .pipe(terser())
            .pipe(gulp.dest("wwwroot/locale"));
    };
}

// icomoon.ttf 會損壞, 改用 package.json
// copy font to w3/font
function zz_doFont() {
    return gulp.src(`${dirSrc}font/**/*`)
        .pipe(gulp.dest("wwwroot/font"));
}

// Watch
function watch() {
    gulp.watch(
        ["_src/tsView/*.ts"],
        doTsView
    );
}

// Build
const build =
    gulp.series(
        cleanTask,
        doTsBase,
        doTsView,
        doJsLib,
        doCssBase,
        doCssLib,
        doLocale,
        doLang('zh-TW'),
        doLang('zh-CN'),
        doLang('en-US'),
        //doFont
    );

// Export
exports.clean = cleanTask;
exports.tsBase = doTsBase;
exports.tsView = doTsView;
exports.cssBase = doCssBase;
exports.locale = doLocale;
exports.build = build;
exports.watch =
    gulp.series(
        build,
        watch
    );
exports.default = build;