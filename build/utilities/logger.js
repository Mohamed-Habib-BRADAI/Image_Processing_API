"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    var params = req.params;
    console.log(params);
    next();
};
exports.default = logger;
