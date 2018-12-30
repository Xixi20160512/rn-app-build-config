var cmd = require('./cmd')
var path = require('path');
var pgyer = require('./pgyer')

cmd(`cd ${path.resolve(__dirname, '../android')} && ./gradlew assembleRelease`, { desc: '编译android' }).then(() => {
    pgyer.upload(path.resolve(__dirname, '../android/app/build/outputs/apk/release/app-release.apk'))
})