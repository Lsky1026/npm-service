#!/usr/bin/env node

import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import expressWs from 'express-ws'
import cors from 'cors'
import ws from 'ws'
import path from 'path'
import * as tools from './tools'

const {
  red, blue, green, cyan, magenta, log,
  noop, globDir, formatAppsResult, asyncSpawn,
  targetProjects, closeByPid
} = tools


const appBase = express()

const { app } = expressWs(appBase)
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




// if change path, return dir 
app.post('/path/changePath', async (req: express.Request, res: express.Response) => {
  const { path: pt }: { path: string } = req.body
  const [info, msg] = await globDir(pt)
  res.send(formatAppsResult(info, msg))
})

// get target path projects
app.post('/npm/getProjects', async (req: express.Request, res: express.Response) => {
  const { path: pt }: { path: string } = req.body
  const [info, msg] = await targetProjects(pt)
  res.send(formatAppsResult(info, msg))
})

// exec npm command
app.post('/npm/command', async (req: express.Request, res: express.Response) => {
  const { command }: { command: string } = req.body
  // run command
  const { data, err, pid } = await asyncSpawn({
    command: 'npm',
    args: ['run', command]
  })
  if (err) {
    res.send(formatAppsResult(null, err))
    return
  }
  res.send(formatAppsResult({ pid, data }, null))
  return
})

// close pid
app.post('/npm/close', async (req: express.Request, res: express.Response) => {
  const { pid }: { pid: number } = req.body

  await closeByPid(pid)
  res.send(formatAppsResult(null, null))
})

app.ws('/ws/service', (ws: ws) => {
  ws.on('close', () => {
    // close process
  })
})



app.listen(5000)