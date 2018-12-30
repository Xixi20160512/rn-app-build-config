## 一些说明
应用托管平台使用的是[蒲公英](pgyer.com)。

框架版本：
- react-native: 0.55.3
- react: 16.3.2

需要安装的第三方依赖：
- shelljs
- chalk
- ora

### 使用方式
将代码克隆到项目目录。我是使用的 deploy 文件夹管理构建脚本。
```
git clone git@github.com:Xixi20160512/rn-app-build-config.git <rnproject-root>/deploy
```

更改配置项

- apps.config.js
```
const apps = {
    //appkey，在执行打包命令的时候会用到
    'dev': {
        name: '测试环境',
        pgysdkIOS: 'pgyersdkios-key', //替换ioskey
        pgysdkAndroid: 'pgyersdkandroid-key' //替换androidkey
    }
}
```
- config.json
```
{
    "pgyer": {
        "_api_key": "pgyer-apikey" //替换成 pgyer 的 api_key，用于上传接口的调用
    }
}
```

安装需要的依赖

```
yarn add -D shelljs ora chalk
```

然后在项目根目录执行:

```
node deploy android dev
```

即可开始打包
