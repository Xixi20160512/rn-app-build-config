var shell = require('shelljs');
var chalk = require('chalk');
var ora = require('ora')

module.exports = function cmd(command, opt={desc: 'exec command', slient: true}) {
    return new Promise(function (resolve, reject) {
        log(`${opt.desc}: ${command}`)
        var spinner = ora(chalk.green(`开始时间: [${new Date().toLocaleTimeString()}]`)).start()
        shell.exec(command, { silent: opt.slient === undefined ? true : opt.slient }, function (code, stdout, stderr) {
            if (code === 0) {
                spinner.text += `  完成时间: [${new Date().toLocaleTimeString()}]`
                spinner.succeed()
                resolve(stdout)
            } else {
                spinner.fail()
                log(stderr)
                shell.exit(code)
            }
        })
    })
}

function log (str, color='green') {
    console.log(`
\n
==================
\n
${chalk[color](str)}
\n
==================
\n
`
    )
}