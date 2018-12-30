let path = require('path')
let appsConfig = require('./apps.config')
let cmd = require('./cmd')
let file = require('./libs/file')
let platform = process.argv[2]
let buildAppskey = process.argv.slice(3)

let index = 0

const apps = buildAppskey.length !== 0 ? appsConfig.filter(app => buildAppskey.indexOf(app.key) !== -1) : appsConfig

function build (index) {
    let app = apps[index]
    if(!app) return false
    console.log(`开始构建：${app.name}-${platform}`)

    app.replaceConfig.forEach(({ label, params }) => {
        console.log('替换', label)
        if(Array.isArray(params[0])) {
            params.forEach(param => {
                replace(param)
            })
        } else {
            replace(params)
        }
        console.log('完成')
    })

    cmd(`node ${path.resolve(__dirname, `./build.${platform}.js`)}`, { slient: false }).then(() => {
        index++
        build(index)
    })
}

function replace (params) {
    let [ path, replace, replacement ] = params
    let p = path.match(/(ios|android)/)
    if(p && p[0] !== platform) {
        console.log(`不属于${platform}的配置,跳过`)
        return false
    }
    file.contentReplace(path, replace, replacement)
}

build(index)