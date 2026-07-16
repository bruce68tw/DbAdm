BaseTs 安裝 js 套件：
  npm install -D typescript 
  npm install -D @types/jquery@3.5.32 
  npm install -D @types/bootstrap
  npm install -D @types/mustache
  npm install -D @types/jquery.validation
  npm install -D @types/datatables.net
  npm install -D @types/bootstrap-datepicker
  npm install -D chart.js@4.4.1 
  npm install -D dayjs@1.11.21
  
  //npm install -D bootstrap-datepicker@1.9.0
  //npm install -D jquery-pjax@2.0.1
  //npm install -D bootstrap@5.2.3
  //npm install -D mustache@3.1.0
  //npm install -D moment@2.30.1 

引用 BaseTs 的專案:
  安裝 js 套件:
    npm install -D gulp esbuild esbuild-plugin-tsconfig-paths gulp-clean gulp-concat gulp-clean-css gulp-terser gulp-sourcemaps
    //npm uninstall lgulp-uglify gulp-rename
    //npm install -D gulp-rename
    npm install -D esbuild-plugin-tsconfig-paths

  建立 js & copy css, lib:
    gulp

其他說明：
  1.npx tsc 編譯生成 js到指定目錄 (for 檢查ts)
  
