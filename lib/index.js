#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var body_parser_1 = tslib_1.__importDefault(require("body-parser"));
var tools = tslib_1.__importStar(require("./tools"));
var red = tools.red, blue = tools.blue, green = tools.green, cyan = tools.cyan, magenta = tools.magenta, log = tools.log, noop = tools.noop, globDir = tools.globDir, formatAppsResult = tools.formatAppsResult, asyncSpawn = tools.asyncSpawn;
var app = express_1.default();
app.use(body_parser_1.default.json());
// if change path, return dir 
app.post('/path/changePath', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var pt, _a, info, msg;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pt = req.body.path;
                return [4 /*yield*/, globDir(pt)];
            case 1:
                _a = _b.sent(), info = _a[0], msg = _a[1];
                res.send(formatAppsResult(info, msg));
                return [2 /*return*/];
        }
    });
}); });
// exec npm command
app.post('/npm/command', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var command, _a, data, err;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                command = req.body.command;
                return [4 /*yield*/, asyncSpawn({
                        command: 'npm',
                        args: ['run', command]
                    })];
            case 1:
                _a = _b.sent(), data = _a.data, err = _a.err;
                if (err) {
                    res.send(formatAppsResult(null, err));
                    return [2 /*return*/];
                }
                res.send(formatAppsResult(data, null));
                return [2 /*return*/];
        }
    });
}); });
