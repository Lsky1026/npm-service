import chalk from 'chalk'
import fs from 'fs'
import { spawn } from 'child_process'
import stringFormat from 'string-format'


type Log = { log: Function }
const { log }:Log = console


// wrap chalk log
const wrap = (func: Function): Function => (msg: string): void => log(func.call(null, msg))

// chalk
export const red = wrap(chalk.red)  // error
export const blue = wrap(chalk.blue)  // command
export const green = wrap(chalk.green)  // success
export const cyan = wrap(chalk.cyan)  // normal
export const magenta = wrap(chalk.magenta)  // 
export const spawnLog = (msg: string, command: string): void => {
  log(stringFormat(msg, chalk.blue.call(null, command)))
}


// common
// 判断模板数据类型
function isType(type: string):Function {
  return (obj: any): Boolean => Object.prototype.toString.call(obj) === `[object ${type}]`;
}


/**
 * 判断是否为空
 * @param {any} data 数据
 */
function isEmpty(data: any): Boolean {
  if (data === null || data === '' || data === undefined || Number.isNaN(data)) {
    return true;
  }
  if (isType('Array')(data)) {
    if (data.length <= 0) {
      return true;
    }
  } else if (isType('Object')(data)) {
    if (Object.keys(data).length <= 0) {
      return true;
    }
  }

  return false;
}


interface Spawn {
  command: string,
  args: Array<string>,
  option?: any
}

interface ProcessLog {
  data: null | string,
  err: null | string
}

/**
 * promise spawn
 * @param param0 spawn执行参数
 */
function asyncSpawn({command, args, option}: Spawn): Promise<ProcessLog> { 
  return new Promise((resolve) => {
    if(isEmpty(command) || isEmpty(args)) {
      resolve({
        data: null,
        err: '参数不全，无法执行spawn命令...'
      })
      return
    }

    spawnLog(`执行命令：{} ...`, `${command} ${args.join(' ')}`)

    const spawnProcess = spawn(command, args, option)
    spawnProcess.stdout.on('data', (data) => {
      resolve({
        data: data.toString(),
        err: null
      })
    })
    spawnProcess.stderr.on('data', (data) => {
      resolve({
        data: null,
        err: data.toString()
      })
    })
  })
}



export {
  log,
  asyncSpawn
}