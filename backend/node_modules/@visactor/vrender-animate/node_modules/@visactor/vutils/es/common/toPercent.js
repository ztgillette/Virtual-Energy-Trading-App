import isNil from "./isNil";

import isString from "./isString";

export const toPercent = (percent, total) => isNil(percent) ? total : isString(percent) ? total * parseFloat(percent) / 100 : percent;
//# sourceMappingURL=toPercent.js.map
