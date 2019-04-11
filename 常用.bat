rem 调试项目
ionic serve
rem 编译项目
ionic cordova platforms add android
ionic cordova build android 
ionic cordova build android --release --prod

rem 初始化
npm install
npm install node-sass --unsafe-perm
ionic cordova plugin add cordova-plugin-file-transfer
npm install @ionic-native/file-transfer
ionic cordova plugin add cordova-sqlite-storage
npm install @ionic-native/sqlite
ionic cordova plugin add cordova-plugin-advanced-http
npm install @ionic-native/http