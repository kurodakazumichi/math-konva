// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/konva/lib/Global.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PI_OVER_180 = Math.PI / 180;
function detectBrowser() {
    return (typeof window !== 'undefined' &&
        ({}.toString.call(window) === '[object Window]' ||
            {}.toString.call(window) === '[object global]'));
}
var _detectIE = function (ua) {
    var msie = ua.indexOf('msie ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
};
exports._parseUA = function (userAgent) {
    var ua = userAgent.toLowerCase(), match = /(chrome)[ /]([\w.]+)/.exec(ua) ||
        /(webkit)[ /]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        (ua.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
        [], mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i), ieMobile = !!userAgent.match(/IEMobile/i);
    return {
        browser: match[1] || '',
        version: match[2] || '0',
        isIE: _detectIE(ua),
        mobile: mobile,
        ieMobile: ieMobile
    };
};
exports.glob = typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
        ? window
        : typeof WorkerGlobalScope !== 'undefined'
            ? self
            : {};
exports.Konva = {
    _global: exports.glob,
    version: '4.1.4',
    isBrowser: detectBrowser(),
    isUnminified: /param/.test(function (param) { }.toString()),
    dblClickWindow: 400,
    getAngle: function (angle) {
        return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
    },
    enableTrace: false,
    _pointerEventsEnabled: false,
    hitOnDragEnabled: false,
    captureTouchEventsEnabled: false,
    listenClickTap: false,
    inDblClickWindow: false,
    pixelRatio: undefined,
    dragDistance: 3,
    angleDeg: true,
    showWarnings: true,
    dragButtons: [0, 1],
    isDragging: function () {
        return exports.Konva['DD'].isDragging;
    },
    isDragReady: function () {
        return !!exports.Konva['DD'].node;
    },
    UA: exports._parseUA((exports.glob.navigator && exports.glob.navigator.userAgent) || ''),
    document: exports.glob.document,
    _injectGlobal: function (Konva) {
        exports.glob.Konva = Konva;
    },
    _parseUA: exports._parseUA
};
exports._NODES_REGISTRY = {};
exports._registerNode = function (NodeClass) {
    exports._NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass;
    exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
};

},{}],"../node_modules/konva/lib/Util.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Collection = (function () {
    function Collection() {
    }
    Collection.toCollection = function (arr) {
        var collection = new Collection(), len = arr.length, n;
        for (n = 0; n < len; n++) {
            collection.push(arr[n]);
        }
        return collection;
    };
    Collection._mapMethod = function (methodName) {
        Collection.prototype[methodName] = function () {
            var len = this.length, i;
            var args = [].slice.call(arguments);
            for (i = 0; i < len; i++) {
                this[i][methodName].apply(this[i], args);
            }
            return this;
        };
    };
    Collection.mapMethods = function (constructor) {
        var prot = constructor.prototype;
        for (var methodName in prot) {
            Collection._mapMethod(methodName);
        }
    };
    return Collection;
}());
exports.Collection = Collection;
Collection.prototype = [];
Collection.prototype.each = function (func) {
    for (var n = 0; n < this.length; n++) {
        func(this[n], n);
    }
};
Collection.prototype.toArray = function () {
    var arr = [], len = this.length, n;
    for (n = 0; n < len; n++) {
        arr.push(this[n]);
    }
    return arr;
};
var Transform = (function () {
    function Transform(m) {
        if (m === void 0) { m = [1, 0, 0, 1, 0, 0]; }
        this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
    }
    Transform.prototype.copy = function () {
        return new Transform(this.m);
    };
    Transform.prototype.point = function (point) {
        var m = this.m;
        return {
            x: m[0] * point.x + m[2] * point.y + m[4],
            y: m[1] * point.x + m[3] * point.y + m[5]
        };
    };
    Transform.prototype.translate = function (x, y) {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;
        return this;
    };
    Transform.prototype.scale = function (sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
        return this;
    };
    Transform.prototype.rotate = function (rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.m[0] * c + this.m[2] * s;
        var m12 = this.m[1] * c + this.m[3] * s;
        var m21 = this.m[0] * -s + this.m[2] * c;
        var m22 = this.m[1] * -s + this.m[3] * c;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    };
    Transform.prototype.getTranslation = function () {
        return {
            x: this.m[4],
            y: this.m[5]
        };
    };
    Transform.prototype.skew = function (sx, sy) {
        var m11 = this.m[0] + this.m[2] * sy;
        var m12 = this.m[1] + this.m[3] * sy;
        var m21 = this.m[2] + this.m[0] * sx;
        var m22 = this.m[3] + this.m[1] * sx;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    };
    Transform.prototype.multiply = function (matrix) {
        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
    };
    Transform.prototype.invert = function () {
        var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        var m0 = this.m[3] * d;
        var m1 = -this.m[1] * d;
        var m2 = -this.m[2] * d;
        var m3 = this.m[0] * d;
        var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
        return this;
    };
    Transform.prototype.getMatrix = function () {
        return this.m;
    };
    Transform.prototype.setAbsolutePosition = function (x, y) {
        var m0 = this.m[0], m1 = this.m[1], m2 = this.m[2], m3 = this.m[3], m4 = this.m[4], m5 = this.m[5], yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2), xt = (x - m4 - m2 * yt) / m0;
        return this.translate(xt, yt);
    };
    return Transform;
}());
exports.Transform = Transform;
var OBJECT_ARRAY = '[object Array]', OBJECT_NUMBER = '[object Number]', OBJECT_STRING = '[object String]', OBJECT_BOOLEAN = '[object Boolean]', PI_OVER_DEG180 = Math.PI / 180, DEG180_OVER_PI = 180 / Math.PI, HASH = '#', EMPTY_STRING = '', ZERO = '0', KONVA_WARNING = 'Konva warning: ', KONVA_ERROR = 'Konva error: ', RGB_PAREN = 'rgb(', COLORS = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 132, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 255, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 203],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [119, 128, 144],
    slategrey: [119, 128, 144],
    snow: [255, 255, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    transparent: [255, 255, 255, 0],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 5]
}, RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, animQueue = [];
exports.Util = {
    _isElement: function (obj) {
        return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isPlainObject: function (obj) {
        return !!obj && obj.constructor === Object;
    },
    _isArray: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber: function (obj) {
        return (Object.prototype.toString.call(obj) === OBJECT_NUMBER &&
            !isNaN(obj) &&
            isFinite(obj));
    },
    _isString: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    _isBoolean: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
    },
    isObject: function (val) {
        return val instanceof Object;
    },
    isValidSelector: function (selector) {
        if (typeof selector !== 'string') {
            return false;
        }
        var firstChar = selector[0];
        return (firstChar === '#' ||
            firstChar === '.' ||
            firstChar === firstChar.toUpperCase());
    },
    _sign: function (number) {
        if (number === 0) {
            return 0;
        }
        if (number > 0) {
            return 1;
        }
        else {
            return -1;
        }
    },
    requestAnimFrame: function (callback) {
        animQueue.push(callback);
        if (animQueue.length === 1) {
            requestAnimationFrame(function () {
                var queue = animQueue;
                animQueue = [];
                queue.forEach(function (cb) {
                    cb();
                });
            });
        }
    },
    createCanvasElement: function () {
        var canvas = document.createElement('canvas');
        try {
            canvas.style = canvas.style || {};
        }
        catch (e) { }
        return canvas;
    },
    createImageElement: function () {
        return document.createElement('img');
    },
    _isInDocument: function (el) {
        while ((el = el.parentNode)) {
            if (el == document) {
                return true;
            }
        }
        return false;
    },
    _simplifyArray: function (arr) {
        var retArr = [], len = arr.length, util = exports.Util, n, val;
        for (n = 0; n < len; n++) {
            val = arr[n];
            if (util._isNumber(val)) {
                val = Math.round(val * 1000) / 1000;
            }
            else if (!util._isString(val)) {
                val = val.toString();
            }
            retArr.push(val);
        }
        return retArr;
    },
    _urlToImage: function (url, callback) {
        var imageObj = new Global_1.glob.Image();
        imageObj.onload = function () {
            callback(imageObj);
        };
        imageObj.src = url;
    },
    _rgbToHex: function (r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb: function (hex) {
        hex = hex.replace(HASH, EMPTY_STRING);
        var bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    },
    getRandomColor: function () {
        var randColor = ((Math.random() * 0xffffff) << 0).toString(16);
        while (randColor.length < 6) {
            randColor = ZERO + randColor;
        }
        return HASH + randColor;
    },
    get: function (val, def) {
        if (val === undefined) {
            return def;
        }
        else {
            return val;
        }
    },
    getRGB: function (color) {
        var rgb;
        if (color in COLORS) {
            rgb = COLORS[color];
            return {
                r: rgb[0],
                g: rgb[1],
                b: rgb[2]
            };
        }
        else if (color[0] === HASH) {
            return this._hexToRgb(color.substring(1));
        }
        else if (color.substr(0, 4) === RGB_PAREN) {
            rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
            return {
                r: parseInt(rgb[1], 10),
                g: parseInt(rgb[2], 10),
                b: parseInt(rgb[3], 10)
            };
        }
        else {
            return {
                r: 0,
                g: 0,
                b: 0
            };
        }
    },
    colorToRGBA: function (str) {
        str = str || 'black';
        return (exports.Util._namedColorToRBA(str) ||
            exports.Util._hex3ColorToRGBA(str) ||
            exports.Util._hex6ColorToRGBA(str) ||
            exports.Util._rgbColorToRGBA(str) ||
            exports.Util._rgbaColorToRGBA(str) ||
            exports.Util._hslColorToRGBA(str));
    },
    _namedColorToRBA: function (str) {
        var c = COLORS[str.toLowerCase()];
        if (!c) {
            return null;
        }
        return {
            r: c[0],
            g: c[1],
            b: c[2],
            a: 1
        };
    },
    _rgbColorToRGBA: function (str) {
        if (str.indexOf('rgb(') === 0) {
            str = str.match(/rgb\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map(Number);
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: 1
            };
        }
    },
    _rgbaColorToRGBA: function (str) {
        if (str.indexOf('rgba(') === 0) {
            str = str.match(/rgba\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map(Number);
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: parts[3]
            };
        }
    },
    _hex6ColorToRGBA: function (str) {
        if (str[0] === '#' && str.length === 7) {
            return {
                r: parseInt(str.slice(1, 3), 16),
                g: parseInt(str.slice(3, 5), 16),
                b: parseInt(str.slice(5, 7), 16),
                a: 1
            };
        }
    },
    _hex3ColorToRGBA: function (str) {
        if (str[0] === '#' && str.length === 4) {
            return {
                r: parseInt(str[1] + str[1], 16),
                g: parseInt(str[2] + str[2], 16),
                b: parseInt(str[3] + str[3], 16),
                a: 1
            };
        }
    },
    _hslColorToRGBA: function (str) {
        if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
            var _a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str), _ = _a[0], hsl = _a.slice(1);
            var h = Number(hsl[0]) / 360;
            var s = Number(hsl[1]) / 100;
            var l = Number(hsl[2]) / 100;
            var t2 = void 0;
            var t3 = void 0;
            var val = void 0;
            if (s === 0) {
                val = l * 255;
                return {
                    r: Math.round(val),
                    g: Math.round(val),
                    b: Math.round(val),
                    a: 1
                };
            }
            if (l < 0.5) {
                t2 = l * (1 + s);
            }
            else {
                t2 = l + s - l * s;
            }
            var t1 = 2 * l - t2;
            var rgb = [0, 0, 0];
            for (var i = 0; i < 3; i++) {
                t3 = h + (1 / 3) * -(i - 1);
                if (t3 < 0) {
                    t3++;
                }
                if (t3 > 1) {
                    t3--;
                }
                if (6 * t3 < 1) {
                    val = t1 + (t2 - t1) * 6 * t3;
                }
                else if (2 * t3 < 1) {
                    val = t2;
                }
                else if (3 * t3 < 2) {
                    val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                }
                else {
                    val = t1;
                }
                rgb[i] = val * 255;
            }
            return {
                r: Math.round(rgb[0]),
                g: Math.round(rgb[1]),
                b: Math.round(rgb[2]),
                a: 1
            };
        }
    },
    haveIntersection: function (r1, r2) {
        return !(r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y);
    },
    cloneObject: function (obj) {
        var retObj = {};
        for (var key in obj) {
            if (this._isPlainObject(obj[key])) {
                retObj[key] = this.cloneObject(obj[key]);
            }
            else if (this._isArray(obj[key])) {
                retObj[key] = this.cloneArray(obj[key]);
            }
            else {
                retObj[key] = obj[key];
            }
        }
        return retObj;
    },
    cloneArray: function (arr) {
        return arr.slice(0);
    },
    _degToRad: function (deg) {
        return deg * PI_OVER_DEG180;
    },
    _radToDeg: function (rad) {
        return rad * DEG180_OVER_PI;
    },
    _capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw: function (str) {
        throw new Error(KONVA_ERROR + str);
    },
    error: function (str) {
        console.error(KONVA_ERROR + str);
    },
    warn: function (str) {
        if (!Global_1.Konva.showWarnings) {
            return;
        }
        console.warn(KONVA_WARNING + str);
    },
    extend: function (child, parent) {
        function Ctor() {
            this.constructor = child;
        }
        Ctor.prototype = parent.prototype;
        var oldProto = child.prototype;
        child.prototype = new Ctor();
        for (var key in oldProto) {
            if (oldProto.hasOwnProperty(key)) {
                child.prototype[key] = oldProto[key];
            }
        }
        child.__super__ = parent.prototype;
        child.super = parent;
    },
    _getControlPoints: function (x0, y0, x1, y1, x2, y2, t) {
        var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = (t * d01) / (d01 + d12), fb = (t * d12) / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
        return [p1x, p1y, p2x, p2y];
    },
    _expandPoints: function (p, tension) {
        var len = p.length, allPoints = [], n, cp;
        for (n = 2; n < len - 2; n += 2) {
            cp = exports.Util._getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
            allPoints.push(cp[0]);
            allPoints.push(cp[1]);
            allPoints.push(p[n]);
            allPoints.push(p[n + 1]);
            allPoints.push(cp[2]);
            allPoints.push(cp[3]);
        }
        return allPoints;
    },
    each: function (obj, func) {
        for (var key in obj) {
            func(key, obj[key]);
        }
    },
    _inRange: function (val, left, right) {
        return left <= val && val < right;
    },
    _getProjectionToSegment: function (x1, y1, x2, y2, x3, y3) {
        var x, y, dist;
        var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (pd2 == 0) {
            x = x1;
            y = y1;
            dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
        }
        else {
            var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
            if (u < 0) {
                x = x1;
                y = y1;
                dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
            }
            else if (u > 1.0) {
                x = x2;
                y = y2;
                dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
            }
            else {
                x = x1 + u * (x2 - x1);
                y = y1 + u * (y2 - y1);
                dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
            }
        }
        return [x, y, dist];
    },
    _getProjectionToLine: function (pt, line, isClosed) {
        var pc = exports.Util.cloneObject(pt);
        var dist = Number.MAX_VALUE;
        line.forEach(function (p1, i) {
            if (!isClosed && i === line.length - 1) {
                return;
            }
            var p2 = line[(i + 1) % line.length];
            var proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
            var px = proj[0], py = proj[1], pdist = proj[2];
            if (pdist < dist) {
                pc.x = px;
                pc.y = py;
                dist = pdist;
            }
        });
        return pc;
    },
    _prepareArrayForTween: function (startArray, endArray, isClosed) {
        var n, start = [], end = [];
        if (startArray.length > endArray.length) {
            var temp = endArray;
            endArray = startArray;
            startArray = temp;
        }
        for (n = 0; n < startArray.length; n += 2) {
            start.push({
                x: startArray[n],
                y: startArray[n + 1]
            });
        }
        for (n = 0; n < endArray.length; n += 2) {
            end.push({
                x: endArray[n],
                y: endArray[n + 1]
            });
        }
        var newStart = [];
        end.forEach(function (point) {
            var pr = exports.Util._getProjectionToLine(point, start, isClosed);
            newStart.push(pr.x);
            newStart.push(pr.y);
        });
        return newStart;
    },
    _prepareToStringify: function (obj) {
        var desc;
        obj.visitedByCircularReferenceRemoval = true;
        for (var key in obj) {
            if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')) {
                continue;
            }
            desc = Object.getOwnPropertyDescriptor(obj, key);
            if (obj[key].visitedByCircularReferenceRemoval ||
                exports.Util._isElement(obj[key])) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
            else if (exports.Util._prepareToStringify(obj[key]) === null) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
        }
        delete obj.visitedByCircularReferenceRemoval;
        return obj;
    },
    _assign: function (target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    },
    _getFirstPointerId: function (evt) {
        if (!evt.touches) {
            return 999;
        }
        else {
            return evt.changedTouches[0].identifier;
        }
    }
};

},{"./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/Validators.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Util_1 = require("./Util");
function _formatValue(val) {
    if (Util_1.Util._isString(val)) {
        return '"' + val + '"';
    }
    if (Object.prototype.toString.call(val) === '[object Number]') {
        return val;
    }
    if (Util_1.Util._isBoolean(val)) {
        return val;
    }
    return Object.prototype.toString.call(val);
}
function RGBComponent(val) {
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    return Math.round(val);
}
exports.RGBComponent = RGBComponent;
function alphaComponent(val) {
    if (val > 1) {
        return 1;
    }
    else if (val < 0.0001) {
        return 0.0001;
    }
    return val;
}
exports.alphaComponent = alphaComponent;
function getNumberValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isNumber(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number.');
            }
            return val;
        };
    }
}
exports.getNumberValidator = getNumberValidator;
function getNumberOrAutoValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            var isNumber = Util_1.Util._isNumber(val);
            var isAuto = val === 'auto';
            if (!(isNumber || isAuto)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number or "auto".');
            }
            return val;
        };
    }
}
exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
function getStringValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isString(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a string.');
            }
            return val;
        };
    }
}
exports.getStringValidator = getStringValidator;
function getFunctionValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isFunction(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a function.');
            }
            return val;
        };
    }
}
exports.getFunctionValidator = getFunctionValidator;
function getNumberArrayValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isArray(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a array of numbers.');
            }
            else {
                val.forEach(function (item) {
                    if (!Util_1.Util._isNumber(item)) {
                        Util_1.Util.warn('"' +
                            attr +
                            '" attribute has non numeric element ' +
                            item +
                            '. Make sure that all elements are numbers.');
                    }
                });
            }
            return val;
        };
    }
}
exports.getNumberArrayValidator = getNumberArrayValidator;
function getBooleanValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            var isBool = val === true || val === false;
            if (!isBool) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a boolean.');
            }
            return val;
        };
    }
}
exports.getBooleanValidator = getBooleanValidator;
function getComponentValidator(components) {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util.isObject(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be an object with properties ' +
                    components);
            }
            return val;
        };
    }
}
exports.getComponentValidator = getComponentValidator;

},{"./Global":"../node_modules/konva/lib/Global.js","./Util":"../node_modules/konva/lib/Util.js"}],"../node_modules/konva/lib/Factory.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Validators_1 = require("./Validators");
var GET = 'get', SET = 'set';
exports.Factory = {
    addGetterSetter: function (constructor, attr, def, validator, after) {
        this.addGetter(constructor, attr, def);
        this.addSetter(constructor, attr, validator, after);
        this.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter: function (constructor, attr, def) {
        var method = GET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] =
            constructor.prototype[method] ||
                function () {
                    var val = this.attrs[attr];
                    return val === undefined ? def : val;
                };
    },
    addSetter: function (constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        if (!constructor.prototype[method]) {
            exports.Factory.overWriteSetter(constructor, attr, validator, after);
        }
    },
    overWriteSetter: function (constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] = function (val) {
            if (validator && val !== undefined && val !== null) {
                val = validator.call(this, val, attr);
            }
            this._setAttr(attr, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
    },
    addComponentsGetterSetter: function (constructor, attr, components, validator, after) {
        var len = components.length, capitalize = Util_1.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), n, component;
        constructor.prototype[getter] = function () {
            var ret = {};
            for (n = 0; n < len; n++) {
                component = components[n];
                ret[component] = this.getAttr(attr + capitalize(component));
            }
            return ret;
        };
        var basicValidator = Validators_1.getComponentValidator(components);
        constructor.prototype[setter] = function (val) {
            var oldVal = this.attrs[attr], key;
            if (validator) {
                val = validator.call(this, val);
            }
            if (basicValidator) {
                basicValidator.call(this, val, attr);
            }
            for (key in val) {
                if (!val.hasOwnProperty(key)) {
                    continue;
                }
                this._setAttr(attr + capitalize(key), val[key]);
            }
            this._fireChangeEvent(attr, oldVal, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
        this.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter: function (constructor, attr) {
        var capitalizedAttr = Util_1.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
        constructor.prototype[attr] = function () {
            if (arguments.length) {
                this[setter](arguments[0]);
                return this;
            }
            return this[getter]();
        };
    },
    addDeprecatedGetterSetter: function (constructor, attr, def, validator) {
        Util_1.Util.error('Adding deprecated ' + attr);
        var method = GET + Util_1.Util._capitalize(attr);
        var message = attr +
            ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
        constructor.prototype[method] = function () {
            Util_1.Util.error(message);
            var val = this.attrs[attr];
            return val === undefined ? def : val;
        };
        this.addSetter(constructor, attr, validator, function () {
            Util_1.Util.error(message);
        });
        this.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat: function (constructor, methods) {
        Util_1.Util.each(methods, function (oldMethodName, newMethodName) {
            var method = constructor.prototype[newMethodName];
            var oldGetter = GET + Util_1.Util._capitalize(oldMethodName);
            var oldSetter = SET + Util_1.Util._capitalize(oldMethodName);
            function deprecated() {
                method.apply(this, arguments);
                Util_1.Util.error('"' +
                    oldMethodName +
                    '" method is deprecated and will be removed soon. Use ""' +
                    newMethodName +
                    '" instead.');
            }
            constructor.prototype[oldMethodName] = deprecated;
            constructor.prototype[oldGetter] = deprecated;
            constructor.prototype[oldSetter] = deprecated;
        });
    },
    afterSetFilter: function () {
        this._filterUpToDate = false;
    }
};

},{"./Util":"../node_modules/konva/lib/Util.js","./Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/Context.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Global_1 = require("./Global");
var COMMA = ',', OPEN_PAREN = '(', CLOSE_PAREN = ')', OPEN_PAREN_BRACKET = '([', CLOSE_BRACKET_PAREN = '])', SEMICOLON = ';', DOUBLE_PAREN = '()', EQUALS = '=', CONTEXT_METHODS = [
    'arc',
    'arcTo',
    'beginPath',
    'bezierCurveTo',
    'clearRect',
    'clip',
    'closePath',
    'createLinearGradient',
    'createPattern',
    'createRadialGradient',
    'drawImage',
    'ellipse',
    'fill',
    'fillText',
    'getImageData',
    'createImageData',
    'lineTo',
    'moveTo',
    'putImageData',
    'quadraticCurveTo',
    'rect',
    'restore',
    'rotate',
    'save',
    'scale',
    'setLineDash',
    'setTransform',
    'stroke',
    'strokeText',
    'transform',
    'translate'
];
var CONTEXT_PROPERTIES = [
    'fillStyle',
    'strokeStyle',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'font',
    'textAlign',
    'textBaseline',
    'globalAlpha',
    'globalCompositeOperation',
    'imageSmoothingEnabled'
];
var traceArrMax = 100;
var Context = (function () {
    function Context(canvas) {
        this.canvas = canvas;
        this._context = canvas._canvas.getContext('2d');
        if (Global_1.Konva.enableTrace) {
            this.traceArr = [];
            this._enableTrace();
        }
    }
    Context.prototype.fillShape = function (shape) {
        if (shape.fillEnabled()) {
            this._fill(shape);
        }
    };
    Context.prototype._fill = function (shape) {
    };
    Context.prototype.strokeShape = function (shape) {
        if (shape.hasStroke()) {
            this._stroke(shape);
        }
    };
    Context.prototype._stroke = function (shape) {
    };
    Context.prototype.fillStrokeShape = function (shape) {
        this.fillShape(shape);
        this.strokeShape(shape);
    };
    Context.prototype.getTrace = function (relaxed) {
        var traceArr = this.traceArr, len = traceArr.length, str = '', n, trace, method, args;
        for (n = 0; n < len; n++) {
            trace = traceArr[n];
            method = trace.method;
            if (method) {
                args = trace.args;
                str += method;
                if (relaxed) {
                    str += DOUBLE_PAREN;
                }
                else {
                    if (Util_1.Util._isArray(args[0])) {
                        str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
                    }
                    else {
                        str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
                    }
                }
            }
            else {
                str += trace.property;
                if (!relaxed) {
                    str += EQUALS + trace.val;
                }
            }
            str += SEMICOLON;
        }
        return str;
    };
    Context.prototype.clearTrace = function () {
        this.traceArr = [];
    };
    Context.prototype._trace = function (str) {
        var traceArr = this.traceArr, len;
        traceArr.push(str);
        len = traceArr.length;
        if (len >= traceArrMax) {
            traceArr.shift();
        }
    };
    Context.prototype.reset = function () {
        var pixelRatio = this.getCanvas().getPixelRatio();
        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
    };
    Context.prototype.getCanvas = function () {
        return this.canvas;
    };
    Context.prototype.clear = function (bounds) {
        var canvas = this.getCanvas();
        if (bounds) {
            this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
        }
        else {
            this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
        }
    };
    Context.prototype._applyLineCap = function (shape) {
        var lineCap = shape.getLineCap();
        if (lineCap) {
            this.setAttr('lineCap', lineCap);
        }
    };
    Context.prototype._applyOpacity = function (shape) {
        var absOpacity = shape.getAbsoluteOpacity();
        if (absOpacity !== 1) {
            this.setAttr('globalAlpha', absOpacity);
        }
    };
    Context.prototype._applyLineJoin = function (shape) {
        var lineJoin = shape.getLineJoin();
        if (lineJoin) {
            this.setAttr('lineJoin', lineJoin);
        }
    };
    Context.prototype.setAttr = function (attr, val) {
        this._context[attr] = val;
    };
    Context.prototype.arc = function (a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.arcTo = function (a0, a1, a2, a3, a4) {
        this._context.arcTo(a0, a1, a2, a3, a4);
    };
    Context.prototype.beginPath = function () {
        this._context.beginPath();
    };
    Context.prototype.bezierCurveTo = function (a0, a1, a2, a3, a4, a5) {
        this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.clearRect = function (a0, a1, a2, a3) {
        this._context.clearRect(a0, a1, a2, a3);
    };
    Context.prototype.clip = function () {
        this._context.clip();
    };
    Context.prototype.closePath = function () {
        this._context.closePath();
    };
    Context.prototype.createImageData = function (a0, a1) {
        var a = arguments;
        if (a.length === 2) {
            return this._context.createImageData(a0, a1);
        }
        else if (a.length === 1) {
            return this._context.createImageData(a0);
        }
    };
    Context.prototype.createLinearGradient = function (a0, a1, a2, a3) {
        return this._context.createLinearGradient(a0, a1, a2, a3);
    };
    Context.prototype.createPattern = function (a0, a1) {
        return this._context.createPattern(a0, a1);
    };
    Context.prototype.createRadialGradient = function (a0, a1, a2, a3, a4, a5) {
        return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.drawImage = function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        var a = arguments, _context = this._context;
        if (a.length === 3) {
            _context.drawImage(a0, a1, a2);
        }
        else if (a.length === 5) {
            _context.drawImage(a0, a1, a2, a3, a4);
        }
        else if (a.length === 9) {
            _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        }
    };
    Context.prototype.ellipse = function (a0, a1, a2, a3, a4, a5, a6, a7) {
        this._context.ellipse(a0, a1, a2, a3, a4, a5, a6, a7);
    };
    Context.prototype.isPointInPath = function (x, y) {
        return this._context.isPointInPath(x, y);
    };
    Context.prototype.fill = function () {
        this._context.fill();
    };
    Context.prototype.fillRect = function (x, y, width, height) {
        this._context.fillRect(x, y, width, height);
    };
    Context.prototype.strokeRect = function (x, y, width, height) {
        this._context.strokeRect(x, y, width, height);
    };
    Context.prototype.fillText = function (a0, a1, a2) {
        this._context.fillText(a0, a1, a2);
    };
    Context.prototype.measureText = function (text) {
        return this._context.measureText(text);
    };
    Context.prototype.getImageData = function (a0, a1, a2, a3) {
        return this._context.getImageData(a0, a1, a2, a3);
    };
    Context.prototype.lineTo = function (a0, a1) {
        this._context.lineTo(a0, a1);
    };
    Context.prototype.moveTo = function (a0, a1) {
        this._context.moveTo(a0, a1);
    };
    Context.prototype.rect = function (a0, a1, a2, a3) {
        this._context.rect(a0, a1, a2, a3);
    };
    Context.prototype.putImageData = function (a0, a1, a2) {
        this._context.putImageData(a0, a1, a2);
    };
    Context.prototype.quadraticCurveTo = function (a0, a1, a2, a3) {
        this._context.quadraticCurveTo(a0, a1, a2, a3);
    };
    Context.prototype.restore = function () {
        this._context.restore();
    };
    Context.prototype.rotate = function (a0) {
        this._context.rotate(a0);
    };
    Context.prototype.save = function () {
        this._context.save();
    };
    Context.prototype.scale = function (a0, a1) {
        this._context.scale(a0, a1);
    };
    Context.prototype.setLineDash = function (a0) {
        if (this._context.setLineDash) {
            this._context.setLineDash(a0);
        }
        else if ('mozDash' in this._context) {
            this._context['mozDash'] = a0;
        }
        else if ('webkitLineDash' in this._context) {
            this._context['webkitLineDash'] = a0;
        }
    };
    Context.prototype.getLineDash = function () {
        return this._context.getLineDash();
    };
    Context.prototype.setTransform = function (a0, a1, a2, a3, a4, a5) {
        this._context.setTransform(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.stroke = function () {
        this._context.stroke();
    };
    Context.prototype.strokeText = function (a0, a1, a2, a3) {
        this._context.strokeText(a0, a1, a2, a3);
    };
    Context.prototype.transform = function (a0, a1, a2, a3, a4, a5) {
        this._context.transform(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.translate = function (a0, a1) {
        this._context.translate(a0, a1);
    };
    Context.prototype._enableTrace = function () {
        var that = this, len = CONTEXT_METHODS.length, _simplifyArray = Util_1.Util._simplifyArray, origSetter = this.setAttr, n, args;
        var func = function (methodName) {
            var origMethod = that[methodName], ret;
            that[methodName] = function () {
                args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
                ret = origMethod.apply(that, arguments);
                that._trace({
                    method: methodName,
                    args: args
                });
                return ret;
            };
        };
        for (n = 0; n < len; n++) {
            func(CONTEXT_METHODS[n]);
        }
        that.setAttr = function () {
            origSetter.apply(that, arguments);
            var prop = arguments[0];
            var val = arguments[1];
            if (prop === 'shadowOffsetX' ||
                prop === 'shadowOffsetY' ||
                prop === 'shadowBlur') {
                val = val / this.canvas.getPixelRatio();
            }
            that._trace({
                property: prop,
                val: val
            });
        };
    };
    Context.prototype._applyGlobalCompositeOperation = function (node) {
        var globalCompositeOperation = node.getGlobalCompositeOperation();
        if (globalCompositeOperation !== 'source-over') {
            this.setAttr('globalCompositeOperation', globalCompositeOperation);
        }
    };
    return Context;
}());
exports.Context = Context;
CONTEXT_PROPERTIES.forEach(function (prop) {
    Object.defineProperty(Context.prototype, prop, {
        get: function () {
            return this._context[prop];
        },
        set: function (val) {
            this._context[prop] = val;
        }
    });
});
var SceneContext = (function (_super) {
    __extends(SceneContext, _super);
    function SceneContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneContext.prototype._fillColor = function (shape) {
        var fill = shape.fill();
        this.setAttr('fillStyle', fill);
        shape._fillFunc(this);
    };
    SceneContext.prototype._fillPattern = function (shape) {
        var fillPatternX = shape.getFillPatternX(), fillPatternY = shape.getFillPatternY(), fillPatternRotation = Global_1.Konva.getAngle(shape.getFillPatternRotation()), fillPatternOffsetX = shape.getFillPatternOffsetX(), fillPatternOffsetY = shape.getFillPatternOffsetY(), fillPatternScaleX = shape.getFillPatternScaleX(), fillPatternScaleY = shape.getFillPatternScaleY();
        if (fillPatternX || fillPatternY) {
            this.translate(fillPatternX || 0, fillPatternY || 0);
        }
        if (fillPatternRotation) {
            this.rotate(fillPatternRotation);
        }
        if (fillPatternScaleX || fillPatternScaleY) {
            this.scale(fillPatternScaleX, fillPatternScaleY);
        }
        if (fillPatternOffsetX || fillPatternOffsetY) {
            this.translate(-1 * fillPatternOffsetX, -1 * fillPatternOffsetY);
        }
        this.setAttr('fillStyle', shape._getFillPattern());
        shape._fillFunc(this);
    };
    SceneContext.prototype._fillLinearGradient = function (shape) {
        var grd = shape._getLinearGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    };
    SceneContext.prototype._fillRadialGradient = function (shape) {
        var grd = shape._getRadialGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    };
    SceneContext.prototype._fill = function (shape) {
        var hasColor = shape.fill(), fillPriority = shape.getFillPriority();
        if (hasColor && fillPriority === 'color') {
            this._fillColor(shape);
            return;
        }
        var hasPattern = shape.getFillPatternImage();
        if (hasPattern && fillPriority === 'pattern') {
            this._fillPattern(shape);
            return;
        }
        var hasLinearGradient = shape.getFillLinearGradientColorStops();
        if (hasLinearGradient && fillPriority === 'linear-gradient') {
            this._fillLinearGradient(shape);
            return;
        }
        var hasRadialGradient = shape.getFillRadialGradientColorStops();
        if (hasRadialGradient && fillPriority === 'radial-gradient') {
            this._fillRadialGradient(shape);
            return;
        }
        if (hasColor) {
            this._fillColor(shape);
        }
        else if (hasPattern) {
            this._fillPattern(shape);
        }
        else if (hasLinearGradient) {
            this._fillLinearGradient(shape);
        }
        else if (hasRadialGradient) {
            this._fillRadialGradient(shape);
        }
    };
    SceneContext.prototype._strokeLinearGradient = function (shape) {
        var start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
        if (colorStops) {
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            this.setAttr('strokeStyle', grd);
        }
    };
    SceneContext.prototype._stroke = function (shape) {
        var dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
        if (shape.hasStroke()) {
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            if (dash && shape.dashEnabled()) {
                this.setLineDash(dash);
                this.setAttr('lineDashOffset', shape.dashOffset());
            }
            this.setAttr('lineWidth', shape.strokeWidth());
            if (!shape.getShadowForStrokeEnabled()) {
                this.setAttr('shadowColor', 'rgba(0,0,0,0)');
            }
            var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
            if (hasLinearGradient) {
                this._strokeLinearGradient(shape);
            }
            else {
                this.setAttr('strokeStyle', shape.stroke());
            }
            shape._strokeFunc(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    };
    SceneContext.prototype._applyShadow = function (shape) {
        var util = Util_1.Util, color = util.get(shape.getShadowRGBA(), 'black'), blur = util.get(shape.getShadowBlur(), 5), offset = util.get(shape.getShadowOffset(), {
            x: 0,
            y: 0
        }), scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
        this.setAttr('shadowColor', color);
        this.setAttr('shadowBlur', blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
        this.setAttr('shadowOffsetX', offset.x * scaleX);
        this.setAttr('shadowOffsetY', offset.y * scaleY);
    };
    return SceneContext;
}(Context));
exports.SceneContext = SceneContext;
var HitContext = (function (_super) {
    __extends(HitContext, _super);
    function HitContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HitContext.prototype._fill = function (shape) {
        this.save();
        this.setAttr('fillStyle', shape.colorKey);
        shape._fillFuncHit(this);
        this.restore();
    };
    HitContext.prototype.strokeShape = function (shape) {
        if (shape.hasHitStroke()) {
            this._stroke(shape);
        }
    };
    HitContext.prototype._stroke = function (shape) {
        if (shape.hasHitStroke()) {
            var strokeScaleEnabled = shape.getStrokeScaleEnabled();
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            var hitStrokeWidth = shape.hitStrokeWidth();
            var strokeWidth = hitStrokeWidth === 'auto' ? shape.strokeWidth() : hitStrokeWidth;
            this.setAttr('lineWidth', strokeWidth);
            this.setAttr('strokeStyle', shape.colorKey);
            shape._strokeFuncHit(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    };
    return HitContext;
}(Context));
exports.HitContext = HitContext;

},{"./Util":"../node_modules/konva/lib/Util.js","./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/Canvas.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Context_1 = require("./Context");
var Global_1 = require("./Global");
var Factory_1 = require("./Factory");
var Validators_1 = require("./Validators");
var _pixelRatio;
function getDevicePixelRatio() {
    if (_pixelRatio) {
        return _pixelRatio;
    }
    var canvas = Util_1.Util.createCanvasElement();
    var context = canvas.getContext('2d');
    _pixelRatio = (function () {
        var devicePixelRatio = Global_1.Konva._global.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
        return devicePixelRatio / backingStoreRatio;
    })();
    return _pixelRatio;
}
var Canvas = (function () {
    function Canvas(config) {
        this.pixelRatio = 1;
        this.width = 0;
        this.height = 0;
        this.isCache = false;
        var conf = config || {};
        var pixelRatio = conf.pixelRatio || Global_1.Konva.pixelRatio || getDevicePixelRatio();
        this.pixelRatio = pixelRatio;
        this._canvas = Util_1.Util.createCanvasElement();
        this._canvas.style.padding = '0';
        this._canvas.style.margin = '0';
        this._canvas.style.border = '0';
        this._canvas.style.background = 'transparent';
        this._canvas.style.position = 'absolute';
        this._canvas.style.top = '0';
        this._canvas.style.left = '0';
    }
    Canvas.prototype.getContext = function () {
        return this.context;
    };
    Canvas.prototype.getPixelRatio = function () {
        return this.pixelRatio;
    };
    Canvas.prototype.setPixelRatio = function (pixelRatio) {
        var previousRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
    };
    Canvas.prototype.setWidth = function (width) {
        this.width = this._canvas.width = width * this.pixelRatio;
        this._canvas.style.width = width + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    };
    Canvas.prototype.setHeight = function (height) {
        this.height = this._canvas.height = height * this.pixelRatio;
        this._canvas.style.height = height + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    };
    Canvas.prototype.getWidth = function () {
        return this.width;
    };
    Canvas.prototype.getHeight = function () {
        return this.height;
    };
    Canvas.prototype.setSize = function (width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };
    Canvas.prototype.toDataURL = function (mimeType, quality) {
        try {
            return this._canvas.toDataURL(mimeType, quality);
        }
        catch (e) {
            try {
                return this._canvas.toDataURL();
            }
            catch (err) {
                Util_1.Util.error('Unable to get data URL. ' + err.message);
                return '';
            }
        }
    };
    return Canvas;
}());
exports.Canvas = Canvas;
Factory_1.Factory.addGetterSetter(Canvas, 'pixelRatio', undefined, Validators_1.getNumberValidator());
var SceneCanvas = (function (_super) {
    __extends(SceneCanvas, _super);
    function SceneCanvas(config) {
        if (config === void 0) { config = { width: 0, height: 0 }; }
        var _this = _super.call(this, config) || this;
        _this.context = new Context_1.SceneContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
    }
    return SceneCanvas;
}(Canvas));
exports.SceneCanvas = SceneCanvas;
var HitCanvas = (function (_super) {
    __extends(HitCanvas, _super);
    function HitCanvas(config) {
        if (config === void 0) { config = { width: 0, height: 0 }; }
        var _this = _super.call(this, config) || this;
        _this.hitCanvas = true;
        _this.context = new Context_1.HitContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
    }
    return HitCanvas;
}(Canvas));
exports.HitCanvas = HitCanvas;

},{"./Util":"../node_modules/konva/lib/Util.js","./Context":"../node_modules/konva/lib/Context.js","./Global":"../node_modules/konva/lib/Global.js","./Factory":"../node_modules/konva/lib/Factory.js","./Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/DragAndDrop.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Util_1 = require("./Util");
exports.DD = {
    get isDragging() {
        var flag = false;
        exports.DD._dragElements.forEach(function (elem) {
            if (elem.dragStatus === 'dragging') {
                flag = true;
            }
        });
        return flag;
    },
    justDragged: false,
    get node() {
        var node;
        exports.DD._dragElements.forEach(function (elem) {
            node = elem.node;
        });
        return node;
    },
    _dragElements: new Map(),
    _drag: function (evt) {
        exports.DD._dragElements.forEach(function (elem, key) {
            var node = elem.node;
            var stage = node.getStage();
            stage.setPointersPositions(evt);
            if (elem.pointerId === undefined) {
                elem.pointerId = Util_1.Util._getFirstPointerId(evt);
            }
            var pos = stage._changedPointerPositions.find(function (pos) { return pos.id === elem.pointerId; });
            if (!pos) {
                return;
            }
            if (elem.dragStatus !== 'dragging') {
                var dragDistance = node.dragDistance();
                var distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));
                if (distance < dragDistance) {
                    return;
                }
                node.startDrag({ evt: evt });
                if (!node.isDragging()) {
                    return;
                }
            }
            node._setDragPosition(evt, elem);
            node.fire('dragmove', {
                type: 'dragmove',
                target: node,
                evt: evt
            }, true);
        });
    },
    _endDragBefore: function (evt) {
        exports.DD._dragElements.forEach(function (elem, key) {
            var node = elem.node;
            var stage = node.getStage();
            if (evt) {
                stage.setPointersPositions(evt);
            }
            var pos = stage._changedPointerPositions.find(function (pos) { return pos.id === elem.pointerId; });
            if (!pos) {
                return;
            }
            if (elem.dragStatus === 'dragging' || elem.dragStatus === 'stopped') {
                exports.DD.justDragged = true;
                Global_1.Konva.listenClickTap = false;
                elem.dragStatus = 'stopped';
            }
            var drawNode = elem.node.getLayer() ||
                (elem.node instanceof Global_1.Konva['Stage'] && elem.node);
            if (drawNode) {
                drawNode.draw();
            }
        });
    },
    _endDragAfter: function (evt) {
        exports.DD._dragElements.forEach(function (elem, key) {
            if (elem.dragStatus === 'stopped') {
                elem.node.fire('dragend', {
                    type: 'dragend',
                    target: elem.node,
                    evt: evt
                }, true);
            }
            if (elem.dragStatus !== 'dragging') {
                exports.DD._dragElements.delete(key);
            }
        });
    }
};
if (Global_1.Konva.isBrowser) {
    window.addEventListener('mouseup', exports.DD._endDragBefore, true);
    window.addEventListener('touchend', exports.DD._endDragBefore, true);
    window.addEventListener('mousemove', exports.DD._drag);
    window.addEventListener('touchmove', exports.DD._drag);
    window.addEventListener('mouseup', exports.DD._endDragAfter, false);
    window.addEventListener('touchend', exports.DD._endDragAfter, false);
}

},{"./Global":"../node_modules/konva/lib/Global.js","./Util":"../node_modules/konva/lib/Util.js"}],"../node_modules/konva/lib/Node.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Factory_1 = require("./Factory");
var Canvas_1 = require("./Canvas");
var Global_1 = require("./Global");
var DragAndDrop_1 = require("./DragAndDrop");
var Validators_1 = require("./Validators");
exports.ids = {};
exports.names = {};
var _addId = function (node, id) {
    if (!id) {
        return;
    }
    exports.ids[id] = node;
};
exports._removeId = function (id, node) {
    if (!id) {
        return;
    }
    if (exports.ids[id] !== node) {
        return;
    }
    delete exports.ids[id];
};
exports._addName = function (node, name) {
    if (name) {
        if (!exports.names[name]) {
            exports.names[name] = [];
        }
        exports.names[name].push(node);
    }
};
exports._removeName = function (name, _id) {
    if (!name) {
        return;
    }
    var nodes = exports.names[name];
    if (!nodes) {
        return;
    }
    for (var n = 0; n < nodes.length; n++) {
        var no = nodes[n];
        if (no._id === _id) {
            nodes.splice(n, 1);
        }
    }
    if (nodes.length === 0) {
        delete exports.names[name];
    }
};
var ABSOLUTE_OPACITY = 'absoluteOpacity', ABSOLUTE_TRANSFORM = 'absoluteTransform', ABSOLUTE_SCALE = 'absoluteScale', CANVAS = 'canvas', CHANGE = 'Change', CHILDREN = 'children', KONVA = 'konva', LISTENING = 'listening', MOUSEENTER = 'mouseenter', MOUSELEAVE = 'mouseleave', NAME = 'name', SET = 'set', SHAPE = 'Shape', SPACE = ' ', STAGE = 'stage', TRANSFORM = 'transform', UPPER_STAGE = 'Stage', VISIBLE = 'visible', CLONE_BLACK_LIST = ['id'], TRANSFORM_CHANGE_STR = [
    'xChange.konva',
    'yChange.konva',
    'scaleXChange.konva',
    'scaleYChange.konva',
    'skewXChange.konva',
    'skewYChange.konva',
    'rotationChange.konva',
    'offsetXChange.konva',
    'offsetYChange.konva',
    'transformsEnabledChange.konva'
].join(SPACE), SCALE_CHANGE_STR = ['scaleXChange.konva', 'scaleYChange.konva'].join(SPACE);
var emptyChildren = new Util_1.Collection();
var idCounter = 1;
var Node = (function () {
    function Node(config) {
        var _this = this;
        this._id = idCounter++;
        this.eventListeners = {};
        this.attrs = {};
        this.index = 0;
        this.parent = null;
        this._cache = new Map();
        this._lastPos = null;
        this._filterUpToDate = false;
        this._isUnderCache = false;
        this.children = emptyChildren;
        this._dragEventId = null;
        this.setAttrs(config);
        this.on(TRANSFORM_CHANGE_STR, function () {
            _this._clearCache(TRANSFORM);
            _this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        });
        this.on(SCALE_CHANGE_STR, function () {
            _this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        });
        this.on('visibleChange.konva', function () {
            _this._clearSelfAndDescendantCache(VISIBLE);
        });
        this.on('listeningChange.konva', function () {
            _this._clearSelfAndDescendantCache(LISTENING);
        });
        this.on('opacityChange.konva', function () {
            _this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        });
    }
    Node.prototype.hasChildren = function () {
        return false;
    };
    Node.prototype.getChildren = function () {
        return emptyChildren;
    };
    Node.prototype._clearCache = function (attr) {
        if (attr) {
            this._cache.delete(attr);
        }
        else {
            this._cache.clear();
        }
    };
    Node.prototype._getCache = function (attr, privateGetter) {
        var cache = this._cache.get(attr);
        if (cache === undefined) {
            cache = privateGetter.call(this);
            this._cache.set(attr, cache);
        }
        return cache;
    };
    Node.prototype._getCanvasCache = function () {
        return this._cache.get(CANVAS);
    };
    Node.prototype._clearSelfAndDescendantCache = function (attr) {
        this._clearCache(attr);
        if (this.isCached()) {
            return;
        }
        if (this.children) {
            this.children.each(function (node) {
                node._clearSelfAndDescendantCache(attr);
            });
        }
    };
    Node.prototype.clearCache = function () {
        this._cache.delete(CANVAS);
        this._clearSelfAndDescendantCache();
        return this;
    };
    Node.prototype.cache = function (config) {
        var conf = config || {};
        var rect = {};
        if (conf.x === undefined ||
            conf.y === undefined ||
            conf.width === undefined ||
            conf.height === undefined) {
            rect = this.getClientRect({
                skipTransform: true,
                relativeTo: this.getParent()
            });
        }
        var width = Math.ceil(conf.width || rect.width), height = Math.ceil(conf.height || rect.height), pixelRatio = conf.pixelRatio, x = conf.x === undefined ? rect.x : conf.x, y = conf.y === undefined ? rect.y : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false;
        if (!width || !height) {
            Util_1.Util.error('Can not cache the node. Width or height of the node equals 0. Caching is skipped.');
            return;
        }
        width += offset * 2;
        height += offset * 2;
        x -= offset;
        y -= offset;
        var cachedSceneCanvas = new Canvas_1.SceneCanvas({
            pixelRatio: pixelRatio,
            width: width,
            height: height
        }), cachedFilterCanvas = new Canvas_1.SceneCanvas({
            pixelRatio: pixelRatio,
            width: width,
            height: height
        }), cachedHitCanvas = new Canvas_1.HitCanvas({
            pixelRatio: 1,
            width: width,
            height: height
        }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
        cachedHitCanvas.isCache = true;
        this._cache.delete('canvas');
        this._filterUpToDate = false;
        if (conf.imageSmoothingEnabled === false) {
            cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
            cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
            cachedHitCanvas.getContext()._context.imageSmoothingEnabled = false;
        }
        sceneContext.save();
        hitContext.save();
        sceneContext.translate(-x, -y);
        hitContext.translate(-x, -y);
        this._isUnderCache = true;
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this.drawScene(cachedSceneCanvas, this, true);
        this.drawHit(cachedHitCanvas, this, true);
        this._isUnderCache = false;
        sceneContext.restore();
        hitContext.restore();
        if (drawBorder) {
            sceneContext.save();
            sceneContext.beginPath();
            sceneContext.rect(0, 0, width, height);
            sceneContext.closePath();
            sceneContext.setAttr('strokeStyle', 'red');
            sceneContext.setAttr('lineWidth', 5);
            sceneContext.stroke();
            sceneContext.restore();
        }
        this._cache.set(CANVAS, {
            scene: cachedSceneCanvas,
            filter: cachedFilterCanvas,
            hit: cachedHitCanvas,
            x: x,
            y: y
        });
        return this;
    };
    Node.prototype.isCached = function () {
        return this._cache.has('canvas');
    };
    Node.prototype.getClientRect = function (config) {
        throw new Error('abstract "getClientRect" method call');
    };
    Node.prototype._transformedRect = function (rect, top) {
        var points = [
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.width, y: rect.y },
            { x: rect.x + rect.width, y: rect.y + rect.height },
            { x: rect.x, y: rect.y + rect.height }
        ];
        var minX, minY, maxX, maxY;
        var trans = this.getAbsoluteTransform(top);
        points.forEach(function (point) {
            var transformed = trans.point(point);
            if (minX === undefined) {
                minX = maxX = transformed.x;
                minY = maxY = transformed.y;
            }
            minX = Math.min(minX, transformed.x);
            minY = Math.min(minY, transformed.y);
            maxX = Math.max(maxX, transformed.x);
            maxY = Math.max(maxY, transformed.y);
        });
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    };
    Node.prototype._drawCachedSceneCanvas = function (context) {
        context.save();
        context._applyOpacity(this);
        context._applyGlobalCompositeOperation(this);
        var canvasCache = this._getCanvasCache();
        context.translate(canvasCache.x, canvasCache.y);
        var cacheCanvas = this._getCachedSceneCanvas();
        var ratio = cacheCanvas.pixelRatio;
        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
        context.restore();
    };
    Node.prototype._drawCachedHitCanvas = function (context) {
        var canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
        context.save();
        context.translate(canvasCache.x, canvasCache.y);
        context.drawImage(hitCanvas._canvas, 0, 0);
        context.restore();
    };
    Node.prototype._getCachedSceneCanvas = function () {
        var filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
        if (filters) {
            if (!this._filterUpToDate) {
                var ratio = sceneCanvas.pixelRatio;
                try {
                    len = filters.length;
                    filterContext.clear();
                    filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
                    imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
                    for (n = 0; n < len; n++) {
                        filter = filters[n];
                        if (typeof filter !== 'function') {
                            Util_1.Util.error('Filter should be type of function, but got ' +
                                typeof filter +
                                ' insted. Please check correct filters');
                            continue;
                        }
                        filter.call(this, imageData);
                        filterContext.putImageData(imageData, 0, 0);
                    }
                }
                catch (e) {
                    Util_1.Util.error('Unable to apply filter. ' + e.message);
                }
                this._filterUpToDate = true;
            }
            return filterCanvas;
        }
        return sceneCanvas;
    };
    Node.prototype.on = function (evtStr, handler) {
        if (arguments.length === 3) {
            return this._delegate.apply(this, arguments);
        }
        var events = evtStr.split(SPACE), len = events.length, n, event, parts, baseEvent, name;
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1] || '';
            if (!this.eventListeners[baseEvent]) {
                this.eventListeners[baseEvent] = [];
            }
            this.eventListeners[baseEvent].push({
                name: name,
                handler: handler
            });
        }
        return this;
    };
    Node.prototype.off = function (evtStr, callback) {
        var events = (evtStr || '').split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
        if (!evtStr) {
            for (t in this.eventListeners) {
                this._off(t);
            }
        }
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1];
            if (baseEvent) {
                if (this.eventListeners[baseEvent]) {
                    this._off(baseEvent, name, callback);
                }
            }
            else {
                for (t in this.eventListeners) {
                    this._off(t, name, callback);
                }
            }
        }
        return this;
    };
    Node.prototype.dispatchEvent = function (evt) {
        var e = {
            target: this,
            type: evt.type,
            evt: evt
        };
        this.fire(evt.type, e);
        return this;
    };
    Node.prototype.addEventListener = function (type, handler) {
        this.on(type, function (evt) {
            handler.call(this, evt.evt);
        });
        return this;
    };
    Node.prototype.removeEventListener = function (type) {
        this.off(type);
        return this;
    };
    Node.prototype._delegate = function (event, selector, handler) {
        var stopNode = this;
        this.on(event, function (evt) {
            var targets = evt.target.findAncestors(selector, true, stopNode);
            for (var i = 0; i < targets.length; i++) {
                evt = Util_1.Util.cloneObject(evt);
                evt.currentTarget = targets[i];
                handler.call(targets[i], evt);
            }
        });
    };
    Node.prototype.remove = function () {
        if (this.isDragging()) {
            this.stopDrag();
        }
        DragAndDrop_1.DD._dragElements.delete(this._id);
        this._remove();
        return this;
    };
    Node.prototype._clearCaches = function () {
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this._clearSelfAndDescendantCache(STAGE);
        this._clearSelfAndDescendantCache(VISIBLE);
        this._clearSelfAndDescendantCache(LISTENING);
    };
    Node.prototype._remove = function () {
        this._clearCaches();
        var parent = this.getParent();
        if (parent && parent.children) {
            parent.children.splice(this.index, 1);
            parent._setChildrenIndices();
            this.parent = null;
        }
    };
    Node.prototype.destroy = function () {
        exports._removeId(this.id(), this);
        var names = (this.name() || '').split(/\s/g);
        for (var i = 0; i < names.length; i++) {
            var subname = names[i];
            exports._removeName(subname, this._id);
        }
        this.remove();
        return this;
    };
    Node.prototype.getAttr = function (attr) {
        var method = 'get' + Util_1.Util._capitalize(attr);
        if (Util_1.Util._isFunction(this[method])) {
            return this[method]();
        }
        return this.attrs[attr];
    };
    Node.prototype.getAncestors = function () {
        var parent = this.getParent(), ancestors = new Util_1.Collection();
        while (parent) {
            ancestors.push(parent);
            parent = parent.getParent();
        }
        return ancestors;
    };
    Node.prototype.getAttrs = function () {
        return this.attrs || {};
    };
    Node.prototype.setAttrs = function (config) {
        var key, method;
        if (!config) {
            return this;
        }
        for (key in config) {
            if (key === CHILDREN) {
                continue;
            }
            method = SET + Util_1.Util._capitalize(key);
            if (Util_1.Util._isFunction(this[method])) {
                this[method](config[key]);
            }
            else {
                this._setAttr(key, config[key]);
            }
        }
        return this;
    };
    Node.prototype.isListening = function () {
        return this._getCache(LISTENING, this._isListening);
    };
    Node.prototype._isListening = function () {
        var listening = this.listening(), parent = this.getParent();
        if (listening === 'inherit') {
            if (parent) {
                return parent.isListening();
            }
            else {
                return true;
            }
        }
        else {
            return listening;
        }
    };
    Node.prototype.isVisible = function () {
        return this._getCache(VISIBLE, this._isVisible);
    };
    Node.prototype._isVisible = function (relativeTo) {
        var visible = this.visible(), parent = this.getParent();
        if (visible === 'inherit') {
            if (parent && parent !== relativeTo) {
                return parent._isVisible(relativeTo);
            }
            else {
                return true;
            }
        }
        else if (relativeTo && relativeTo !== parent) {
            return visible && parent._isVisible(relativeTo);
        }
        else {
            return visible;
        }
    };
    Node.prototype.shouldDrawHit = function () {
        var layer = this.getLayer();
        return ((!layer && this.isListening() && this.isVisible()) ||
            (layer &&
                layer.hitGraphEnabled() &&
                this.isListening() &&
                this.isVisible()));
    };
    Node.prototype.show = function () {
        this.visible(true);
        return this;
    };
    Node.prototype.hide = function () {
        this.visible(false);
        return this;
    };
    Node.prototype.getZIndex = function () {
        return this.index || 0;
    };
    Node.prototype.getAbsoluteZIndex = function () {
        var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
        function addChildren(children) {
            nodes = [];
            len = children.length;
            for (n = 0; n < len; n++) {
                child = children[n];
                index++;
                if (child.nodeType !== SHAPE) {
                    nodes = nodes.concat(child.getChildren().toArray());
                }
                if (child._id === that._id) {
                    n = len;
                }
            }
            if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
                addChildren(nodes);
            }
        }
        if (that.nodeType !== UPPER_STAGE) {
            addChildren(that.getStage().getChildren());
        }
        return index;
    };
    Node.prototype.getDepth = function () {
        var depth = 0, parent = this.parent;
        while (parent) {
            depth++;
            parent = parent.parent;
        }
        return depth;
    };
    Node.prototype.setPosition = function (pos) {
        this.x(pos.x);
        this.y(pos.y);
        return this;
    };
    Node.prototype.getPosition = function () {
        return {
            x: this.x(),
            y: this.y()
        };
    };
    Node.prototype.getAbsolutePosition = function (top) {
        var haveCachedParent = false;
        var parent = this.parent;
        while (parent) {
            if (parent.isCached()) {
                haveCachedParent = true;
                break;
            }
            parent = parent.parent;
        }
        if (haveCachedParent && !top) {
            top = true;
        }
        var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util_1.Transform(), offset = this.offset();
        absoluteTransform.m = absoluteMatrix.slice();
        absoluteTransform.translate(offset.x, offset.y);
        return absoluteTransform.getTranslation();
    };
    Node.prototype.setAbsolutePosition = function (pos) {
        var origTrans = this._clearTransform(), it;
        this.attrs.x = origTrans.x;
        this.attrs.y = origTrans.y;
        delete origTrans.x;
        delete origTrans.y;
        it = this.getAbsoluteTransform();
        it.invert();
        it.translate(pos.x, pos.y);
        pos = {
            x: this.attrs.x + it.getTranslation().x,
            y: this.attrs.y + it.getTranslation().y
        };
        this.setPosition({ x: pos.x, y: pos.y });
        this._setTransform(origTrans);
        return this;
    };
    Node.prototype._setTransform = function (trans) {
        var key;
        for (key in trans) {
            this.attrs[key] = trans[key];
        }
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    };
    Node.prototype._clearTransform = function () {
        var trans = {
            x: this.x(),
            y: this.y(),
            rotation: this.rotation(),
            scaleX: this.scaleX(),
            scaleY: this.scaleY(),
            offsetX: this.offsetX(),
            offsetY: this.offsetY(),
            skewX: this.skewX(),
            skewY: this.skewY()
        };
        this.attrs.x = 0;
        this.attrs.y = 0;
        this.attrs.rotation = 0;
        this.attrs.scaleX = 1;
        this.attrs.scaleY = 1;
        this.attrs.offsetX = 0;
        this.attrs.offsetY = 0;
        this.attrs.skewX = 0;
        this.attrs.skewY = 0;
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        return trans;
    };
    Node.prototype.move = function (change) {
        var changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
        if (changeX !== undefined) {
            x += changeX;
        }
        if (changeY !== undefined) {
            y += changeY;
        }
        this.setPosition({ x: x, y: y });
        return this;
    };
    Node.prototype._eachAncestorReverse = function (func, top) {
        var family = [], parent = this.getParent(), len, n;
        if (top && top._id === this._id) {
            func(this);
            return;
        }
        family.unshift(this);
        while (parent && (!top || parent._id !== top._id)) {
            family.unshift(parent);
            parent = parent.parent;
        }
        len = family.length;
        for (n = 0; n < len; n++) {
            func(family[n]);
        }
    };
    Node.prototype.rotate = function (theta) {
        this.rotation(this.rotation() + theta);
        return this;
    };
    Node.prototype.moveToTop = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveToTop function is ignored.');
            return false;
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.push(this);
        this.parent._setChildrenIndices();
        return true;
    };
    Node.prototype.moveUp = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveUp function is ignored.');
            return false;
        }
        var index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index + 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.moveDown = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveDown function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index - 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.moveToBottom = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveToBottom function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.unshift(this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.setZIndex = function (zIndex) {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. zIndex parameter is ignored.');
            return this;
        }
        if (zIndex < 0 || zIndex >= this.parent.children.length) {
            Util_1.Util.warn('Unexpected value ' +
                zIndex +
                ' for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to ' +
                (this.parent.children.length - 1) +
                '.');
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.splice(zIndex, 0, this);
        this.parent._setChildrenIndices();
        return this;
    };
    Node.prototype.getAbsoluteOpacity = function () {
        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
    };
    Node.prototype._getAbsoluteOpacity = function () {
        var absOpacity = this.opacity();
        var parent = this.getParent();
        if (parent && !parent._isUnderCache) {
            absOpacity *= parent.getAbsoluteOpacity();
        }
        return absOpacity;
    };
    Node.prototype.moveTo = function (newContainer) {
        if (this.getParent() !== newContainer) {
            this._remove();
            newContainer.add(this);
        }
        return this;
    };
    Node.prototype.toObject = function () {
        var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
        obj.attrs = {};
        for (key in attrs) {
            val = attrs[key];
            nonPlainObject =
                Util_1.Util.isObject(val) && !Util_1.Util._isPlainObject(val) && !Util_1.Util._isArray(val);
            if (nonPlainObject) {
                continue;
            }
            getter = typeof this[key] === 'function' && this[key];
            delete attrs[key];
            defaultValue = getter ? getter.call(this) : null;
            attrs[key] = val;
            if (defaultValue !== val) {
                obj.attrs[key] = val;
            }
        }
        obj.className = this.getClassName();
        return Util_1.Util._prepareToStringify(obj);
    };
    Node.prototype.toJSON = function () {
        return JSON.stringify(this.toObject());
    };
    Node.prototype.getParent = function () {
        return this.parent;
    };
    Node.prototype.findAncestors = function (selector, includeSelf, stopNode) {
        var res = [];
        if (includeSelf && this._isMatch(selector)) {
            res.push(this);
        }
        var ancestor = this.parent;
        while (ancestor) {
            if (ancestor === stopNode) {
                return res;
            }
            if (ancestor._isMatch(selector)) {
                res.push(ancestor);
            }
            ancestor = ancestor.parent;
        }
        return res;
    };
    Node.prototype.isAncestorOf = function (node) {
        return false;
    };
    Node.prototype.findAncestor = function (selector, includeSelf, stopNode) {
        return this.findAncestors(selector, includeSelf, stopNode)[0];
    };
    Node.prototype._isMatch = function (selector) {
        if (!selector) {
            return false;
        }
        if (typeof selector === 'function') {
            return selector(this);
        }
        var selectorArr = selector.replace(/ /g, '').split(','), len = selectorArr.length, n, sel;
        for (n = 0; n < len; n++) {
            sel = selectorArr[n];
            if (!Util_1.Util.isValidSelector(sel)) {
                Util_1.Util.warn('Selector "' +
                    sel +
                    '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
                Util_1.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
                Util_1.Util.warn('Konva is awesome, right?');
            }
            if (sel.charAt(0) === '#') {
                if (this.id() === sel.slice(1)) {
                    return true;
                }
            }
            else if (sel.charAt(0) === '.') {
                if (this.hasName(sel.slice(1))) {
                    return true;
                }
            }
            else if (this.className === sel || this.nodeType === sel) {
                return true;
            }
        }
        return false;
    };
    Node.prototype.getLayer = function () {
        var parent = this.getParent();
        return parent ? parent.getLayer() : null;
    };
    Node.prototype.getStage = function () {
        return this._getCache(STAGE, this._getStage);
    };
    Node.prototype._getStage = function () {
        var parent = this.getParent();
        if (parent) {
            return parent.getStage();
        }
        else {
            return undefined;
        }
    };
    Node.prototype.fire = function (eventType, evt, bubble) {
        evt = evt || {};
        evt.target = evt.target || this;
        if (bubble) {
            this._fireAndBubble(eventType, evt);
        }
        else {
            this._fire(eventType, evt);
        }
        return this;
    };
    Node.prototype.getAbsoluteTransform = function (top) {
        if (top) {
            return this._getAbsoluteTransform(top);
        }
        else {
            return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
        }
    };
    Node.prototype._getAbsoluteTransform = function (top) {
        var at;
        if (top) {
            at = new Util_1.Transform();
            this._eachAncestorReverse(function (node) {
                var transformsEnabled = node.transformsEnabled();
                if (transformsEnabled === 'all') {
                    at.multiply(node.getTransform());
                }
                else if (transformsEnabled === 'position') {
                    at.translate(node.x() - node.offsetX(), node.y() - node.offsetY());
                }
            }, top);
            return at;
        }
        else {
            if (this.parent) {
                at = this.parent.getAbsoluteTransform().copy();
            }
            else {
                at = new Util_1.Transform();
            }
            var transformsEnabled = this.transformsEnabled();
            if (transformsEnabled === 'all') {
                at.multiply(this.getTransform());
            }
            else if (transformsEnabled === 'position') {
                at.translate(this.x() - this.offsetX(), this.y() - this.offsetY());
            }
            return at;
        }
    };
    Node.prototype.getAbsoluteScale = function (top) {
        if (top) {
            return this._getAbsoluteScale(top);
        }
        else {
            return this._getCache(ABSOLUTE_SCALE, this._getAbsoluteScale);
        }
    };
    Node.prototype._getAbsoluteScale = function (top) {
        var parent = this;
        while (parent) {
            if (parent._isUnderCache) {
                top = parent;
            }
            parent = parent.getParent();
        }
        var scaleX = 1, scaleY = 1;
        this._eachAncestorReverse(function (node) {
            scaleX *= node.scaleX();
            scaleY *= node.scaleY();
        }, top);
        return {
            x: scaleX,
            y: scaleY
        };
    };
    Node.prototype.getAbsoluteRotation = function () {
        var parent = this;
        var rotation = 0;
        while (parent) {
            rotation += parent.rotation();
            parent = parent.getParent();
        }
        return rotation;
    };
    Node.prototype.getTransform = function () {
        return this._getCache(TRANSFORM, this._getTransform);
    };
    Node.prototype._getTransform = function () {
        var m = new Util_1.Transform(), x = this.x(), y = this.y(), rotation = Global_1.Konva.getAngle(this.rotation()), scaleX = this.scaleX(), scaleY = this.scaleY(), skewX = this.skewX(), skewY = this.skewY(), offsetX = this.offsetX(), offsetY = this.offsetY();
        if (x !== 0 || y !== 0) {
            m.translate(x, y);
        }
        if (rotation !== 0) {
            m.rotate(rotation);
        }
        if (skewX !== 0 || skewY !== 0) {
            m.skew(skewX, skewY);
        }
        if (scaleX !== 1 || scaleY !== 1) {
            m.scale(scaleX, scaleY);
        }
        if (offsetX !== 0 || offsetY !== 0) {
            m.translate(-1 * offsetX, -1 * offsetY);
        }
        return m;
    };
    Node.prototype.clone = function (obj) {
        var attrs = Util_1.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
        for (var i in CLONE_BLACK_LIST) {
            var blockAttr = CLONE_BLACK_LIST[i];
            delete attrs[blockAttr];
        }
        for (key in obj) {
            attrs[key] = obj[key];
        }
        var node = new this.constructor(attrs);
        for (key in this.eventListeners) {
            allListeners = this.eventListeners[key];
            len = allListeners.length;
            for (n = 0; n < len; n++) {
                listener = allListeners[n];
                if (listener.name.indexOf(KONVA) < 0) {
                    if (!node.eventListeners[key]) {
                        node.eventListeners[key] = [];
                    }
                    node.eventListeners[key].push(listener);
                }
            }
        }
        return node;
    };
    Node.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        var box = this.getClientRect();
        var stage = this.getStage(), x = config.x !== undefined ? config.x : box.x, y = config.y !== undefined ? config.y : box.y, pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
            width: config.width || box.width || (stage ? stage.width() : 0),
            height: config.height || box.height || (stage ? stage.height() : 0),
            pixelRatio: pixelRatio
        }), context = canvas.getContext();
        context.save();
        if (x || y) {
            context.translate(-1 * x, -1 * y);
        }
        this.drawScene(canvas);
        context.restore();
        return canvas;
    };
    Node.prototype.toCanvas = function (config) {
        return this._toKonvaCanvas(config)._canvas;
    };
    Node.prototype.toDataURL = function (config) {
        config = config || {};
        var mimeType = config.mimeType || null, quality = config.quality || null;
        var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
        if (config.callback) {
            config.callback(url);
        }
        return url;
    };
    Node.prototype.toImage = function (config) {
        if (!config || !config.callback) {
            throw 'callback required for toImage method config argument';
        }
        var callback = config.callback;
        delete config.callback;
        Util_1.Util._urlToImage(this.toDataURL(config), function (img) {
            callback(img);
        });
    };
    Node.prototype.setSize = function (size) {
        this.width(size.width);
        this.height(size.height);
        return this;
    };
    Node.prototype.getSize = function () {
        return {
            width: this.width(),
            height: this.height()
        };
    };
    Node.prototype.getClassName = function () {
        return this.className || this.nodeType;
    };
    Node.prototype.getType = function () {
        return this.nodeType;
    };
    Node.prototype.getDragDistance = function () {
        if (this.attrs.dragDistance !== undefined) {
            return this.attrs.dragDistance;
        }
        else if (this.parent) {
            return this.parent.getDragDistance();
        }
        else {
            return Global_1.Konva.dragDistance;
        }
    };
    Node.prototype._off = function (type, name, callback) {
        var evtListeners = this.eventListeners[type], i, evtName, handler;
        for (i = 0; i < evtListeners.length; i++) {
            evtName = evtListeners[i].name;
            handler = evtListeners[i].handler;
            if ((evtName !== 'konva' || name === 'konva') &&
                (!name || evtName === name) &&
                (!callback || callback === handler)) {
                evtListeners.splice(i, 1);
                if (evtListeners.length === 0) {
                    delete this.eventListeners[type];
                    break;
                }
                i--;
            }
        }
    };
    Node.prototype._fireChangeEvent = function (attr, oldVal, newVal) {
        this._fire(attr + CHANGE, {
            oldVal: oldVal,
            newVal: newVal
        });
    };
    Node.prototype.setId = function (id) {
        var oldId = this.id();
        exports._removeId(oldId, this);
        _addId(this, id);
        this._setAttr('id', id);
        return this;
    };
    Node.prototype.setName = function (name) {
        var oldNames = (this.name() || '').split(/\s/g);
        var newNames = (name || '').split(/\s/g);
        var subname, i;
        for (i = 0; i < oldNames.length; i++) {
            subname = oldNames[i];
            if (newNames.indexOf(subname) === -1 && subname) {
                exports._removeName(subname, this._id);
            }
        }
        for (i = 0; i < newNames.length; i++) {
            subname = newNames[i];
            if (oldNames.indexOf(subname) === -1 && subname) {
                exports._addName(this, subname);
            }
        }
        this._setAttr(NAME, name);
        return this;
    };
    Node.prototype.addName = function (name) {
        if (!this.hasName(name)) {
            var oldName = this.name();
            var newName = oldName ? oldName + ' ' + name : name;
            this.setName(newName);
        }
        return this;
    };
    Node.prototype.hasName = function (name) {
        if (!name) {
            return false;
        }
        var fullName = this.name();
        if (!fullName) {
            return false;
        }
        var names = (fullName || '').split(/\s/g);
        return names.indexOf(name) !== -1;
    };
    Node.prototype.removeName = function (name) {
        var names = (this.name() || '').split(/\s/g);
        var index = names.indexOf(name);
        if (index !== -1) {
            names.splice(index, 1);
            this.setName(names.join(' '));
        }
        return this;
    };
    Node.prototype.setAttr = function (attr, val) {
        var func = this[SET + Util_1.Util._capitalize(attr)];
        if (Util_1.Util._isFunction(func)) {
            func.call(this, val);
        }
        else {
            this._setAttr(attr, val);
        }
        return this;
    };
    Node.prototype._setAttr = function (key, val) {
        var oldVal = this.attrs[key];
        if (oldVal === val && !Util_1.Util.isObject(val)) {
            return;
        }
        if (val === undefined || val === null) {
            delete this.attrs[key];
        }
        else {
            this.attrs[key] = val;
        }
        this._fireChangeEvent(key, oldVal, val);
    };
    Node.prototype._setComponentAttr = function (key, component, val) {
        var oldVal;
        if (val !== undefined) {
            oldVal = this.attrs[key];
            if (!oldVal) {
                this.attrs[key] = this.getAttr(key);
            }
            this.attrs[key][component] = val;
            this._fireChangeEvent(key, oldVal, val);
        }
    };
    Node.prototype._fireAndBubble = function (eventType, evt, compareShape) {
        if (evt && this.nodeType === SHAPE) {
            evt.target = this;
        }
        var shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
            ((compareShape &&
                (this === compareShape ||
                    (this.isAncestorOf && this.isAncestorOf(compareShape)))) ||
                (this.nodeType === 'Stage' && !compareShape));
        if (!shouldStop) {
            this._fire(eventType, evt);
            var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
                (compareShape &&
                    compareShape.isAncestorOf &&
                    compareShape.isAncestorOf(this) &&
                    !compareShape.isAncestorOf(this.parent));
            if (((evt && !evt.cancelBubble) || !evt) &&
                this.parent &&
                this.parent.isListening() &&
                !stopBubble) {
                if (compareShape && compareShape.parent) {
                    this._fireAndBubble.call(this.parent, eventType, evt, compareShape.parent);
                }
                else {
                    this._fireAndBubble.call(this.parent, eventType, evt);
                }
            }
        }
    };
    Node.prototype._fire = function (eventType, evt) {
        var events = this.eventListeners[eventType], i;
        if (events) {
            evt = evt || {};
            evt.currentTarget = this;
            evt.type = eventType;
            for (i = 0; i < events.length; i++) {
                events[i].handler.call(this, evt);
            }
        }
    };
    Node.prototype.draw = function () {
        this.drawScene();
        this.drawHit();
        return this;
    };
    Node.prototype._createDragElement = function (evt) {
        var pointerId = evt ? evt.pointerId : undefined;
        var stage = this.getStage();
        var ap = this.getAbsolutePosition();
        var pos = stage._getPointerById(pointerId) ||
            stage._changedPointerPositions[0] ||
            ap;
        DragAndDrop_1.DD._dragElements.set(this._id, {
            node: this,
            startPointerPos: pos,
            offset: {
                x: pos.x - ap.x,
                y: pos.y - ap.y
            },
            dragStatus: 'ready',
            pointerId: pointerId
        });
    };
    Node.prototype.startDrag = function (evt) {
        if (!DragAndDrop_1.DD._dragElements.has(this._id)) {
            this._createDragElement(evt);
        }
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        elem.dragStatus = 'dragging';
        this.fire('dragstart', {
            type: 'dragstart',
            target: this,
            evt: evt && evt.evt
        }, true);
    };
    Node.prototype._setDragPosition = function (evt, elem) {
        var pos = this.getStage()._getPointerById(elem.pointerId);
        if (!pos) {
            return;
        }
        var newNodePos = {
            x: pos.x - elem.offset.x,
            y: pos.y - elem.offset.y
        };
        var dbf = this.dragBoundFunc();
        if (dbf !== undefined) {
            var bounded = dbf.call(this, newNodePos, evt);
            if (!bounded) {
                Util_1.Util.warn('dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.');
            }
            else {
                newNodePos = bounded;
            }
        }
        if (!this._lastPos ||
            this._lastPos.x !== newNodePos.x ||
            this._lastPos.y !== newNodePos.y) {
            this.setAbsolutePosition(newNodePos);
            if (this.getLayer()) {
                this.getLayer().batchDraw();
            }
            else if (this.getStage()) {
                this.getStage().batchDraw();
            }
        }
        this._lastPos = newNodePos;
    };
    Node.prototype.stopDrag = function (evt) {
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        if (elem) {
            elem.dragStatus = 'stopped';
        }
        DragAndDrop_1.DD._endDragBefore(evt);
        DragAndDrop_1.DD._endDragAfter(evt);
    };
    Node.prototype.setDraggable = function (draggable) {
        this._setAttr('draggable', draggable);
        this._dragChange();
    };
    Node.prototype.isDragging = function () {
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        return elem ? elem.dragStatus === 'dragging' : false;
    };
    Node.prototype._listenDrag = function () {
        this._dragCleanup();
        this.on('mousedown.konva touchstart.konva', function (evt) {
            var _this = this;
            var shouldCheckButton = evt.evt['button'] !== undefined;
            var canDrag = !shouldCheckButton || Global_1.Konva.dragButtons.indexOf(evt.evt['button']) >= 0;
            if (!canDrag) {
                return;
            }
            if (this.isDragging()) {
                return;
            }
            var hasDraggingChild = false;
            DragAndDrop_1.DD._dragElements.forEach(function (elem) {
                if (_this.isAncestorOf(elem.node)) {
                    hasDraggingChild = true;
                }
            });
            if (!hasDraggingChild) {
                this._createDragElement(evt);
            }
        });
    };
    Node.prototype._dragChange = function () {
        if (this.attrs.draggable) {
            this._listenDrag();
        }
        else {
            this._dragCleanup();
            var stage = this.getStage();
            if (stage && DragAndDrop_1.DD._dragElements.has(this._id)) {
                this.stopDrag();
            }
        }
    };
    Node.prototype._dragCleanup = function () {
        this.off('mousedown.konva');
        this.off('touchstart.konva');
    };
    Node.create = function (data, container) {
        if (Util_1.Util._isString(data)) {
            data = JSON.parse(data);
        }
        return this._createNode(data, container);
    };
    Node._createNode = function (obj, container) {
        var className = Node.prototype.getClassName.call(obj), children = obj.children, no, len, n;
        if (container) {
            obj.attrs.container = container;
        }
        if (!Global_1._NODES_REGISTRY[className]) {
            Util_1.Util.warn('Can not find a node with class name "' +
                className +
                '". Fallback to "Shape".');
            className = 'Shape';
        }
        var Class = Global_1._NODES_REGISTRY[className];
        no = new Class(obj.attrs);
        if (children) {
            len = children.length;
            for (n = 0; n < len; n++) {
                no.add(Node._createNode(children[n]));
            }
        }
        return no;
    };
    return Node;
}());
exports.Node = Node;
Node.prototype.nodeType = 'Node';
Node.prototype._attrsAffectingSize = [];
Factory_1.Factory.addGetterSetter(Node, 'zIndex');
Factory_1.Factory.addGetterSetter(Node, 'absolutePosition');
Factory_1.Factory.addGetterSetter(Node, 'position');
Factory_1.Factory.addGetterSetter(Node, 'x', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'y', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'globalCompositeOperation', 'source-over', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'opacity', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'name', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'id', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'rotation', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'scale', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'scaleX', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'scaleY', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'skew', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'skewX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'skewY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'offset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'offsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'offsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'dragDistance', null, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'width', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'height', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'listening', 'inherit', function (val) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
        Util_1.Util.warn(val +
            ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".');
    }
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'preventDefault', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Node, 'filters', null, function (val) {
    this._filterUpToDate = false;
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'visible', 'inherit', function (val) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
        Util_1.Util.warn(val +
            ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".');
    }
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'transformsEnabled', 'all', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'size');
Factory_1.Factory.addGetterSetter(Node, 'dragBoundFunc');
Factory_1.Factory.addGetterSetter(Node, 'draggable', false, Validators_1.getBooleanValidator());
Factory_1.Factory.backCompat(Node, {
    rotateDeg: 'rotate',
    setRotationDeg: 'setRotation',
    getRotationDeg: 'getRotation'
});
Util_1.Collection.mapMethods(Node);

},{"./Util":"../node_modules/konva/lib/Util.js","./Factory":"../node_modules/konva/lib/Factory.js","./Canvas":"../node_modules/konva/lib/Canvas.js","./Global":"../node_modules/konva/lib/Global.js","./DragAndDrop":"../node_modules/konva/lib/DragAndDrop.js","./Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/Container.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Factory_1 = require("./Factory");
var Node_1 = require("./Node");
var DragAndDrop_1 = require("./DragAndDrop");
var Validators_1 = require("./Validators");
var Global_1 = require("./Global");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new Util_1.Collection();
        return _this;
    }
    Container.prototype.getChildren = function (filterFunc) {
        if (!filterFunc) {
            return this.children;
        }
        var results = new Util_1.Collection();
        this.children.each(function (child) {
            if (filterFunc(child)) {
                results.push(child);
            }
        });
        return results;
    };
    Container.prototype.hasChildren = function () {
        return this.getChildren().length > 0;
    };
    Container.prototype.removeChildren = function () {
        var child;
        for (var i = 0; i < this.children.length; i++) {
            child = this.children[i];
            child.parent = null;
            child.index = 0;
            child.remove();
        }
        this.children = new Util_1.Collection();
        return this;
    };
    Container.prototype.destroyChildren = function () {
        var child;
        for (var i = 0; i < this.children.length; i++) {
            child = this.children[i];
            child.parent = null;
            child.index = 0;
            child.destroy();
        }
        this.children = new Util_1.Collection();
        return this;
    };
    Container.prototype.add = function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        var child = children[0];
        if (child.getParent()) {
            child.moveTo(this);
            return this;
        }
        var _children = this.children;
        this._validateAdd(child);
        child._clearCaches();
        child.index = _children.length;
        child.parent = this;
        _children.push(child);
        this._fire('add', {
            child: child
        });
        return this;
    };
    Container.prototype.destroy = function () {
        if (this.hasChildren()) {
            this.destroyChildren();
        }
        _super.prototype.destroy.call(this);
        return this;
    };
    Container.prototype.find = function (selector) {
        return this._generalFind(selector, false);
    };
    Container.prototype.get = function (selector) {
        Util_1.Util.warn('collection.get() method is deprecated. Please use collection.find() instead.');
        return this.find(selector);
    };
    Container.prototype.findOne = function (selector) {
        var result = this._generalFind(selector, true);
        return result.length > 0 ? result[0] : undefined;
    };
    Container.prototype._generalFind = function (selector, findOne) {
        var retArr = [];
        this._descendants(function (node) {
            var valid = node._isMatch(selector);
            if (valid) {
                retArr.push(node);
            }
            if (valid && findOne) {
                return true;
            }
            return false;
        });
        return Util_1.Collection.toCollection(retArr);
    };
    Container.prototype._descendants = function (fn) {
        var shouldStop = false;
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            shouldStop = fn(child);
            if (shouldStop) {
                return true;
            }
            if (!child.hasChildren()) {
                continue;
            }
            shouldStop = child._descendants(fn);
            if (shouldStop) {
                return true;
            }
        }
        return false;
    };
    Container.prototype.toObject = function () {
        var obj = Node_1.Node.prototype.toObject.call(this);
        obj.children = [];
        var children = this.getChildren();
        var len = children.length;
        for (var n = 0; n < len; n++) {
            var child = children[n];
            obj.children.push(child.toObject());
        }
        return obj;
    };
    Container.prototype._getDescendants = function (arr) {
        var retArr = [];
        var len = arr.length;
        for (var n = 0; n < len; n++) {
            var node = arr[n];
            if (this.isAncestorOf(node)) {
                retArr.push(node);
            }
        }
        return retArr;
    };
    Container.prototype.isAncestorOf = function (node) {
        var parent = node.getParent();
        while (parent) {
            if (parent._id === this._id) {
                return true;
            }
            parent = parent.getParent();
        }
        return false;
    };
    Container.prototype.clone = function (obj) {
        var node = Node_1.Node.prototype.clone.call(this, obj);
        this.getChildren().each(function (no) {
            node.add(no.clone());
        });
        return node;
    };
    Container.prototype.getAllIntersections = function (pos) {
        var arr = [];
        this.find('Shape').each(function (shape) {
            if (shape.isVisible() && shape.intersects(pos)) {
                arr.push(shape);
            }
        });
        return arr;
    };
    Container.prototype._setChildrenIndices = function () {
        this.children.each(function (child, n) {
            child.index = n;
        });
    };
    Container.prototype.drawScene = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas()), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
        if (this.isVisible() || caching) {
            if (!caching && cachedSceneCanvas) {
                context.save();
                layer._applyTransform(this, context, top);
                this._drawCachedSceneCanvas(context);
                context.restore();
            }
            else {
                this._drawChildren(canvas, 'drawScene', top, false, caching, caching);
            }
        }
        return this;
    };
    Container.prototype.drawHit = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (this.shouldDrawHit(canvas) || caching) {
            if (!caching && cachedHitCanvas) {
                context.save();
                layer._applyTransform(this, context, top);
                this._drawCachedHitCanvas(context);
                context.restore();
            }
            else {
                this._drawChildren(canvas, 'drawHit', top, false, caching, caching);
            }
        }
        return this;
    };
    Container.prototype._drawChildren = function (canvas, drawMethod, top, caching, skipBuffer, skipComposition) {
        var layer = this.getLayer(), context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = (clipWidth && clipHeight) || clipFunc, clipX, clipY;
        if (hasClip && layer) {
            context.save();
            var transform = this.getAbsoluteTransform(top);
            var m = transform.getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            context.beginPath();
            if (clipFunc) {
                clipFunc.call(this, context, this);
            }
            else {
                clipX = this.clipX();
                clipY = this.clipY();
                context.rect(clipX, clipY, clipWidth, clipHeight);
            }
            context.clip();
            m = transform
                .copy()
                .invert()
                .getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
        var hasComposition = this.globalCompositeOperation() !== 'source-over' &&
            !skipComposition &&
            drawMethod === 'drawScene';
        if (hasComposition && layer) {
            context.save();
            context._applyGlobalCompositeOperation(this);
        }
        this.children.each(function (child) {
            child[drawMethod](canvas, top, caching, skipBuffer);
        });
        if (hasComposition && layer) {
            context.restore();
        }
        if (hasClip && layer) {
            context.restore();
        }
    };
    Container.prototype.shouldDrawHit = function (canvas) {
        if (canvas && canvas.isCache) {
            return true;
        }
        var layer = this.getLayer();
        var layerUnderDrag = false;
        DragAndDrop_1.DD._dragElements.forEach(function (elem) {
            if (elem.dragStatus === 'dragging' && elem.node.getLayer() === layer) {
                layerUnderDrag = true;
            }
        });
        var dragSkip = !Global_1.Konva.hitOnDragEnabled && layerUnderDrag;
        return layer && layer.hitGraphEnabled() && this.isVisible() && !dragSkip;
    };
    Container.prototype.getClientRect = function (attrs) {
        attrs = attrs || {};
        var skipTransform = attrs.skipTransform;
        var relativeTo = attrs.relativeTo;
        var minX, minY, maxX, maxY;
        var selfRect = {
            x: Infinity,
            y: Infinity,
            width: 0,
            height: 0
        };
        var that = this;
        this.children.each(function (child) {
            if (!child.visible()) {
                return;
            }
            var rect = child.getClientRect({
                relativeTo: that,
                skipShadow: attrs.skipShadow,
                skipStroke: attrs.skipStroke
            });
            if (rect.width === 0 && rect.height === 0) {
                return;
            }
            if (minX === undefined) {
                minX = rect.x;
                minY = rect.y;
                maxX = rect.x + rect.width;
                maxY = rect.y + rect.height;
            }
            else {
                minX = Math.min(minX, rect.x);
                minY = Math.min(minY, rect.y);
                maxX = Math.max(maxX, rect.x + rect.width);
                maxY = Math.max(maxY, rect.y + rect.height);
            }
        });
        var shapes = this.find('Shape');
        var hasVisible = false;
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            if (shape._isVisible(this)) {
                hasVisible = true;
                break;
            }
        }
        if (hasVisible && minX !== undefined) {
            selfRect = {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        }
        else {
            selfRect = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        if (!skipTransform) {
            return this._transformedRect(selfRect, relativeTo);
        }
        return selfRect;
    };
    return Container;
}(Node_1.Node));
exports.Container = Container;
Factory_1.Factory.addComponentsGetterSetter(Container, 'clip', [
    'x',
    'y',
    'width',
    'height'
]);
Factory_1.Factory.addGetterSetter(Container, 'clipX', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipY', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipWidth', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipHeight', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipFunc');
Util_1.Collection.mapMethods(Container);

},{"./Util":"../node_modules/konva/lib/Util.js","./Factory":"../node_modules/konva/lib/Factory.js","./Node":"../node_modules/konva/lib/Node.js","./DragAndDrop":"../node_modules/konva/lib/DragAndDrop.js","./Validators":"../node_modules/konva/lib/Validators.js","./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/PointerEvents.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Captures = new Map();
var SUPPORT_POINTER_EVENTS = Global_1.Konva._global['PointerEvent'] !== undefined;
function getCapturedShape(pointerId) {
    return Captures.get(pointerId);
}
exports.getCapturedShape = getCapturedShape;
function createEvent(evt) {
    return {
        evt: evt,
        pointerId: evt.pointerId
    };
}
exports.createEvent = createEvent;
function hasPointerCapture(pointerId, shape) {
    return Captures.get(pointerId) === shape;
}
exports.hasPointerCapture = hasPointerCapture;
function setPointerCapture(pointerId, shape) {
    releaseCapture(pointerId);
    var stage = shape.getStage();
    if (!stage)
        return;
    Captures.set(pointerId, shape);
    if (SUPPORT_POINTER_EVENTS) {
        shape._fire('gotpointercapture', createEvent(new PointerEvent('gotpointercapture')));
    }
}
exports.setPointerCapture = setPointerCapture;
function releaseCapture(pointerId, target) {
    var shape = Captures.get(pointerId);
    if (!shape)
        return;
    var stage = shape.getStage();
    if (stage && stage.content) {
    }
    Captures.delete(pointerId);
    if (SUPPORT_POINTER_EVENTS) {
        shape._fire('lostpointercapture', createEvent(new PointerEvent('lostpointercapture')));
    }
}
exports.releaseCapture = releaseCapture;

},{"./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/Stage.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Factory_1 = require("./Factory");
var Container_1 = require("./Container");
var Global_1 = require("./Global");
var Canvas_1 = require("./Canvas");
var DragAndDrop_1 = require("./DragAndDrop");
var Global_2 = require("./Global");
var PointerEvents = require("./PointerEvents");
var STAGE = 'Stage', STRING = 'string', PX = 'px', MOUSEOUT = 'mouseout', MOUSELEAVE = 'mouseleave', MOUSEOVER = 'mouseover', MOUSEENTER = 'mouseenter', MOUSEMOVE = 'mousemove', MOUSEDOWN = 'mousedown', MOUSEUP = 'mouseup', POINTERMOVE = 'pointermove', POINTERDOWN = 'pointerdown', POINTERUP = 'pointerup', POINTERCANCEL = 'pointercancel', LOSTPOINTERCAPTURE = 'lostpointercapture', CONTEXTMENU = 'contextmenu', CLICK = 'click', DBL_CLICK = 'dblclick', TOUCHSTART = 'touchstart', TOUCHEND = 'touchend', TAP = 'tap', DBL_TAP = 'dbltap', TOUCHMOVE = 'touchmove', WHEEL = 'wheel', CONTENT_MOUSEOUT = 'contentMouseout', CONTENT_MOUSEOVER = 'contentMouseover', CONTENT_MOUSEMOVE = 'contentMousemove', CONTENT_MOUSEDOWN = 'contentMousedown', CONTENT_MOUSEUP = 'contentMouseup', CONTENT_CONTEXTMENU = 'contentContextmenu', CONTENT_CLICK = 'contentClick', CONTENT_DBL_CLICK = 'contentDblclick', CONTENT_TOUCHSTART = 'contentTouchstart', CONTENT_TOUCHEND = 'contentTouchend', CONTENT_DBL_TAP = 'contentDbltap', CONTENT_TAP = 'contentTap', CONTENT_TOUCHMOVE = 'contentTouchmove', CONTENT_POINTERMOVE = 'contentPointermove', CONTENT_POINTERDOWN = 'contentPointerdown', CONTENT_POINTERUP = 'contentPointerup', CONTENT_WHEEL = 'contentWheel', RELATIVE = 'relative', KONVA_CONTENT = 'konvajs-content', SPACE = ' ', UNDERSCORE = '_', CONTAINER = 'container', MAX_LAYERS_NUMBER = 5, EMPTY_STRING = '', EVENTS = [
    MOUSEENTER,
    MOUSEDOWN,
    MOUSEMOVE,
    MOUSEUP,
    MOUSEOUT,
    TOUCHSTART,
    TOUCHMOVE,
    TOUCHEND,
    MOUSEOVER,
    WHEEL,
    CONTEXTMENU,
    POINTERDOWN,
    POINTERMOVE,
    POINTERUP,
    POINTERCANCEL,
    LOSTPOINTERCAPTURE
], eventsLength = EVENTS.length;
function addEvent(ctx, eventName) {
    ctx.content.addEventListener(eventName, function (evt) {
        ctx[UNDERSCORE + eventName](evt);
    }, false);
}
var NO_POINTERS_MESSAGE = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
exports.stages = [];
function checkNoClip(attrs) {
    if (attrs === void 0) { attrs = {}; }
    if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
        Util_1.Util.warn('Stage does not support clipping. Please use clip for Layers or Groups.');
    }
    return attrs;
}
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(config) {
        var _this = _super.call(this, checkNoClip(config)) || this;
        _this._pointerPositions = [];
        _this._changedPointerPositions = [];
        _this._buildDOM();
        _this._bindContentEvents();
        exports.stages.push(_this);
        _this.on('widthChange.konva heightChange.konva', _this._resizeDOM);
        _this.on('visibleChange.konva', _this._checkVisibility);
        _this.on('clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva', function () {
            checkNoClip(_this.attrs);
        });
        _this._checkVisibility();
        return _this;
    }
    Stage.prototype._validateAdd = function (child) {
        var isLayer = child.getType() === 'Layer';
        var isFastLayer = child.getType() === 'FastLayer';
        var valid = isLayer || isFastLayer;
        if (!valid) {
            Util_1.Util.throw('You may only add layers to the stage.');
        }
    };
    Stage.prototype._checkVisibility = function () {
        var style = this.visible() ? '' : 'none';
        this.content.style.display = style;
    };
    Stage.prototype.setContainer = function (container) {
        if (typeof container === STRING) {
            if (container.charAt(0) === '.') {
                var className = container.slice(1);
                container = document.getElementsByClassName(className)[0];
            }
            else {
                var id;
                if (container.charAt(0) !== '#') {
                    id = container;
                }
                else {
                    id = container.slice(1);
                }
                container = document.getElementById(id);
            }
            if (!container) {
                throw 'Can not find container in document with id ' + id;
            }
        }
        this._setAttr(CONTAINER, container);
        if (this.content) {
            if (this.content.parentElement) {
                this.content.parentElement.removeChild(this.content);
            }
            container.appendChild(this.content);
        }
        return this;
    };
    Stage.prototype.shouldDrawHit = function () {
        return true;
    };
    Stage.prototype.clear = function () {
        var layers = this.children, len = layers.length, n;
        for (n = 0; n < len; n++) {
            layers[n].clear();
        }
        return this;
    };
    Stage.prototype.clone = function (obj) {
        if (!obj) {
            obj = {};
        }
        obj.container = document.createElement('div');
        return Container_1.Container.prototype.clone.call(this, obj);
    };
    Stage.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        var content = this.content;
        if (content && Util_1.Util._isInDocument(content)) {
            this.container().removeChild(content);
        }
        var index = exports.stages.indexOf(this);
        if (index > -1) {
            exports.stages.splice(index, 1);
        }
        return this;
    };
    Stage.prototype.getPointerPosition = function () {
        var pos = this._pointerPositions[0] || this._changedPointerPositions[0];
        if (!pos) {
            Util_1.Util.warn(NO_POINTERS_MESSAGE);
            return null;
        }
        return {
            x: pos.x,
            y: pos.y
        };
    };
    Stage.prototype._getPointerById = function (id) {
        return this._pointerPositions.find(function (p) { return p.id === id; });
    };
    Stage.prototype.getPointersPositions = function () {
        return this._pointerPositions;
    };
    Stage.prototype.getStage = function () {
        return this;
    };
    Stage.prototype.getContent = function () {
        return this.content;
    };
    Stage.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        var x = config.x || 0, y = config.y || 0, canvas = new Canvas_1.SceneCanvas({
            width: config.width || this.width(),
            height: config.height || this.height(),
            pixelRatio: config.pixelRatio || 1
        }), _context = canvas.getContext()._context, layers = this.children;
        if (x || y) {
            _context.translate(-1 * x, -1 * y);
        }
        layers.each(function (layer) {
            if (!layer.isVisible()) {
                return;
            }
            var layerCanvas = layer._toKonvaCanvas(config);
            _context.drawImage(layerCanvas._canvas, x, y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
        });
        return canvas;
    };
    Stage.prototype.getIntersection = function (pos, selector) {
        if (!pos) {
            return null;
        }
        var layers = this.children, len = layers.length, end = len - 1, n, shape;
        for (n = end; n >= 0; n--) {
            shape = layers[n].getIntersection(pos, selector);
            if (shape) {
                return shape;
            }
        }
        return null;
    };
    Stage.prototype._resizeDOM = function () {
        if (this.content) {
            var width = this.width(), height = this.height(), layers = this.getChildren(), len = layers.length, n, layer;
            this.content.style.width = width + PX;
            this.content.style.height = height + PX;
            this.bufferCanvas.setSize(width, height);
            this.bufferHitCanvas.setSize(width, height);
            for (n = 0; n < len; n++) {
                layer = layers[n];
                layer.setSize({ width: width, height: height });
                layer.draw();
            }
        }
    };
    Stage.prototype.add = function (layer) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        _super.prototype.add.call(this, layer);
        var length = this.children.length;
        if (length > MAX_LAYERS_NUMBER) {
            Util_1.Util.warn('The stage has ' +
                length +
                ' layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.');
        }
        layer._setCanvasSize(this.width(), this.height());
        layer.draw();
        if (Global_1.Konva.isBrowser) {
            this.content.appendChild(layer.canvas._canvas);
        }
        return this;
    };
    Stage.prototype.getParent = function () {
        return null;
    };
    Stage.prototype.getLayer = function () {
        return null;
    };
    Stage.prototype.hasPointerCapture = function (pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
    };
    Stage.prototype.setPointerCapture = function (pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
    };
    Stage.prototype.releaseCapture = function (pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
    };
    Stage.prototype.getLayers = function () {
        return this.getChildren();
    };
    Stage.prototype._bindContentEvents = function () {
        if (!Global_1.Konva.isBrowser) {
            return;
        }
        for (var n = 0; n < eventsLength; n++) {
            addEvent(this, EVENTS[n]);
        }
    };
    Stage.prototype._mouseenter = function (evt) {
        this.setPointersPositions(evt);
        this._fire(MOUSEENTER, { evt: evt, target: this, currentTarget: this });
    };
    Stage.prototype._mouseover = function (evt) {
        this.setPointersPositions(evt);
        this._fire(CONTENT_MOUSEOVER, { evt: evt });
        this._fire(MOUSEOVER, { evt: evt, target: this, currentTarget: this });
    };
    Stage.prototype._mouseout = function (evt) {
        this.setPointersPositions(evt);
        var targetShape = this.targetShape;
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (targetShape && eventsEnabled) {
            targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
            targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
            this._fire(MOUSELEAVE, { evt: evt, target: this, currentTarget: this });
            this.targetShape = null;
        }
        else if (eventsEnabled) {
            this._fire(MOUSELEAVE, {
                evt: evt,
                target: this,
                currentTarget: this
            });
            this._fire(MOUSEOUT, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this.pointerPos = undefined;
        this._pointerPositions = [];
        this._fire(CONTENT_MOUSEOUT, { evt: evt });
    };
    Stage.prototype._mousemove = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchmove(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape;
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (eventsEnabled) {
            shape = this.getIntersection(this.getPointerPosition());
            if (shape && shape.isListening()) {
                var differentTarget = !this.targetShape || this.targetShape !== shape;
                if (eventsEnabled && differentTarget) {
                    if (this.targetShape) {
                        this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt, pointerId: pointerId }, shape);
                        this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt, pointerId: pointerId }, shape);
                    }
                    shape._fireAndBubble(MOUSEOVER, { evt: evt, pointerId: pointerId }, this.targetShape);
                    shape._fireAndBubble(MOUSEENTER, { evt: evt, pointerId: pointerId }, this.targetShape);
                    shape._fireAndBubble(MOUSEMOVE, { evt: evt, pointerId: pointerId });
                    this.targetShape = shape;
                }
                else {
                    shape._fireAndBubble(MOUSEMOVE, { evt: evt, pointerId: pointerId });
                }
            }
            else {
                if (this.targetShape && eventsEnabled) {
                    this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt, pointerId: pointerId });
                    this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt, pointerId: pointerId });
                    this._fire(MOUSEOVER, {
                        evt: evt,
                        target: this,
                        currentTarget: this,
                        pointerId: pointerId
                    });
                    this.targetShape = null;
                }
                this._fire(MOUSEMOVE, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: pointerId
                });
            }
            this._fire(CONTENT_MOUSEMOVE, { evt: evt });
        }
        if (evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._mousedown = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchstart(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        DragAndDrop_1.DD.justDragged = false;
        Global_1.Konva.listenClickTap = true;
        if (shape && shape.isListening()) {
            this.clickStartShape = shape;
            shape._fireAndBubble(MOUSEDOWN, { evt: evt, pointerId: pointerId });
        }
        else {
            this._fire(MOUSEDOWN, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: pointerId
            });
        }
        this._fire(CONTENT_MOUSEDOWN, { evt: evt });
    };
    Stage.prototype._mouseup = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchend(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape = this.getIntersection(this.getPointerPosition()), clickStartShape = this.clickStartShape, clickEndShape = this.clickEndShape, fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
            fireDblClick = true;
            clearTimeout(this.dblTimeout);
        }
        else if (!DragAndDrop_1.DD.justDragged) {
            Global_1.Konva.inDblClickWindow = true;
            clearTimeout(this.dblTimeout);
        }
        this.dblTimeout = setTimeout(function () {
            Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        if (shape && shape.isListening()) {
            this.clickEndShape = shape;
            shape._fireAndBubble(MOUSEUP, { evt: evt, pointerId: pointerId });
            if (Global_1.Konva.listenClickTap &&
                clickStartShape &&
                clickStartShape._id === shape._id) {
                shape._fireAndBubble(CLICK, { evt: evt, pointerId: pointerId });
                if (fireDblClick && clickEndShape && clickEndShape === shape) {
                    shape._fireAndBubble(DBL_CLICK, { evt: evt, pointerId: pointerId });
                }
            }
        }
        else {
            this._fire(MOUSEUP, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: pointerId
            });
            if (Global_1.Konva.listenClickTap) {
                this._fire(CLICK, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: pointerId
                });
            }
            if (fireDblClick) {
                this._fire(DBL_CLICK, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: pointerId
                });
            }
        }
        this._fire(CONTENT_MOUSEUP, { evt: evt });
        if (Global_1.Konva.listenClickTap) {
            this._fire(CONTENT_CLICK, { evt: evt });
            if (fireDblClick) {
                this._fire(CONTENT_DBL_CLICK, { evt: evt });
            }
        }
        Global_1.Konva.listenClickTap = false;
        if (evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._contextmenu = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(CONTEXTMENU, { evt: evt });
        }
        else {
            this._fire(CONTEXTMENU, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_CONTEXTMENU, { evt: evt });
    };
    Stage.prototype._touchstart = function (evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var triggeredOnShape = false;
        this._changedPointerPositions.forEach(function (pos) {
            var shape = _this.getIntersection(pos);
            Global_1.Konva.listenClickTap = true;
            DragAndDrop_1.DD.justDragged = false;
            var hasShape = shape && shape.isListening();
            if (!hasShape) {
                return;
            }
            if (Global_1.Konva.captureTouchEventsEnabled) {
                shape.setPointerCapture(pos.id);
            }
            _this.tapStartShape = shape;
            shape._fireAndBubble(TOUCHSTART, { evt: evt, pointerId: pos.id }, _this);
            triggeredOnShape = true;
            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                evt.preventDefault();
            }
        });
        if (!triggeredOnShape) {
            this._fire(TOUCHSTART, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        this._fire(CONTENT_TOUCHSTART, { evt: evt });
    };
    Stage.prototype._touchmove = function (evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (eventsEnabled) {
            var triggeredOnShape = false;
            var processedShapesIds = {};
            this._changedPointerPositions.forEach(function (pos) {
                var shape = PointerEvents.getCapturedShape(pos.id) || _this.getIntersection(pos);
                var hasShape = shape && shape.isListening();
                if (!hasShape) {
                    return;
                }
                if (processedShapesIds[shape._id]) {
                    return;
                }
                processedShapesIds[shape._id] = true;
                shape._fireAndBubble(TOUCHMOVE, { evt: evt, pointerId: pos.id });
                triggeredOnShape = true;
                if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                    evt.preventDefault();
                }
            });
            if (!triggeredOnShape) {
                this._fire(TOUCHMOVE, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: this._changedPointerPositions[0].id
                });
            }
            this._fire(CONTENT_TOUCHMOVE, { evt: evt });
        }
        if (DragAndDrop_1.DD.isDragging && DragAndDrop_1.DD.node.preventDefault() && evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._touchend = function (evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var clickEndShape = this.clickEndShape, fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
            fireDblClick = true;
            clearTimeout(this.dblTimeout);
        }
        else if (!DragAndDrop_1.DD.justDragged) {
            Global_1.Konva.inDblClickWindow = true;
            clearTimeout(this.dblTimeout);
        }
        this.dblTimeout = setTimeout(function () {
            Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        var triggeredOnShape = false;
        var processedShapesIds = {};
        var tapTriggered = false;
        var dblTapTriggered = false;
        this._changedPointerPositions.forEach(function (pos) {
            var shape = PointerEvents.getCapturedShape(pos.id) ||
                _this.getIntersection(pos);
            if (shape) {
                shape.releaseCapture(pos.id);
            }
            var hasShape = shape && shape.isListening();
            if (!hasShape) {
                return;
            }
            if (processedShapesIds[shape._id]) {
                return;
            }
            processedShapesIds[shape._id] = true;
            _this.clickEndShape = shape;
            shape._fireAndBubble(TOUCHEND, { evt: evt, pointerId: pos.id });
            triggeredOnShape = true;
            if (Global_1.Konva.listenClickTap && shape === _this.tapStartShape) {
                tapTriggered = true;
                shape._fireAndBubble(TAP, { evt: evt, pointerId: pos.id });
                if (fireDblClick && clickEndShape && clickEndShape === shape) {
                    dblTapTriggered = true;
                    shape._fireAndBubble(DBL_TAP, { evt: evt, pointerId: pos.id });
                }
            }
            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                evt.preventDefault();
            }
        });
        if (!triggeredOnShape) {
            this._fire(TOUCHEND, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        if (Global_1.Konva.listenClickTap && !tapTriggered) {
            this._fire(TAP, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        if (fireDblClick && !dblTapTriggered) {
            this._fire(DBL_TAP, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        this._fire(CONTENT_TOUCHEND, { evt: evt });
        if (Global_1.Konva.listenClickTap) {
            this._fire(CONTENT_TAP, { evt: evt });
            if (fireDblClick) {
                this._fire(CONTENT_DBL_TAP, { evt: evt });
            }
        }
        Global_1.Konva.listenClickTap = false;
    };
    Stage.prototype._wheel = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(WHEEL, { evt: evt });
        }
        else {
            this._fire(WHEEL, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_WHEEL, { evt: evt });
    };
    Stage.prototype._pointerdown = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERDOWN, PointerEvents.createEvent(evt));
        }
    };
    Stage.prototype._pointermove = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERMOVE, PointerEvents.createEvent(evt));
        }
    };
    Stage.prototype._pointerup = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
        }
        PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage.prototype._pointercancel = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
        }
        PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage.prototype._lostpointercapture = function (evt) {
        PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage.prototype.setPointersPositions = function (evt) {
        var _this = this;
        var contentPosition = this._getContentPosition(), x = null, y = null;
        evt = evt ? evt : window.event;
        if (evt.touches !== undefined) {
            this._pointerPositions = [];
            this._changedPointerPositions = [];
            Util_1.Collection.prototype.each.call(evt.touches, function (touch) {
                _this._pointerPositions.push({
                    id: touch.identifier,
                    x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
                    y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
                });
            });
            Util_1.Collection.prototype.each.call(evt.changedTouches || evt.touches, function (touch) {
                _this._changedPointerPositions.push({
                    id: touch.identifier,
                    x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
                    y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
                });
            });
        }
        else {
            x = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
            y = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
            this.pointerPos = {
                x: x,
                y: y
            };
            this._pointerPositions = [{ x: x, y: y, id: Util_1.Util._getFirstPointerId(evt) }];
            this._changedPointerPositions = [
                { x: x, y: y, id: Util_1.Util._getFirstPointerId(evt) }
            ];
        }
    };
    Stage.prototype._setPointerPosition = function (evt) {
        Util_1.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
        this.setPointersPositions(evt);
    };
    Stage.prototype._getContentPosition = function () {
        var rect = this.content.getBoundingClientRect
            ? this.content.getBoundingClientRect()
            : { top: 0, left: 0, width: 1000, height: 1000 };
        return {
            top: rect.top,
            left: rect.left,
            scaleX: rect.width / this.content.clientWidth || 1,
            scaleY: rect.height / this.content.clientHeight || 1,
        };
    };
    Stage.prototype._buildDOM = function () {
        this.bufferCanvas = new Canvas_1.SceneCanvas();
        this.bufferHitCanvas = new Canvas_1.HitCanvas({ pixelRatio: 1 });
        if (!Global_1.Konva.isBrowser) {
            return;
        }
        var container = this.container();
        if (!container) {
            throw 'Stage has no container. A container is required.';
        }
        container.innerHTML = EMPTY_STRING;
        this.content = document.createElement('div');
        this.content.style.position = RELATIVE;
        this.content.style.userSelect = 'none';
        this.content.className = KONVA_CONTENT;
        this.content.setAttribute('role', 'presentation');
        container.appendChild(this.content);
        this._resizeDOM();
    };
    Stage.prototype.cache = function () {
        Util_1.Util.warn('Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.');
        return this;
    };
    Stage.prototype.clearCache = function () {
        return this;
    };
    Stage.prototype.batchDraw = function () {
        this.children.each(function (layer) {
            layer.batchDraw();
        });
        return this;
    };
    return Stage;
}(Container_1.Container));
exports.Stage = Stage;
Stage.prototype.nodeType = STAGE;
Global_2._registerNode(Stage);
Factory_1.Factory.addGetterSetter(Stage, 'container');

},{"./Util":"../node_modules/konva/lib/Util.js","./Factory":"../node_modules/konva/lib/Factory.js","./Container":"../node_modules/konva/lib/Container.js","./Global":"../node_modules/konva/lib/Global.js","./Canvas":"../node_modules/konva/lib/Canvas.js","./DragAndDrop":"../node_modules/konva/lib/DragAndDrop.js","./PointerEvents":"../node_modules/konva/lib/PointerEvents.js"}],"../node_modules/konva/lib/BaseLayer.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Container_1 = require("./Container");
var Node_1 = require("./Node");
var Factory_1 = require("./Factory");
var Canvas_1 = require("./Canvas");
var BaseLayer = (function (_super) {
    __extends(BaseLayer, _super);
    function BaseLayer(config) {
        var _this = _super.call(this, config) || this;
        _this.canvas = new Canvas_1.SceneCanvas();
        _this._waitingForDraw = false;
        _this.on('visibleChange', _this._checkVisibility);
        _this._checkVisibility();
        _this.on('imageSmoothingEnabledChange', _this._checkSmooth);
        _this._checkSmooth();
        return _this;
    }
    BaseLayer.prototype.createPNGStream = function () {
        var c = this.canvas._canvas;
        return c.createPNGStream();
    };
    BaseLayer.prototype.getCanvas = function () {
        return this.canvas;
    };
    BaseLayer.prototype.getHitCanvas = function () {
        return this.hitCanvas;
    };
    BaseLayer.prototype.getContext = function () {
        return this.getCanvas().getContext();
    };
    BaseLayer.prototype.clear = function (bounds) {
        this.getContext().clear(bounds);
        return this;
    };
    BaseLayer.prototype.setZIndex = function (index) {
        _super.prototype.setZIndex.call(this, index);
        var stage = this.getStage();
        if (stage) {
            stage.content.removeChild(this.getCanvas()._canvas);
            if (index < stage.children.length - 1) {
                stage.content.insertBefore(this.getCanvas()._canvas, stage.children[index + 1].getCanvas()._canvas);
            }
            else {
                stage.content.appendChild(this.getCanvas()._canvas);
            }
        }
        return this;
    };
    BaseLayer.prototype.moveToTop = function () {
        Node_1.Node.prototype.moveToTop.call(this);
        var stage = this.getStage();
        if (stage) {
            stage.content.removeChild(this.getCanvas()._canvas);
            stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
    };
    BaseLayer.prototype.moveUp = function () {
        var moved = Node_1.Node.prototype.moveUp.call(this);
        if (!moved) {
            return false;
        }
        var stage = this.getStage();
        if (!stage) {
            return false;
        }
        stage.content.removeChild(this.getCanvas()._canvas);
        if (this.index < stage.children.length - 1) {
            stage.content.insertBefore(this.getCanvas()._canvas, stage.children[this.index + 1].getCanvas()._canvas);
        }
        else {
            stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
    };
    BaseLayer.prototype.moveDown = function () {
        if (Node_1.Node.prototype.moveDown.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.children;
                stage.content.removeChild(this.getCanvas()._canvas);
                stage.content.insertBefore(this.getCanvas()._canvas, children[this.index + 1].getCanvas()._canvas);
            }
            return true;
        }
        return false;
    };
    BaseLayer.prototype.moveToBottom = function () {
        if (Node_1.Node.prototype.moveToBottom.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.children;
                stage.content.removeChild(this.getCanvas()._canvas);
                stage.content.insertBefore(this.getCanvas()._canvas, children[1].getCanvas()._canvas);
            }
            return true;
        }
        return false;
    };
    BaseLayer.prototype.getLayer = function () {
        return this;
    };
    BaseLayer.prototype.hitGraphEnabled = function () {
        return true;
    };
    BaseLayer.prototype.remove = function () {
        var _canvas = this.getCanvas()._canvas;
        Node_1.Node.prototype.remove.call(this);
        if (_canvas && _canvas.parentNode && Util_1.Util._isInDocument(_canvas)) {
            _canvas.parentNode.removeChild(_canvas);
        }
        return this;
    };
    BaseLayer.prototype.getStage = function () {
        return this.parent;
    };
    BaseLayer.prototype.setSize = function (_a) {
        var width = _a.width, height = _a.height;
        this.canvas.setSize(width, height);
        return this;
    };
    BaseLayer.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        config.width = config.width || this.getWidth();
        config.height = config.height || this.getHeight();
        config.x = config.x !== undefined ? config.x : this.x();
        config.y = config.y !== undefined ? config.y : this.y();
        return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
    };
    BaseLayer.prototype._checkVisibility = function () {
        var visible = this.visible();
        if (visible) {
            this.canvas._canvas.style.display = 'block';
        }
        else {
            this.canvas._canvas.style.display = 'none';
        }
    };
    BaseLayer.prototype._checkSmooth = function () {
        this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
    };
    BaseLayer.prototype.getWidth = function () {
        if (this.parent) {
            return this.parent.width();
        }
    };
    BaseLayer.prototype.setWidth = function () {
        Util_1.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
    };
    BaseLayer.prototype.getHeight = function () {
        if (this.parent) {
            return this.parent.height();
        }
    };
    BaseLayer.prototype.setHeight = function () {
        Util_1.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
    };
    BaseLayer.prototype.getIntersection = function (pos, selector) {
        return null;
    };
    BaseLayer.prototype.batchDraw = function () {
        var _this = this;
        if (!this._waitingForDraw) {
            this._waitingForDraw = true;
            Util_1.Util.requestAnimFrame(function () {
                _this.draw();
                _this._waitingForDraw = false;
            });
        }
        return this;
    };
    BaseLayer.prototype._applyTransform = function (shape, context, top) {
        var m = shape.getAbsoluteTransform(top).getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    };
    return BaseLayer;
}(Container_1.Container));
exports.BaseLayer = BaseLayer;
BaseLayer.prototype.nodeType = 'BaseLayer';
Factory_1.Factory.addGetterSetter(BaseLayer, 'imageSmoothingEnabled', true);
Factory_1.Factory.addGetterSetter(BaseLayer, 'clearBeforeDraw', true);
Util_1.Collection.mapMethods(BaseLayer);

},{"./Util":"../node_modules/konva/lib/Util.js","./Container":"../node_modules/konva/lib/Container.js","./Node":"../node_modules/konva/lib/Node.js","./Factory":"../node_modules/konva/lib/Factory.js","./Canvas":"../node_modules/konva/lib/Canvas.js"}],"../node_modules/konva/lib/Shape.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Factory_1 = require("./Factory");
var Node_1 = require("./Node");
var Validators_1 = require("./Validators");
var Global_1 = require("./Global");
var PointerEvents = require("./PointerEvents");
var HAS_SHADOW = 'hasShadow';
var SHADOW_RGBA = 'shadowRGBA';
var patternImage = 'patternImage';
var linearGradient = 'linearGradient';
var radialGradient = 'radialGradient';
var dummyContext;
function getDummyContext() {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = Util_1.Util.createCanvasElement().getContext('2d');
    return dummyContext;
}
exports.shapes = {};
function _fillFunc(context) {
    context.fill();
}
function _strokeFunc(context) {
    context.stroke();
}
function _fillFuncHit(context) {
    context.fill();
}
function _strokeFuncHit(context) {
    context.stroke();
}
function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
}
function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
}
function _clearFillPatternCache() {
    this._clearCache(patternImage);
}
function _clearLinearGradientCache() {
    this._clearCache(linearGradient);
}
function _clearRadialGradientCache() {
    this._clearCache(radialGradient);
}
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(config) {
        var _this = _super.call(this, config) || this;
        var key;
        while (true) {
            key = Util_1.Util.getRandomColor();
            if (key && !(key in exports.shapes)) {
                break;
            }
        }
        _this.colorKey = key;
        exports.shapes[key] = _this;
        _this.on('shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearHasShadowCache);
        _this.on('shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearGetShadowRGBACache);
        _this.on('fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva', _clearFillPatternCache);
        _this.on('fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva', _clearLinearGradientCache);
        _this.on('fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva', _clearRadialGradientCache);
        return _this;
    }
    Shape.prototype.getContext = function () {
        return this.getLayer().getContext();
    };
    Shape.prototype.getCanvas = function () {
        return this.getLayer().getCanvas();
    };
    Shape.prototype.getSceneFunc = function () {
        return this.attrs.sceneFunc || this['_sceneFunc'];
    };
    Shape.prototype.getHitFunc = function () {
        return this.attrs.hitFunc || this['_hitFunc'];
    };
    Shape.prototype.hasShadow = function () {
        return this._getCache(HAS_SHADOW, this._hasShadow);
    };
    Shape.prototype._hasShadow = function () {
        return (this.shadowEnabled() &&
            (this.shadowOpacity() !== 0 &&
                !!(this.shadowColor() ||
                    this.shadowBlur() ||
                    this.shadowOffsetX() ||
                    this.shadowOffsetY())));
    };
    Shape.prototype._getFillPattern = function () {
        return this._getCache(patternImage, this.__getFillPattern);
    };
    Shape.prototype.__getFillPattern = function () {
        if (this.fillPatternImage()) {
            var ctx = getDummyContext();
            var pattern = ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || 'repeat');
            return pattern;
        }
    };
    Shape.prototype._getLinearGradient = function () {
        return this._getCache(linearGradient, this.__getLinearGradient);
    };
    Shape.prototype.__getLinearGradient = function () {
        var colorStops = this.fillLinearGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillLinearGradientStartPoint();
            var end = this.fillLinearGradientEndPoint();
            var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    };
    Shape.prototype._getRadialGradient = function () {
        return this._getCache(radialGradient, this.__getRadialGradient);
    };
    Shape.prototype.__getRadialGradient = function () {
        var colorStops = this.fillRadialGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillRadialGradientStartPoint();
            var end = this.fillRadialGradientEndPoint();
            var grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    };
    Shape.prototype.getShadowRGBA = function () {
        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
    };
    Shape.prototype._getShadowRGBA = function () {
        if (this.hasShadow()) {
            var rgba = Util_1.Util.colorToRGBA(this.shadowColor());
            return ('rgba(' +
                rgba.r +
                ',' +
                rgba.g +
                ',' +
                rgba.b +
                ',' +
                rgba.a * (this.shadowOpacity() || 1) +
                ')');
        }
    };
    Shape.prototype.hasFill = function () {
        return this.fillEnabled() && !!(this.fill() ||
            this.fillPatternImage() ||
            this.fillLinearGradientColorStops() ||
            this.fillRadialGradientColorStops());
    };
    Shape.prototype.hasStroke = function () {
        return (this.strokeEnabled() &&
            this.strokeWidth() &&
            !!(this.stroke() || this.strokeLinearGradientColorStops()));
    };
    Shape.prototype.hasHitStroke = function () {
        var width = this.hitStrokeWidth();
        return (this.strokeEnabled() &&
            (width || this.strokeWidth() && width === 'auto'));
    };
    Shape.prototype.intersects = function (point) {
        var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;
        bufferHitCanvas.getContext().clear();
        this.drawHit(bufferHitCanvas);
        p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
        return p[3] > 0;
    };
    Shape.prototype.destroy = function () {
        Node_1.Node.prototype.destroy.call(this);
        delete exports.shapes[this.colorKey];
        delete this.colorKey;
        return this;
    };
    Shape.prototype._useBufferCanvas = function (caching) {
        return !!((!caching || this.hasShadow()) &&
            this.perfectDrawEnabled() &&
            this.getAbsoluteOpacity() !== 1 &&
            this.hasFill() &&
            this.hasStroke() &&
            this.getStage());
    };
    Shape.prototype.setStrokeHitEnabled = function (val) {
        if (val) {
            this.hitStrokeWidth('auto');
        }
        else {
            this.hitStrokeWidth(0);
        }
    };
    Shape.prototype.getStrokeHitEnabled = function () {
        if (this.hitStrokeWidth() === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Shape.prototype.getSelfRect = function () {
        var size = this.size();
        return {
            x: this._centroid ? Math.round(-size.width / 2) : 0,
            y: this._centroid ? Math.round(-size.height / 2) : 0,
            width: size.width,
            height: size.height
        };
    };
    Shape.prototype.getClientRect = function (attrs) {
        attrs = attrs || {};
        var skipTransform = attrs.skipTransform;
        var relativeTo = attrs.relativeTo;
        var fillRect = this.getSelfRect();
        var applyStroke = !attrs.skipStroke && this.hasStroke();
        var strokeWidth = (applyStroke && this.strokeWidth()) || 0;
        var fillAndStrokeWidth = fillRect.width + strokeWidth;
        var fillAndStrokeHeight = fillRect.height + strokeWidth;
        var applyShadow = !attrs.skipShadow && this.hasShadow();
        var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
        var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
        var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
        var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
        var blurRadius = (applyShadow && this.shadowBlur()) || 0;
        var width = preWidth + blurRadius * 2;
        var height = preHeight + blurRadius * 2;
        var roundingOffset = 0;
        if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
            roundingOffset = 1;
        }
        var rect = {
            width: width + roundingOffset,
            height: height + roundingOffset,
            x: -Math.round(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetX, 0) +
                fillRect.x,
            y: -Math.round(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetY, 0) +
                fillRect.y
        };
        if (!skipTransform) {
            return this._transformedRect(rect, relativeTo);
        }
        return rect;
    };
    Shape.prototype.drawScene = function (can, top, caching, skipBuffer) {
        var layer = this.getLayer(), canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.sceneFunc(), hasShadow = this.hasShadow(), hasStroke = this.hasStroke(), stage, bufferCanvas, bufferContext;
        if (!this.isVisible() && !caching) {
            return this;
        }
        if (cachedCanvas) {
            context.save();
            layer._applyTransform(this, context, top);
            this._drawCachedSceneCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        if (this._useBufferCanvas(caching) && !skipBuffer) {
            stage = this.getStage();
            bufferCanvas = stage.bufferCanvas;
            bufferContext = bufferCanvas.getContext();
            bufferContext.clear();
            bufferContext.save();
            bufferContext._applyLineJoin(this);
            if (!caching) {
                if (layer) {
                    layer._applyTransform(this, bufferContext, top);
                }
                else {
                    var m = this.getAbsoluteTransform(top).getMatrix();
                    context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
                }
            }
            drawFunc.call(this, bufferContext, this);
            bufferContext.restore();
            var ratio = bufferCanvas.pixelRatio;
            if (hasShadow && !canvas.hitCanvas) {
                context.save();
                context._applyShadow(this);
                context._applyOpacity(this);
                context._applyGlobalCompositeOperation(this);
                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
                context.restore();
            }
            else {
                context._applyOpacity(this);
                context._applyGlobalCompositeOperation(this);
                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
            }
        }
        else {
            context._applyLineJoin(this);
            if (!caching) {
                if (layer) {
                    layer._applyTransform(this, context, top);
                }
                else {
                    var o = this.getAbsoluteTransform(top).getMatrix();
                    context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
                }
            }
            if (hasShadow && hasStroke && !canvas.hitCanvas) {
                context.save();
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                context._applyShadow(this);
                drawFunc.call(this, context, this);
                context.restore();
                if (this.hasFill() && this.shadowForStrokeEnabled()) {
                    drawFunc.call(this, context, this);
                }
            }
            else if (hasShadow && !canvas.hitCanvas) {
                context.save();
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                context._applyShadow(this);
                drawFunc.call(this, context, this);
                context.restore();
            }
            else {
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                drawFunc.call(this, context, this);
            }
        }
        context.restore();
        return this;
    };
    Shape.prototype.drawHit = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (!this.colorKey) {
            console.log(this);
            Util_1.Util.warn('Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()');
        }
        if (!this.shouldDrawHit() && !caching) {
            return this;
        }
        if (cachedHitCanvas) {
            context.save();
            layer._applyTransform(this, context, top);
            this._drawCachedHitCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        context._applyLineJoin(this);
        if (!caching) {
            if (layer) {
                layer._applyTransform(this, context, top);
            }
            else {
                var o = this.getAbsoluteTransform(top).getMatrix();
                context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
            }
        }
        drawFunc.call(this, context, this);
        context.restore();
        return this;
    };
    Shape.prototype.drawHitFromCache = function (alphaThreshold) {
        if (alphaThreshold === void 0) { alphaThreshold = 0; }
        var cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight(), hitImageData, hitData, len, rgbColorKey, i, alpha;
        hitContext.clear();
        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
        try {
            hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
            hitData = hitImageData.data;
            len = hitData.length;
            rgbColorKey = Util_1.Util._hexToRgb(this.colorKey);
            for (i = 0; i < len; i += 4) {
                alpha = hitData[i + 3];
                if (alpha > alphaThreshold) {
                    hitData[i] = rgbColorKey.r;
                    hitData[i + 1] = rgbColorKey.g;
                    hitData[i + 2] = rgbColorKey.b;
                    hitData[i + 3] = 255;
                }
                else {
                    hitData[i + 3] = 0;
                }
            }
            hitContext.putImageData(hitImageData, 0, 0);
        }
        catch (e) {
            Util_1.Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
        }
        return this;
    };
    Shape.prototype.hasPointerCapture = function (pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
    };
    Shape.prototype.setPointerCapture = function (pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
    };
    Shape.prototype.releaseCapture = function (pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
    };
    return Shape;
}(Node_1.Node));
exports.Shape = Shape;
Shape.prototype._fillFunc = _fillFunc;
Shape.prototype._strokeFunc = _strokeFunc;
Shape.prototype._fillFuncHit = _fillFuncHit;
Shape.prototype._strokeFuncHit = _strokeFuncHit;
Shape.prototype._centroid = false;
Shape.prototype.nodeType = 'Shape';
Global_1._registerNode(Shape);
Factory_1.Factory.addGetterSetter(Shape, 'stroke', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'strokeWidth', 2, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'hitStrokeWidth', 'auto', Validators_1.getNumberOrAutoValidator());
Factory_1.Factory.addGetterSetter(Shape, 'strokeHitEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'perfectDrawEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowForStrokeEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'lineJoin');
Factory_1.Factory.addGetterSetter(Shape, 'lineCap');
Factory_1.Factory.addGetterSetter(Shape, 'sceneFunc');
Factory_1.Factory.addGetterSetter(Shape, 'hitFunc');
Factory_1.Factory.addGetterSetter(Shape, 'dash');
Factory_1.Factory.addGetterSetter(Shape, 'dashOffset', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowColor', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowBlur', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowOpacity', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'shadowOffset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'shadowOffsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowOffsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternImage');
Factory_1.Factory.addGetterSetter(Shape, 'fill', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartRadius', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndRadius', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternRepeat', 'repeat');
Factory_1.Factory.addGetterSetter(Shape, 'fillEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'strokeEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'shadowEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'dashEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'strokeScaleEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'fillPriority', 'color');
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillPatternOffset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternOffsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternOffsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillPatternScale', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternScaleX', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternScaleY', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternRotation', 0);
Factory_1.Factory.backCompat(Shape, {
    dashArray: 'dash',
    getDashArray: 'getDash',
    setDashArray: 'getDash',
    drawFunc: 'sceneFunc',
    getDrawFunc: 'getSceneFunc',
    setDrawFunc: 'setSceneFunc',
    drawHitFunc: 'hitFunc',
    getDrawHitFunc: 'getHitFunc',
    setDrawHitFunc: 'setHitFunc'
});
Util_1.Collection.mapMethods(Shape);

},{"./Util":"../node_modules/konva/lib/Util.js","./Factory":"../node_modules/konva/lib/Factory.js","./Node":"../node_modules/konva/lib/Node.js","./Validators":"../node_modules/konva/lib/Validators.js","./Global":"../node_modules/konva/lib/Global.js","./PointerEvents":"../node_modules/konva/lib/PointerEvents.js"}],"../node_modules/konva/lib/Layer.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Container_1 = require("./Container");
var Factory_1 = require("./Factory");
var BaseLayer_1 = require("./BaseLayer");
var Canvas_1 = require("./Canvas");
var Shape_1 = require("./Shape");
var Validators_1 = require("./Validators");
var Global_1 = require("./Global");
var HASH = '#', BEFORE_DRAW = 'beforeDraw', DRAW = 'draw', INTERSECTION_OFFSETS = [
    { x: 0, y: 0 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 }
], INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hitCanvas = new Canvas_1.HitCanvas({
            pixelRatio: 1
        });
        return _this;
    }
    Layer.prototype._setCanvasSize = function (width, height) {
        this.canvas.setSize(width, height);
        this.hitCanvas.setSize(width, height);
        this._checkSmooth();
    };
    Layer.prototype._validateAdd = function (child) {
        var type = child.getType();
        if (type !== 'Group' && type !== 'Shape') {
            Util_1.Util.throw('You may only add groups and shapes to a layer.');
        }
    };
    Layer.prototype.getIntersection = function (pos, selector) {
        var obj, i, intersectionOffset, shape;
        if (!this.hitGraphEnabled() || !this.isVisible()) {
            return null;
        }
        var spiralSearchDistance = 1;
        var continueSearch = false;
        while (true) {
            for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
                intersectionOffset = INTERSECTION_OFFSETS[i];
                obj = this._getIntersection({
                    x: pos.x + intersectionOffset.x * spiralSearchDistance,
                    y: pos.y + intersectionOffset.y * spiralSearchDistance
                });
                shape = obj.shape;
                if (shape && selector) {
                    return shape.findAncestor(selector, true);
                }
                else if (shape) {
                    return shape;
                }
                continueSearch = !!obj.antialiased;
                if (!obj.antialiased) {
                    break;
                }
            }
            if (continueSearch) {
                spiralSearchDistance += 1;
            }
            else {
                return null;
            }
        }
    };
    Layer.prototype._getIntersection = function (pos) {
        var ratio = this.hitCanvas.pixelRatio;
        var p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data, p3 = p[3], colorKey, shape;
        if (p3 === 255) {
            colorKey = Util_1.Util._rgbToHex(p[0], p[1], p[2]);
            shape = Shape_1.shapes[HASH + colorKey];
            if (shape) {
                return {
                    shape: shape
                };
            }
            return {
                antialiased: true
            };
        }
        else if (p3 > 0) {
            return {
                antialiased: true
            };
        }
        return {};
    };
    Layer.prototype.drawScene = function (can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
        this._fire(BEFORE_DRAW, {
            node: this
        });
        if (this.clearBeforeDraw()) {
            canvas.getContext().clear();
        }
        Container_1.Container.prototype.drawScene.call(this, canvas, top);
        this._fire(DRAW, {
            node: this
        });
        return this;
    };
    Layer.prototype.drawHit = function (can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas);
        if (layer && layer.clearBeforeDraw()) {
            layer
                .getHitCanvas()
                .getContext()
                .clear();
        }
        Container_1.Container.prototype.drawHit.call(this, canvas, top);
        return this;
    };
    Layer.prototype.clear = function (bounds) {
        BaseLayer_1.BaseLayer.prototype.clear.call(this, bounds);
        this.getHitCanvas()
            .getContext()
            .clear(bounds);
        return this;
    };
    Layer.prototype.enableHitGraph = function () {
        this.hitGraphEnabled(true);
        return this;
    };
    Layer.prototype.disableHitGraph = function () {
        this.hitGraphEnabled(false);
        return this;
    };
    Layer.prototype.toggleHitCanvas = function () {
        if (!this.parent) {
            return;
        }
        var parent = this.parent;
        var added = !!this.hitCanvas._canvas.parentNode;
        if (added) {
            parent.content.removeChild(this.hitCanvas._canvas);
        }
        else {
            parent.content.appendChild(this.hitCanvas._canvas);
        }
    };
    Layer.prototype.setSize = function (_a) {
        var width = _a.width, height = _a.height;
        _super.prototype.setSize.call(this, { width: width, height: height });
        this.hitCanvas.setSize(width, height);
        return this;
    };
    return Layer;
}(BaseLayer_1.BaseLayer));
exports.Layer = Layer;
Layer.prototype.nodeType = 'Layer';
Global_1._registerNode(Layer);
Factory_1.Factory.addGetterSetter(Layer, 'hitGraphEnabled', true, Validators_1.getBooleanValidator());
Util_1.Collection.mapMethods(Layer);

},{"./Util":"../node_modules/konva/lib/Util.js","./Container":"../node_modules/konva/lib/Container.js","./Factory":"../node_modules/konva/lib/Factory.js","./BaseLayer":"../node_modules/konva/lib/BaseLayer.js","./Canvas":"../node_modules/konva/lib/Canvas.js","./Shape":"../node_modules/konva/lib/Shape.js","./Validators":"../node_modules/konva/lib/Validators.js","./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/FastLayer.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Container_1 = require("./Container");
var BaseLayer_1 = require("./BaseLayer");
var Global_1 = require("./Global");
var FastLayer = (function (_super) {
    __extends(FastLayer, _super);
    function FastLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastLayer.prototype._validateAdd = function (child) {
        var type = child.getType();
        if (type !== 'Shape') {
            Util_1.Util.throw('You may only add shapes to a fast layer.');
        }
    };
    FastLayer.prototype._setCanvasSize = function (width, height) {
        this.canvas.setSize(width, height);
        this._checkSmooth();
    };
    FastLayer.prototype.hitGraphEnabled = function () {
        return false;
    };
    FastLayer.prototype.drawScene = function (can) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
        if (this.clearBeforeDraw()) {
            canvas.getContext().clear();
        }
        Container_1.Container.prototype.drawScene.call(this, canvas);
        return this;
    };
    FastLayer.prototype.draw = function () {
        this.drawScene();
        return this;
    };
    return FastLayer;
}(BaseLayer_1.BaseLayer));
exports.FastLayer = FastLayer;
FastLayer.prototype.nodeType = 'FastLayer';
Global_1._registerNode(FastLayer);
Util_1.Collection.mapMethods(FastLayer);

},{"./Util":"../node_modules/konva/lib/Util.js","./Container":"../node_modules/konva/lib/Container.js","./BaseLayer":"../node_modules/konva/lib/BaseLayer.js","./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/Group.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Container_1 = require("./Container");
var Global_1 = require("./Global");
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Group.prototype._validateAdd = function (child) {
        var type = child.getType();
        if (type !== 'Group' && type !== 'Shape') {
            Util_1.Util.throw('You may only add groups and shapes to groups.');
        }
    };
    return Group;
}(Container_1.Container));
exports.Group = Group;
Group.prototype.nodeType = 'Group';
Global_1._registerNode(Group);
Util_1.Collection.mapMethods(Group);

},{"./Util":"../node_modules/konva/lib/Util.js","./Container":"../node_modules/konva/lib/Container.js","./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/Animation.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var now = (function () {
    if (Global_1.glob.performance && Global_1.glob.performance.now) {
        return function () {
            return Global_1.glob.performance.now();
        };
    }
    return function () {
        return new Date().getTime();
    };
})();
var Animation = (function () {
    function Animation(func, layers) {
        this.id = Animation.animIdCounter++;
        this.frame = {
            time: 0,
            timeDiff: 0,
            lastTime: now(),
            frameRate: 0
        };
        this.func = func;
        this.setLayers(layers);
    }
    Animation.prototype.setLayers = function (layers) {
        var lays = [];
        if (!layers) {
            lays = [];
        }
        else if (layers.length > 0) {
            lays = layers;
        }
        else {
            lays = [layers];
        }
        this.layers = lays;
        return this;
    };
    Animation.prototype.getLayers = function () {
        return this.layers;
    };
    Animation.prototype.addLayer = function (layer) {
        var layers = this.layers, len = layers.length, n;
        for (n = 0; n < len; n++) {
            if (layers[n]._id === layer._id) {
                return false;
            }
        }
        this.layers.push(layer);
        return true;
    };
    Animation.prototype.isRunning = function () {
        var a = Animation, animations = a.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === this.id) {
                return true;
            }
        }
        return false;
    };
    Animation.prototype.start = function () {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();
        Animation._addAnimation(this);
        return this;
    };
    Animation.prototype.stop = function () {
        Animation._removeAnimation(this);
        return this;
    };
    Animation.prototype._updateFrameObject = function (time) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1000 / this.frame.timeDiff;
    };
    Animation._addAnimation = function (anim) {
        this.animations.push(anim);
        this._handleAnimation();
    };
    Animation._removeAnimation = function (anim) {
        var id = anim.id, animations = this.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === id) {
                this.animations.splice(n, 1);
                break;
            }
        }
    };
    Animation._runFrames = function () {
        var layerHash = {}, animations = this.animations, anim, layers, func, n, i, layersLen, layer, key, needRedraw;
        for (n = 0; n < animations.length; n++) {
            anim = animations[n];
            layers = anim.layers;
            func = anim.func;
            anim._updateFrameObject(now());
            layersLen = layers.length;
            if (func) {
                needRedraw = func.call(anim, anim.frame) !== false;
            }
            else {
                needRedraw = true;
            }
            if (!needRedraw) {
                continue;
            }
            for (i = 0; i < layersLen; i++) {
                layer = layers[i];
                if (layer._id !== undefined) {
                    layerHash[layer._id] = layer;
                }
            }
        }
        for (key in layerHash) {
            if (!layerHash.hasOwnProperty(key)) {
                continue;
            }
            layerHash[key].draw();
        }
    };
    Animation._animationLoop = function () {
        var Anim = Animation;
        if (Anim.animations.length) {
            Anim._runFrames();
            requestAnimationFrame(Anim._animationLoop);
        }
        else {
            Anim.animRunning = false;
        }
    };
    Animation._handleAnimation = function () {
        if (!this.animRunning) {
            this.animRunning = true;
            requestAnimationFrame(this._animationLoop);
        }
    };
    Animation.animations = [];
    Animation.animIdCounter = 0;
    Animation.animRunning = false;
    return Animation;
}());
exports.Animation = Animation;

},{"./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/Tween.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Animation_1 = require("./Animation");
var Node_1 = require("./Node");
var Global_1 = require("./Global");
var blacklist = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1
}, PAUSED = 1, PLAYING = 2, REVERSING = 3, idCounter = 0, colorAttrs = ['fill', 'stroke', 'shadowColor'];
var TweenEngine = (function () {
    function TweenEngine(prop, propFunc, func, begin, finish, duration, yoyo) {
        this.prop = prop;
        this.propFunc = propFunc;
        this.begin = begin;
        this._pos = begin;
        this.duration = duration;
        this._change = 0;
        this.prevPos = 0;
        this.yoyo = yoyo;
        this._time = 0;
        this._position = 0;
        this._startTime = 0;
        this._finish = 0;
        this.func = func;
        this._change = finish - this.begin;
        this.pause();
    }
    TweenEngine.prototype.fire = function (str) {
        var handler = this[str];
        if (handler) {
            handler();
        }
    };
    TweenEngine.prototype.setTime = function (t) {
        if (t > this.duration) {
            if (this.yoyo) {
                this._time = this.duration;
                this.reverse();
            }
            else {
                this.finish();
            }
        }
        else if (t < 0) {
            if (this.yoyo) {
                this._time = 0;
                this.play();
            }
            else {
                this.reset();
            }
        }
        else {
            this._time = t;
            this.update();
        }
    };
    TweenEngine.prototype.getTime = function () {
        return this._time;
    };
    TweenEngine.prototype.setPosition = function (p) {
        this.prevPos = this._pos;
        this.propFunc(p);
        this._pos = p;
    };
    TweenEngine.prototype.getPosition = function (t) {
        if (t === undefined) {
            t = this._time;
        }
        return this.func(t, this.begin, this._change, this.duration);
    };
    TweenEngine.prototype.play = function () {
        this.state = PLAYING;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onPlay');
    };
    TweenEngine.prototype.reverse = function () {
        this.state = REVERSING;
        this._time = this.duration - this._time;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onReverse');
    };
    TweenEngine.prototype.seek = function (t) {
        this.pause();
        this._time = t;
        this.update();
        this.fire('onSeek');
    };
    TweenEngine.prototype.reset = function () {
        this.pause();
        this._time = 0;
        this.update();
        this.fire('onReset');
    };
    TweenEngine.prototype.finish = function () {
        this.pause();
        this._time = this.duration;
        this.update();
        this.fire('onFinish');
    };
    TweenEngine.prototype.update = function () {
        this.setPosition(this.getPosition(this._time));
    };
    TweenEngine.prototype.onEnterFrame = function () {
        var t = this.getTimer() - this._startTime;
        if (this.state === PLAYING) {
            this.setTime(t);
        }
        else if (this.state === REVERSING) {
            this.setTime(this.duration - t);
        }
    };
    TweenEngine.prototype.pause = function () {
        this.state = PAUSED;
        this.fire('onPause');
    };
    TweenEngine.prototype.getTimer = function () {
        return new Date().getTime();
    };
    return TweenEngine;
}());
var Tween = (function () {
    function Tween(config) {
        var that = this, node = config.node, nodeId = node._id, duration, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo, key;
        if (typeof config.duration === 'undefined') {
            duration = 0.3;
        }
        else if (config.duration === 0) {
            duration = 0.001;
        }
        else {
            duration = config.duration;
        }
        this.node = node;
        this._id = idCounter++;
        var layers = node.getLayer() ||
            (node instanceof Global_1.Konva['Stage'] ? node.getLayers() : null);
        if (!layers) {
            Util_1.Util.error('Tween constructor have `node` that is not in a layer. Please add node into layer first.');
        }
        this.anim = new Animation_1.Animation(function () {
            that.tween.onEnterFrame();
        }, layers);
        this.tween = new TweenEngine(key, function (i) {
            that._tweenFunc(i);
        }, easing, 0, 1, duration * 1000, yoyo);
        this._addListeners();
        if (!Tween.attrs[nodeId]) {
            Tween.attrs[nodeId] = {};
        }
        if (!Tween.attrs[nodeId][this._id]) {
            Tween.attrs[nodeId][this._id] = {};
        }
        if (!Tween.tweens[nodeId]) {
            Tween.tweens[nodeId] = {};
        }
        for (key in config) {
            if (blacklist[key] === undefined) {
                this._addAttr(key, config[key]);
            }
        }
        this.reset();
        this.onFinish = config.onFinish;
        this.onReset = config.onReset;
    }
    Tween.prototype._addAttr = function (key, end) {
        var node = this.node, nodeId = node._id, start, diff, tweenId, n, len, trueEnd, trueStart, endRGBA;
        tweenId = Tween.tweens[nodeId][key];
        if (tweenId) {
            delete Tween.attrs[nodeId][tweenId][key];
        }
        start = node.getAttr(key);
        if (Util_1.Util._isArray(end)) {
            diff = [];
            len = Math.max(end.length, start.length);
            if (key === 'points' && end.length !== start.length) {
                if (end.length > start.length) {
                    trueStart = start;
                    start = Util_1.Util._prepareArrayForTween(start, end, node.closed());
                }
                else {
                    trueEnd = end;
                    end = Util_1.Util._prepareArrayForTween(end, start, node.closed());
                }
            }
            if (key.indexOf('fill') === 0) {
                for (n = 0; n < len; n++) {
                    if (n % 2 === 0) {
                        diff.push(end[n] - start[n]);
                    }
                    else {
                        var startRGBA = Util_1.Util.colorToRGBA(start[n]);
                        endRGBA = Util_1.Util.colorToRGBA(end[n]);
                        start[n] = startRGBA;
                        diff.push({
                            r: endRGBA.r - startRGBA.r,
                            g: endRGBA.g - startRGBA.g,
                            b: endRGBA.b - startRGBA.b,
                            a: endRGBA.a - startRGBA.a
                        });
                    }
                }
            }
            else {
                for (n = 0; n < len; n++) {
                    diff.push(end[n] - start[n]);
                }
            }
        }
        else if (colorAttrs.indexOf(key) !== -1) {
            start = Util_1.Util.colorToRGBA(start);
            endRGBA = Util_1.Util.colorToRGBA(end);
            diff = {
                r: endRGBA.r - start.r,
                g: endRGBA.g - start.g,
                b: endRGBA.b - start.b,
                a: endRGBA.a - start.a
            };
        }
        else {
            diff = end - start;
        }
        Tween.attrs[nodeId][this._id][key] = {
            start: start,
            diff: diff,
            end: end,
            trueEnd: trueEnd,
            trueStart: trueStart
        };
        Tween.tweens[nodeId][key] = this._id;
    };
    Tween.prototype._tweenFunc = function (i) {
        var node = this.node, attrs = Tween.attrs[node._id][this._id], key, attr, start, diff, newVal, n, len, end;
        for (key in attrs) {
            attr = attrs[key];
            start = attr.start;
            diff = attr.diff;
            end = attr.end;
            if (Util_1.Util._isArray(start)) {
                newVal = [];
                len = Math.max(start.length, end.length);
                if (key.indexOf('fill') === 0) {
                    for (n = 0; n < len; n++) {
                        if (n % 2 === 0) {
                            newVal.push((start[n] || 0) + diff[n] * i);
                        }
                        else {
                            newVal.push('rgba(' +
                                Math.round(start[n].r + diff[n].r * i) +
                                ',' +
                                Math.round(start[n].g + diff[n].g * i) +
                                ',' +
                                Math.round(start[n].b + diff[n].b * i) +
                                ',' +
                                (start[n].a + diff[n].a * i) +
                                ')');
                        }
                    }
                }
                else {
                    for (n = 0; n < len; n++) {
                        newVal.push((start[n] || 0) + diff[n] * i);
                    }
                }
            }
            else if (colorAttrs.indexOf(key) !== -1) {
                newVal =
                    'rgba(' +
                        Math.round(start.r + diff.r * i) +
                        ',' +
                        Math.round(start.g + diff.g * i) +
                        ',' +
                        Math.round(start.b + diff.b * i) +
                        ',' +
                        (start.a + diff.a * i) +
                        ')';
            }
            else {
                newVal = start + diff * i;
            }
            node.setAttr(key, newVal);
        }
    };
    Tween.prototype._addListeners = function () {
        var _this = this;
        this.tween.onPlay = function () {
            _this.anim.start();
        };
        this.tween.onReverse = function () {
            _this.anim.start();
        };
        this.tween.onPause = function () {
            _this.anim.stop();
        };
        this.tween.onFinish = function () {
            var node = _this.node;
            var attrs = Tween.attrs[node._id][_this._id];
            if (attrs.points && attrs.points.trueEnd) {
                node.setAttr('points', attrs.points.trueEnd);
            }
            if (_this.onFinish) {
                _this.onFinish.call(_this);
            }
        };
        this.tween.onReset = function () {
            var node = _this.node;
            var attrs = Tween.attrs[node._id][_this._id];
            if (attrs.points && attrs.points.trueStart) {
                node.points(attrs.points.trueStart);
            }
            if (_this.onReset) {
                _this.onReset();
            }
        };
    };
    Tween.prototype.play = function () {
        this.tween.play();
        return this;
    };
    Tween.prototype.reverse = function () {
        this.tween.reverse();
        return this;
    };
    Tween.prototype.reset = function () {
        this.tween.reset();
        return this;
    };
    Tween.prototype.seek = function (t) {
        this.tween.seek(t * 1000);
        return this;
    };
    Tween.prototype.pause = function () {
        this.tween.pause();
        return this;
    };
    Tween.prototype.finish = function () {
        this.tween.finish();
        return this;
    };
    Tween.prototype.destroy = function () {
        var nodeId = this.node._id, thisId = this._id, attrs = Tween.tweens[nodeId], key;
        this.pause();
        for (key in attrs) {
            delete Tween.tweens[nodeId][key];
        }
        delete Tween.attrs[nodeId][thisId];
    };
    Tween.attrs = {};
    Tween.tweens = {};
    return Tween;
}());
exports.Tween = Tween;
Node_1.Node.prototype.to = function (params) {
    var onFinish = params.onFinish;
    params.node = this;
    params.onFinish = function () {
        this.destroy();
        if (onFinish) {
            onFinish();
        }
    };
    var tween = new Tween(params);
    tween.play();
};
exports.Easings = {
    BackEaseIn: function (t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function (t, b, c, d) {
        var s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function (t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1) {
            return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    ElasticEaseIn: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (-(a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b);
    },
    ElasticEaseOut: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
            c +
            b);
    },
    ElasticEaseInOut: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        if (t < 1) {
            return (-0.5 *
                (a *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
                b);
        }
        return (a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
            0.5 +
            c +
            b);
    },
    BounceEaseOut: function (t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        }
        else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    BounceEaseIn: function (t, b, c, d) {
        return c - exports.Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseInOut: function (t, b, c, d) {
        if (t < d / 2) {
            return exports.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
        }
        else {
            return exports.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    },
    EaseIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    EaseOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t + b;
        }
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    StrongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    StrongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    StrongEaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t * t * t * t + b;
        }
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
    Linear: function (t, b, c, d) {
        return (c * t) / d + b;
    }
};

},{"./Util":"../node_modules/konva/lib/Util.js","./Animation":"../node_modules/konva/lib/Animation.js","./Node":"../node_modules/konva/lib/Node.js","./Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/_CoreInternals.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var Util_1 = require("./Util");
var Node_1 = require("./Node");
var Container_1 = require("./Container");
var Stage_1 = require("./Stage");
var Layer_1 = require("./Layer");
var FastLayer_1 = require("./FastLayer");
var Group_1 = require("./Group");
var DragAndDrop_1 = require("./DragAndDrop");
var Shape_1 = require("./Shape");
var Animation_1 = require("./Animation");
var Tween_1 = require("./Tween");
var Context_1 = require("./Context");
var Canvas_1 = require("./Canvas");
exports.Konva = Util_1.Util._assign(Global_1.Konva, {
    Collection: Util_1.Collection,
    Util: Util_1.Util,
    Transform: Util_1.Transform,
    Node: Node_1.Node,
    ids: Node_1.ids,
    names: Node_1.names,
    Container: Container_1.Container,
    Stage: Stage_1.Stage,
    stages: Stage_1.stages,
    Layer: Layer_1.Layer,
    FastLayer: FastLayer_1.FastLayer,
    Group: Group_1.Group,
    DD: DragAndDrop_1.DD,
    Shape: Shape_1.Shape,
    shapes: Shape_1.shapes,
    Animation: Animation_1.Animation,
    Tween: Tween_1.Tween,
    Easings: Tween_1.Easings,
    Context: Context_1.Context,
    Canvas: Canvas_1.Canvas
});

},{"./Global":"../node_modules/konva/lib/Global.js","./Util":"../node_modules/konva/lib/Util.js","./Node":"../node_modules/konva/lib/Node.js","./Container":"../node_modules/konva/lib/Container.js","./Stage":"../node_modules/konva/lib/Stage.js","./Layer":"../node_modules/konva/lib/Layer.js","./FastLayer":"../node_modules/konva/lib/FastLayer.js","./Group":"../node_modules/konva/lib/Group.js","./DragAndDrop":"../node_modules/konva/lib/DragAndDrop.js","./Shape":"../node_modules/konva/lib/Shape.js","./Animation":"../node_modules/konva/lib/Animation.js","./Tween":"../node_modules/konva/lib/Tween.js","./Context":"../node_modules/konva/lib/Context.js","./Canvas":"../node_modules/konva/lib/Canvas.js"}],"../node_modules/konva/lib/shapes/Arc.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Global_1 = require("../Global");
var Validators_1 = require("../Validators");
var Global_2 = require("../Global");
var Arc = (function (_super) {
    __extends(Arc, _super);
    function Arc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arc.prototype._sceneFunc = function (context) {
        var angle = Global_1.Konva.getAngle(this.angle()), clockwise = this.clockwise();
        context.beginPath();
        context.arc(0, 0, this.outerRadius(), 0, angle, clockwise);
        context.arc(0, 0, this.innerRadius(), angle, 0, !clockwise);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Arc.prototype.getWidth = function () {
        return this.outerRadius() * 2;
    };
    Arc.prototype.getHeight = function () {
        return this.outerRadius() * 2;
    };
    Arc.prototype.setWidth = function (width) {
        this.outerRadius(width / 2);
    };
    Arc.prototype.setHeight = function (height) {
        this.outerRadius(height / 2);
    };
    return Arc;
}(Shape_1.Shape));
exports.Arc = Arc;
Arc.prototype._centroid = true;
Arc.prototype.className = 'Arc';
Arc.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
Global_2._registerNode(Arc);
Factory_1.Factory.addGetterSetter(Arc, 'innerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arc, 'outerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arc, 'angle', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arc, 'clockwise', false, Validators_1.getBooleanValidator());
Util_1.Collection.mapMethods(Arc);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Global":"../node_modules/konva/lib/Global.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/shapes/Line.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(config) {
        var _this = _super.call(this, config) || this;
        _this.on('pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva', function () {
            this._clearCache('tensionPoints');
        });
        return _this;
    }
    Line.prototype._sceneFunc = function (context) {
        var points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier(), tp, len, n;
        if (!length) {
            return;
        }
        context.beginPath();
        context.moveTo(points[0], points[1]);
        if (tension !== 0 && length > 4) {
            tp = this.getTensionPoints();
            len = tp.length;
            n = closed ? 0 : 4;
            if (!closed) {
                context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
            }
            while (n < len - 2) {
                context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
            }
            if (!closed) {
                context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
            }
        }
        else if (bezier) {
            n = 2;
            while (n < length) {
                context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
            }
        }
        else {
            for (n = 2; n < length; n += 2) {
                context.lineTo(points[n], points[n + 1]);
            }
        }
        if (closed) {
            context.closePath();
            context.fillStrokeShape(this);
        }
        else {
            context.strokeShape(this);
        }
    };
    Line.prototype.getTensionPoints = function () {
        return this._getCache('tensionPoints', this._getTensionPoints);
    };
    Line.prototype._getTensionPoints = function () {
        if (this.closed()) {
            return this._getTensionPointsClosed();
        }
        else {
            return Util_1.Util._expandPoints(this.points(), this.tension());
        }
    };
    Line.prototype._getTensionPointsClosed = function () {
        var p = this.points(), len = p.length, tension = this.tension(), firstControlPoints = Util_1.Util._getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = Util_1.Util._getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = Util_1.Util._expandPoints(p, tension), tp = [firstControlPoints[2], firstControlPoints[3]]
            .concat(middle)
            .concat([
            lastControlPoints[0],
            lastControlPoints[1],
            p[len - 2],
            p[len - 1],
            lastControlPoints[2],
            lastControlPoints[3],
            firstControlPoints[0],
            firstControlPoints[1],
            p[0],
            p[1]
        ]);
        return tp;
    };
    Line.prototype.getWidth = function () {
        return this.getSelfRect().width;
    };
    Line.prototype.getHeight = function () {
        return this.getSelfRect().height;
    };
    Line.prototype.getSelfRect = function () {
        var points = this.points();
        if (points.length < 4) {
            return {
                x: points[0] || 0,
                y: points[1] || 0,
                width: 0,
                height: 0
            };
        }
        if (this.tension() !== 0) {
            points = __spreadArrays([
                points[0],
                points[1]
            ], this._getTensionPoints(), [
                points[points.length - 2],
                points[points.length - 1]
            ]);
        }
        else {
            points = this.points();
        }
        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x, y;
        for (var i = 0; i < points.length / 2; i++) {
            x = points[i * 2];
            y = points[i * 2 + 1];
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        return {
            x: Math.round(minX),
            y: Math.round(minY),
            width: Math.round(maxX - minX),
            height: Math.round(maxY - minY)
        };
    };
    return Line;
}(Shape_1.Shape));
exports.Line = Line;
Line.prototype.className = 'Line';
Line.prototype._attrsAffectingSize = ['points', 'bezier', 'tension'];
Global_1._registerNode(Line);
Factory_1.Factory.addGetterSetter(Line, 'closed', false);
Factory_1.Factory.addGetterSetter(Line, 'bezier', false);
Factory_1.Factory.addGetterSetter(Line, 'tension', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Line, 'points', [], Validators_1.getNumberArrayValidator());
Util_1.Collection.mapMethods(Line);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Arrow.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Line_1 = require("./Line");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arrow.prototype._sceneFunc = function (ctx) {
        _super.prototype._sceneFunc.call(this, ctx);
        var PI2 = Math.PI * 2;
        var points = this.points();
        var tp = points;
        var fromTension = this.tension() !== 0 && points.length > 4;
        if (fromTension) {
            tp = this.getTensionPoints();
        }
        var n = points.length;
        var dx, dy;
        if (fromTension) {
            dx = points[n - 2] - (tp[tp.length - 2] + tp[tp.length - 4]) / 2;
            dy = points[n - 1] - (tp[tp.length - 1] + tp[tp.length - 3]) / 2;
        }
        else {
            dx = points[n - 2] - points[n - 4];
            dy = points[n - 1] - points[n - 3];
        }
        var radians = (Math.atan2(dy, dx) + PI2) % PI2;
        var length = this.pointerLength();
        var width = this.pointerWidth();
        ctx.save();
        ctx.beginPath();
        ctx.translate(points[n - 2], points[n - 1]);
        ctx.rotate(radians);
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, width / 2);
        ctx.lineTo(-length, -width / 2);
        ctx.closePath();
        ctx.restore();
        if (this.pointerAtBeginning()) {
            ctx.save();
            ctx.translate(points[0], points[1]);
            if (fromTension) {
                dx = (tp[0] + tp[2]) / 2 - points[0];
                dy = (tp[1] + tp[3]) / 2 - points[1];
            }
            else {
                dx = points[2] - points[0];
                dy = points[3] - points[1];
            }
            ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
            ctx.moveTo(0, 0);
            ctx.lineTo(-length, width / 2);
            ctx.lineTo(-length, -width / 2);
            ctx.closePath();
            ctx.restore();
        }
        var isDashEnabled = this.dashEnabled();
        if (isDashEnabled) {
            this.attrs.dashEnabled = false;
            ctx.setLineDash([]);
        }
        ctx.fillStrokeShape(this);
        if (isDashEnabled) {
            this.attrs.dashEnabled = true;
        }
    };
    Arrow.prototype.getSelfRect = function () {
        var lineRect = _super.prototype.getSelfRect.call(this);
        var offset = this.pointerWidth() / 2;
        return {
            x: lineRect.x - offset,
            y: lineRect.y - offset,
            width: lineRect.width + offset * 2,
            height: lineRect.height + offset * 2,
        };
    };
    return Arrow;
}(Line_1.Line));
exports.Arrow = Arrow;
Arrow.prototype.className = 'Arrow';
Global_1._registerNode(Arrow);
Factory_1.Factory.addGetterSetter(Arrow, 'pointerLength', 10, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arrow, 'pointerWidth', 10, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arrow, 'pointerAtBeginning', false);
Util_1.Collection.mapMethods(Arrow);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","./Line":"../node_modules/konva/lib/shapes/Line.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Circle.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype._sceneFunc = function (context) {
        context.beginPath();
        context.arc(0, 0, this.radius(), 0, Math.PI * 2, false);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Circle.prototype.getWidth = function () {
        return this.radius() * 2;
    };
    Circle.prototype.getHeight = function () {
        return this.radius() * 2;
    };
    Circle.prototype.setWidth = function (width) {
        if (this.radius() !== width / 2) {
            this.radius(width / 2);
        }
    };
    Circle.prototype.setHeight = function (height) {
        if (this.radius() !== height / 2) {
            this.radius(height / 2);
        }
    };
    return Circle;
}(Shape_1.Shape));
exports.Circle = Circle;
Circle.prototype._centroid = true;
Circle.prototype.className = 'Circle';
Circle.prototype._attrsAffectingSize = ['radius'];
Global_1._registerNode(Circle);
Factory_1.Factory.addGetterSetter(Circle, 'radius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Circle);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Ellipse.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ellipse.prototype._sceneFunc = function (context) {
        var rx = this.radiusX(), ry = this.radiusY();
        context.beginPath();
        context.save();
        if (rx !== ry) {
            context.scale(1, ry / rx);
        }
        context.arc(0, 0, rx, 0, Math.PI * 2, false);
        context.restore();
        context.closePath();
        context.fillStrokeShape(this);
    };
    Ellipse.prototype.getWidth = function () {
        return this.radiusX() * 2;
    };
    Ellipse.prototype.getHeight = function () {
        return this.radiusY() * 2;
    };
    Ellipse.prototype.setWidth = function (width) {
        this.radiusX(width / 2);
    };
    Ellipse.prototype.setHeight = function (height) {
        this.radiusY(height / 2);
    };
    return Ellipse;
}(Shape_1.Shape));
exports.Ellipse = Ellipse;
Ellipse.prototype.className = 'Ellipse';
Ellipse.prototype._centroid = true;
Ellipse.prototype._attrsAffectingSize = ['radiusX', 'radiusY'];
Global_1._registerNode(Ellipse);
Factory_1.Factory.addComponentsGetterSetter(Ellipse, 'radius', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Ellipse, 'radiusX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Ellipse, 'radiusY', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Ellipse);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Image.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image.prototype._useBufferCanvas = function () {
        return !!((this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
            this.hasStroke() &&
            this.getStage());
    };
    Image.prototype._sceneFunc = function (context) {
        var width = this.width(), height = this.height(), image = this.image(), cropWidth, cropHeight, params;
        if (image) {
            cropWidth = this.cropWidth();
            cropHeight = this.cropHeight();
            if (cropWidth && cropHeight) {
                params = [
                    image,
                    this.cropX(),
                    this.cropY(),
                    cropWidth,
                    cropHeight,
                    0,
                    0,
                    width,
                    height
                ];
            }
            else {
                params = [image, 0, 0, width, height];
            }
        }
        if (this.hasFill() || this.hasStroke()) {
            context.beginPath();
            context.rect(0, 0, width, height);
            context.closePath();
            context.fillStrokeShape(this);
        }
        if (image) {
            context.drawImage.apply(context, params);
        }
    };
    Image.prototype._hitFunc = function (context) {
        var width = this.width(), height = this.height();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Image.prototype.getWidth = function () {
        var _a;
        var image = this.image();
        return _a = this.attrs.width, (_a !== null && _a !== void 0 ? _a : (image ? image.width : 0));
    };
    Image.prototype.getHeight = function () {
        var _a;
        var image = this.image();
        return _a = this.attrs.height, (_a !== null && _a !== void 0 ? _a : (image ? image.height : 0));
    };
    Image.fromURL = function (url, callback) {
        var img = Util_1.Util.createImageElement();
        img.onload = function () {
            var image = new Image({
                image: img
            });
            callback(image);
        };
        img.crossOrigin = 'Anonymous';
        img.src = url;
    };
    return Image;
}(Shape_1.Shape));
exports.Image = Image;
Image.prototype.className = 'Image';
Global_1._registerNode(Image);
Factory_1.Factory.addGetterSetter(Image, 'image');
Factory_1.Factory.addComponentsGetterSetter(Image, 'crop', ['x', 'y', 'width', 'height']);
Factory_1.Factory.addGetterSetter(Image, 'cropX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Image, 'cropY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Image, 'cropWidth', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Image, 'cropHeight', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Image);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Label.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Group_1 = require("../Group");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var ATTR_CHANGE_LIST = [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'padding',
    'lineHeight',
    'text',
    'width'
], CHANGE_KONVA = 'Change.konva', NONE = 'none', UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left', attrChangeListLen = ATTR_CHANGE_LIST.length;
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(config) {
        var _this = _super.call(this, config) || this;
        _this.on('add.konva', function (evt) {
            this._addListeners(evt.child);
            this._sync();
        });
        return _this;
    }
    Label.prototype.getText = function () {
        return this.find('Text')[0];
    };
    Label.prototype.getTag = function () {
        return this.find('Tag')[0];
    };
    Label.prototype._addListeners = function (text) {
        var that = this, n;
        var func = function () {
            that._sync();
        };
        for (n = 0; n < attrChangeListLen; n++) {
            text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
        }
    };
    Label.prototype.getWidth = function () {
        return this.getText().width();
    };
    Label.prototype.getHeight = function () {
        return this.getText().height();
    };
    Label.prototype._sync = function () {
        var text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x, y, pointerHeight;
        if (text && tag) {
            width = text.width();
            height = text.height();
            pointerDirection = tag.pointerDirection();
            pointerWidth = tag.pointerWidth();
            pointerHeight = tag.pointerHeight();
            x = 0;
            y = 0;
            switch (pointerDirection) {
                case UP:
                    x = width / 2;
                    y = -1 * pointerHeight;
                    break;
                case RIGHT:
                    x = width + pointerWidth;
                    y = height / 2;
                    break;
                case DOWN:
                    x = width / 2;
                    y = height + pointerHeight;
                    break;
                case LEFT:
                    x = -1 * pointerWidth;
                    y = height / 2;
                    break;
            }
            tag.setAttrs({
                x: -1 * x,
                y: -1 * y,
                width: width,
                height: height
            });
            text.setAttrs({
                x: -1 * x,
                y: -1 * y
            });
        }
    };
    return Label;
}(Group_1.Group));
exports.Label = Label;
Label.prototype.className = 'Label';
Global_1._registerNode(Label);
Util_1.Collection.mapMethods(Label);
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tag.prototype._sceneFunc = function (context) {
        var width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = Math.min(this.cornerRadius(), width / 2, height / 2);
        context.beginPath();
        if (!cornerRadius) {
            context.moveTo(0, 0);
        }
        else {
            context.moveTo(cornerRadius, 0);
        }
        if (pointerDirection === UP) {
            context.lineTo((width - pointerWidth) / 2, 0);
            context.lineTo(width / 2, -1 * pointerHeight);
            context.lineTo((width + pointerWidth) / 2, 0);
        }
        if (!cornerRadius) {
            context.lineTo(width, 0);
        }
        else {
            context.lineTo(width - cornerRadius, 0);
            context.arc(width - cornerRadius, cornerRadius, cornerRadius, (Math.PI * 3) / 2, 0, false);
        }
        if (pointerDirection === RIGHT) {
            context.lineTo(width, (height - pointerHeight) / 2);
            context.lineTo(width + pointerWidth, height / 2);
            context.lineTo(width, (height + pointerHeight) / 2);
        }
        if (!cornerRadius) {
            context.lineTo(width, height);
        }
        else {
            context.lineTo(width, height - cornerRadius);
            context.arc(width - cornerRadius, height - cornerRadius, cornerRadius, 0, Math.PI / 2, false);
        }
        if (pointerDirection === DOWN) {
            context.lineTo((width + pointerWidth) / 2, height);
            context.lineTo(width / 2, height + pointerHeight);
            context.lineTo((width - pointerWidth) / 2, height);
        }
        if (!cornerRadius) {
            context.lineTo(0, height);
        }
        else {
            context.lineTo(cornerRadius, height);
            context.arc(cornerRadius, height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false);
        }
        if (pointerDirection === LEFT) {
            context.lineTo(0, (height + pointerHeight) / 2);
            context.lineTo(-1 * pointerWidth, height / 2);
            context.lineTo(0, (height - pointerHeight) / 2);
        }
        if (cornerRadius) {
            context.lineTo(0, cornerRadius);
            context.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, (Math.PI * 3) / 2, false);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    Tag.prototype.getSelfRect = function () {
        var x = 0, y = 0, pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
        if (direction === UP) {
            y -= pointerHeight;
            height += pointerHeight;
        }
        else if (direction === DOWN) {
            height += pointerHeight;
        }
        else if (direction === LEFT) {
            x -= pointerWidth * 1.5;
            width += pointerWidth;
        }
        else if (direction === RIGHT) {
            width += pointerWidth * 1.5;
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    };
    return Tag;
}(Shape_1.Shape));
exports.Tag = Tag;
Tag.prototype.className = 'Tag';
Global_1._registerNode(Tag);
Factory_1.Factory.addGetterSetter(Tag, 'pointerDirection', NONE);
Factory_1.Factory.addGetterSetter(Tag, 'pointerWidth', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Tag, 'pointerHeight', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Tag, 'cornerRadius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Tag);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Group":"../node_modules/konva/lib/Group.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Path.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Global_1 = require("../Global");
var Path = (function (_super) {
    __extends(Path, _super);
    function Path(config) {
        var _this = _super.call(this, config) || this;
        _this.dataArray = [];
        _this.pathLength = 0;
        _this.dataArray = Path.parsePathData(_this.data());
        _this.pathLength = 0;
        for (var i = 0; i < _this.dataArray.length; ++i) {
            _this.pathLength += _this.dataArray[i].pathLength;
        }
        _this.on('dataChange.konva', function () {
            this.dataArray = Path.parsePathData(this.data());
            this.pathLength = 0;
            for (var i = 0; i < this.dataArray.length; ++i) {
                this.pathLength += this.dataArray[i].pathLength;
            }
        });
        return _this;
    }
    Path.prototype._sceneFunc = function (context) {
        var ca = this.dataArray;
        context.beginPath();
        for (var n = 0; n < ca.length; n++) {
            var c = ca[n].command;
            var p = ca[n].points;
            switch (c) {
                case 'L':
                    context.lineTo(p[0], p[1]);
                    break;
                case 'M':
                    context.moveTo(p[0], p[1]);
                    break;
                case 'C':
                    context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
                    break;
                case 'Q':
                    context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
                    break;
                case 'A':
                    var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];
                    var r = rx > ry ? rx : ry;
                    var scaleX = rx > ry ? 1 : rx / ry;
                    var scaleY = rx > ry ? ry / rx : 1;
                    context.translate(cx, cy);
                    context.rotate(psi);
                    context.scale(scaleX, scaleY);
                    context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
                    context.scale(1 / scaleX, 1 / scaleY);
                    context.rotate(-psi);
                    context.translate(-cx, -cy);
                    break;
                case 'z':
                    context.closePath();
                    break;
            }
        }
        context.fillStrokeShape(this);
    };
    Path.prototype.getSelfRect = function () {
        var points = [];
        this.dataArray.forEach(function (data) {
            if (data.command === 'A') {
                points = points.concat([
                    data.points[0] - data.points[2],
                    data.points[1] - data.points[3],
                    data.points[0] + data.points[2],
                    data.points[1] + data.points[3]
                ]);
            }
            else {
                points = points.concat(data.points);
            }
        });
        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x, y;
        for (var i = 0; i < points.length / 2; i++) {
            x = points[i * 2];
            y = points[i * 2 + 1];
            if (!isNaN(x)) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
            }
            if (!isNaN(y)) {
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
        return {
            x: Math.round(minX),
            y: Math.round(minY),
            width: Math.round(maxX - minX),
            height: Math.round(maxY - minY)
        };
    };
    Path.prototype.getLength = function () {
        return this.pathLength;
    };
    Path.prototype.getPointAtLength = function (length) {
        var point, i = 0, ii = this.dataArray.length;
        if (!ii) {
            return null;
        }
        while (i < ii && length > this.dataArray[i].pathLength) {
            length -= this.dataArray[i].pathLength;
            ++i;
        }
        if (i === ii) {
            point = this.dataArray[i - 1].points.slice(-2);
            return {
                x: point[0],
                y: point[1]
            };
        }
        if (length < 0.01) {
            point = this.dataArray[i].points.slice(0, 2);
            return {
                x: point[0],
                y: point[1]
            };
        }
        var cp = this.dataArray[i];
        var p = cp.points;
        switch (cp.command) {
            case 'L':
                return Path.getPointOnLine(length, cp.start.x, cp.start.y, p[0], p[1]);
            case 'C':
                return Path.getPointOnCubicBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3], p[4], p[5]);
            case 'Q':
                return Path.getPointOnQuadraticBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3]);
            case 'A':
                var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6];
                theta += (dTheta * length) / cp.pathLength;
                return Path.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
        }
        return null;
    };
    Path.getLineLength = function (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };
    Path.getPointOnLine = function (dist, P1x, P1y, P2x, P2y, fromX, fromY) {
        if (fromX === undefined) {
            fromX = P1x;
        }
        if (fromY === undefined) {
            fromY = P1y;
        }
        var m = (P2y - P1y) / (P2x - P1x + 0.00000001);
        var run = Math.sqrt((dist * dist) / (1 + m * m));
        if (P2x < P1x) {
            run *= -1;
        }
        var rise = m * run;
        var pt;
        if (P2x === P1x) {
            pt = {
                x: fromX,
                y: fromY + rise
            };
        }
        else if ((fromY - P1y) / (fromX - P1x + 0.00000001) === m) {
            pt = {
                x: fromX + run,
                y: fromY + rise
            };
        }
        else {
            var ix, iy;
            var len = this.getLineLength(P1x, P1y, P2x, P2y);
            if (len < 0.00000001) {
                return undefined;
            }
            var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
            u = u / (len * len);
            ix = P1x + u * (P2x - P1x);
            iy = P1y + u * (P2y - P1y);
            var pRise = this.getLineLength(fromX, fromY, ix, iy);
            var pRun = Math.sqrt(dist * dist - pRise * pRise);
            run = Math.sqrt((pRun * pRun) / (1 + m * m));
            if (P2x < P1x) {
                run *= -1;
            }
            rise = m * run;
            pt = {
                x: ix + run,
                y: iy + rise
            };
        }
        return pt;
    };
    Path.getPointOnCubicBezier = function (pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
        function CB1(t) {
            return t * t * t;
        }
        function CB2(t) {
            return 3 * t * t * (1 - t);
        }
        function CB3(t) {
            return 3 * t * (1 - t) * (1 - t);
        }
        function CB4(t) {
            return (1 - t) * (1 - t) * (1 - t);
        }
        var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
        var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
        return {
            x: x,
            y: y
        };
    };
    Path.getPointOnQuadraticBezier = function (pct, P1x, P1y, P2x, P2y, P3x, P3y) {
        function QB1(t) {
            return t * t;
        }
        function QB2(t) {
            return 2 * t * (1 - t);
        }
        function QB3(t) {
            return (1 - t) * (1 - t);
        }
        var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
        var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
        return {
            x: x,
            y: y
        };
    };
    Path.getPointOnEllipticalArc = function (cx, cy, rx, ry, theta, psi) {
        var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
        var pt = {
            x: rx * Math.cos(theta),
            y: ry * Math.sin(theta)
        };
        return {
            x: cx + (pt.x * cosPsi - pt.y * sinPsi),
            y: cy + (pt.x * sinPsi + pt.y * cosPsi)
        };
    };
    Path.parsePathData = function (data) {
        if (!data) {
            return [];
        }
        var cs = data;
        var cc = [
            'm',
            'M',
            'l',
            'L',
            'v',
            'V',
            'h',
            'H',
            'z',
            'Z',
            'c',
            'C',
            'q',
            'Q',
            't',
            'T',
            's',
            'S',
            'a',
            'A'
        ];
        cs = cs.replace(new RegExp(' ', 'g'), ',');
        for (var n = 0; n < cc.length; n++) {
            cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
        }
        var arr = cs.split('|');
        var ca = [];
        var coords = [];
        var cpx = 0;
        var cpy = 0;
        var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
        var match;
        for (n = 1; n < arr.length; n++) {
            var str = arr[n];
            var c = str.charAt(0);
            str = str.slice(1);
            coords.length = 0;
            while ((match = re.exec(str))) {
                coords.push(match[0]);
            }
            var p = [];
            for (var j = 0, jlen = coords.length; j < jlen; j++) {
                var parsed = parseFloat(coords[j]);
                if (!isNaN(parsed)) {
                    p.push(parsed);
                }
                else {
                    p.push(0);
                }
            }
            while (p.length > 0) {
                if (isNaN(p[0])) {
                    break;
                }
                var cmd = null;
                var points = [];
                var startX = cpx, startY = cpy;
                var prevCmd, ctlPtx, ctlPty;
                var rx, ry, psi, fa, fs, x1, y1;
                switch (c) {
                    case 'l':
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'L':
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'm':
                        var dx = p.shift();
                        var dy = p.shift();
                        cpx += dx;
                        cpy += dy;
                        cmd = 'M';
                        if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
                            for (var idx = ca.length - 2; idx >= 0; idx--) {
                                if (ca[idx].command === 'M') {
                                    cpx = ca[idx].points[0] + dx;
                                    cpy = ca[idx].points[1] + dy;
                                    break;
                                }
                            }
                        }
                        points.push(cpx, cpy);
                        c = 'l';
                        break;
                    case 'M':
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'M';
                        points.push(cpx, cpy);
                        c = 'L';
                        break;
                    case 'h':
                        cpx += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'H':
                        cpx = p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'v':
                        cpy += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'V':
                        cpy = p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'C':
                        points.push(p.shift(), p.shift(), p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'c':
                        points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 'S':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'C') {
                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
                            ctlPty = cpy + (cpy - prevCmd.points[3]);
                        }
                        points.push(ctlPtx, ctlPty, p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 's':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'C') {
                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
                            ctlPty = cpy + (cpy - prevCmd.points[3]);
                        }
                        points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 'Q':
                        points.push(p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'q':
                        points.push(cpx + p.shift(), cpy + p.shift());
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'Q';
                        points.push(cpx, cpy);
                        break;
                    case 'T':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'Q') {
                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
                            ctlPty = cpy + (cpy - prevCmd.points[1]);
                        }
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'Q';
                        points.push(ctlPtx, ctlPty, cpx, cpy);
                        break;
                    case 't':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'Q') {
                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
                            ctlPty = cpy + (cpy - prevCmd.points[1]);
                        }
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'Q';
                        points.push(ctlPtx, ctlPty, cpx, cpy);
                        break;
                    case 'A':
                        rx = p.shift();
                        ry = p.shift();
                        psi = p.shift();
                        fa = p.shift();
                        fs = p.shift();
                        x1 = cpx;
                        y1 = cpy;
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'A';
                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                        break;
                    case 'a':
                        rx = p.shift();
                        ry = p.shift();
                        psi = p.shift();
                        fa = p.shift();
                        fs = p.shift();
                        x1 = cpx;
                        y1 = cpy;
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'A';
                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                        break;
                }
                ca.push({
                    command: cmd || c,
                    points: points,
                    start: {
                        x: startX,
                        y: startY
                    },
                    pathLength: this.calcLength(startX, startY, cmd || c, points)
                });
            }
            if (c === 'z' || c === 'Z') {
                ca.push({
                    command: 'z',
                    points: [],
                    start: undefined,
                    pathLength: 0
                });
            }
        }
        return ca;
    };
    Path.calcLength = function (x, y, cmd, points) {
        var len, p1, p2, t;
        var path = Path;
        switch (cmd) {
            case 'L':
                return path.getLineLength(x, y, points[0], points[1]);
            case 'C':
                len = 0.0;
                p1 = path.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                for (t = 0.01; t <= 1; t += 0.01) {
                    p2 = path.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                return len;
            case 'Q':
                len = 0.0;
                p1 = path.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
                for (t = 0.01; t <= 1; t += 0.01) {
                    p2 = path.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                return len;
            case 'A':
                len = 0.0;
                var start = points[4];
                var dTheta = points[5];
                var end = points[4] + dTheta;
                var inc = Math.PI / 180.0;
                if (Math.abs(start - end) < inc) {
                    inc = Math.abs(start - end);
                }
                p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
                if (dTheta < 0) {
                    for (t = start - inc; t > end; t -= inc) {
                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                        p1 = p2;
                    }
                }
                else {
                    for (t = start + inc; t < end; t += inc) {
                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                        p1 = p2;
                    }
                }
                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                return len;
        }
        return 0;
    };
    Path.convertEndpointToCenterParameterization = function (x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
        var psi = psiDeg * (Math.PI / 180.0);
        var xp = (Math.cos(psi) * (x1 - x2)) / 2.0 + (Math.sin(psi) * (y1 - y2)) / 2.0;
        var yp = (-1 * Math.sin(psi) * (x1 - x2)) / 2.0 +
            (Math.cos(psi) * (y1 - y2)) / 2.0;
        var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
        if (lambda > 1) {
            rx *= Math.sqrt(lambda);
            ry *= Math.sqrt(lambda);
        }
        var f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
            (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
        if (fa === fs) {
            f *= -1;
        }
        if (isNaN(f)) {
            f = 0;
        }
        var cxp = (f * rx * yp) / ry;
        var cyp = (f * -ry * xp) / rx;
        var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
        var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
        var vMag = function (v) {
            return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        };
        var vRatio = function (u, v) {
            return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
        };
        var vAngle = function (u, v) {
            return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
        };
        var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
        var u = [(xp - cxp) / rx, (yp - cyp) / ry];
        var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
        var dTheta = vAngle(u, v);
        if (vRatio(u, v) <= -1) {
            dTheta = Math.PI;
        }
        if (vRatio(u, v) >= 1) {
            dTheta = 0;
        }
        if (fs === 0 && dTheta > 0) {
            dTheta = dTheta - 2 * Math.PI;
        }
        if (fs === 1 && dTheta < 0) {
            dTheta = dTheta + 2 * Math.PI;
        }
        return [cx, cy, rx, ry, theta, dTheta, psi, fs];
    };
    return Path;
}(Shape_1.Shape));
exports.Path = Path;
Path.prototype.className = 'Path';
Path.prototype._attrsAffectingSize = ['data'];
Global_1._registerNode(Path);
Factory_1.Factory.addGetterSetter(Path, 'data');
Util_1.Collection.mapMethods(Path);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Rect.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Global_1 = require("../Global");
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rect.prototype._sceneFunc = function (context) {
        var cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
        context.beginPath();
        if (!cornerRadius) {
            context.rect(0, 0, width, height);
        }
        else {
            var topLeft = 0;
            var topRight = 0;
            var bottomLeft = 0;
            var bottomRight = 0;
            if (typeof cornerRadius === 'number') {
                topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
            }
            else {
                topLeft = Math.min(cornerRadius[0], width / 2, height / 2);
                topRight = Math.min(cornerRadius[1], width / 2, height / 2);
                bottomRight = Math.min(cornerRadius[2], width / 2, height / 2);
                bottomLeft = Math.min(cornerRadius[3], width / 2, height / 2);
            }
            context.moveTo(topLeft, 0);
            context.lineTo(width - topRight, 0);
            context.arc(width - topRight, topRight, topRight, (Math.PI * 3) / 2, 0, false);
            context.lineTo(width, height - bottomRight);
            context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
            context.lineTo(bottomLeft, height);
            context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
            context.lineTo(0, topLeft);
            context.arc(topLeft, topLeft, topLeft, Math.PI, (Math.PI * 3) / 2, false);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    return Rect;
}(Shape_1.Shape));
exports.Rect = Rect;
Rect.prototype.className = 'Rect';
Global_1._registerNode(Rect);
Factory_1.Factory.addGetterSetter(Rect, 'cornerRadius', 0);
Util_1.Collection.mapMethods(Rect);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/RegularPolygon.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var RegularPolygon = (function (_super) {
    __extends(RegularPolygon, _super);
    function RegularPolygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegularPolygon.prototype._sceneFunc = function (context) {
        var sides = this.sides(), radius = this.radius(), n, x, y;
        context.beginPath();
        context.moveTo(0, 0 - radius);
        for (n = 1; n < sides; n++) {
            x = radius * Math.sin((n * 2 * Math.PI) / sides);
            y = -1 * radius * Math.cos((n * 2 * Math.PI) / sides);
            context.lineTo(x, y);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    RegularPolygon.prototype.getWidth = function () {
        return this.radius() * 2;
    };
    RegularPolygon.prototype.getHeight = function () {
        return this.radius() * 2;
    };
    RegularPolygon.prototype.setWidth = function (width) {
        this.radius(width / 2);
    };
    RegularPolygon.prototype.setHeight = function (height) {
        this.radius(height / 2);
    };
    return RegularPolygon;
}(Shape_1.Shape));
exports.RegularPolygon = RegularPolygon;
RegularPolygon.prototype.className = 'RegularPolygon';
RegularPolygon.prototype._centroid = true;
RegularPolygon.prototype._attrsAffectingSize = ['radius'];
Global_1._registerNode(RegularPolygon);
Factory_1.Factory.addGetterSetter(RegularPolygon, 'radius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(RegularPolygon, 'sides', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(RegularPolygon);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Ring.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var PIx2 = Math.PI * 2;
var Ring = (function (_super) {
    __extends(Ring, _super);
    function Ring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ring.prototype._sceneFunc = function (context) {
        context.beginPath();
        context.arc(0, 0, this.innerRadius(), 0, PIx2, false);
        context.moveTo(this.outerRadius(), 0);
        context.arc(0, 0, this.outerRadius(), PIx2, 0, true);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Ring.prototype.getWidth = function () {
        return this.outerRadius() * 2;
    };
    Ring.prototype.getHeight = function () {
        return this.outerRadius() * 2;
    };
    Ring.prototype.setWidth = function (width) {
        this.outerRadius(width / 2);
    };
    Ring.prototype.setHeight = function (height) {
        this.outerRadius(height / 2);
    };
    return Ring;
}(Shape_1.Shape));
exports.Ring = Ring;
Ring.prototype.className = 'Ring';
Ring.prototype._centroid = true;
Ring.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
Global_1._registerNode(Ring);
Factory_1.Factory.addGetterSetter(Ring, 'innerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Ring, 'outerRadius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Ring);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Sprite.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Animation_1 = require("../Animation");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(config) {
        var _this = _super.call(this, config) || this;
        _this._updated = true;
        _this.anim = new Animation_1.Animation(function () {
            var updated = _this._updated;
            _this._updated = false;
            return updated;
        });
        _this.on('animationChange.konva', function () {
            this.frameIndex(0);
        });
        _this.on('frameIndexChange.konva', function () {
            this._updated = true;
        });
        _this.on('frameRateChange.konva', function () {
            if (!this.anim.isRunning()) {
                return;
            }
            clearInterval(this.interval);
            this._setInterval();
        });
        return _this;
    }
    Sprite.prototype._sceneFunc = function (context) {
        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), x = set[ix4 + 0], y = set[ix4 + 1], width = set[ix4 + 2], height = set[ix4 + 3], image = this.image();
        if (this.hasFill() || this.hasStroke()) {
            context.beginPath();
            context.rect(0, 0, width, height);
            context.closePath();
            context.fillStrokeShape(this);
        }
        if (image) {
            if (offsets) {
                var offset = offsets[anim], ix2 = index * 2;
                context.drawImage(image, x, y, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
            }
            else {
                context.drawImage(image, x, y, width, height, 0, 0, width, height);
            }
        }
    };
    Sprite.prototype._hitFunc = function (context) {
        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), width = set[ix4 + 2], height = set[ix4 + 3];
        context.beginPath();
        if (offsets) {
            var offset = offsets[anim];
            var ix2 = index * 2;
            context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
        }
        else {
            context.rect(0, 0, width, height);
        }
        context.closePath();
        context.fillShape(this);
    };
    Sprite.prototype._useBufferCanvas = function () {
        return ((this.hasShadow() || this.getAbsoluteOpacity() !== 1) && this.hasStroke());
    };
    Sprite.prototype._setInterval = function () {
        var that = this;
        this.interval = setInterval(function () {
            that._updateIndex();
        }, 1000 / this.frameRate());
    };
    Sprite.prototype.start = function () {
        if (this.isRunning()) {
            return;
        }
        var layer = this.getLayer();
        this.anim.setLayers(layer);
        this._setInterval();
        this.anim.start();
    };
    Sprite.prototype.stop = function () {
        this.anim.stop();
        clearInterval(this.interval);
    };
    Sprite.prototype.isRunning = function () {
        return this.anim.isRunning();
    };
    Sprite.prototype._updateIndex = function () {
        var index = this.frameIndex(), animation = this.animation(), animations = this.animations(), anim = animations[animation], len = anim.length / 4;
        if (index < len - 1) {
            this.frameIndex(index + 1);
        }
        else {
            this.frameIndex(0);
        }
    };
    return Sprite;
}(Shape_1.Shape));
exports.Sprite = Sprite;
Sprite.prototype.className = 'Sprite';
Global_1._registerNode(Sprite);
Factory_1.Factory.addGetterSetter(Sprite, 'animation');
Factory_1.Factory.addGetterSetter(Sprite, 'animations');
Factory_1.Factory.addGetterSetter(Sprite, 'frameOffsets');
Factory_1.Factory.addGetterSetter(Sprite, 'image');
Factory_1.Factory.addGetterSetter(Sprite, 'frameIndex', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Sprite, 'frameRate', 17, Validators_1.getNumberValidator());
Factory_1.Factory.backCompat(Sprite, {
    index: 'frameIndex',
    getIndex: 'getFrameIndex',
    setIndex: 'setFrameIndex'
});
Util_1.Collection.mapMethods(Sprite);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Animation":"../node_modules/konva/lib/Animation.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Star.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var Star = (function (_super) {
    __extends(Star, _super);
    function Star() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Star.prototype._sceneFunc = function (context) {
        var innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
        context.beginPath();
        context.moveTo(0, 0 - outerRadius);
        for (var n = 1; n < numPoints * 2; n++) {
            var radius = n % 2 === 0 ? outerRadius : innerRadius;
            var x = radius * Math.sin((n * Math.PI) / numPoints);
            var y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
            context.lineTo(x, y);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    Star.prototype.getWidth = function () {
        return this.outerRadius() * 2;
    };
    Star.prototype.getHeight = function () {
        return this.outerRadius() * 2;
    };
    Star.prototype.setWidth = function (width) {
        this.outerRadius(width / 2);
    };
    Star.prototype.setHeight = function (height) {
        this.outerRadius(height / 2);
    };
    return Star;
}(Shape_1.Shape));
exports.Star = Star;
Star.prototype.className = 'Star';
Star.prototype._centroid = true;
Star.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
Global_1._registerNode(Star);
Factory_1.Factory.addGetterSetter(Star, 'numPoints', 5, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Star, 'innerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Star, 'outerRadius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Star);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Text.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Global_1 = require("../Global");
var Validators_1 = require("../Validators");
var Global_2 = require("../Global");
var AUTO = 'auto', CENTER = 'center', JUSTIFY = 'justify', CHANGE_KONVA = 'Change.konva', CONTEXT_2D = '2d', DASH = '-', LEFT = 'left', TEXT = 'text', TEXT_UPPER = 'Text', TOP = 'top', BOTTOM = 'bottom', MIDDLE = 'middle', NORMAL = 'normal', PX_SPACE = 'px ', SPACE = ' ', RIGHT = 'right', WORD = 'word', CHAR = 'char', NONE = 'none', ELLIPSIS = '…', ATTR_CHANGE_LIST = [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontVariant',
    'padding',
    'align',
    'verticalAlign',
    'lineHeight',
    'text',
    'width',
    'height',
    'wrap',
    'ellipsis',
    'letterSpacing'
], attrChangeListLen = ATTR_CHANGE_LIST.length;
var dummyContext;
function getDummyContext() {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = Util_1.Util.createCanvasElement().getContext(CONTEXT_2D);
    return dummyContext;
}
function _fillFunc(context) {
    context.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function _strokeFunc(context) {
    context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function checkDefaultFill(config) {
    config = config || {};
    if (!config.fillLinearGradientColorStops &&
        !config.fillRadialGradientColorStops &&
        !config.fillPatternImage) {
        config.fill = config.fill || 'black';
    }
    return config;
}
var trimRight = String.prototype.trimRight || function polyfill() {
    return this.replace(/[\s\xa0]+$/, '');
};
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(config) {
        var _this = _super.call(this, checkDefaultFill(config)) || this;
        _this._partialTextX = 0;
        _this._partialTextY = 0;
        for (var n = 0; n < attrChangeListLen; n++) {
            _this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, _this._setTextData);
        }
        _this._setTextData();
        return _this;
    }
    Text.prototype._sceneFunc = function (context) {
        var padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, textArr = this.textArr, textArrLen = textArr.length, verticalAlign = this.verticalAlign(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf('underline') !== -1, shouldLineThrough = textDecoration.indexOf('line-through') !== -1, n;
        var translateY = 0;
        var translateY = lineHeightPx / 2;
        var lineTranslateX = 0;
        var lineTranslateY = 0;
        context.setAttr('font', this._getContextFont());
        context.setAttr('textBaseline', MIDDLE);
        context.setAttr('textAlign', LEFT);
        if (verticalAlign === MIDDLE) {
            alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
        }
        else if (verticalAlign === BOTTOM) {
            alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
        }
        context.translate(padding, alignY + padding);
        for (n = 0; n < textArrLen; n++) {
            var lineTranslateX = 0;
            var lineTranslateY = 0;
            var obj = textArr[n], text = obj.text, width = obj.width, lastLine = n !== textArrLen - 1, spacesNumber, oneWord, lineWidth;
            context.save();
            if (align === RIGHT) {
                lineTranslateX += totalWidth - width - padding * 2;
            }
            else if (align === CENTER) {
                lineTranslateX += (totalWidth - width - padding * 2) / 2;
            }
            if (shouldUnderline) {
                context.save();
                context.beginPath();
                context.moveTo(lineTranslateX, translateY + lineTranslateY + Math.round(fontSize / 2));
                spacesNumber = text.split(' ').length - 1;
                oneWord = spacesNumber === 0;
                lineWidth =
                    align === JUSTIFY && lastLine && !oneWord
                        ? totalWidth - padding * 2
                        : width;
                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + Math.round(fontSize / 2));
                context.lineWidth = fontSize / 15;
                context.strokeStyle = fill;
                context.stroke();
                context.restore();
            }
            if (shouldLineThrough) {
                context.save();
                context.beginPath();
                context.moveTo(lineTranslateX, translateY + lineTranslateY);
                spacesNumber = text.split(' ').length - 1;
                oneWord = spacesNumber === 0;
                lineWidth =
                    align === JUSTIFY && lastLine && !oneWord
                        ? totalWidth - padding * 2
                        : width;
                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY);
                context.lineWidth = fontSize / 15;
                context.strokeStyle = fill;
                context.stroke();
                context.restore();
            }
            if (letterSpacing !== 0 || align === JUSTIFY) {
                spacesNumber = text.split(' ').length - 1;
                for (var li = 0; li < text.length; li++) {
                    var letter = text[li];
                    if (letter === ' ' && n !== textArrLen - 1 && align === JUSTIFY) {
                        lineTranslateX += Math.floor((totalWidth - padding * 2 - width) / spacesNumber);
                    }
                    this._partialTextX = lineTranslateX;
                    this._partialTextY = translateY + lineTranslateY;
                    this._partialText = letter;
                    context.fillStrokeShape(this);
                    lineTranslateX +=
                        Math.round(this.measureSize(letter).width) + letterSpacing;
                }
            }
            else {
                this._partialTextX = lineTranslateX;
                this._partialTextY = translateY + lineTranslateY;
                this._partialText = text;
                context.fillStrokeShape(this);
            }
            context.restore();
            if (textArrLen > 1) {
                translateY += lineHeightPx;
            }
        }
    };
    Text.prototype._hitFunc = function (context) {
        var width = this.getWidth(), height = this.getHeight();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Text.prototype.setText = function (text) {
        var str = Util_1.Util._isString(text) ? text : (text === null || text === undefined) ? '' : text + '';
        this._setAttr(TEXT, str);
        return this;
    };
    Text.prototype.getWidth = function () {
        var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
        return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
    };
    Text.prototype.getHeight = function () {
        var isAuto = this.attrs.height === AUTO || this.attrs.height === undefined;
        return isAuto
            ? this.fontSize() * this.textArr.length * this.lineHeight() +
                this.padding() * 2
            : this.attrs.height;
    };
    Text.prototype.getTextWidth = function () {
        return this.textWidth;
    };
    Text.prototype.getTextHeight = function () {
        Util_1.Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
        return this.textHeight;
    };
    Text.prototype.measureSize = function (text) {
        var _context = getDummyContext(), fontSize = this.fontSize(), metrics;
        _context.save();
        _context.font = this._getContextFont();
        metrics = _context.measureText(text);
        _context.restore();
        return {
            width: metrics.width,
            height: fontSize
        };
    };
    Text.prototype._getContextFont = function () {
        if (Global_1.Konva.UA.isIE) {
            return (this.fontStyle() +
                SPACE +
                this.fontSize() +
                PX_SPACE +
                this.fontFamily());
        }
        return (this.fontStyle() +
            SPACE +
            this.fontVariant() +
            SPACE +
            this.fontSize() +
            PX_SPACE +
            this.fontFamily());
    };
    Text.prototype._addTextLine = function (line) {
        if (this.align() === JUSTIFY) {
            line = line.trim();
        }
        var width = this._getTextWidth(line);
        return this.textArr.push({ text: line, width: width });
    };
    Text.prototype._getTextWidth = function (text) {
        var letterSpacing = this.letterSpacing();
        var length = text.length;
        return (getDummyContext().measureText(text).width +
            (length ? letterSpacing * (length - 1) : 0));
    };
    Text.prototype._setTextData = function () {
        var lines = this.text().split('\n'), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== undefined, fixedHeight = height !== AUTO && height !== undefined, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis() && !shouldWrap;
        this.textArr = [];
        getDummyContext().font = this._getContextFont();
        var additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
        for (var i = 0, max = lines.length; i < max; ++i) {
            var line = lines[i];
            var lineWidth = this._getTextWidth(line);
            if (fixedWidth && lineWidth > maxWidth) {
                while (line.length > 0) {
                    var low = 0, high = line.length, match = '', matchWidth = 0;
                    while (low < high) {
                        var mid = (low + high) >>> 1, substr = line.slice(0, mid + 1), substrWidth = this._getTextWidth(substr) + additionalWidth;
                        if (substrWidth <= maxWidth) {
                            low = mid + 1;
                            match = substr + (shouldAddEllipsis ? ELLIPSIS : '');
                            matchWidth = substrWidth;
                        }
                        else {
                            high = mid;
                        }
                    }
                    if (match) {
                        if (wrapAtWord) {
                            var wrapIndex;
                            var nextChar = line[match.length];
                            var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
                            if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                                wrapIndex = match.length;
                            }
                            else {
                                wrapIndex =
                                    Math.max(match.lastIndexOf(SPACE), match.lastIndexOf(DASH)) +
                                        1;
                            }
                            if (wrapIndex > 0) {
                                low = wrapIndex;
                                match = match.slice(0, low);
                                matchWidth = this._getTextWidth(match);
                            }
                        }
                        match = match.trimRight();
                        this._addTextLine(match);
                        textWidth = Math.max(textWidth, matchWidth);
                        currentHeightPx += lineHeightPx;
                        if (!shouldWrap ||
                            (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx)) {
                            break;
                        }
                        line = line.slice(low);
                        line = line.trimLeft();
                        if (line.length > 0) {
                            lineWidth = this._getTextWidth(line);
                            if (lineWidth <= maxWidth) {
                                this._addTextLine(line);
                                currentHeightPx += lineHeightPx;
                                textWidth = Math.max(textWidth, lineWidth);
                                break;
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                this._addTextLine(line);
                currentHeightPx += lineHeightPx;
                textWidth = Math.max(textWidth, lineWidth);
            }
            if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
                break;
            }
        }
        this.textHeight = fontSize;
        this.textWidth = textWidth;
    };
    Text.prototype.getStrokeScaleEnabled = function () {
        return true;
    };
    return Text;
}(Shape_1.Shape));
exports.Text = Text;
Text.prototype._fillFunc = _fillFunc;
Text.prototype._strokeFunc = _strokeFunc;
Text.prototype.className = TEXT_UPPER;
Text.prototype._attrsAffectingSize = [
    'text',
    'fontSize',
    'padding',
    'wrap',
    'lineHeight'
];
Global_2._registerNode(Text);
Factory_1.Factory.overWriteSetter(Text, 'width', Validators_1.getNumberOrAutoValidator());
Factory_1.Factory.overWriteSetter(Text, 'height', Validators_1.getNumberOrAutoValidator());
Factory_1.Factory.addGetterSetter(Text, 'fontFamily', 'Arial');
Factory_1.Factory.addGetterSetter(Text, 'fontSize', 12, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'fontStyle', NORMAL);
Factory_1.Factory.addGetterSetter(Text, 'fontVariant', NORMAL);
Factory_1.Factory.addGetterSetter(Text, 'padding', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'align', LEFT);
Factory_1.Factory.addGetterSetter(Text, 'verticalAlign', TOP);
Factory_1.Factory.addGetterSetter(Text, 'lineHeight', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'wrap', WORD);
Factory_1.Factory.addGetterSetter(Text, 'ellipsis', false);
Factory_1.Factory.addGetterSetter(Text, 'letterSpacing', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'text', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Text, 'textDecoration', '');
Util_1.Collection.mapMethods(Text);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Global":"../node_modules/konva/lib/Global.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/shapes/TextPath.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Path_1 = require("./Path");
var Text_1 = require("./Text");
var Validators_1 = require("../Validators");
var Global_1 = require("../Global");
var EMPTY_STRING = '', NORMAL = 'normal';
function _fillFunc(context) {
    context.fillText(this.partialText, 0, 0);
}
function _strokeFunc(context) {
    context.strokeText(this.partialText, 0, 0);
}
var TextPath = (function (_super) {
    __extends(TextPath, _super);
    function TextPath(config) {
        var _this = _super.call(this, config) || this;
        _this.dummyCanvas = Util_1.Util.createCanvasElement();
        _this.dataArray = [];
        _this.dataArray = Path_1.Path.parsePathData(_this.attrs.data);
        _this.on('dataChange.konva', function () {
            this.dataArray = Path_1.Path.parsePathData(this.attrs.data);
            this._setTextData();
        });
        _this.on('textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva', _this._setTextData);
        if (config && config['getKerning']) {
            Util_1.Util.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.');
            _this.kerningFunc(config['getKerning']);
        }
        _this._setTextData();
        return _this;
    }
    TextPath.prototype._sceneFunc = function (context) {
        context.setAttr('font', this._getContextFont());
        context.setAttr('textBaseline', this.textBaseline());
        context.setAttr('textAlign', 'left');
        context.save();
        var textDecoration = this.textDecoration();
        var fill = this.fill();
        var fontSize = this.fontSize();
        var glyphInfo = this.glyphInfo;
        if (textDecoration === 'underline') {
            context.beginPath();
        }
        for (var i = 0; i < glyphInfo.length; i++) {
            context.save();
            var p0 = glyphInfo[i].p0;
            context.translate(p0.x, p0.y);
            context.rotate(glyphInfo[i].rotation);
            this.partialText = glyphInfo[i].text;
            context.fillStrokeShape(this);
            if (textDecoration === 'underline') {
                if (i === 0) {
                    context.moveTo(0, fontSize / 2 + 1);
                }
                context.lineTo(fontSize, fontSize / 2 + 1);
            }
            context.restore();
        }
        if (textDecoration === 'underline') {
            context.strokeStyle = fill;
            context.lineWidth = fontSize / 20;
            context.stroke();
        }
        context.restore();
    };
    TextPath.prototype._hitFunc = function (context) {
        context.beginPath();
        var glyphInfo = this.glyphInfo;
        if (glyphInfo.length >= 1) {
            var p0 = glyphInfo[0].p0;
            context.moveTo(p0.x, p0.y);
        }
        for (var i = 0; i < glyphInfo.length; i++) {
            var p1 = glyphInfo[i].p1;
            context.lineTo(p1.x, p1.y);
        }
        context.setAttr('lineWidth', this.fontSize());
        context.setAttr('strokeStyle', this.colorKey);
        context.stroke();
    };
    TextPath.prototype.getTextWidth = function () {
        return this.textWidth;
    };
    TextPath.prototype.getTextHeight = function () {
        Util_1.Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
        return this.textHeight;
    };
    TextPath.prototype.setText = function (text) {
        return Text_1.Text.prototype.setText.call(this, text);
    };
    TextPath.prototype._getContextFont = function () {
        return Text_1.Text.prototype._getContextFont.call(this);
    };
    TextPath.prototype._getTextSize = function (text) {
        var dummyCanvas = this.dummyCanvas;
        var _context = dummyCanvas.getContext('2d');
        _context.save();
        _context.font = this._getContextFont();
        var metrics = _context.measureText(text);
        _context.restore();
        return {
            width: metrics.width,
            height: parseInt(this.attrs.fontSize, 10)
        };
    };
    TextPath.prototype._setTextData = function () {
        var that = this;
        var size = this._getTextSize(this.attrs.text);
        var letterSpacing = this.letterSpacing();
        var align = this.align();
        var kerningFunc = this.kerningFunc();
        this.textWidth = size.width;
        this.textHeight = size.height;
        var textFullWidth = Math.max(this.textWidth + ((this.attrs.text || '').length - 1) * letterSpacing, 0);
        this.glyphInfo = [];
        var fullPathWidth = 0;
        for (var l = 0; l < that.dataArray.length; l++) {
            if (that.dataArray[l].pathLength > 0) {
                fullPathWidth += that.dataArray[l].pathLength;
            }
        }
        var offset = 0;
        if (align === 'center') {
            offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
        }
        if (align === 'right') {
            offset = Math.max(0, fullPathWidth - textFullWidth);
        }
        var charArr = this.text().split('');
        var spacesNumber = this.text().split(' ').length - 1;
        var p0, p1, pathCmd;
        var pIndex = -1;
        var currentT = 0;
        var getNextPathSegment = function () {
            currentT = 0;
            var pathData = that.dataArray;
            for (var j = pIndex + 1; j < pathData.length; j++) {
                if (pathData[j].pathLength > 0) {
                    pIndex = j;
                    return pathData[j];
                }
                else if (pathData[j].command === 'M') {
                    p0 = {
                        x: pathData[j].points[0],
                        y: pathData[j].points[1]
                    };
                }
            }
            return {};
        };
        var findSegmentToFitCharacter = function (c) {
            var glyphWidth = that._getTextSize(c).width + letterSpacing;
            if (c === ' ' && align === 'justify') {
                glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
            }
            var currLen = 0;
            var attempts = 0;
            p1 = undefined;
            while (Math.abs(glyphWidth - currLen) / glyphWidth > 0.01 &&
                attempts < 25) {
                attempts++;
                var cumulativePathLength = currLen;
                while (pathCmd === undefined) {
                    pathCmd = getNextPathSegment();
                    if (pathCmd &&
                        cumulativePathLength + pathCmd.pathLength < glyphWidth) {
                        cumulativePathLength += pathCmd.pathLength;
                        pathCmd = undefined;
                    }
                }
                if (pathCmd === {} || p0 === undefined) {
                    return undefined;
                }
                var needNewSegment = false;
                switch (pathCmd.command) {
                    case 'L':
                        if (Path_1.Path.getLineLength(p0.x, p0.y, pathCmd.points[0], pathCmd.points[1]) > glyphWidth) {
                            p1 = Path_1.Path.getPointOnLine(glyphWidth, p0.x, p0.y, pathCmd.points[0], pathCmd.points[1], p0.x, p0.y);
                        }
                        else {
                            pathCmd = undefined;
                        }
                        break;
                    case 'A':
                        var start = pathCmd.points[4];
                        var dTheta = pathCmd.points[5];
                        var end = pathCmd.points[4] + dTheta;
                        if (currentT === 0) {
                            currentT = start + 0.00000001;
                        }
                        else if (glyphWidth > currLen) {
                            currentT += ((Math.PI / 180.0) * dTheta) / Math.abs(dTheta);
                        }
                        else {
                            currentT -= ((Math.PI / 360.0) * dTheta) / Math.abs(dTheta);
                        }
                        if ((dTheta < 0 && currentT < end) ||
                            (dTheta >= 0 && currentT > end)) {
                            currentT = end;
                            needNewSegment = true;
                        }
                        p1 = Path_1.Path.getPointOnEllipticalArc(pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], currentT, pathCmd.points[6]);
                        break;
                    case 'C':
                        if (currentT === 0) {
                            if (glyphWidth > pathCmd.pathLength) {
                                currentT = 0.00000001;
                            }
                            else {
                                currentT = glyphWidth / pathCmd.pathLength;
                            }
                        }
                        else if (glyphWidth > currLen) {
                            currentT += (glyphWidth - currLen) / pathCmd.pathLength;
                        }
                        else {
                            currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
                        }
                        if (currentT > 1.0) {
                            currentT = 1.0;
                            needNewSegment = true;
                        }
                        p1 = Path_1.Path.getPointOnCubicBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], pathCmd.points[4], pathCmd.points[5]);
                        break;
                    case 'Q':
                        if (currentT === 0) {
                            currentT = glyphWidth / pathCmd.pathLength;
                        }
                        else if (glyphWidth > currLen) {
                            currentT += (glyphWidth - currLen) / pathCmd.pathLength;
                        }
                        else {
                            currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
                        }
                        if (currentT > 1.0) {
                            currentT = 1.0;
                            needNewSegment = true;
                        }
                        p1 = Path_1.Path.getPointOnQuadraticBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3]);
                        break;
                }
                if (p1 !== undefined) {
                    currLen = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
                }
                if (needNewSegment) {
                    needNewSegment = false;
                    pathCmd = undefined;
                }
            }
        };
        var testChar = 'C';
        var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
        var lettersInOffset = offset / glyphWidth - 1;
        for (var k = 0; k < lettersInOffset; k++) {
            findSegmentToFitCharacter(testChar);
            if (p0 === undefined || p1 === undefined) {
                break;
            }
            p0 = p1;
        }
        for (var i = 0; i < charArr.length; i++) {
            findSegmentToFitCharacter(charArr[i]);
            if (p0 === undefined || p1 === undefined) {
                break;
            }
            var width = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
            var kern = 0;
            if (kerningFunc) {
                try {
                    kern = kerningFunc(charArr[i - 1], charArr[i]) * this.fontSize();
                }
                catch (e) {
                    kern = 0;
                }
            }
            p0.x += kern;
            p1.x += kern;
            this.textWidth += kern;
            var midpoint = Path_1.Path.getPointOnLine(kern + width / 2.0, p0.x, p0.y, p1.x, p1.y);
            var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
            this.glyphInfo.push({
                transposeX: midpoint.x,
                transposeY: midpoint.y,
                text: charArr[i],
                rotation: rotation,
                p0: p0,
                p1: p1
            });
            p0 = p1;
        }
    };
    TextPath.prototype.getSelfRect = function () {
        if (!this.glyphInfo.length) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        var points = [];
        this.glyphInfo.forEach(function (info) {
            points.push(info.p0.x);
            points.push(info.p0.y);
            points.push(info.p1.x);
            points.push(info.p1.y);
        });
        var minX = points[0] || 0;
        var maxX = points[0] || 0;
        var minY = points[1] || 0;
        var maxY = points[1] || 0;
        var x, y;
        for (var i = 0; i < points.length / 2; i++) {
            x = points[i * 2];
            y = points[i * 2 + 1];
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        var fontSize = this.fontSize();
        return {
            x: Math.round(minX) - fontSize / 2,
            y: Math.round(minY) - fontSize / 2,
            width: Math.round(maxX - minX) + fontSize,
            height: Math.round(maxY - minY) + fontSize
        };
    };
    return TextPath;
}(Shape_1.Shape));
exports.TextPath = TextPath;
TextPath.prototype._fillFunc = _fillFunc;
TextPath.prototype._strokeFunc = _strokeFunc;
TextPath.prototype._fillFuncHit = _fillFunc;
TextPath.prototype._strokeFuncHit = _strokeFunc;
TextPath.prototype.className = 'TextPath';
TextPath.prototype._attrsAffectingSize = ['text', 'fontSize', 'data'];
Global_1._registerNode(TextPath);
Factory_1.Factory.addGetterSetter(TextPath, 'data');
Factory_1.Factory.addGetterSetter(TextPath, 'fontFamily', 'Arial');
Factory_1.Factory.addGetterSetter(TextPath, 'fontSize', 12, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(TextPath, 'fontStyle', NORMAL);
Factory_1.Factory.addGetterSetter(TextPath, 'align', 'left');
Factory_1.Factory.addGetterSetter(TextPath, 'letterSpacing', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(TextPath, 'textBaseline', 'middle');
Factory_1.Factory.addGetterSetter(TextPath, 'fontVariant', NORMAL);
Factory_1.Factory.addGetterSetter(TextPath, 'text', EMPTY_STRING);
Factory_1.Factory.addGetterSetter(TextPath, 'textDecoration', null);
Factory_1.Factory.addGetterSetter(TextPath, 'kerningFunc', null);
Util_1.Collection.mapMethods(TextPath);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","./Path":"../node_modules/konva/lib/shapes/Path.js","./Text":"../node_modules/konva/lib/shapes/Text.js","../Validators":"../node_modules/konva/lib/Validators.js","../Global":"../node_modules/konva/lib/Global.js"}],"../node_modules/konva/lib/shapes/Transformer.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Shape_1 = require("../Shape");
var Rect_1 = require("./Rect");
var Group_1 = require("../Group");
var Global_1 = require("../Global");
var Validators_1 = require("../Validators");
var Global_2 = require("../Global");
var EVENTS_NAME = 'tr-konva';
var ATTR_CHANGE_LIST = [
    'resizeEnabledChange',
    'rotateAnchorOffsetChange',
    'rotateEnabledChange',
    'enabledAnchorsChange',
    'anchorSizeChange',
    'borderEnabledChange',
    'borderStrokeChange',
    'borderStrokeWidthChange',
    'borderDashChange',
    'anchorStrokeChange',
    'anchorStrokeWidthChange',
    'anchorFillChange',
    'anchorCornerRadiusChange',
    'ignoreStrokeChange'
]
    .map(function (e) { return e + ("." + EVENTS_NAME); })
    .join(' ');
var NODE_RECT = 'nodeRect';
var TRANSFORM_CHANGE_STR = [
    'widthChange',
    'heightChange',
    'scaleXChange',
    'scaleYChange',
    'skewXChange',
    'skewYChange',
    'rotationChange',
    'offsetXChange',
    'offsetYChange',
    'transformsEnabledChange',
    'strokeWidthChange'
]
    .map(function (e) { return e + ("." + EVENTS_NAME); })
    .join(' ');
var ANGLES = {
    'top-left': -45,
    'top-center': 0,
    'top-right': 45,
    'middle-right': -90,
    'middle-left': 90,
    'bottom-left': -135,
    'bottom-center': 180,
    'bottom-right': 135
};
var TOUCH_DEVICE = 'ontouchstart' in Global_1.Konva._global;
function getCursor(anchorName, rad, isMirrored) {
    if (anchorName === 'rotater') {
        return 'crosshair';
    }
    rad += Util_1.Util._degToRad(ANGLES[anchorName] || 0);
    if (isMirrored) {
        rad *= -1;
    }
    var angle = ((Util_1.Util._radToDeg(rad) % 360) + 360) % 360;
    if (Util_1.Util._inRange(angle, 315 + 22.5, 360) || Util_1.Util._inRange(angle, 0, 22.5)) {
        return 'ns-resize';
    }
    else if (Util_1.Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
        return 'nesw-resize';
    }
    else if (Util_1.Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
        return 'ew-resize';
    }
    else if (Util_1.Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
        return 'nwse-resize';
    }
    else if (Util_1.Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
        return 'ns-resize';
    }
    else if (Util_1.Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
        return 'nesw-resize';
    }
    else if (Util_1.Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
        return 'ew-resize';
    }
    else if (Util_1.Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
        return 'nwse-resize';
    }
    else {
        Util_1.Util.error('Transformer has unknown angle for cursor detection: ' + angle);
        return 'pointer';
    }
}
var ANCHORS_NAMES = [
    'top-left',
    'top-center',
    'top-right',
    'middle-right',
    'middle-left',
    'bottom-left',
    'bottom-center',
    'bottom-right'
];
var MAX_SAFE_INTEGER = 100000000;
var Transformer = (function (_super) {
    __extends(Transformer, _super);
    function Transformer(config) {
        var _this = _super.call(this, config) || this;
        _this._transforming = false;
        _this._createElements();
        _this._handleMouseMove = _this._handleMouseMove.bind(_this);
        _this._handleMouseUp = _this._handleMouseUp.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.on(ATTR_CHANGE_LIST, _this.update);
        if (_this.getNode()) {
            _this.update();
        }
        return _this;
    }
    Transformer.prototype.attachTo = function (node) {
        this.setNode(node);
        return this;
    };
    Transformer.prototype.setNode = function (node) {
        var _this = this;
        if (this._node) {
            this.detach();
        }
        this._node = node;
        this._resetTransformCache();
        var additionalEvents = node._attrsAffectingSize
            .map(function (prop) { return prop + 'Change.' + EVENTS_NAME; })
            .join(' ');
        var onChange = function () {
            _this._resetTransformCache();
            if (!_this._transforming) {
                _this.update();
            }
        };
        node.on(additionalEvents, onChange);
        node.on(TRANSFORM_CHANGE_STR, onChange);
        node.on("xChange." + EVENTS_NAME + " yChange." + EVENTS_NAME, function () {
            return _this._resetTransformCache();
        });
        var elementsCreated = !!this.findOne('.top-left');
        if (elementsCreated) {
            this.update();
        }
        return this;
    };
    Transformer.prototype.getNode = function () {
        return this._node;
    };
    Transformer.prototype.detach = function () {
        if (this.getNode()) {
            this.getNode().off('.' + EVENTS_NAME);
            this._node = undefined;
        }
        this._resetTransformCache();
    };
    Transformer.prototype._resetTransformCache = function () {
        this._clearCache(NODE_RECT);
        this._clearCache('transform');
        this._clearSelfAndDescendantCache('absoluteTransform');
    };
    Transformer.prototype._getNodeRect = function () {
        return this._getCache(NODE_RECT, this.__getNodeRect);
    };
    Transformer.prototype.__getNodeRect = function () {
        var node = this.getNode();
        if (!node) {
            return {
                x: -MAX_SAFE_INTEGER,
                y: -MAX_SAFE_INTEGER,
                width: 0,
                height: 0,
                rotation: 0
            };
        }
        if (node.parent && this.parent && node.parent !== this.parent) {
            Util_1.Util.warn('Transformer and attached node have different parents. Konva does not support such case right now. Please move Transformer to the parent of attaching node.');
        }
        var rect = node.getClientRect({
            skipTransform: true,
            skipShadow: true,
            skipStroke: this.ignoreStroke()
        });
        var rotation = Global_1.Konva.getAngle(node.rotation());
        var dx = rect.x * node.scaleX() - node.offsetX() * node.scaleX();
        var dy = rect.y * node.scaleY() - node.offsetY() * node.scaleY();
        return {
            x: node.x() + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
            y: node.y() + dy * Math.cos(rotation) + dx * Math.sin(rotation),
            width: rect.width * node.scaleX(),
            height: rect.height * node.scaleY(),
            rotation: node.rotation()
        };
    };
    Transformer.prototype.getX = function () {
        return this._getNodeRect().x;
    };
    Transformer.prototype.getY = function () {
        return this._getNodeRect().y;
    };
    Transformer.prototype.getRotation = function () {
        return this._getNodeRect().rotation;
    };
    Transformer.prototype.getWidth = function () {
        return this._getNodeRect().width;
    };
    Transformer.prototype.getHeight = function () {
        return this._getNodeRect().height;
    };
    Transformer.prototype._createElements = function () {
        this._createBack();
        ANCHORS_NAMES.forEach(function (name) {
            this._createAnchor(name);
        }.bind(this));
        this._createAnchor('rotater');
    };
    Transformer.prototype._createAnchor = function (name) {
        var _this = this;
        var anchor = new Rect_1.Rect({
            stroke: 'rgb(0, 161, 255)',
            fill: 'white',
            strokeWidth: 1,
            name: name + ' _anchor',
            dragDistance: 0,
            draggable: true,
            hitStrokeWidth: TOUCH_DEVICE ? 10 : 'auto'
        });
        var self = this;
        anchor.on('mousedown touchstart', function (e) {
            self._handleMouseDown(e);
        });
        anchor.on('dragstart', function (e) {
            e.cancelBubble = true;
        });
        anchor.on('dragmove', function (e) {
            e.cancelBubble = true;
        });
        anchor.on('dragend', function (e) {
            e.cancelBubble = true;
        });
        anchor.on('mouseenter', function () {
            var rad = Global_1.Konva.getAngle(_this.getAbsoluteRotation());
            var scale = _this.getNode().getAbsoluteScale();
            var isMirrored = scale.y * scale.x < 0;
            var cursor = getCursor(name, rad, isMirrored);
            anchor.getStage().content.style.cursor = cursor;
            _this._cursorChange = true;
        });
        anchor.on('mouseout', function () {
            if (!anchor.getStage() || !anchor.getParent()) {
                return;
            }
            anchor.getStage().content.style.cursor = '';
            _this._cursorChange = false;
        });
        this.add(anchor);
    };
    Transformer.prototype._createBack = function () {
        var back = new Shape_1.Shape({
            name: 'back',
            width: 0,
            height: 0,
            listening: false,
            sceneFunc: function (ctx) {
                var tr = this.getParent();
                var padding = tr.padding();
                ctx.beginPath();
                ctx.rect(-padding, -padding, this.width() + padding * 2, this.height() + padding * 2);
                ctx.moveTo(this.width() / 2, -padding);
                if (tr.rotateEnabled()) {
                    ctx.lineTo(this.width() / 2, -tr.rotateAnchorOffset() * Util_1.Util._sign(this.height()) - padding);
                }
                ctx.fillStrokeShape(this);
            }
        });
        this.add(back);
    };
    Transformer.prototype._handleMouseDown = function (e) {
        this._movingAnchorName = e.target.name().split(' ')[0];
        var attrs = this._getNodeRect();
        var width = attrs.width;
        var height = attrs.height;
        var hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        this.sin = Math.abs(height / hypotenuse);
        this.cos = Math.abs(width / hypotenuse);
        window.addEventListener('mousemove', this._handleMouseMove);
        window.addEventListener('touchmove', this._handleMouseMove);
        window.addEventListener('mouseup', this._handleMouseUp, true);
        window.addEventListener('touchend', this._handleMouseUp, true);
        this._transforming = true;
        this._fire('transformstart', { evt: e });
        this.getNode()._fire('transformstart', { evt: e });
    };
    Transformer.prototype._handleMouseMove = function (e) {
        var x, y, newHypotenuse;
        var anchorNode = this.findOne('.' + this._movingAnchorName);
        var stage = anchorNode.getStage();
        stage.setPointersPositions(e);
        anchorNode.setAbsolutePosition(stage.getPointerPosition());
        var keepProportion = this.keepRatio() || e.shiftKey;
        var padding = this.padding();
        if (this._movingAnchorName === 'top-left') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-right').x() - anchorNode.x() - padding * 2, 2) +
                    Math.pow(this.findOne('.bottom-right').y() - anchorNode.y() - padding * 2, 2));
                var reverseX = this.findOne('.top-left').x() > this.findOne('.bottom-right').x()
                    ? -1
                    : 1;
                var reverseY = this.findOne('.top-left').y() > this.findOne('.bottom-right').y()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverseX;
                y = newHypotenuse * this.sin * reverseY;
                this.findOne('.top-left').x(this.findOne('.bottom-right').x() - x - padding * 2);
                this.findOne('.top-left').y(this.findOne('.bottom-right').y() - y - padding * 2);
            }
        }
        else if (this._movingAnchorName === 'top-center') {
            this.findOne('.top-left').y(anchorNode.y());
        }
        else if (this._movingAnchorName === 'top-right') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - this.findOne('.bottom-left').x() - padding * 2, 2) +
                    Math.pow(this.findOne('.bottom-left').y() - anchorNode.y() - padding * 2, 2));
                var reverseX = this.findOne('.top-right').x() < this.findOne('.top-left').x()
                    ? -1
                    : 1;
                var reverseY = this.findOne('.top-right').y() > this.findOne('.bottom-left').y()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverseX;
                y = newHypotenuse * this.sin * reverseY;
                this.findOne('.top-right').x(x + padding);
                this.findOne('.top-right').y(this.findOne('.bottom-left').y() - y - padding * 2);
            }
            var pos = anchorNode.position();
            this.findOne('.top-left').y(pos.y);
            this.findOne('.bottom-right').x(pos.x);
        }
        else if (this._movingAnchorName === 'middle-left') {
            this.findOne('.top-left').x(anchorNode.x());
        }
        else if (this._movingAnchorName === 'middle-right') {
            this.findOne('.bottom-right').x(anchorNode.x());
        }
        else if (this._movingAnchorName === 'bottom-left') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.top-right').x() - anchorNode.x() - padding * 2, 2) +
                    Math.pow(anchorNode.y() - this.findOne('.top-right').y() - padding * 2, 2));
                var reverseX = this.findOne('.top-right').x() < this.findOne('.bottom-left').x()
                    ? -1
                    : 1;
                var reverseY = this.findOne('.bottom-right').y() < this.findOne('.top-left').y()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverseX;
                y = newHypotenuse * this.sin * reverseY;
                this.findOne('.bottom-left').x(this.findOne('.top-right').x() - x - padding * 2);
                this.findOne('.bottom-left').y(y + padding);
            }
            pos = anchorNode.position();
            this.findOne('.top-left').x(pos.x);
            this.findOne('.bottom-right').y(pos.y);
        }
        else if (this._movingAnchorName === 'bottom-center') {
            this.findOne('.bottom-right').y(anchorNode.y());
        }
        else if (this._movingAnchorName === 'bottom-right') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-right').x() - padding, 2) +
                    Math.pow(this.findOne('.bottom-right').y() - padding, 2));
                var reverseX = this.findOne('.top-left').x() > this.findOne('.bottom-right').x()
                    ? -1
                    : 1;
                var reverseY = this.findOne('.top-left').y() > this.findOne('.bottom-right').y()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverseX;
                y = newHypotenuse * this.sin * reverseY;
                this.findOne('.bottom-right').x(x + padding);
                this.findOne('.bottom-right').y(y + padding);
            }
        }
        else if (this._movingAnchorName === 'rotater') {
            var attrs = this._getNodeRect();
            x = anchorNode.x() - attrs.width / 2;
            y = -anchorNode.y() + attrs.height / 2;
            var dAlpha = Math.atan2(-y, x) + Math.PI / 2;
            if (attrs.height < 0) {
                dAlpha -= Math.PI;
            }
            var rot = Global_1.Konva.getAngle(this.rotation());
            var newRotation = Util_1.Util._radToDeg(rot) + Util_1.Util._radToDeg(dAlpha);
            var alpha = Global_1.Konva.getAngle(this.getNode().rotation());
            var newAlpha = Util_1.Util._degToRad(newRotation);
            var snaps = this.rotationSnaps();
            var offset = 0.1;
            for (var i = 0; i < snaps.length; i++) {
                var angle = Global_1.Konva.getAngle(snaps[i]);
                var dif = Math.abs(angle - Util_1.Util._degToRad(newRotation)) % (Math.PI * 2);
                if (dif < offset) {
                    newRotation = Util_1.Util._radToDeg(angle);
                    newAlpha = Util_1.Util._degToRad(newRotation);
                }
            }
            var dx = padding;
            var dy = padding;
            this._fitNodeInto({
                rotation: Global_1.Konva.angleDeg ? newRotation : Util_1.Util._degToRad(newRotation),
                x: attrs.x +
                    (attrs.width / 2 + padding) *
                        (Math.cos(alpha) - Math.cos(newAlpha)) +
                    (attrs.height / 2 + padding) *
                        (Math.sin(-alpha) - Math.sin(-newAlpha)) -
                    (dx * Math.cos(rot) + dy * Math.sin(-rot)),
                y: attrs.y +
                    (attrs.height / 2 + padding) *
                        (Math.cos(alpha) - Math.cos(newAlpha)) +
                    (attrs.width / 2 + padding) *
                        (Math.sin(alpha) - Math.sin(newAlpha)) -
                    (dy * Math.cos(rot) + dx * Math.sin(rot)),
                width: attrs.width + padding * 2,
                height: attrs.height + padding * 2
            }, e);
        }
        else {
            console.error(new Error('Wrong position argument of selection resizer: ' +
                this._movingAnchorName));
        }
        if (this._movingAnchorName === 'rotater') {
            return;
        }
        var centeredScaling = this.centeredScaling() || e.altKey;
        if (centeredScaling) {
            var topLeft = this.findOne('.top-left');
            var bottomRight = this.findOne('.bottom-right');
            var topOffsetX = topLeft.x() + padding;
            var topOffsetY = topLeft.y() + padding;
            var bottomOffsetX = this.getWidth() - bottomRight.x() + padding;
            var bottomOffsetY = this.getHeight() - bottomRight.y() + padding;
            bottomRight.move({
                x: -topOffsetX,
                y: -topOffsetY
            });
            topLeft.move({
                x: bottomOffsetX,
                y: bottomOffsetY
            });
        }
        var absPos = this.findOne('.top-left').getAbsolutePosition(this.getParent());
        x = absPos.x;
        y = absPos.y;
        var width = this.findOne('.bottom-right').x() - this.findOne('.top-left').x();
        var height = this.findOne('.bottom-right').y() - this.findOne('.top-left').y();
        this._fitNodeInto({
            x: x + this.offsetX(),
            y: y + this.offsetY(),
            width: width,
            height: height
        }, e);
    };
    Transformer.prototype._handleMouseUp = function (e) {
        this._removeEvents(e);
    };
    Transformer.prototype._removeEvents = function (e) {
        if (this._transforming) {
            this._transforming = false;
            window.removeEventListener('mousemove', this._handleMouseMove);
            window.removeEventListener('touchmove', this._handleMouseMove);
            window.removeEventListener('mouseup', this._handleMouseUp, true);
            window.removeEventListener('touchend', this._handleMouseUp, true);
            this._fire('transformend', { evt: e });
            var node = this.getNode();
            if (node) {
                node.fire('transformend', { evt: e });
            }
        }
    };
    Transformer.prototype._fitNodeInto = function (newAttrs, evt) {
        var boundBoxFunc = this.boundBoxFunc();
        if (boundBoxFunc) {
            var oldAttrs = this._getNodeRect();
            newAttrs = boundBoxFunc.call(this, oldAttrs, newAttrs);
        }
        var node = this.getNode();
        if (newAttrs.rotation !== undefined) {
            this.getNode().rotation(newAttrs.rotation);
        }
        var pure = node.getClientRect({
            skipTransform: true,
            skipShadow: true,
            skipStroke: this.ignoreStroke()
        });
        var padding = this.padding();
        var scaleX = pure.width ? (newAttrs.width - padding * 2) / pure.width : 1;
        var scaleY = pure.height
            ? (newAttrs.height - padding * 2) / pure.height
            : 1;
        var rotation = Global_1.Konva.getAngle(node.rotation());
        var dx = pure.x * scaleX - padding - node.offsetX() * scaleX;
        var dy = pure.y * scaleY - padding - node.offsetY() * scaleY;
        this.getNode().setAttrs({
            scaleX: scaleX,
            scaleY: scaleY,
            x: newAttrs.x - (dx * Math.cos(rotation) + dy * Math.sin(-rotation)),
            y: newAttrs.y - (dy * Math.cos(rotation) + dx * Math.sin(rotation))
        });
        this._fire('transform', { evt: evt });
        this.getNode()._fire('transform', { evt: evt });
        this.update();
        this.getLayer().batchDraw();
    };
    Transformer.prototype.forceUpdate = function () {
        this._resetTransformCache();
        this.update();
    };
    Transformer.prototype.update = function () {
        var _this = this;
        var attrs = this._getNodeRect();
        var node = this.getNode();
        var scale = { x: 1, y: 1 };
        if (node && node.getParent()) {
            scale = node.getParent().getAbsoluteScale();
        }
        var invertedScale = {
            x: 1 / scale.x,
            y: 1 / scale.y
        };
        var width = attrs.width;
        var height = attrs.height;
        var enabledAnchors = this.enabledAnchors();
        var resizeEnabled = this.resizeEnabled();
        var padding = this.padding();
        var anchorSize = this.anchorSize();
        this.find('._anchor').each(function (node) {
            return node.setAttrs({
                width: anchorSize,
                height: anchorSize,
                offsetX: anchorSize / 2,
                offsetY: anchorSize / 2,
                stroke: _this.anchorStroke(),
                strokeWidth: _this.anchorStrokeWidth(),
                fill: _this.anchorFill(),
                cornerRadius: _this.anchorCornerRadius()
            });
        });
        this.findOne('.top-left').setAttrs({
            x: -padding,
            y: -padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('top-left') >= 0
        });
        this.findOne('.top-center').setAttrs({
            x: width / 2,
            y: -padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('top-center') >= 0
        });
        this.findOne('.top-right').setAttrs({
            x: width + padding,
            y: -padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('top-right') >= 0
        });
        this.findOne('.middle-left').setAttrs({
            x: -padding,
            y: height / 2,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('middle-left') >= 0
        });
        this.findOne('.middle-right').setAttrs({
            x: width + padding,
            y: height / 2,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('middle-right') >= 0
        });
        this.findOne('.bottom-left').setAttrs({
            x: -padding,
            y: height + padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('bottom-left') >= 0
        });
        this.findOne('.bottom-center').setAttrs({
            x: width / 2,
            y: height + padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('bottom-center') >= 0
        });
        this.findOne('.bottom-right').setAttrs({
            x: width + padding,
            y: height + padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('bottom-right') >= 0
        });
        var scaledRotateAnchorOffset = -this.rotateAnchorOffset() * Math.abs(invertedScale.y);
        this.findOne('.rotater').setAttrs({
            x: width / 2,
            y: scaledRotateAnchorOffset * Util_1.Util._sign(height) - padding,
            scale: invertedScale,
            visible: this.rotateEnabled()
        });
        this.findOne('.back').setAttrs({
            width: width * scale.x,
            height: height * scale.y,
            scale: invertedScale,
            visible: this.borderEnabled(),
            stroke: this.borderStroke(),
            strokeWidth: this.borderStrokeWidth(),
            dash: this.borderDash()
        });
    };
    Transformer.prototype.isTransforming = function () {
        return this._transforming;
    };
    Transformer.prototype.stopTransform = function () {
        if (this._transforming) {
            this._removeEvents();
            var anchorNode = this.findOne('.' + this._movingAnchorName);
            if (anchorNode) {
                anchorNode.stopDrag();
            }
        }
    };
    Transformer.prototype.destroy = function () {
        if (this.getStage() && this._cursorChange) {
            this.getStage().content.style.cursor = '';
        }
        Group_1.Group.prototype.destroy.call(this);
        this.detach();
        this._removeEvents();
        return this;
    };
    Transformer.prototype.toObject = function () {
        return Node_1.Node.prototype.toObject.call(this);
    };
    return Transformer;
}(Group_1.Group));
exports.Transformer = Transformer;
function validateAnchors(val) {
    if (!(val instanceof Array)) {
        Util_1.Util.warn('enabledAnchors value should be an array');
    }
    if (val instanceof Array) {
        val.forEach(function (name) {
            if (ANCHORS_NAMES.indexOf(name) === -1) {
                Util_1.Util.warn('Unknown anchor name: ' +
                    name +
                    '. Available names are: ' +
                    ANCHORS_NAMES.join(', '));
            }
        });
    }
    return val || [];
}
Transformer.prototype.className = 'Transformer';
Global_2._registerNode(Transformer);
Factory_1.Factory.addGetterSetter(Transformer, 'enabledAnchors', ANCHORS_NAMES, validateAnchors);
Factory_1.Factory.addGetterSetter(Transformer, 'resizeEnabled', true);
Factory_1.Factory.addGetterSetter(Transformer, 'anchorSize', 10, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'rotateEnabled', true);
Factory_1.Factory.addGetterSetter(Transformer, 'rotationSnaps', []);
Factory_1.Factory.addGetterSetter(Transformer, 'rotateAnchorOffset', 50, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'borderEnabled', true);
Factory_1.Factory.addGetterSetter(Transformer, 'anchorStroke', 'rgb(0, 161, 255)');
Factory_1.Factory.addGetterSetter(Transformer, 'anchorStrokeWidth', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'anchorFill', 'white');
Factory_1.Factory.addGetterSetter(Transformer, 'anchorCornerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'borderStroke', 'rgb(0, 161, 255)');
Factory_1.Factory.addGetterSetter(Transformer, 'borderStrokeWidth', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'borderDash');
Factory_1.Factory.addGetterSetter(Transformer, 'keepRatio', true);
Factory_1.Factory.addGetterSetter(Transformer, 'centeredScaling', false);
Factory_1.Factory.addGetterSetter(Transformer, 'ignoreStroke', false);
Factory_1.Factory.addGetterSetter(Transformer, 'padding', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'node');
Factory_1.Factory.addGetterSetter(Transformer, 'boundBoxFunc');
Factory_1.Factory.backCompat(Transformer, {
    lineEnabled: 'borderEnabled',
    rotateHandlerOffset: 'rotateAnchorOffset',
    enabledHandlers: 'enabledAnchors'
});
Util_1.Collection.mapMethods(Transformer);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Shape":"../node_modules/konva/lib/Shape.js","./Rect":"../node_modules/konva/lib/shapes/Rect.js","../Group":"../node_modules/konva/lib/Group.js","../Global":"../node_modules/konva/lib/Global.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/shapes/Wedge.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var Factory_1 = require("../Factory");
var Shape_1 = require("../Shape");
var Global_1 = require("../Global");
var Validators_1 = require("../Validators");
var Global_2 = require("../Global");
var Wedge = (function (_super) {
    __extends(Wedge, _super);
    function Wedge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wedge.prototype._sceneFunc = function (context) {
        context.beginPath();
        context.arc(0, 0, this.radius(), 0, Global_1.Konva.getAngle(this.angle()), this.clockwise());
        context.lineTo(0, 0);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Wedge.prototype.getWidth = function () {
        return this.radius() * 2;
    };
    Wedge.prototype.getHeight = function () {
        return this.radius() * 2;
    };
    Wedge.prototype.setWidth = function (width) {
        this.radius(width / 2);
    };
    Wedge.prototype.setHeight = function (height) {
        this.radius(height / 2);
    };
    return Wedge;
}(Shape_1.Shape));
exports.Wedge = Wedge;
Wedge.prototype.className = 'Wedge';
Wedge.prototype._centroid = true;
Wedge.prototype._attrsAffectingSize = ['radius'];
Global_2._registerNode(Wedge);
Factory_1.Factory.addGetterSetter(Wedge, 'radius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Wedge, 'angle', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Wedge, 'clockwise', false);
Factory_1.Factory.backCompat(Wedge, {
    angleDeg: 'angle',
    getAngleDeg: 'getAngle',
    setAngleDeg: 'setAngle'
});
Util_1.Collection.mapMethods(Wedge);

},{"../Util":"../node_modules/konva/lib/Util.js","../Factory":"../node_modules/konva/lib/Factory.js","../Shape":"../node_modules/konva/lib/Shape.js","../Global":"../node_modules/konva/lib/Global.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Blur.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}
var mul_table = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456,
    388,
    335,
    292,
    512,
    454,
    405,
    364,
    328,
    298,
    271,
    496,
    456,
    420,
    388,
    360,
    335,
    312,
    292,
    273,
    512,
    482,
    454,
    428,
    405,
    383,
    364,
    345,
    328,
    312,
    298,
    284,
    271,
    259,
    496,
    475,
    456,
    437,
    420,
    404,
    388,
    374,
    360,
    347,
    335,
    323,
    312,
    302,
    292,
    282,
    273,
    265,
    512,
    497,
    482,
    468,
    454,
    441,
    428,
    417,
    405,
    394,
    383,
    373,
    364,
    354,
    345,
    337,
    328,
    320,
    312,
    305,
    298,
    291,
    284,
    278,
    271,
    265,
    259,
    507,
    496,
    485,
    475,
    465,
    456,
    446,
    437,
    428,
    420,
    412,
    404,
    396,
    388,
    381,
    374,
    367,
    360,
    354,
    347,
    341,
    335,
    329,
    323,
    318,
    312,
    307,
    302,
    297,
    292,
    287,
    282,
    278,
    273,
    269,
    265,
    261,
    512,
    505,
    497,
    489,
    482,
    475,
    468,
    461,
    454,
    447,
    441,
    435,
    428,
    422,
    417,
    411,
    405,
    399,
    394,
    389,
    383,
    378,
    373,
    368,
    364,
    359,
    354,
    350,
    345,
    341,
    337,
    332,
    328,
    324,
    320,
    316,
    312,
    309,
    305,
    301,
    298,
    294,
    291,
    287,
    284,
    281,
    278,
    274,
    271,
    268,
    265,
    262,
    259,
    257,
    507,
    501,
    496,
    491,
    485,
    480,
    475,
    470,
    465,
    460,
    456,
    451,
    446,
    442,
    437,
    433,
    428,
    424,
    420,
    416,
    412,
    408,
    404,
    400,
    396,
    392,
    388,
    385,
    381,
    377,
    374,
    370,
    367,
    363,
    360,
    357,
    354,
    350,
    347,
    344,
    341,
    338,
    335,
    332,
    329,
    326,
    323,
    320,
    318,
    315,
    312,
    310,
    307,
    304,
    302,
    299,
    297,
    294,
    292,
    289,
    287,
    285,
    282,
    280,
    278,
    275,
    273,
    271,
    269,
    267,
    265,
    263,
    261,
    259
];
var shg_table = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24
];
function filterGaussBlurRGBA(imageData, radius) {
    var pixels = imageData.data, width = imageData.width, height = imageData.height;
    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
    var div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2, stackStart = new BlurStack(), stackEnd = null, stack = stackStart, stackIn = null, stackOut = null, mul_sum = mul_table[radius], shg_sum = shg_table[radius];
    for (i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();
        if (i === radiusPlus1) {
            stackEnd = stack;
        }
    }
    stack.next = stackStart;
    yw = yi = 0;
    for (y = 0; y < height; y++) {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }
        for (i = 1; i < radiusPlus1; i++) {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
            a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;
            stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
            pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa !== 0) {
                pa = 255 / pa;
                pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            }
            else {
                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
            }
            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;
            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;
            p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
            r_in_sum += stackIn.r = pixels[p];
            g_in_sum += stackIn.g = pixels[p + 1];
            b_in_sum += stackIn.b = pixels[p + 2];
            a_in_sum += stackIn.a = pixels[p + 3];
            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            a_sum += a_in_sum;
            stackIn = stackIn.next;
            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;
            a_out_sum += pa = stackOut.a;
            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;
            stackOut = stackOut.next;
            yi += 4;
        }
        yw += width;
    }
    for (x = 0; x < width; x++) {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }
        yp = width;
        for (i = 1; i <= radius; i++) {
            yi = (yp + x) << 2;
            r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
            a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;
            stack = stack.next;
            if (i < heightMinus1) {
                yp += width;
            }
        }
        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
            p = yi << 2;
            pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa > 0) {
                pa = 255 / pa;
                pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            }
            else {
                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
            }
            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;
            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;
            p =
                (x +
                    ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width) <<
                    2;
            r_sum += r_in_sum += stackIn.r = pixels[p];
            g_sum += g_in_sum += stackIn.g = pixels[p + 1];
            b_sum += b_in_sum += stackIn.b = pixels[p + 2];
            a_sum += a_in_sum += stackIn.a = pixels[p + 3];
            stackIn = stackIn.next;
            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;
            a_out_sum += pa = stackOut.a;
            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;
            stackOut = stackOut.next;
            yi += width;
        }
    }
}
exports.Blur = function Blur(imageData) {
    var radius = Math.round(this.blurRadius());
    if (radius > 0) {
        filterGaussBlurRGBA(imageData, radius);
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'blurRadius', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Brighten.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.Brighten = function (imageData) {
    var brightness = this.brightness() * 255, data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 4) {
        data[i] += brightness;
        data[i + 1] += brightness;
        data[i + 2] += brightness;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'brightness', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Contrast.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.Contrast = function (imageData) {
    var adjust = Math.pow((this.contrast() + 100) / 100, 2);
    var data = imageData.data, nPixels = data.length, red = 150, green = 150, blue = 150, i;
    for (i = 0; i < nPixels; i += 4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        red /= 255;
        red -= 0.5;
        red *= adjust;
        red += 0.5;
        red *= 255;
        green /= 255;
        green -= 0.5;
        green *= adjust;
        green += 0.5;
        green *= 255;
        blue /= 255;
        blue -= 0.5;
        blue *= adjust;
        blue += 0.5;
        blue *= 255;
        red = red < 0 ? 0 : red > 255 ? 255 : red;
        green = green < 0 ? 0 : green > 255 ? 255 : green;
        blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
        data[i] = red;
        data[i + 1] = green;
        data[i + 2] = blue;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'contrast', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Emboss.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Util_1 = require("../Util");
var Validators_1 = require("../Validators");
exports.Emboss = function (imageData) {
    var strength = this.embossStrength() * 10, greyLevel = this.embossWhiteLevel() * 255, direction = this.embossDirection(), blend = this.embossBlend(), dirY = 0, dirX = 0, data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
    switch (direction) {
        case 'top-left':
            dirY = -1;
            dirX = -1;
            break;
        case 'top':
            dirY = -1;
            dirX = 0;
            break;
        case 'top-right':
            dirY = -1;
            dirX = 1;
            break;
        case 'right':
            dirY = 0;
            dirX = 1;
            break;
        case 'bottom-right':
            dirY = 1;
            dirX = 1;
            break;
        case 'bottom':
            dirY = 1;
            dirX = 0;
            break;
        case 'bottom-left':
            dirY = 1;
            dirX = -1;
            break;
        case 'left':
            dirY = 0;
            dirX = -1;
            break;
        default:
            Util_1.Util.error('Unknown emboss direction: ' + direction);
    }
    do {
        var offsetY = (y - 1) * w4;
        var otherY = dirY;
        if (y + otherY < 1) {
            otherY = 0;
        }
        if (y + otherY > h) {
            otherY = 0;
        }
        var offsetYOther = (y - 1 + otherY) * w * 4;
        var x = w;
        do {
            var offset = offsetY + (x - 1) * 4;
            var otherX = dirX;
            if (x + otherX < 1) {
                otherX = 0;
            }
            if (x + otherX > w) {
                otherX = 0;
            }
            var offsetOther = offsetYOther + (x - 1 + otherX) * 4;
            var dR = data[offset] - data[offsetOther];
            var dG = data[offset + 1] - data[offsetOther + 1];
            var dB = data[offset + 2] - data[offsetOther + 2];
            var dif = dR;
            var absDif = dif > 0 ? dif : -dif;
            var absG = dG > 0 ? dG : -dG;
            var absB = dB > 0 ? dB : -dB;
            if (absG > absDif) {
                dif = dG;
            }
            if (absB > absDif) {
                dif = dB;
            }
            dif *= strength;
            if (blend) {
                var r = data[offset] + dif;
                var g = data[offset + 1] + dif;
                var b = data[offset + 2] + dif;
                data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
                data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
                data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
            }
            else {
                var grey = greyLevel - dif;
                if (grey < 0) {
                    grey = 0;
                }
                else if (grey > 255) {
                    grey = 255;
                }
                data[offset] = data[offset + 1] = data[offset + 2] = grey;
            }
        } while (--x);
    } while (--y);
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossStrength', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossWhiteLevel', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossDirection', 'top-left', null, Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossBlend', false, null, Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Util":"../node_modules/konva/lib/Util.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Enhance.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
function remap(fromValue, fromMin, fromMax, toMin, toMax) {
    var fromRange = fromMax - fromMin, toRange = toMax - toMin, toValue;
    if (fromRange === 0) {
        return toMin + toRange / 2;
    }
    if (toRange === 0) {
        return toMin;
    }
    toValue = (fromValue - fromMin) / fromRange;
    toValue = toRange * toValue + toMin;
    return toValue;
}
exports.Enhance = function (imageData) {
    var data = imageData.data, nSubPixels = data.length, rMin = data[0], rMax = rMin, r, gMin = data[1], gMax = gMin, g, bMin = data[2], bMax = bMin, b, i;
    var enhanceAmount = this.enhance();
    if (enhanceAmount === 0) {
        return;
    }
    for (i = 0; i < nSubPixels; i += 4) {
        r = data[i + 0];
        if (r < rMin) {
            rMin = r;
        }
        else if (r > rMax) {
            rMax = r;
        }
        g = data[i + 1];
        if (g < gMin) {
            gMin = g;
        }
        else if (g > gMax) {
            gMax = g;
        }
        b = data[i + 2];
        if (b < bMin) {
            bMin = b;
        }
        else if (b > bMax) {
            bMax = b;
        }
    }
    if (rMax === rMin) {
        rMax = 255;
        rMin = 0;
    }
    if (gMax === gMin) {
        gMax = 255;
        gMin = 0;
    }
    if (bMax === bMin) {
        bMax = 255;
        bMin = 0;
    }
    var rMid, rGoalMax, rGoalMin, gMid, gGoalMax, gGoalMin, bMid, bGoalMax, bGoalMin;
    if (enhanceAmount > 0) {
        rGoalMax = rMax + enhanceAmount * (255 - rMax);
        rGoalMin = rMin - enhanceAmount * (rMin - 0);
        gGoalMax = gMax + enhanceAmount * (255 - gMax);
        gGoalMin = gMin - enhanceAmount * (gMin - 0);
        bGoalMax = bMax + enhanceAmount * (255 - bMax);
        bGoalMin = bMin - enhanceAmount * (bMin - 0);
    }
    else {
        rMid = (rMax + rMin) * 0.5;
        rGoalMax = rMax + enhanceAmount * (rMax - rMid);
        rGoalMin = rMin + enhanceAmount * (rMin - rMid);
        gMid = (gMax + gMin) * 0.5;
        gGoalMax = gMax + enhanceAmount * (gMax - gMid);
        gGoalMin = gMin + enhanceAmount * (gMin - gMid);
        bMid = (bMax + bMin) * 0.5;
        bGoalMax = bMax + enhanceAmount * (bMax - bMid);
        bGoalMin = bMin + enhanceAmount * (bMin - bMid);
    }
    for (i = 0; i < nSubPixels; i += 4) {
        data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
        data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
        data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'enhance', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Grayscale.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grayscale = function (imageData) {
    var data = imageData.data, len = data.length, i, brightness;
    for (i = 0; i < len; i += 4) {
        brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
    }
};

},{}],"../node_modules/konva/lib/filters/HSL.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
Factory_1.Factory.addGetterSetter(Node_1.Node, 'hue', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'saturation', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'luminance', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
exports.HSL = function (imageData) {
    var data = imageData.data, nPixels = data.length, v = 1, s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l = this.luminance() * 127, i;
    var vsu = v * s * Math.cos((h * Math.PI) / 180), vsw = v * s * Math.sin((h * Math.PI) / 180);
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
    var r, g, b, a;
    for (i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        data[i + 0] = rr * r + rg * g + rb * b + l;
        data[i + 1] = gr * r + gg * g + gb * b + l;
        data[i + 2] = br * r + bg * g + bb * b + l;
        data[i + 3] = a;
    }
};

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/HSV.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.HSV = function (imageData) {
    var data = imageData.data, nPixels = data.length, v = Math.pow(2, this.value()), s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, i;
    var vsu = v * s * Math.cos((h * Math.PI) / 180), vsw = v * s * Math.sin((h * Math.PI) / 180);
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
    var r, g, b, a;
    for (i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        data[i + 0] = rr * r + rg * g + rb * b;
        data[i + 1] = gr * r + gg * g + gb * b;
        data[i + 2] = br * r + bg * g + bb * b;
        data[i + 3] = a;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'hue', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'saturation', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'value', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Invert.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invert = function (imageData) {
    var data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
};

},{}],"../node_modules/konva/lib/filters/Kaleidoscope.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Util_1 = require("../Util");
var Validators_1 = require("../Validators");
var ToPolar = function (src, dst, opt) {
    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, r = 0, g = 0, b = 0, a = 0;
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;
    var rSize = ySize, tSize = xSize, radius, theta;
    var conversion = ((360 / tSize) * Math.PI) / 180, sin, cos;
    for (theta = 0; theta < tSize; theta += 1) {
        sin = Math.sin(theta * conversion);
        cos = Math.cos(theta * conversion);
        for (radius = 0; radius < rSize; radius += 1) {
            x = Math.floor(xMid + ((rMax * radius) / rSize) * cos);
            y = Math.floor(yMid + ((rMax * radius) / rSize) * sin);
            i = (y * xSize + x) * 4;
            r = srcPixels[i + 0];
            g = srcPixels[i + 1];
            b = srcPixels[i + 2];
            a = srcPixels[i + 3];
            i = (theta + radius * xSize) * 4;
            dstPixels[i + 0] = r;
            dstPixels[i + 1] = g;
            dstPixels[i + 2] = b;
            dstPixels[i + 3] = a;
        }
    }
};
var FromPolar = function (src, dst, opt) {
    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, dx, dy, r = 0, g = 0, b = 0, a = 0;
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;
    var rSize = ySize, tSize = xSize, radius, theta, phaseShift = opt.polarRotation || 0;
    var x1, y1;
    for (x = 0; x < xSize; x += 1) {
        for (y = 0; y < ySize; y += 1) {
            dx = x - xMid;
            dy = y - yMid;
            radius = (Math.sqrt(dx * dx + dy * dy) * rSize) / rMax;
            theta = ((Math.atan2(dy, dx) * 180) / Math.PI + 360 + phaseShift) % 360;
            theta = (theta * tSize) / 360;
            x1 = Math.floor(theta);
            y1 = Math.floor(radius);
            i = (y1 * xSize + x1) * 4;
            r = srcPixels[i + 0];
            g = srcPixels[i + 1];
            b = srcPixels[i + 2];
            a = srcPixels[i + 3];
            i = (y * xSize + x) * 4;
            dstPixels[i + 0] = r;
            dstPixels[i + 1] = g;
            dstPixels[i + 2] = b;
            dstPixels[i + 3] = a;
        }
    }
};
exports.Kaleidoscope = function (imageData) {
    var xSize = imageData.width, ySize = imageData.height;
    var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
    var power = Math.round(this.kaleidoscopePower());
    var angle = Math.round(this.kaleidoscopeAngle());
    var offset = Math.floor((xSize * (angle % 360)) / 360);
    if (power < 1) {
        return;
    }
    var tempCanvas = Util_1.Util.createCanvasElement();
    tempCanvas.width = xSize;
    tempCanvas.height = ySize;
    var scratchData = tempCanvas
        .getContext('2d')
        .getImageData(0, 0, xSize, ySize);
    ToPolar(imageData, scratchData, {
        polarCenterX: xSize / 2,
        polarCenterY: ySize / 2
    });
    var minSectionSize = xSize / Math.pow(2, power);
    while (minSectionSize <= 8) {
        minSectionSize = minSectionSize * 2;
        power -= 1;
    }
    minSectionSize = Math.ceil(minSectionSize);
    var sectionSize = minSectionSize;
    var xStart = 0, xEnd = sectionSize, xDelta = 1;
    if (offset + minSectionSize > xSize) {
        xStart = sectionSize;
        xEnd = 0;
        xDelta = -1;
    }
    for (y = 0; y < ySize; y += 1) {
        for (x = xStart; x !== xEnd; x += xDelta) {
            xoff = Math.round(x + offset) % xSize;
            srcPos = (xSize * y + xoff) * 4;
            r = scratchData.data[srcPos + 0];
            g = scratchData.data[srcPos + 1];
            b = scratchData.data[srcPos + 2];
            a = scratchData.data[srcPos + 3];
            dstPos = (xSize * y + x) * 4;
            scratchData.data[dstPos + 0] = r;
            scratchData.data[dstPos + 1] = g;
            scratchData.data[dstPos + 2] = b;
            scratchData.data[dstPos + 3] = a;
        }
    }
    for (y = 0; y < ySize; y += 1) {
        sectionSize = Math.floor(minSectionSize);
        for (i = 0; i < power; i += 1) {
            for (x = 0; x < sectionSize + 1; x += 1) {
                srcPos = (xSize * y + x) * 4;
                r = scratchData.data[srcPos + 0];
                g = scratchData.data[srcPos + 1];
                b = scratchData.data[srcPos + 2];
                a = scratchData.data[srcPos + 3];
                dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
                scratchData.data[dstPos + 0] = r;
                scratchData.data[dstPos + 1] = g;
                scratchData.data[dstPos + 2] = b;
                scratchData.data[dstPos + 3] = a;
            }
            sectionSize *= 2;
        }
    }
    FromPolar(scratchData, imageData, { polarRotation: 0 });
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'kaleidoscopePower', 2, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'kaleidoscopeAngle', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Util":"../node_modules/konva/lib/Util.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Mask.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
function pixelAt(idata, x, y) {
    var idx = (y * idata.width + x) * 4;
    var d = [];
    d.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
    return d;
}
function rgbDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2) +
        Math.pow(p1[2] - p2[2], 2));
}
function rgbMean(pTab) {
    var m = [0, 0, 0];
    for (var i = 0; i < pTab.length; i++) {
        m[0] += pTab[i][0];
        m[1] += pTab[i][1];
        m[2] += pTab[i][2];
    }
    m[0] /= pTab.length;
    m[1] /= pTab.length;
    m[2] /= pTab.length;
    return m;
}
function backgroundMask(idata, threshold) {
    var rgbv_no = pixelAt(idata, 0, 0);
    var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
    var rgbv_so = pixelAt(idata, 0, idata.height - 1);
    var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
    var thres = threshold || 10;
    if (rgbDistance(rgbv_no, rgbv_ne) < thres &&
        rgbDistance(rgbv_ne, rgbv_se) < thres &&
        rgbDistance(rgbv_se, rgbv_so) < thres &&
        rgbDistance(rgbv_so, rgbv_no) < thres) {
        var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);
        var mask = [];
        for (var i = 0; i < idata.width * idata.height; i++) {
            var d = rgbDistance(mean, [
                idata.data[i * 4],
                idata.data[i * 4 + 1],
                idata.data[i * 4 + 2]
            ]);
            mask[i] = d < thres ? 0 : 255;
        }
        return mask;
    }
}
function applyMask(idata, mask) {
    for (var i = 0; i < idata.width * idata.height; i++) {
        idata.data[4 * i + 3] = mask[i];
    }
}
function erodeMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
        for (var x = 0; x < sw; x++) {
            var so = y * sw + x;
            var a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = y + cy - halfSide;
                    var scx = x + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = scy * sw + scx;
                        var wt = weights[cy * side + cx];
                        a += mask[srcOff] * wt;
                    }
                }
            }
            maskResult[so] = a === 255 * 8 ? 255 : 0;
        }
    }
    return maskResult;
}
function dilateMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
        for (var x = 0; x < sw; x++) {
            var so = y * sw + x;
            var a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = y + cy - halfSide;
                    var scx = x + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = scy * sw + scx;
                        var wt = weights[cy * side + cx];
                        a += mask[srcOff] * wt;
                    }
                }
            }
            maskResult[so] = a >= 255 * 4 ? 255 : 0;
        }
    }
    return maskResult;
}
function smoothEdgeMask(mask, sw, sh) {
    var weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
        for (var x = 0; x < sw; x++) {
            var so = y * sw + x;
            var a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = y + cy - halfSide;
                    var scx = x + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = scy * sw + scx;
                        var wt = weights[cy * side + cx];
                        a += mask[srcOff] * wt;
                    }
                }
            }
            maskResult[so] = a;
        }
    }
    return maskResult;
}
exports.Mask = function (imageData) {
    var threshold = this.threshold(), mask = backgroundMask(imageData, threshold);
    if (mask) {
        mask = erodeMask(mask, imageData.width, imageData.height);
        mask = dilateMask(mask, imageData.width, imageData.height);
        mask = smoothEdgeMask(mask, imageData.width, imageData.height);
        applyMask(imageData, mask);
    }
    return imageData;
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'threshold', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Noise.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.Noise = function (imageData) {
    var amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2, i;
    for (i = 0; i < nPixels; i += 4) {
        data[i + 0] += half - 2 * half * Math.random();
        data[i + 1] += half - 2 * half * Math.random();
        data[i + 2] += half - 2 * half * Math.random();
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'noise', 0.2, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Pixelate.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Util_1 = require("../Util");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.Pixelate = function (imageData) {
    var pixelSize = Math.ceil(this.pixelSize()), width = imageData.width, height = imageData.height, x, y, i, red, green, blue, alpha, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), xBinStart, xBinEnd, yBinStart, yBinEnd, xBin, yBin, pixelsInBin, data = imageData.data;
    if (pixelSize <= 0) {
        Util_1.Util.error('pixelSize value can not be <= 0');
        return;
    }
    for (xBin = 0; xBin < nBinsX; xBin += 1) {
        for (yBin = 0; yBin < nBinsY; yBin += 1) {
            red = 0;
            green = 0;
            blue = 0;
            alpha = 0;
            xBinStart = xBin * pixelSize;
            xBinEnd = xBinStart + pixelSize;
            yBinStart = yBin * pixelSize;
            yBinEnd = yBinStart + pixelSize;
            pixelsInBin = 0;
            for (x = xBinStart; x < xBinEnd; x += 1) {
                if (x >= width) {
                    continue;
                }
                for (y = yBinStart; y < yBinEnd; y += 1) {
                    if (y >= height) {
                        continue;
                    }
                    i = (width * y + x) * 4;
                    red += data[i + 0];
                    green += data[i + 1];
                    blue += data[i + 2];
                    alpha += data[i + 3];
                    pixelsInBin += 1;
                }
            }
            red = red / pixelsInBin;
            green = green / pixelsInBin;
            blue = blue / pixelsInBin;
            alpha = alpha / pixelsInBin;
            for (x = xBinStart; x < xBinEnd; x += 1) {
                if (x >= width) {
                    continue;
                }
                for (y = yBinStart; y < yBinEnd; y += 1) {
                    if (y >= height) {
                        continue;
                    }
                    i = (width * y + x) * 4;
                    data[i + 0] = red;
                    data[i + 1] = green;
                    data[i + 2] = blue;
                    data[i + 3] = alpha;
                }
            }
        }
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'pixelSize', 8, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Util":"../node_modules/konva/lib/Util.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Posterize.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.Posterize = function (imageData) {
    var levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels, i;
    for (i = 0; i < len; i += 1) {
        data[i] = Math.floor(data[i] / scale) * scale;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'levels', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/RGB.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.RGB = function (imageData) {
    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), i, brightness;
    for (i = 0; i < nPixels; i += 4) {
        brightness =
            (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
        data[i] = brightness * red;
        data[i + 1] = brightness * green;
        data[i + 2] = brightness * blue;
        data[i + 3] = data[i + 3];
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'red', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'green', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'blue', 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/RGBA.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.RGBA = function (imageData) {
    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha(), i, ia;
    for (i = 0; i < nPixels; i += 4) {
        ia = 1 - alpha;
        data[i] = red * alpha + data[i] * ia;
        data[i + 1] = green * alpha + data[i + 1] * ia;
        data[i + 2] = blue * alpha + data[i + 2] * ia;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'red', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'green', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'blue', 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'alpha', 1, function (val) {
    this._filterUpToDate = false;
    if (val > 1) {
        return 1;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return val;
    }
});

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/filters/Sepia.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sepia = function (imageData) {
    var data = imageData.data, nPixels = data.length, i, r, g, b;
    for (i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        data[i + 0] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
};

},{}],"../node_modules/konva/lib/filters/Solarize.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solarize = function (imageData) {
    var data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
    do {
        var offsetY = (y - 1) * w4;
        var x = w;
        do {
            var offset = offsetY + (x - 1) * 4;
            var r = data[offset];
            var g = data[offset + 1];
            var b = data[offset + 2];
            if (r > 127) {
                r = 255 - r;
            }
            if (g > 127) {
                g = 255 - g;
            }
            if (b > 127) {
                b = 255 - b;
            }
            data[offset] = r;
            data[offset + 1] = g;
            data[offset + 2] = b;
        } while (--x);
    } while (--y);
};

},{}],"../node_modules/konva/lib/filters/Threshold.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../Factory");
var Node_1 = require("../Node");
var Validators_1 = require("../Validators");
exports.Threshold = function (imageData) {
    var level = this.threshold() * 255, data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 1) {
        data[i] = data[i] < level ? 0 : 255;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'threshold', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":"../node_modules/konva/lib/Factory.js","../Node":"../node_modules/konva/lib/Node.js","../Validators":"../node_modules/konva/lib/Validators.js"}],"../node_modules/konva/lib/_FullInternals.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _CoreInternals_1 = require("./_CoreInternals");
var Arc_1 = require("./shapes/Arc");
var Arrow_1 = require("./shapes/Arrow");
var Circle_1 = require("./shapes/Circle");
var Ellipse_1 = require("./shapes/Ellipse");
var Image_1 = require("./shapes/Image");
var Label_1 = require("./shapes/Label");
var Line_1 = require("./shapes/Line");
var Path_1 = require("./shapes/Path");
var Rect_1 = require("./shapes/Rect");
var RegularPolygon_1 = require("./shapes/RegularPolygon");
var Ring_1 = require("./shapes/Ring");
var Sprite_1 = require("./shapes/Sprite");
var Star_1 = require("./shapes/Star");
var Text_1 = require("./shapes/Text");
var TextPath_1 = require("./shapes/TextPath");
var Transformer_1 = require("./shapes/Transformer");
var Wedge_1 = require("./shapes/Wedge");
var Blur_1 = require("./filters/Blur");
var Brighten_1 = require("./filters/Brighten");
var Contrast_1 = require("./filters/Contrast");
var Emboss_1 = require("./filters/Emboss");
var Enhance_1 = require("./filters/Enhance");
var Grayscale_1 = require("./filters/Grayscale");
var HSL_1 = require("./filters/HSL");
var HSV_1 = require("./filters/HSV");
var Invert_1 = require("./filters/Invert");
var Kaleidoscope_1 = require("./filters/Kaleidoscope");
var Mask_1 = require("./filters/Mask");
var Noise_1 = require("./filters/Noise");
var Pixelate_1 = require("./filters/Pixelate");
var Posterize_1 = require("./filters/Posterize");
var RGB_1 = require("./filters/RGB");
var RGBA_1 = require("./filters/RGBA");
var Sepia_1 = require("./filters/Sepia");
var Solarize_1 = require("./filters/Solarize");
var Threshold_1 = require("./filters/Threshold");
exports.Konva = _CoreInternals_1.Konva.Util._assign(_CoreInternals_1.Konva, {
    Arc: Arc_1.Arc,
    Arrow: Arrow_1.Arrow,
    Circle: Circle_1.Circle,
    Ellipse: Ellipse_1.Ellipse,
    Image: Image_1.Image,
    Label: Label_1.Label,
    Tag: Label_1.Tag,
    Line: Line_1.Line,
    Path: Path_1.Path,
    Rect: Rect_1.Rect,
    RegularPolygon: RegularPolygon_1.RegularPolygon,
    Ring: Ring_1.Ring,
    Sprite: Sprite_1.Sprite,
    Star: Star_1.Star,
    Text: Text_1.Text,
    TextPath: TextPath_1.TextPath,
    Transformer: Transformer_1.Transformer,
    Wedge: Wedge_1.Wedge,
    Filters: {
        Blur: Blur_1.Blur,
        Brighten: Brighten_1.Brighten,
        Contrast: Contrast_1.Contrast,
        Emboss: Emboss_1.Emboss,
        Enhance: Enhance_1.Enhance,
        Grayscale: Grayscale_1.Grayscale,
        HSL: HSL_1.HSL,
        HSV: HSV_1.HSV,
        Invert: Invert_1.Invert,
        Kaleidoscope: Kaleidoscope_1.Kaleidoscope,
        Mask: Mask_1.Mask,
        Noise: Noise_1.Noise,
        Pixelate: Pixelate_1.Pixelate,
        Posterize: Posterize_1.Posterize,
        RGB: RGB_1.RGB,
        RGBA: RGBA_1.RGBA,
        Sepia: Sepia_1.Sepia,
        Solarize: Solarize_1.Solarize,
        Threshold: Threshold_1.Threshold
    }
});

},{"./_CoreInternals":"../node_modules/konva/lib/_CoreInternals.js","./shapes/Arc":"../node_modules/konva/lib/shapes/Arc.js","./shapes/Arrow":"../node_modules/konva/lib/shapes/Arrow.js","./shapes/Circle":"../node_modules/konva/lib/shapes/Circle.js","./shapes/Ellipse":"../node_modules/konva/lib/shapes/Ellipse.js","./shapes/Image":"../node_modules/konva/lib/shapes/Image.js","./shapes/Label":"../node_modules/konva/lib/shapes/Label.js","./shapes/Line":"../node_modules/konva/lib/shapes/Line.js","./shapes/Path":"../node_modules/konva/lib/shapes/Path.js","./shapes/Rect":"../node_modules/konva/lib/shapes/Rect.js","./shapes/RegularPolygon":"../node_modules/konva/lib/shapes/RegularPolygon.js","./shapes/Ring":"../node_modules/konva/lib/shapes/Ring.js","./shapes/Sprite":"../node_modules/konva/lib/shapes/Sprite.js","./shapes/Star":"../node_modules/konva/lib/shapes/Star.js","./shapes/Text":"../node_modules/konva/lib/shapes/Text.js","./shapes/TextPath":"../node_modules/konva/lib/shapes/TextPath.js","./shapes/Transformer":"../node_modules/konva/lib/shapes/Transformer.js","./shapes/Wedge":"../node_modules/konva/lib/shapes/Wedge.js","./filters/Blur":"../node_modules/konva/lib/filters/Blur.js","./filters/Brighten":"../node_modules/konva/lib/filters/Brighten.js","./filters/Contrast":"../node_modules/konva/lib/filters/Contrast.js","./filters/Emboss":"../node_modules/konva/lib/filters/Emboss.js","./filters/Enhance":"../node_modules/konva/lib/filters/Enhance.js","./filters/Grayscale":"../node_modules/konva/lib/filters/Grayscale.js","./filters/HSL":"../node_modules/konva/lib/filters/HSL.js","./filters/HSV":"../node_modules/konva/lib/filters/HSV.js","./filters/Invert":"../node_modules/konva/lib/filters/Invert.js","./filters/Kaleidoscope":"../node_modules/konva/lib/filters/Kaleidoscope.js","./filters/Mask":"../node_modules/konva/lib/filters/Mask.js","./filters/Noise":"../node_modules/konva/lib/filters/Noise.js","./filters/Pixelate":"../node_modules/konva/lib/filters/Pixelate.js","./filters/Posterize":"../node_modules/konva/lib/filters/Posterize.js","./filters/RGB":"../node_modules/konva/lib/filters/RGB.js","./filters/RGBA":"../node_modules/konva/lib/filters/RGBA.js","./filters/Sepia":"../node_modules/konva/lib/filters/Sepia.js","./filters/Solarize":"../node_modules/konva/lib/filters/Solarize.js","./filters/Threshold":"../node_modules/konva/lib/filters/Threshold.js"}],"../node_modules/konva/lib/index.js":[function(require,module,exports) {
var Konva = require('./_FullInternals').Konva;
Konva._injectGlobal(Konva);
exports['default'] = Konva;
module.exports = exports['default'];

},{"./_FullInternals":"../node_modules/konva/lib/_FullInternals.js"}],"scripts/system/sStage.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var konva_1 = __importDefault(require("konva"));

var sStage = function () {
  function sStage() {
    this.stage = null;
  }

  sStage.prototype.init = function () {
    this.stage = new konva_1.default.Stage({
      container: "container",
      width: 1080,
      height: 720
    });
  };

  sStage.prototype.add = function (layer) {
    var _a;

    (_a = this.stage) === null || _a === void 0 ? void 0 : _a.add(layer);
  };

  return sStage;
}();

var instance = new sStage();
exports.default = instance;
},{"konva":"../node_modules/konva/lib/index.js"}],"../node_modules/dat.gui/build/dat.gui.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GUI = exports.gui = exports.dom = exports.controllers = exports.color = void 0;

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function ___$insertStyle(css) {
  if (!css) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function colorToString(color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();

  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);

  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);

    while (str.length < 6) {
      str = '0' + str;
    }

    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }

  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);

      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }

      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }

    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;

      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;

      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }

      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);

      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }

    isNaN.toString = function () {
      return _isNaN.toString();
    };

    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};
var INTERPRETATIONS = [{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
}, {
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
}, {
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }

        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
}, {
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;

var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);

        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;

    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }

    h /= 6;

    if (h < 0) {
      h += 1;
    }

    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }

    this.__state.a = this.__state.a || 1;
  }

  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();

function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }

      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }

      this.__state[component] = v;
    }
  });
}

function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }

      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }

      this.__state[component] = v;
    }
  });
}

Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};

Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });

  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};

Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (!this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
    }

    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }

  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;

      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }

      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }

  var match = val.match(CSS_VALUE_PIXELS);

  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }

  return 0;
}

var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;

    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }

    if (Common.isUndefined(vertical)) {
      vertical = true;
    }

    elem.style.position = 'absolute';

    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }

    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];

    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }

    var evt = document.createEvent(className);

    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
          break;
        }

      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }

      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }

    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }

    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }

    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);

      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }

    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);

        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }

    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = {
      left: 0,
      top: 0
    };

    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }

    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);

  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);

    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));

    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');

    _this2.__checkbox.setAttribute('type', 'checkbox');

    function onChange() {
      _this.setValue(!_this.__prev);
    }

    dom.bind(_this2.__checkbox, 'change', onChange, false);

    _this2.domElement.appendChild(_this2.__checkbox);

    _this2.updateDisplay();

    return _this2;
  }

  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');

        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }

      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);

  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);

    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));

    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');

    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }

    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);

      _this.__select.appendChild(opt);
    });

    _this2.updateDisplay();

    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;

      _this.setValue(desiredValue);
    });

    _this2.domElement.appendChild(_this2.__select);

    return _this2;
  }

  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);

  function StringController(object, property) {
    classCallCheck(this, StringController);

    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));

    var _this = _this2;

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }

      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();

  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }

  return 0;
}

var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);

  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);

    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));

    var _params = params || {};

    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;

    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }

    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }

  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;

      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }

      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }

      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}

var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);

  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);

    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));

    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;

    function onChange() {
      var attempted = parseFloat(_this.__input.value);

      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onBlur() {
      onFinish();
    }

    function onMouseDrag(e) {
      var diff = prevY - e.clientY;

      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prevY = e.clientY;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}

var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);

  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);

    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, {
      min: min,
      max: max,
      step: step
    }));

    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');

    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }

    function onMouseDrag(e) {
      e.preventDefault();

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));

      return false;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }

      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }

    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }

    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.updateDisplay();

    _this2.__background.appendChild(_this2.__foreground);

    _this2.domElement.appendChild(_this2.__background);

    return _this2;
  }

  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);

      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);

  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);

    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));

    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();

      _this.fire();

      return false;
    });
    dom.addClass(_this2.__button, 'button');

    _this2.domElement.appendChild(_this2.__button);

    return _this2;
  }

  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }

      this.getValue().call(this.object);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);

  function ColorController(object, property) {
    classCallCheck(this, ColorController);

    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));

    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function () {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function () {
      dom.addClass(this, 'drag').bind(window, 'touchend', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);

    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }

    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }

    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }

    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }

    function onBlur() {
      var i = interpret(this.value);

      if (i !== false) {
        _this.__color.__state = i;

        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }

    _this2.__saturation_field.appendChild(valueField);

    _this2.__selector.appendChild(_this2.__field_knob);

    _this2.__selector.appendChild(_this2.__saturation_field);

    _this2.__selector.appendChild(_this2.__hue_field);

    _this2.__hue_field.appendChild(_this2.__hue_knob);

    _this2.domElement.appendChild(_this2.__input);

    _this2.domElement.appendChild(_this2.__selector);

    _this2.updateDisplay();

    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__saturation_field.getBoundingClientRect();

      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;

      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }

      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__hue_field.getBoundingClientRect();

      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;

      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    return _this2;
  }

  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());

      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);

        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }

      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;

      var _flip = 255 - flip;

      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);

var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];

function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}

function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];

    try {
      head.appendChild(injected);
    } catch (e) {}
  }
};
var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];

  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }

  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }

      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }

    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, {
        min: arguments[2],
        max: arguments[3],
        step: arguments[4]
      });
    }

    return new NumberControllerBox(object, property, {
      min: arguments[2],
      max: arguments[3]
    });
  }

  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }

  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }

  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }

  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}

var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;

    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }

  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;

      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;

      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };

      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();

var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];

var GUI = function GUI(pars) {
  var _this = this;

  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });

  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = {
      preset: DEFAULT_DEFAULT_PRESET_NAME
    };
  }

  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }

  params.resizable = Common.isUndefined(params.parent) && params.resizable;

  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }

  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this, {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }

        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }

        setPresetSelectIndex(this);

        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;

        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;

        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }

        this.onResize();

        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;

          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }

          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });

  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);

    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }

    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);

    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }

    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }

    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);

    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };

    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);

    if (!params.closed) {
      this.closed = false;
    }
  }

  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }

      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }

    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }

  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };

  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();

  if (params.resizable) {
    addResizeHandle(this);
  }

  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };

  this.saveToLocalStorageIfPossible = saveToLocalStorage;

  function resetWidth() {
    var root = _this.getRoot();

    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }

  if (!params.parent) {
    resetWidth();
  }
};

GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};

GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';

GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};

dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype, {
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);

    this.__controllers.splice(this.__controllers.indexOf(controller), 1);

    var _this = this;

    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }

    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }

    var _this = this;

    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }

    var newGuiParams = {
      name: name,
      parent: this
    };
    newGuiParams.autoPlace = this.autoPlace;

    if (this.load && this.load.folders && this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }

    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);

    delete this.__folders[folder.name];

    if (this.load && this.load.folders && this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }

    removeListeners(folder);

    var _this = this;

    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();

    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });

      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }

    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }

    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }

    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }

    var _this = this;

    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }

      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });

    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;

    while (gui.parent) {
      gui = gui.parent;
    }

    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;

    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;

      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }

      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }

    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }

    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }

    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }

      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });

    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;

    this.__listening.push(controller);

    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});

function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');

  if (newDom) {
    li.appendChild(newDom);
  }

  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }

  gui.onResize();
  return li;
}

function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);

  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}

function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];

  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}

function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller, {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }

      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);

      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);

      return controller;
    }
  });

  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, {
      min: controller.__min,
      max: controller.__max,
      step: controller.__step
    });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];

      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();

        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });

        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }

      return returned;
    };

    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }

  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }

    return val;
  }, controller.setValue);
}

function recallSavedValue(gui, controller) {
  var root = gui.getRoot();

  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);

  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];

    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }

    controllerMap[controller.property] = controller;

    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;

      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }

      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}

function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }

  var controller = void 0;

  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }

  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }

  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);

  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }

  augmentController(gui, li, controller);

  gui.__controllers.push(controller);

  return controller;
}

function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}

function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;

  gui.__preset_select.appendChild(opt);

  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}

function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}

function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');

  gui.__ul.insertBefore(div, gui.__ul.firstChild);

  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');

  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }

  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }

    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);

  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';

    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }

    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }

  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');

    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}

function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });

  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }

  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }

  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }

  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}

function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';

  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }

  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}

function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}

function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}

function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }

  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
exports.color = color;
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
exports.controllers = controllers;
var dom$1 = {
  dom: dom
};
exports.dom = dom$1;
var gui = {
  GUI: GUI
};
exports.gui = gui;
var GUI$1 = GUI;
exports.GUI = GUI$1;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};
var _default = index;
exports.default = _default;
},{}],"scripts/scene/SceneBase.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var konva_1 = __importDefault(require("konva"));

var Scene = function () {
  function Scene() {
    this.layer = new konva_1.default.Layer();
  }

  Object.defineProperty(Scene.prototype, "layerOfKonva", {
    get: function get() {
      return this.layer;
    },
    enumerable: true,
    configurable: true
  });

  Scene.prototype.init = function () {};

  Scene.prototype.add = function (children) {
    var _a;

    (_a = this.layer) === null || _a === void 0 ? void 0 : _a.add(children);
    return this;
  };

  Scene.prototype.update = function () {};

  Scene.prototype.destroy = function () {
    var _a;

    (_a = this.layer) === null || _a === void 0 ? void 0 : _a.destroy();
    this.layer = null;
  };

  Scene.prototype.draw = function () {
    var _a;

    (_a = this.layer) === null || _a === void 0 ? void 0 : _a.draw();
  };

  return Scene;
}();

exports.default = Scene;
},{"konva":"../node_modules/konva/lib/index.js"}],"scripts/scene/SampleScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var konva_1 = __importDefault(require("konva"));

var dat_gui_1 = require("dat.gui");

var SceneBase_1 = __importDefault(require("./SceneBase"));

var SampleScene = function (_super) {
  __extends(SampleScene, _super);

  function SampleScene() {
    var _this = _super.call(this) || this;

    _this.circle = null;
    return _this;
  }

  SampleScene.prototype.init = function () {
    var _this = this;

    this.circle = new konva_1.default.Circle({
      x: 100,
      y: 100,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });
    this.add(this.circle);
    var params = {
      x: 0
    };
    var gui = new dat_gui_1.GUI();
    gui.add(params, "x").onChange(function (v) {
      var _a;

      (_a = _this.circle) === null || _a === void 0 ? void 0 : _a.setAttr("x", v);
    });
  };

  SampleScene.prototype.destroy = function () {
    _super.prototype.destroy.call(this);

    this.circle = null;
  };

  return SampleScene;
}(SceneBase_1.default);

exports.default = SampleScene;
},{"konva":"../node_modules/konva/lib/index.js","dat.gui":"../node_modules/dat.gui/build/dat.gui.module.js","./SceneBase":"scripts/scene/SceneBase.ts"}],"scripts/scene/SampleScene2.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var konva_1 = __importDefault(require("konva"));

var dat_gui_1 = require("dat.gui");

var SceneBase_1 = __importDefault(require("./SceneBase"));

var SampleScene = function (_super) {
  __extends(SampleScene, _super);

  function SampleScene() {
    var _this = _super.call(this) || this;

    _this.circle = null;
    return _this;
  }

  SampleScene.prototype.init = function () {
    var _this = this;

    this.circle = new konva_1.default.Circle({
      x: 100,
      y: 100,
      radius: 70,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 4
    });
    this.add(this.circle);
    var params = {
      x: 0
    };
    var gui = new dat_gui_1.GUI();
    gui.add(params, "x").onChange(function (v) {
      var _a;

      (_a = _this.circle) === null || _a === void 0 ? void 0 : _a.setAttr("x", v);
    });
  };

  SampleScene.prototype.destroy = function () {
    _super.prototype.destroy.call(this);

    this.circle = null;
  };

  return SampleScene;
}(SceneBase_1.default);

exports.default = SampleScene;
},{"konva":"../node_modules/konva/lib/index.js","dat.gui":"../node_modules/dat.gui/build/dat.gui.module.js","./SceneBase":"scripts/scene/SceneBase.ts"}],"scripts/system/sScene.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SampleScene_1 = __importDefault(require("~/scripts/scene/SampleScene"));

var SampleScene2_1 = __importDefault(require("~/scripts/scene/SampleScene2"));

var sStage_1 = __importDefault(require("./sStage"));

var SceneType;

(function (SceneType) {
  SceneType[SceneType["Sample1"] = 0] = "Sample1";
  SceneType[SceneType["Sample2"] = 1] = "Sample2";
})(SceneType = exports.SceneType || (exports.SceneType = {}));

var settings = [{
  type: SceneType.Sample1,
  scene: SampleScene_1.default
}, {
  type: SceneType.Sample2,
  scene: SampleScene2_1.default
}];

var sScene = function () {
  function sScene() {
    this.scene = null;
  }

  sScene.prototype.init = function () {};

  sScene.prototype.update = function () {
    var _a, _b;

    (_a = this.scene) === null || _a === void 0 ? void 0 : _a.update();
    (_b = this.scene) === null || _b === void 0 ? void 0 : _b.draw();
  };

  sScene.prototype.load = function (type) {
    var _a, _b;

    (_a = this.scene) === null || _a === void 0 ? void 0 : _a.destroy();
    this.scene = this.createScene(type);
    (_b = this.scene) === null || _b === void 0 ? void 0 : _b.init();

    if (this.scene) {
      sStage_1.default.add(this.scene.layerOfKonva);
    }
  };

  sScene.prototype.createScene = function (type) {
    var scene = settings.find(function (setting) {
      return setting.type === type;
    });
    if (!scene) return null;
    return new scene.scene();
  };

  return sScene;
}();

var instance = new sScene();
exports.default = instance;
},{"~/scripts/scene/SampleScene":"scripts/scene/SampleScene.ts","~/scripts/scene/SampleScene2":"scripts/scene/SampleScene2.ts","./sStage":"scripts/system/sStage.ts"}],"scripts/app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sStage_1 = __importDefault(require("./system/sStage"));

var sScene_1 = __importStar(require("./system/sScene"));

var SceneTable = {
  "sample1": sScene_1.SceneType.Sample1,
  "sample2": sScene_1.SceneType.Sample2
};

var App = function () {
  function App() {
    this.execute = this.execute.bind(this);
  }

  App.prototype.init = function () {
    sStage_1.default.init();
    sScene_1.default.init();
    var atSceneType = getSceneTypeFromUrl();
    sScene_1.default.load(atSceneType);
  };

  App.prototype.execute = function () {
    sScene_1.default.update();
    requestAnimationFrame(this.execute);
  };

  return App;
}();

var app = new App();
app.init();
app.execute();

function getSceneTypeFromUrl() {
  var result = {
    type: ""
  };
  location.search.substring(1).split("&").map(function (param) {
    var data = param.split("=");

    if (data[0] === "scene") {
      result.type = data[1];
    }
  });
  var type = SceneTable[result.type];
  return type ? type : sScene_1.SceneType.Sample1;
}
},{"./system/sStage":"scripts/system/sStage.ts","./system/sScene":"scripts/system/sScene.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53213" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/app.ts"], null)
//# sourceMappingURL=/app.f6201a1a.js.map