const objectProto = Object.prototype, isPrototype = function(value) {
    const Ctor = value && value.constructor;
    return value === ("function" == typeof Ctor && Ctor.prototype || objectProto);
};

export default isPrototype;