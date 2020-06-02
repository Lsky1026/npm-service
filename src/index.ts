#!/usr/bin/env node

import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import expressWs from 'express-ws'
import path from 'path'
import * as tools from './tools'

const { 
  red, blue, green, cyan, magenta, log, 
  noop, globDir, formatAppsResult
 } = tools


const app = express()
app.use(bodyParser.json())




// if change path, return dir 
app.post('/path/changePath', async (req: express.Request, res: express.Response) => {
  const { path: pt }: { path: string } = req.body
  const [info, msg] = await globDir(pt)
  res.send(formatAppsResult(info, msg))
})


app.post('/npm/command', async (req:express.Request, res: express.Response) => {
  const {command} : {command: string} = req.body
  
})