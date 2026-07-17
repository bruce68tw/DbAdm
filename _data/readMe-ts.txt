安裝第3方 lib 套件：
  npm install -D typescript@6.0.3
  npm install -D @types/jquery@3.5.32 
  npm install -D @types/bootstrap
  npm install -D @types/mustache
  npm install -D @types/jquery.validation
  npm install -D @types/datatables.net
  npm install -D @types/bootstrap-datepicker
  npm install -D chart.js@4.4.1 
  npm install -D dayjs@1.11.21

  npm uninstall typescript@7.0.2

安裝 gulp 工具套件：  
  npm install -D gulp esbuild esbuild-plugin-tsconfig-paths gulp-clean gulp-concat gulp-clean-css gulp-terser gulp-sourcemaps

其他說明：
  npx tsc：編譯全部TS(輸出到 _srcOut)
  gulp：打包
  
