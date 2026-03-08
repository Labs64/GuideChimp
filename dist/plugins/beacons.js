/*! GuideChimp v5.0.0 | Copyright (C) 2026 Labs64 GmbH */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["guideChimpPluginBeacons"] = factory();
	else
		root["guideChimpPluginBeacons"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 271:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(738));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(715));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(693));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(383));
var _createClass2 = _interopRequireDefault(__webpack_require__(579));
var _beacon = _interopRequireDefault(__webpack_require__(48));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable class-methods-use-this */ /**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */ // templates
var Beacons = exports["default"] = /*#__PURE__*/function () {
  function Beacons(beacons) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Beacons);
    this.beacons = [];
    this.options = {};

    // observers
    this.observers = {};
    if (typeof ResizeObserver !== 'undefined') {
      this.observers.elementResizeObserver = new ResizeObserver(function () {
        return _this.refresh();
      });
    }
    this.cache = new Map();
    this.elements = new Map();
    this.setOptions(options);
    this.setBeacons(beacons);
    this.init();
  }

  /**
   * Called after construction, this hook allows you to add some extra setup
   * logic without having to override the constructor.
   */
  return (0, _createClass2.default)(Beacons, [{
    key: "init",
    value: function init() {}

    /**
     * Default options
     * @return {Object}
     */
  }, {
    key: "setOptions",
    value:
    /**
     * Set beacons options
     * @param options
     * @return {this}
     */
    function setOptions(options) {
      this.options = _objectSpread(_objectSpread({}, this.constructor.getDefaultOptions()), options);
      return this;
    }
  }, {
    key: "setBeacons",
    value: function setBeacons(beacons) {
      var _this2 = this;
      // cleanup for previous beacons
      this.removeAll();
      this.beacons = !beacons || typeof beacons === 'string' || Array.isArray(beacons) && beacons.every(function (v) {
        return typeof v === 'string';
      }) ? this.getDataBeacons(beacons) : this.getJsBeacons(beacons);
      if (this.beacons.length) {
        this.beacons.forEach(function (beacon) {
          var element = beacon.element;
          if (!element) {
            return;
          }
          var el = _this2.getEl(element);
          if (!el) {
            return;
          }
          var beaconEl = _this2.createBeaconEl(beacon);
          beaconEl.hidden = true;
          if (_this2.constructor.isFixed(el)) {
            beaconEl.classList.add(_this2.constructor.getFixedClass());
          }
          var parentEl = !el.parentElement || el.parentElement === document.body ? document.body : el.parentElement;
          parentEl.append(beaconEl);
          _this2.elements.set(beacon, beaconEl);
          _this2.setBeaconPosition(el, beaconEl, beacon);

          // fire observers
          _this2.observeResizing(el);
        });
        this.addOnWindowResizeListener();
      }
      return this;
    }
  }, {
    key: "getBeacons",
    value: function getBeacons() {
      return this.beacons;
    }
  }, {
    key: "getBeacon",
    value: function getBeacon(id, def) {
      var _ref = id && (0, _typeof2.default)(id) === 'object' ? [id] : this.beacons.filter(function (v) {
          return v.id === id;
        }),
        _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        beacon = _ref2[0];
      return beacon || def;
    }
  }, {
    key: "getDataBeacons",
    value: function getDataBeacons(ids) {
      var _this3 = this;
      var beaconsIds = typeof ids === 'string' ? ids.split(',').map(function (v) {
        return v.trim();
      }) : ids;
      var beaconsSelector = ["[".concat(this.constructor.getBeaconDataPrefix(), "]")];
      if (beaconsIds) {
        beaconsSelector = [];
        beaconsIds.forEach(function (id) {
          beaconsSelector.push("[".concat(_this3.constructor.getBeaconDataPrefix(), "*='").concat(id, "']"));
        });
      }
      var beaconsEl = Array.from(document.querySelectorAll(beaconsSelector.join(',')));
      var dataGlobalRegExp = new RegExp("^".concat(this.constructor.getBeaconDataPrefix(), "-([^-]+)$"));
      var beacons = [];
      beaconsEl.forEach(function (el) {
        var beaconsIdsAttrValue = el.attributes[_this3.constructor.getBeaconDataPrefix()].value;
        if (!beaconsIdsAttrValue) {
          return;
        }
        var elBeaconsIds = beaconsIdsAttrValue.split(',');
        elBeaconsIds.forEach(function (id) {
          if (beaconsIds && !beaconsIds.includes(id)) {
            return;
          }
          var globalBeaconAttrs = {};
          var beaconAttrs = {};
          var dataBeaconRegExp = new RegExp("^".concat(_this3.constructor.getBeaconDataPrefix(), "-").concat(id, "-([^-]+)$"));

          // parse attributes
          for (var j = 0; j < el.attributes.length; j++) {
            var _el$attributes$j = el.attributes[j],
              attrName = _el$attributes$j.name,
              attrValue = _el$attributes$j.value;
            var isGlobalAttr = dataGlobalRegExp.test(attrName);
            var isBeaconAttr = dataBeaconRegExp.test(attrName);
            if (isGlobalAttr) {
              var _attrName$match = attrName.match(dataGlobalRegExp),
                _attrName$match2 = (0, _slicedToArray2.default)(_attrName$match, 2),
                shortAttrName = _attrName$match2[1];
              globalBeaconAttrs[shortAttrName] = attrValue;
            } else if (isBeaconAttr) {
              var _attrName$match3 = attrName.match(dataBeaconRegExp),
                _attrName$match4 = (0, _slicedToArray2.default)(_attrName$match3, 2),
                _shortAttrName = _attrName$match4[1];
              beaconAttrs[_shortAttrName] = attrValue;
            }
          }
          var beacon = _objectSpread(_objectSpread(_objectSpread({
            id: id,
            position: _this3.options.position
          }, globalBeaconAttrs), beaconAttrs), {}, {
            element: el
          });
          if (beacon.onclick || beacon.onClick) {
            beacon.onClick = function (e) {
              if (beacon.onclick) {
                var shadow = document.createElement('div');
                shadow.style.visibility = 'hidden';
                shadow.setAttribute('onclick', beacon.onclick);
                document.body.append(shadow);
                shadow.click();
                document.body.removeChild(shadow);
              } else if (typeof beacon.onClick === 'function') {
                beacon.onClick.call(e, beacon);
              }
            };
          }
          beacons.push(beacon);
        });
      });
      return beacons;
    }
  }, {
    key: "getJsBeacons",
    value: function getJsBeacons(beacons) {
      // cast to array
      var array = !Array.isArray(beacons) ? [beacons] : beacons;
      return array.map(function (v, i) {
        return _objectSpread(_objectSpread({}, v), {}, {
          id: v.id || i
        });
      });
    }
  }, {
    key: "createBeaconEl",
    value: function createBeaconEl(beacon) {
      var _this4 = this;
      var data = _objectSpread({}, beacon);
      data.onClick = function (e) {
        e.stopPropagation();
        if (beacon.onClick) {
          beacon.onClick.call(_this4, e, beacon);
        }
      };
      return _beacon.default.call(this, {
        beacon: data
      });
    }
  }, {
    key: "getEl",
    value: function getEl(selector) {
      return selector instanceof HTMLElement ? selector : document.querySelector(selector);
    }
  }, {
    key: "setBeaconPosition",
    value: function setBeaconPosition(el, beaconEl) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var position = options.position,
        boundary = options.boundary;
      position = position || this.options.position;
      boundary = boundary || this.options.boundary;
      boundary = boundary === 'inner' ? 'inner' : 'outer';
      var elLeft = el.offsetLeft,
        elTop = el.offsetTop,
        elWidth = el.offsetWidth,
        elHeight = el.offsetHeight;
      var beaconStyle = beaconEl.style;
      var _getComputedStyle = getComputedStyle(beaconEl),
        beaconWidth = _getComputedStyle.width,
        beaconHeight = _getComputedStyle.height;
      beaconWidth = parseInt(beaconWidth, 10);
      beaconHeight = parseInt(beaconHeight, 10);
      beaconEl.removeAttribute('data-beacon-position');
      beaconEl.removeAttribute('data-beacon-boundary');
      beaconEl.setAttribute('data-beacon-position', position);
      beaconEl.setAttribute('data-beacon-boundary', boundary);
      switch (position) {
        case 'top-left':
          {
            if (boundary === 'inner') {
              beaconStyle.left = "".concat(elLeft, "px");
              beaconStyle.top = "".concat(elTop, "px");
            } else {
              beaconStyle.left = "".concat(elLeft - beaconWidth, "px");
              beaconStyle.top = "".concat(elTop - beaconHeight, "px");
            }
            break;
          }
        case 'top':
          {
            beaconStyle.left = "".concat(elLeft + (elWidth - beaconWidth) / 2, "px");
            beaconStyle.top = boundary === 'inner' ? "".concat(elTop, "px") : "".concat(elTop - beaconHeight, "px");
            break;
          }
        case 'top-right':
          {
            if (boundary === 'inner') {
              beaconStyle.left = "".concat(elWidth + elLeft - beaconWidth, "px");
              beaconStyle.top = "".concat(elTop, "px");
            } else {
              beaconStyle.left = "".concat(elWidth + elLeft, "px");
              beaconStyle.top = "".concat(elTop - beaconHeight, "px");
            }
            break;
          }
        case 'left':
          {
            beaconStyle.left = boundary === 'inner' ? "".concat(elLeft, "px") : "".concat(elLeft - beaconWidth, "px");
            beaconStyle.top = "".concat(elTop + (elHeight - beaconHeight) / 2, "px");
            break;
          }
        case 'right':
          {
            beaconStyle.left = boundary === 'inner' ? "".concat(elLeft + elWidth - beaconWidth, "px") : "".concat(elLeft + elWidth, "px");
            beaconStyle.top = "".concat(elTop + (elHeight - beaconHeight) / 2, "px");
            break;
          }
        case 'bottom-left':
          {
            if (boundary === 'inner') {
              beaconStyle.left = "".concat(elLeft, "px");
              beaconStyle.top = "".concat(elTop + elHeight - beaconHeight, "px");
            } else {
              beaconStyle.left = "".concat(elLeft - beaconWidth, "px");
              beaconStyle.top = "".concat(elTop + elHeight, "px");
            }
            break;
          }
        case 'bottom':
          {
            beaconStyle.left = "".concat(elLeft + (elWidth - beaconWidth) / 2, "px");
            beaconStyle.top = boundary === 'inner' ? "".concat(elTop + elHeight - beaconHeight, "px") : "".concat(elTop + elHeight, "px");
            break;
          }
        case 'bottom-right':
          {
            if (boundary === 'inner') {
              beaconStyle.left = "".concat(elWidth + elLeft - beaconWidth, "px");
              beaconStyle.top = "".concat(elTop + elHeight - beaconHeight, "px");
            } else {
              beaconStyle.left = "".concat(elWidth + elLeft, "px");
              beaconStyle.top = "".concat(elTop + elHeight, "px");
            }
            break;
          }
        case 'center':
        default:
          {
            beaconEl.setAttribute('data-beacon-position', 'center');
            beaconStyle.left = "".concat(elLeft + (elWidth - beaconWidth) / 2, "px");
            beaconStyle.top = "".concat(elTop + (elHeight - beaconHeight) / 2, "px");
            break;
          }
      }
      return this;
    }
  }, {
    key: "isCanShowBeacon",
    value: function isCanShowBeacon(_ref3) {
      var canShow = _ref3.canShow;
      if (canShow !== undefined) {
        if (!canShow || typeof canShow === 'function' && canShow() === false) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "showAll",
    value: function showAll() {
      var _this5 = this;
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.beacons.forEach(function (beacon) {
        _this5.show(beacon, force);
      });
      return this;
    }
  }, {
    key: "show",
    value: function show(id) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var beacon = this.getBeacon(id);
      if (beacon) {
        var beaconEl = this.elements.get(beacon);
        if (beaconEl) {
          if (force || this.isCanShowBeacon(beacon)) {
            beaconEl.hidden = false;
          }
        }
      }
      return this;
    }
  }, {
    key: "hideAll",
    value: function hideAll() {
      var _this6 = this;
      this.beacons.forEach(function (beacon) {
        _this6.hide(beacon);
      });
      return this;
    }
  }, {
    key: "hide",
    value: function hide(id) {
      var beacon = this.getBeacon(id);
      if (beacon) {
        var el = this.elements.get(beacon);
        if (el) {
          el.hidden = true;
        }
      }
      return this;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var _this7 = this;
      this.beacons.forEach(function (beacon) {
        _this7.remove(beacon);
      });
      this.beacons = [];
      this.unobserveResizeAllElements();
      this.removeOnWindowResizeListener();
      return this;
    }
  }, {
    key: "remove",
    value: function remove(id) {
      var beacon = this.getBeacon(id);
      var beaconEl = this.elements.get(beacon);
      if (beaconEl) {
        beaconEl.parentNode.removeChild(beaconEl);
        var beaconIndex = this.beacons.indexOf(beacon);
        if (beaconIndex !== -1) {
          this.beacons.splice(this.beacons.indexOf(beacon), 1);
        }
        this.elements.delete(beacon);
        var el = this.getEl(beacon.element);
        if (el) {
          this.unobserveResizing(el);
        }
      }
      if (!this.beacons.length) {
        this.removeOnWindowResizeListener();
      }
      return this;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var _this8 = this;
      this.beacons.forEach(function (beacon) {
        var element = beacon.element;
        if (!element) {
          return;
        }
        var el = _this8.getEl(element);
        var beaconEl = _this8.elements.get(beacon);
        if (el && beaconEl) {
          _this8.setBeaconPosition(el, beaconEl, beacon);
        }
      });
      return this;
    }

    /**
     * Add window resize event listener
     * @return {this}
     */
  }, {
    key: "addOnWindowResizeListener",
    value: function addOnWindowResizeListener() {
      this.cache.set('onWindowResizeListener', this.getOnWindowResizeListener());
      window.addEventListener('resize', this.cache.get('onWindowResizeListener'), true);
      return this;
    }

    /**
     * Return on window resize event listener function
     * @returns {function}
     */
  }, {
    key: "getOnWindowResizeListener",
    value: function getOnWindowResizeListener() {
      var _this9 = this;
      return function () {
        return _this9.refresh();
      };
    }

    /**
     * Remove window resize event listener
     * @return {this}
     */
  }, {
    key: "removeOnWindowResizeListener",
    value: function removeOnWindowResizeListener() {
      if (this.cache.has('onWindowResizeListener')) {
        window.removeEventListener('resize', this.cache.get('onWindowResizeListener'), true);
        this.cache.delete('onWindowResizeListener');
      }
      return this;
    }

    /**
     * Observe resize step element
     * @return {this}
     */
  }, {
    key: "observeResizing",
    value: function observeResizing(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        box: 'border-box'
      };
      var observer = this.observers.elementResizeObserver;
      if (observer) {
        observer.observe(el, options);
      }
      return this;
    }

    /**
     * Unobserve resize step element
     * @param el
     * @return {this}
     */
  }, {
    key: "unobserveResizing",
    value: function unobserveResizing(el) {
      var observer = this.observers.elementResizeObserver;
      if (observer) {
        observer.unobserve(el);
      }
      return this;
    }

    /**
     * Unobserve all resize steps elements
     * @return {this}
     */
  }, {
    key: "unobserveResizeAllElements",
    value: function unobserveResizeAllElements() {
      var observer = this.observers.elementResizeObserver;
      if (observer) {
        observer.disconnect();
      }
      return this;
    }
  }], [{
    key: "getDefaultOptions",
    value: function getDefaultOptions() {
      return {
        position: 'center',
        boundary: 'inner'
      };
    }
  }, {
    key: "getFixedClass",
    value: function getFixedClass() {
      return 'gc-beacon-fixed';
    }
  }, {
    key: "getBeaconDataPrefix",
    value: function getBeaconDataPrefix() {
      return 'data-beacon';
    }

    /**
     * Check if el or his parent has fixed position
     * @param el
     * @return {boolean}
     */
  }, {
    key: "isFixed",
    value: function isFixed(el) {
      var parentNode = el.parentNode;
      if (!parentNode || parentNode.nodeName === 'HTML') {
        return false;
      }
      var elStyle = getComputedStyle(el);
      if (elStyle.getPropertyValue('position') === 'fixed') {
        return true;
      }
      return this.isFixed(parentNode);
    }
  }]);
}();

/***/ }),

/***/ 390:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(994);
var _typeof2 = _interopRequireDefault(__webpack_require__(738));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(383));
var _createClass2 = _interopRequireDefault(__webpack_require__(579));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(452));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(72));
var _get2 = _interopRequireDefault(__webpack_require__(395));
var _inherits2 = _interopRequireDefault(__webpack_require__(511));
var _Beacons2 = _interopRequireDefault(__webpack_require__(271));
__webpack_require__(712);
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = (0, _get2.default)((0, _getPrototypeOf2.default)(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; } /**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */
module.exports = function (Class, factory) {
  // eslint-disable-next-line no-param-reassign
  factory.beacons = function (beacons) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new (/*#__PURE__*/function (_Beacons) {
      function _class() {
        (0, _classCallCheck2.default)(this, _class);
        return _callSuper(this, _class, arguments);
      }
      (0, _inherits2.default)(_class, _Beacons);
      return (0, _createClass2.default)(_class, [{
        key: "getDataBeacons",
        value: function getDataBeacons(ids) {
          var _this = this;
          var data = _superPropGet(_class, "getDataBeacons", this, 3)([ids]);
          data.forEach(function (beacon) {
            var id = beacon.id,
              el = beacon.element;
            var tour = '';
            var dataGlobalTourAttrName = "".concat(_this.constructor.getBeaconDataPrefix(), "-tour");
            var dataBeaconTourAttrName = "".concat(_this.constructor.getBeaconDataPrefix(), "-").concat(id, "-tour");
            if (el.attributes[dataGlobalTourAttrName]) {
              var value = el.attributes[dataGlobalTourAttrName].value;
              tour = value;
            }
            if (el.attributes[dataBeaconTourAttrName]) {
              var _value = el.attributes[dataBeaconTourAttrName].value;
              tour = _value;
            }
            if (tour) {
              // eslint-disable-next-line no-param-reassign
              beacon.tour = tour;
            }
          });
          return data;
        }
      }, {
        key: "createBeaconEl",
        value: function createBeaconEl(beacon) {
          var el = _superPropGet(_class, "createBeaconEl", this, 3)([beacon]);
          if (beacon.tour) {
            el.addEventListener('click', function () {
              var guide = null;
              if (typeof beacon.tour === 'string' || Array.isArray(beacon.tour)) {
                guide = new Class(beacon.tour);
              } else if (beacon.tour instanceof Class) {
                guide = beacon.tour;
              } else if ((0, _typeof2.default)(beacon.tour) === 'object') {
                var _beacon$tour = beacon.tour,
                  steps = _beacon$tour.steps,
                  tourOptions = _beacon$tour.options;
                guide = new Class(steps, tourOptions);
              }
              if (guide) {
                guide.start();
              }
            });
          }
          return el;
        }
      }]);
    }(_Beacons2.default))(beacons, options);
  };
};

/***/ }),

/***/ 48:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(702));
var _default = exports["default"] = function _default(_ref) {
  var beacon = _ref.beacon;
  var _render = (0, _render2.default)("<div class=\"gc-beacon ".concat(beacon.class, "\" />")),
    element = _render.element;
  element.addEventListener('click', function (e) {
    beacon.onClick(e);
  });
  return element;
};

/***/ }),

/***/ 702:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
/**
 * Render html string
 * @param html - html string
 * @returns {{refs: {}, element: Element}}
 */
var _default = exports["default"] = function _default(html) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, 'text/html');
  var element = doc.body.firstElementChild;
  var refs = {};
  if (element) {
    doc.body.querySelectorAll('[ref]').forEach(function (el) {
      refs[el.getAttribute('ref')] = el;
      el.removeAttribute('ref');
    });
  }
  return {
    refs: refs,
    element: element
  };
};

/***/ }),

/***/ 712:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 79:
/***/ (function(module) {

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 987:
/***/ (function(module) {

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 475:
/***/ (function(module) {

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 383:
/***/ (function(module) {

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 579:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(736);
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 693:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(736);
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 395:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var superPropBase = __webpack_require__(552);
function _get() {
  return module.exports = _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _get.apply(null, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 72:
/***/ (function(module) {

function _getPrototypeOf(t) {
  return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 511:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(636);
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 994:
/***/ (function(module) {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 156:
/***/ (function(module) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 752:
/***/ (function(module) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 452:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(738)["default"]);
var assertThisInitialized = __webpack_require__(475);
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 636:
/***/ (function(module) {

function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 715:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(987);
var iterableToArrayLimit = __webpack_require__(156);
var unsupportedIterableToArray = __webpack_require__(122);
var nonIterableRest = __webpack_require__(752);
function _slicedToArray(r, e) {
  return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 552:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(72);
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = getPrototypeOf(t)););
  return t;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 45:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(738)["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 736:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(738)["default"]);
var toPrimitive = __webpack_require__(45);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 738:
/***/ (function(module) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 122:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(79);
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(390);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=beacons.js.map