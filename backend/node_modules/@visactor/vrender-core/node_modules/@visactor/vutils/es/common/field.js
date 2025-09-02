import get from "./get";

import isArray from "./isArray";

import isFunction from "./isFunction";

export const getter = path => obj => get(obj, path);

const fieldSingle = (fieldStr, opt = {}) => {
    if (isFunction(fieldStr)) return fieldStr;
    const path = [ fieldStr ];
    return (opt && opt.get || getter)(path);
};

export const field = (fieldStr, opt = {}) => {
    if (isArray(fieldStr)) {
        const funcs = fieldStr.map((entry => fieldSingle(entry, opt)));
        return datum => funcs.map((func => func(datum)));
    }
    return fieldSingle(fieldStr, opt);
};

export const simpleField = option => option ? "string" == typeof option || "number" == typeof option ? () => option : isFunction(option) ? option : datum => datum[option.field] : null;
//# sourceMappingURL=field.js.map