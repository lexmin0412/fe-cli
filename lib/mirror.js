const symbols = require('log-symbols')
const fsExt = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const defConfig = require('./config')
const cfgPath = path.resolve(__dirname, './../config.json')

// 设置镜像地址
async function setMirror(link) {
  // 判断config.json是否存在
  const exists = await fsExt.pathExists(cfgPath)
  console.log('存在吗', exists)
  if ( exists ) {
    // 存在时直接写入配置
    mirrorAction(link)
  } else {
    // 不存在时先初始化然后写入配置
    await defConfig()
    mirrorAction(link)
  }
}

async function mirrorAction(link) {
  try {
    // 读取config.json文件
    const jsonConfig = await fsExt.readJson(cfgPath)
    // 将传进来的link参数写入config文件
    jsonConfig.mirror = link
    // 然后写入config文件
    fsExt.writeJson(cfgPath, jsonConfig)
    // 等待写入成功后提示成功
    console.log(symbols.success, 'set mirror successful.')
  } catch (error) {
    // 如果报错，提示
    console.log(symbols.error, chalk.red(`Set the mirror failed. ${error}`))
    process.exit()
  }
}

module.exports = setMirror