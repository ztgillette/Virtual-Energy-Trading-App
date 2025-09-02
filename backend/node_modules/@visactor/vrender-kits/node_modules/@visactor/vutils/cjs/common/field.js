"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.simpleField = exports.field = exports.getter = void 0;

const get_1 = __importDefault(require("./get")), isArray_1 = __importDefault(require("./isArray")), isFunction_1 = __importDefault(require("./isFunction")), getter = path => obj => (0, 
get_1.default)(obj, path);

exports.getter = getter;

const fieldSingle = (fieldStr, opt = {}) => {
    if ((0, isFunction_1.default)(fieldStr)) return fieldStr;
    const path = [ fieldStr ];
    return (opt && opt.get || exports.getter)(path);
}, field = (fieldStr, opt = {}) => {
    if ((0, isArray_1.default)(fieldStr)) {
        const funcs = fieldStr.map((entry => fieldSingle(entry, opt)));
        return datum => funcs.map((func => func(datum)));
    }
    return fieldSingle(fieldStr, opt);
};

exports.field = field;

const simpleField = option => option ? "string" == typeof option || "number" == typeof option ? () => option : (0, 
isFunction_1.default)(option) ? option : datum => datum[option.field] : null;

exports.simpleField = simpleField;
//# sourceMappingURL=field.js.map