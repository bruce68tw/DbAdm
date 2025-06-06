
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

// 讀取 BuildBundlerMinifier 的設定檔
const config = JSON5.parse(fs.readFileSync('bundleconfig.json', 'utf8'));

function isJs(filePath) {
  return path.extname(filePath).toLowerCase() === '.js';
}

function isCss(filePath) {
  return path.extname(filePath).toLowerCase() === '.css';
}

const tasks = config.map((bundle, index) => {
  const taskName = `bundle:${index}`;

  gulp.task(taskName, function () {
    const destFolder = path.dirname(bundle.outputFileName);
    const baseName = path.basename(bundle.outputFileName);

    return gulp.src(bundle.inputFiles, { allowEmpty: true })
      .pipe(concat(baseName))
      .pipe(gulp.dest(destFolder)) // 輸出未壓縮檔
      .pipe(gulpIf(isJs(bundle.outputFileName), uglify()))
      .pipe(gulpIf(isCss(bundle.outputFileName), cleanCSS()))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(destFolder)); // 輸出壓縮檔
  });

  return taskName;
});

gulp.task('default', gulp.parallel(...tasks));
