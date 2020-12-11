const fsExt = require('fs-extra')
const path = require('path')

// 声明配置文件内容
const jsonConfig = {
  "name": 'fe-cli',
  "mirror": "https://github.com/lexmin0412/fe-cli/tree/master/templates"
}

// 拼接config.json完整路径
const configPath = path.resolve(__dirname, './../config.json')

async function defConfig() {
  try {
    await fsExt.outputJson(configPath, jsonConfig)
  } catch (err) {
    console.error(err)
    process.exit()
  }
}

module.exports = defConfig