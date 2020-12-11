#!/usr/bin/env node

// 请求 commander 库
const program = require('commander')
const updateChk = require('./../lib/update')
const setMirror = require('./../lib/mirror')
const dlTemplate = require('../lib/download')
const initProject = require('../lib/init')

// 从 package.json 文件中请求 version 字段的值，-v和--version是参数
program.version(require('../package.json').version, '-v, --version')


// 注册upgrade命令
program.command('upgrade')
.description('check the fe-cli version')
.action(()=>{
  updateChk()
})

// 注册mirror命令
program.command('mirror <template_mirror>')
.description('Set the template mirror')
.action((tplMirror)=>{
  setMirror(tplMirror)
})

// 注册template命令 下载/更新模板
program
  .command('template')
  .description("Download template from mirror.")
  .action(() => {
    dlTemplate()
  })

// init 初始化项目
program
  .name('fe-cli')
  .usage('<commands> [options]')
  .command('init <project_name>')
  .description('Create a javascript plugin project.')
  .action(project => {
    initProject(project)
  })

// 解析命令行参数 必须放到最后一行
program.parse(process.argv)