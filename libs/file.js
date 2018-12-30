
var fs = require('fs')

function contentReplace(path, matcher, replacement, write = true) {
    let content = fs.readFileSync(path, { encoding: 'utf8' })
    if(content.match(matcher)) {
        let result = content.replace(matcher, '$1' + replacement + '$3')
        if(write) {
            console.log('写配置', path)
            fs.writeFileSync(path, result)
        }
        return result
    } else {
        console.log(path, matcher)
        throw new Error('找不到匹配值！')
    }
}

module.exports = {
    contentReplace
}