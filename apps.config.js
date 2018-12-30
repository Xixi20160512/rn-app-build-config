var path = require('path')
var bundleIdPrefix = 'com.fpi.agmsnew'
var rootDir = path.resolve(__dirname, '..')

function pgyIOS (id) {
    return [path.join(rootDir, 'ios/agms_app_new/AppDelegate.m'), /(NSString \*pgyAppKey = @")(.*?)(")/, id]
}

function pgyAndroid (id) {
    return [path.join(rootDir, 'android/app/src/main/AndroidManifest.xml'), /(android:name="PGYER_APPID"\n.*?android:value=")(.*?)(")/g, id]
}

function replaceApp (id, name) {
    return [
        [path.join(rootDir, 'ios/agms_app_new.xcodeproj/project.pbxproj'), /(PRODUCT_BUNDLE_IDENTIFIER = )(.*?)(;)/g, id],
        [path.join(rootDir, 'ios/agms_app_new/info.plist'), /(<key>CFBundleDisplayName<\/key>\n.*?<string>)(.*?)(<\/string>)/g, name],
        [path.join(rootDir, 'android/app/build.gradle'), /(applicationId ")(.*?)(")/g, id],
        [path.join(rootDir, 'android/app/src/main/res/values/strings.xml'), /(<string name="app_name">)(.*?)(<\/string>)/, name],
    ]
}

function replaceConfig (key) {
    return [path.join(rootDir, 'src/assets/config.js'), /(let project = ")(.*?)(")/, key]
}

const apps = {
    'dev': {
        name: '测试环境',
        pgysdkIOS: 'pgyersdkios-key',
        pgysdkAndroid: 'pgyersdkandroid-key'
    }
}

let appsConfig = []

for (const key in apps) {
    let value = apps[key]
    appsConfig.push({
        name: apps[key].name,
        key,
        replaceConfig: [
            {
                label: 'ios 蒲公英key',
                params: pgyIOS(value.pgysdkIOS),
            },
            {
                label: 'android 蒲公英key',
                params: pgyAndroid(value.pgysdkAndroid),
            },
            {
                label: 'app bundle id 和 appName',
                params: replaceApp(`${bundleIdPrefix}.${key}`, value.name)
            },
            {
                label: 'config 替换项目',
                params: replaceConfig(key)
            }
        ]
    })
}

module.exports = appsConfig
