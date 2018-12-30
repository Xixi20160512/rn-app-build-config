var fs = require('fs')
var request = require('request')
var config = require('./config.json')
var chalk = require('chalk');
var ora = require('ora')
var cmd = require('./cmd')

function upload(path) {
    var fileStream = fs.createReadStream(path)

    var spinner = ora(chalk.green('开始上传应用！')).start()

    cmd('git describe --tags `git rev-list --tags --max-count=1`').then(version => {
        return cmd('git tag -n2 ' + version)
    }).then(message => {
        request.post('https://www.pgyer.com/apiv2/app/upload', {
            formData: {
                _api_key: config.pgyer._api_key,
                file: fileStream,
                buildUpdateDescription: message
            }
        }, function (err, httpResponse, body) {
            spinner.stop()
            if (!err) {
                console.log(chalk.green('success with response: ' + body))
            } else {
                console.log(chalk.red('上传失败'))
            }
        })
        fileStream.on('data', function (data) {
            var blockLength = data.length
            spinner.text = chalk.green('上传中：' + blockLength + 'byte')
        })
    })
}

module.exports = {
    upload: upload
}