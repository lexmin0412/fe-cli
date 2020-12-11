const updateNotifier = require('update-notifier') // update-notifier库 用于检查更新
const chalk = require('chalk')  // 控制台字符样式
const pkg = require('./../package.json')  // 引入package.json给update-notifier读取

const notifier = updateNotifier({
  pkg,  // 传入package.json供update-notifier读取
  updateCheckInterval: 1,  // 设定检查更新周期，默认为 1000 * 60 * 60 * 24（1 天） 这里设定为 1000 毫秒（1秒）
})

// 使用notifier检查更新
function updateChk() {
  // 当检测到新版本时，notifier.update会返回一个object对象
  // 可通过notifier.update.latest获取最新版本号
  // console.log('notifier', notifier)
  notifier.notify()
  if ( notifier.update ) {  // 这个属性有bug 有时候有新版本这里也不会返回信息
    console.log(`new package version available, ${chalk.cyan(notifier.update.latest)}, it's recommended that you update before using.`)
  } else {
    console.log('no new version available, your package is the newest!')
  }
}

module.exports = updateChk

// 这里需要说明两点：updateCheckInterval 默认是 1 天，也就意味着今天检测更新了一次，下一次能进行检测更新的时间点应该为明天同这个时间点之后，否则周期内检测更新都会转到 No new version is available.。
// 举个栗子：我今天 10 点的时候检查更新了一次，提示有新版本可用，然后我下午 4 点再检查一次，此时将不会再提示有新版本可用，只能等到明天 10 点过后再检测更新才会重新提示新版本可用。因此，将 updateCheckInterval 设置为 1000 毫秒，就能使每次检测更新保持最新状态。
// 另外，update-notifier 检测更新机制是通过 package.json 文件的 name 字段值和 version 字段值来进行校验：它通过 name 字段值从 npmjs 获取库的最新版本号，然后再跟本地库的 version 字段值进行比对，如果本地库的版本号低于 npmjs 上最新版本号，则会有相关的更新提示。