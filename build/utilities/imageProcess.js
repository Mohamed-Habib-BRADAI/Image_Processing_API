"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = require("fs");
function processFile(fileName, stringWidth, stringHeight) {
    return __awaiter(this, void 0, void 0, function () {
        var fullPath, thumbPath, height, width, nameArray, thumb_file_name, fullFiles, fullFile, extension, thumbFile, thumbFiles, index, buffer, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fullPath = '/assets/images/full/';
                    thumbPath = '/assets/images/thumb/';
                    if (stringWidth) {
                        height = parseInt(stringHeight, 10);
                    }
                    if (stringHeight) {
                        width = parseInt(stringWidth, 10);
                    }
                    nameArray = [fileName, stringWidth, stringHeight];
                    thumb_file_name = nameArray.join('-');
                    return [4 /*yield*/, fs_1.promises.readdir('.' + fullPath)];
                case 1:
                    fullFiles = _a.sent();
                    fullFile = fullFiles.find(function (file) { return file.split('.')[0] == fileName; });
                    if (!fullFile) {
                        throw new Error("Input file missing");
                    }
                    extension = fullFile.split('.')[1];
                    thumbFile = thumb_file_name + '.' + extension;
                    return [4 /*yield*/, fs_1.promises.readdir('.' + thumbPath)];
                case 2:
                    thumbFiles = _a.sent();
                    index = thumbFiles.indexOf(thumbFile);
                    if (!(index == -1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, sharp_1.default('.' + fullPath + fullFile)
                            .resize({ width: width, height: height, background: 'red' })
                            .png()
                            .toBuffer()];
                case 3:
                    buffer = _a.sent();
                    return [4 /*yield*/, fs_1.promises.open('.' + thumbPath + thumbFile, 'a+')];
                case 4:
                    file = _a.sent();
                    return [4 /*yield*/, file.write(buffer)];
                case 5:
                    _a.sent();
                    file.close();
                    _a.label = 6;
                case 6: return [2 /*return*/, [thumbPath, thumbFile]];
            }
        });
    });
}
exports.default = {
    processFile: processFile
};
