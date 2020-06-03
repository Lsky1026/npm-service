"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var child_process_1 = require("child_process");
var string_format_1 = tslib_1.__importDefault(require("string-format"));
var glob_1 = tslib_1.__importDefault(require("glob"));
var path_1 = tslib_1.__importDefault(require("path"));
var stat = fs_1.default.stat;
var log = console.log;
exports.log = log;
// wrap chalk log
var wrap = function (func) { return function (msg) { return log(func.call(null, msg)); }; };
// chalk
exports.red = wrap(chalk_1.default.red); // error
exports.blue = wrap(chalk_1.default.blue); // command
exports.green = wrap(chalk_1.default.green); // success
exports.cyan = wrap(chalk_1.default.cyan); // normal
exports.magenta = wrap(chalk_1.default.magenta); // 
exports.spawnLog = function (msg, command) {
    log(string_format_1.default(msg, chalk_1.default.blue.call(null, command)));
};
exports.noop = function () { };
// common
// 判断模板数据类型
function isType(type) {
    return function (obj) { return Object.prototype.toString.call(obj) === "[object " + type + "]"; };
}
/**
 * 判断是否为空
 * @param {any} data 数据
 */
function isEmpty(data) {
    if (data === null || data === '' || data === undefined || Number.isNaN(data)) {
        return true;
    }
    if (isType('Array')(data)) {
        if (data.length <= 0) {
            return true;
        }
    }
    else if (isType('Object')(data)) {
        if (Object.keys(data).length <= 0) {
            return true;
        }
    }
    return false;
}
/**
 * promise spawn
 * @param param0 spawn执行参数
 */
function asyncSpawn(_a) {
    var command = _a.command, args = _a.args, option = _a.option;
    return new Promise(function (resolve) {
        if (isEmpty(command) || isEmpty(args)) {
            resolve({
                data: null,
                err: '参数不全，无法执行spawn命令...'
            });
            return;
        }
        exports.spawnLog("\u6267\u884C\u547D\u4EE4\uFF1A{} ...", command + " " + args.join(' '));
        var spawnProcess = child_process_1.spawn(command, args, option);
        spawnProcess.stdout.on('data', function (data) {
            resolve({
                data: data.toString(),
                err: null
            });
        });
        spawnProcess.stderr.on('data', function (data) {
            resolve({
                data: null,
                err: data.toString()
            });
        });
    });
}
exports.asyncSpawn = asyncSpawn;
function isDirectory(path) {
    return new Promise(function (resolve) {
        stat(path, function (err, stats) {
            if (err) {
                resolve(false);
                return;
            }
            if (stats.isDirectory()) {
                resolve(true);
                return;
            }
            resolve(false);
        });
    });
}
function glob(path, options) {
    return new Promise(function (resolve) {
        glob_1.default(path, options, function (err, files) {
            resolve({ err: err, files: files });
        });
    });
}
function handlePath(pt) {
    return {
        target: path_1.default.basename(pt),
        current: pt
    };
}
function globDir(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, err, files, params, _i, files_1, key, isD, error_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, glob(path + "/*")];
                case 1:
                    _a = _b.sent(), err = _a.err, files = _a.files;
                    if (err) {
                        return [2 /*return*/, [null, err.toString()]];
                    }
                    if (!files) {
                        return [2 /*return*/, [[], null]];
                    }
                    params = [];
                    _i = 0, files_1 = files;
                    _b.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 5];
                    key = files_1[_i];
                    return [4 /*yield*/, isDirectory(key)];
                case 3:
                    isD = _b.sent();
                    if (isD)
                        params.push(handlePath(key));
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, [params, null]];
                case 6:
                    error_1 = _b.sent();
                    return [2 /*return*/, [null, error_1.toString()]];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.globDir = globDir;
exports.formatAppsResult = function (info, msg) {
    if (msg) {
        return {
            info: null,
            msg: msg,
            code: -1
        };
    }
    return {
        info: info,
        msg: null,
        code: 0
    };
};
