var path = require('path');
var pgyer = require('./pgyer')
var cmd = require('./cmd')

var now = new Date().toISOString().replace(/\/|T|:/g, '_').split('.')[0]

var scheme = 'agms_app_new'

var projectName = 'agms_app_new'

var configuration = 'Release'

var project_path = path.resolve(__dirname, '..')

var exportOptionsPlistPath = `${project_path}/ios/ExportOptions.plist`

var workspace_path = `${project_path}/ios/${projectName}.xcworkspace`

var output_path = `${project_path}/ios/build/${projectName}`

var archive_path = `${output_path}/${projectName}_${now}.xcarchive`

var ipa_path = `${output_path}/${projectName}_${now}`

var ipa_full_path = `${output_path}/${projectName}_${now}/${projectName}.ipa`

cmd(`xcodebuild -UseModernBuildSystem=NO -workspace ${workspace_path} -scheme ${scheme} -configuration ${configuration} clean`)
    .then(() => {
        return cmd(`xcodebuild -allowProvisioningUpdates -UseModernBuildSystem=NO -workspace ${workspace_path} -scheme ${scheme} -configuration ${configuration} archive -archivePath ${archive_path}`)
    })
    .then(() => {
        return cmd(`xcodebuild -allowProvisioningUpdates -UseModernBuildSystem=NO -exportArchive -archivePath ${archive_path} -exportPath ${ipa_path} -exportOptionsPlist "${exportOptionsPlistPath}"`)
    })
    .then(() => {
        pgyer.upload(ipa_full_path)
    })
