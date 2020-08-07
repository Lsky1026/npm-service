# npm-service
> 管理指定文件夹下项目服务。



## plan

- [x] /npm/getProjects
- [x] /npm/command
- [x] /path/changePath
- [x] /path/currennt
- [x] /npm/close



## API

### /npm/getProjects

> 该接口将会扫描指定文件夹下所有可以通过`npm`启动的项目，并返回项目地址。



```javascript
/npm/getProjects

@method: POST
  
@params {
    path: string
  }

@return {
    info: <path>[],
    code: 0,
    msg: ''
  }
```



### /npm/command

> 接口会执行 `npm` 命令，并返回 `pid`。

```javascript
/npm/command

@method: POST

@params {
  command: 'npm run start' | 'npm run test' | string
}

@return {
  info: number,
  code: 0,
  msg: ''
}
```



### /path/changePath

> 切换目录地址



```javascript
/path/changePath

@method: POST

@params {
  path: string
}

@return {
  info: <path>[],
  code: 0,
  msg: ''
}
```

### /path/current

> base path

```javascript
/path/current

@method: GET

@return {
  info: { current: path, target: dirname},
  code: 0,
  msg: null
}
```



### /npm/close

> `kill`指定`pid`

```javascript
/npm/close

@method: POST

@params {
  pid: number
}

@return {
  code: 0,
  info: null,
  msg: null
}
```

