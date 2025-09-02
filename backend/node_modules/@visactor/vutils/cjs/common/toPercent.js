"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.toPercent = void 0;

const isNil_1 = __importDefault(require("./isNil")), isString_1 = __importDefault(require("./isString")), toPercent = (percent, total) => (0, 
isNil_1.default)(percent) ? total : (0, isString_1.default)(percent) ? total * parseFloat(percent) / 100 : percent;

exports.toPercent = toPercent;
//# sourceMappingURL=toPercent.js.map
