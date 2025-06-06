const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

const config = JSON5.parse(fs.readFileSync('bundleconfig.json', 'utf8'));

function isJs(filePath) {
    return path.extname(filePath).toLowerCase() === '.js';
}

function isCss(filePath) {
    return path.extname(filePath).toLowerCase() === '.css';
}

function validateFilesExist(inputFiles) {
    const missingFiles = inputFiles
        .map(f => (f.includes('*') || fs.existsSync(f)) ? null : f)
        .filter(f => f !== null);

    if (missingFiles.length > 0) {
        console.error('以下檔案不存在:');
        console.error(missingFiles.join('\n'));
        return false;
    }
    return true;
}

const tasks = config.map((bundle, index) => {
    const taskName = `bundle:${index}`;

    gulp.task(taskName, function (done) {
        if (!validateFilesExist(bundle.inputFiles)) {
            // 不丟出例外，避免 Gulp 顯示堆疊訊息
            done(); // 任務仍然結束
            return;
        }

        const destFolder = path.dirname(bundle.outputFileName);
        const baseName = path.basename(bundle.outputFileName);

        return gulp.src(bundle.inputFiles, { allowEmpty: false })
            .pipe(concat(baseName))
            .pipe(gulp.dest(destFolder)) // 輸出未壓縮檔
            .pipe(gulpIf(isJs(bundle.outputFileName), uglify()))
            .pipe(gulpIf(isCss(bundle.outputFileName), cleanCSS()))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(destFolder));
    });

    return taskName;
});

gulp.task('default', gulp.parallel(...tasks));
