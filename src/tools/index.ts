import chalk from 'chalk'
import fs from 'fs'
import { spawn } from 'child_process'
import stringFormat from 'string-format'
import gb from 'glob'
import nodePath from 'path'

const { stat } = fs


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

export const noop = (): void => {}


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


function isDirectory (path: string): Promise<Boolean> {
  return new Promise((resolve) => {
    stat(path, (err, stats) => {
      if(err) {
        resolve(false)
        return
      }
      if(stats.isDirectory())  {
        resolve(true)
        return
      }
      resolve(false)
    })
  })
}

interface GlobReturn {
  err: any,
  files: Array<string> | null
}
function glob (path: string, options?: any): Promise<GlobReturn>{
  return new Promise((resolve) => {
    gb(path,
      options,
      (err: any, files: any) => {
        resolve({err, files})
      })
  })
}

interface PathParams {
  target: string,
  current: string
}

function handlePath (pt: string): PathParams {
  return {
    target: nodePath.basename(pt),
    current: pt
  }
}

async function globDir (path: string):Promise<[null | Array<PathParams>, string|null]> {
  try {
    const {err, files} = await glob(`${path}/*`)
    if(err) {
      return [null, err.toString()]
    }
    if(!files) {
      return [[], null]
    }
    let params: Array<PathParams> = []
    for (const key of files) {
      const isD = await isDirectory(key)
      if(isD) params.push(handlePath(key))
    }
    return [params, null]
  } catch (error) {
    return [null, error.toString()]
  }
}


interface AppsResult {
  info: any,
  msg: null | string,
  code: number
}
export const formatAppsResult = (info: any, msg: null | string): AppsResult => {
  if(msg) {
    return {
      info: null,
      msg,
      code: -1
    }
  }

  return {
    info,
    msg: null,
    code: 0
  }
}



export {
  log,
  asyncSpawn,
  globDir
}