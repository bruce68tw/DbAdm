const gulp = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
//const uglify = require("gulp-uglify");
//const rename = require("gulp-rename");
const esbuild = require("esbuild");
const fs = require("fs");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const path = require("path");
//const tsconfigPaths = require("esbuild-plugin-tsconfig-paths");

const dirSrc = "_src/";
//const dirSrc = `${dirSrc}_src/`;

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
        entryPoints: [`${dirSrc}forBoth.ts`],
        //temp minify to false
        minify: false,
        //minify: true,
        bundle: true,   //重要!! merged to base.min.js
        sourcemap: true,
        treeShaking: false, //true會清空未使用類別
        outfile: "wwwroot/base.min.js",
        //format: "iife",
        format: "esm",
        platform: "browser",
        target: ["es2019"],
        //tsconfig: "./tsconfig.json"
        //plugins: [tsconfigPaths()]
    });
}

// tsView to w3/jsView
async function doTsView() {
    const dir = `${dirSrc}tsView`
    //const src = "_src/tsView";
    const files = fs.readdirSync(dir)
        .filter(x => x.endsWith(".ts"));

    for (const file of files) {
        const name = path.basename(file, ".ts");
        await esbuild.build({
            entryPoints: [`${dir}/${file}`],
            //temp minify to false
            minify: false,
            //minify: true,
            bundle: false,  //重要!! (false)single file, 如果true會merge base
            treeShaking: false,
            sourcemap: true,
            outfile: `wwwroot/jsView/${name}.min.js`,
            format: "esm",	//重要!!
            //format: "iife",
            platform: "browser",
            target: ["es2019"],
            //alias: { "@base": "./_src/tsBase" },
            //tsconfig: "./tsconfig.json"
            //plugins: [tsconfigPaths()]
        });
    }
}

// jsLib to w3/lib.min.js
function doJsLib() {
    //JS 順序很重要
    const dir = `${dirSrc}jsLib/`;
    return gulp.src([
            `${dir}jquery-3.7.1.js`,
            `${dir}bootstrap.bundle-5.2.3.js`,
            `${dir}bootstrap-datepicker-1.9.js`,
            `${dir}datatables-2.3.2.js`,
            `${dir}jquery.validate-1.19.3-bruce.js`,
            `${dir}jquery.pjax-2.0.1-bruce.js`,
            `${dir}moment-2.30.1.js`,
            `${dir}mustache-3.1.js`,
            `${dir}chart-4.4.1.js`
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
    const dir = `${dirSrc}cssLib/`;
    return gulp.src([
        `${dir}bootstrap-5.2.3.css`,
        `${dir}datatables-2.3.2.css`,
        `${dir}bootstrap-datepicker-1.9.css`,
        //`${dir}summernote-bs5.css`,
        `${dir}icomoon.css`
        ])
        .pipe(concat("lib.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("wwwroot"));
}

// copy locale to w3/locale
function zz_doLocale() {
    return gulp.src(`${dirSrc}locale/**/*`)
        .pipe(gulp.dest("wwwroot/locale"));
}

// locale to w3/locale/zh-TW.js...(不必壓縮)
function doLang(lang) {
    const dir = `wwwroot/locale`;
    return function () {
        return gulp.src(`${dir}/${lang}/*.js`)
            .pipe(concat(`${lang}.min.js`))
            .pipe(terser())
            .pipe(gulp.dest(dir));
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
        //doLocale,
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
//exports.locale = doLocale;
exports.build = build;
exports.watch =
    gulp.series(
        build,
        watch
    );
exports.default = build;