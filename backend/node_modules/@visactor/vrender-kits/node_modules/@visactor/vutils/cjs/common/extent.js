"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.extent = void 0;

const isFunction_1 = __importDefault(require("./isFunction")), isNil_1 = __importDefault(require("./isNil")), isNumber_1 = __importDefault(require("./isNumber")), extent = (array, func) => {
    const valueGetter = (0, isFunction_1.default)(func) ? func : val => val;
    let min, max;
    if (array && array.length) {
        const n = array.length;
        for (let i = 0; i < n; i += 1) {
            let value = valueGetter(array[i]);
            (0, isNil_1.default)(value) || !(0, isNumber_1.default)(value = +value) || Number.isNaN(value) || ((0, 
            isNil_1.default)(min) ? (min = value, max = value) : (min = Math.min(min, value), 
            max = Math.max(max, value)));
        }
        return [ min, max ];
    }
    return [ min, max ];
};

exports.extent = extent;
//# sourceMappingURL=extent.js.map