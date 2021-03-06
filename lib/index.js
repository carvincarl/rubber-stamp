"use strict";
// Copyright © 2018 Carl Roth <carvincarl@gmail.com>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var defaultConfig = {
    labels: ['rubber stamp', 'rubberstamp']
};
module.exports = function (app) {
    app.on('pull_request.labeled', function (context) { return __awaiter(_this, void 0, void 0, function () {
        var labels, config, e_1, approveLabels, _i, _a, label, _b, labels_1, label, checkLabel, number, _c, owner, repo, result, e_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    labels = context.payload.pull_request.labels;
                    config = null;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, context.config('rubber-stamp.yml', defaultConfig)];
                case 2:
                    config = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _d.sent();
                    app.log.debug('Config error: ' + e_1.message);
                    return [3 /*break*/, 4];
                case 4:
                    if (!config) {
                        app.log.debug('Config not loaded');
                        return [2 /*return*/];
                    }
                    approveLabels = [];
                    for (_i = 0, _a = config.labels; _i < _a.length; _i++) {
                        label = _a[_i];
                        approveLabels.push(label.toUpperCase());
                    }
                    app.log.debug(approveLabels);
                    _b = 0, labels_1 = labels;
                    _d.label = 5;
                case 5:
                    if (!(_b < labels_1.length)) return [3 /*break*/, 11];
                    label = labels_1[_b];
                    app.log.debug('Process label: ' + label.name);
                    checkLabel = label.name.toUpperCase();
                    if (!approveLabels.includes(checkLabel)) return [3 /*break*/, 10];
                    number = context.payload.pull_request.number;
                    app.log.debug('Approve ' + number);
                    _c = context.repo(), owner = _c.owner, repo = _c.repo;
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, context.github.pullRequests.createReview({
                            owner: owner,
                            repo: repo,
                            number: number,
                            event: 'APPROVE',
                            body: 'Approved by Rubber Stamp because the label "' + label.name + '" was added.'
                        })];
                case 7:
                    result = _d.sent();
                    app.log.trace(result);
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _d.sent();
                    app.log.error('createReview failed: ' + e_2.code + ': ' + e_2.message);
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 11];
                case 10:
                    _b++;
                    return [3 /*break*/, 5];
                case 11: return [2 /*return*/];
            }
        });
    }); });
};
//# sourceMappingURL=index.js.map