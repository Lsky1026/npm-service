#!/usr/bin/env node

import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import expressWs from 'express-ws'
import path from 'path'
import * as tools from './tools'

const { 
  red, blue, green, cyan, magenta, log, 
  noop, globDir
 } = tools


const app = express()
app.use(bodyParser.json())




app.post('/path/changePath', (req: express.Request, res: express.Response) => {
  const { path: pt }: { path: string } = req.body
  // const [info, msg] = globDir(pt)
})