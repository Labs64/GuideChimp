(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GuideChimp"] = factory();
	else
		root["GuideChimp"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _construct2 = _interopRequireDefault(__webpack_require__(2));

var _GuideChimp = _interopRequireDefault(__webpack_require__(4));

__webpack_require__(15);

/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

/* ============
 * Styling
 * ============
 *
 * Import the library styling.
 */
var guideChimp = function guideChimp() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _construct2.default)(_GuideChimp.default, args);
};

guideChimp.prototype = _GuideChimp.default.prototype;

guideChimp.extend = function (plugin) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  plugin.apply(void 0, [_GuideChimp.default, guideChimp].concat(args));
  return guideChimp;
};

module.exports = guideChimp;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(3);

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(5));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(7));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(8));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(9));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(13));

var _createClass2 = _interopRequireDefault(__webpack_require__(14));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable class-methods-use-this */

/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */
// global cache
var cache = new Map();

var GuideChimp =
/*#__PURE__*/
function () {
  /**
   * GuideChimp constructor
   * @param tour
   * @param options
   */
  function GuideChimp(tour) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, GuideChimp);
    this.step = null;
    this.steps = [];
    this.tour = null;
    this.options = {};
    this.cache = cache;
    this.listeners = [];
    this.setOptions(options);
    this.setTour(tour);
    this.init();
  }
  /**
   * Called after construction, this hook allows you to add some extra setup
   * logic without having to override the constructor.
   */


  (0, _createClass2.default)(GuideChimp, [{
    key: "init",
    value: function init() {}
    /**
     * Default options
     * @return {Object}
     */

  }, {
    key: "setTour",

    /**
     * Set tour name or steps
     * @param tour
     * @return {this}
     */
    value: function setTour(tour) {
      this.tour = Array.isArray(tour) ? (0, _toConsumableArray2.default)(tour) : tour;
      return this;
    }
    /**
     * Get tour name or steps
     * @return {null}
     */

  }, {
    key: "getTour",
    value: function getTour() {
      return this.tour;
    }
    /**
     * Set tour options
     * @param options
     * @return {this}
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = _objectSpread({}, this.constructor.getDefaultOptions(), {}, options);
      return this;
    }
    /**
     * Get tour options
     */

  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options;
    }
    /**
     * Start tour
     * @param number step number or it index
     * @param useIndex whether to use step number or index
     * @return {Promise<boolean>}
     */

  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var number,
            useIndex,
            isStarted,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                number = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
                useIndex = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                _context.next = 4;
                return this.emit('onStart', this);

              case 4:
                _context.next = 6;
                return this.go(number, useIndex);

              case 6:
                isStarted = _context.sent;

                if (isStarted) {
                  // add a class that increase the specificity of guidechimp classes
                  document.body.classList.add(this.constructor.getBodyClass()); // turn on keyboard navigation

                  if (this.options.useKeyboard) {
                    this.setUpOnKeydownListener();
                  } // on window resize


                  this.setUpOnWindowResizeListener();
                }

                return _context.abrupt("return", isStarted);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
    /**
     * Go to step
     * @param number step number or it index
     * @param useIndex whether to use step number or index
     * @return {Promise<boolean>}
     */

  }, {
    key: "go",
    value: function () {
      var _go = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(number) {
        var _this = this;

        var useIndex,
            stepNumber,
            fromStep,
            toStep,
            isSameStep,
            i,
            step,
            isToStep,
            _toStep,
            onBeforeChange,
            onAfterChange,
            results,
            el,
            _this$step,
            position,
            buttons,
            highlightLayer,
            controlLayer,
            interactionLayer,
            tooltipLayer,
            navigationLayer,
            isNeedHideNavigation,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                useIndex = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;

                if (!(!this.tour || !this.tour.length)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", false);

              case 3:
                stepNumber = useIndex ? parseInt(number, 10) : number;
                fromStep = _objectSpread({}, this.step);
                toStep = null; // skip if this step is already displayed

                isSameStep = useIndex ? this.steps.indexOf(this.step) === stepNumber : this.step && this.step.step === stepNumber;

                if (!isSameStep) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", false);

              case 9:
                this.steps = []; // if tour is empty or is string, looks for steps among the data attributes

                if (typeof this.tour === 'string') {
                  this.steps = this.getDataSteps(this.tour);
                } else if (Array.isArray(this.tour)) {
                  this.steps = this.getJsSteps(this.tour);
                }

                if (this.steps.length) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", false);

              case 13:
                // sort steps by step
                this.steps = this.sortSteps(this.steps);
                i = 0;

              case 15:
                if (!(i < this.steps.length)) {
                  _context2.next = 24;
                  break;
                }

                step = this.steps[i];
                isToStep = useIndex ? i === stepNumber : step.step === stepNumber;

                if (!isToStep) {
                  _context2.next = 21;
                  break;
                }

                toStep = step;
                return _context2.abrupt("break", 24);

              case 21:
                i++;
                _context2.next = 15;
                break;

              case 24:
                if (toStep) {
                  _context2.next = 26;
                  break;
                }

                return _context2.abrupt("return", false);

              case 26:
                this.resetElementsHighlighting();
                this.showOverlayLayer();
                this.startPreloader();
                _toStep = toStep, onBeforeChange = _toStep.onBeforeChange, onAfterChange = _toStep.onAfterChange;
                _context2.next = 32;
                return this.emit('onBeforeChange', this, fromStep, toStep);

              case 32:
                results = _context2.sent;

                if (!results.some(function (r) {
                  return r === false;
                })) {
                  _context2.next = 35;
                  break;
                }

                return _context2.abrupt("return", false);

              case 35:
                if (!onBeforeChange) {
                  _context2.next = 41;
                  break;
                }

                _context2.next = 38;
                return Promise.resolve().then(function () {
                  return onBeforeChange(_this, fromStep, toStep);
                });

              case 38:
                _context2.t0 = _context2.sent;

                if (!(_context2.t0 === false)) {
                  _context2.next = 41;
                  break;
                }

                return _context2.abrupt("return", false);

              case 41:
                this.stopPreloader();
                this.step = toStep;
                el = this.step.element;
                _this$step = this.step, position = _this$step.position, buttons = _this$step.buttons;

                if (typeof el === 'string') {
                  el = document.querySelector(el);
                }

                if (!el || el.style.display === 'none' || el.style.visibility === 'hidden') {
                  el = this.showDefaultElement();
                }

                highlightLayer = this.showHighlightLayer();
                controlLayer = this.showControlLayer();
                interactionLayer = this.showInteractionLayer();
                this.setLayerPosition(highlightLayer, el);
                this.setLayerPosition(controlLayer, el);
                this.setLayerPosition(interactionLayer, el);
                tooltipLayer = this.showTooltipLayer();
                this.showTooltipTail();
                this.showProgressbar();
                this.showTitle(this.step.title);
                this.showDescription(this.step.description);
                this.showClose();
                this.showCustomButtonsLayer(buttons);
                navigationLayer = this.showNavigation();
                this.showNavigationPrev();
                this.showPagination();
                this.showNavigationNext();
                isNeedHideNavigation = Array.from(navigationLayer.children).every(function (v) {
                  return v.classList.contains(_this.constructor.getHiddenClass());
                });

                if (isNeedHideNavigation) {
                  navigationLayer.classList.add(this.constructor.getHiddenClass());
                } else {
                  navigationLayer.classList.remove(this.constructor.getHiddenClass());
                }

                this.showCopyright();
                this.setTooltipLayerPosition(tooltipLayer, el, position);
                this.highlightElement(el);
                this.scrollParentToChildElement(el);
                this.scrollTo(el);
                setTimeout(function () {
                  _this.scrollTo(tooltipLayer, 'smooth');
                }, 300);
                this.emit('onAfterChange', this, fromStep, toStep);

                if (onAfterChange) {
                  onAfterChange(this, fromStep, toStep);
                }

                return _context2.abrupt("return", true);

              case 75:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function go(_x) {
        return _go.apply(this, arguments);
      }

      return go;
    }()
  }, {
    key: "previous",
    value: function () {
      var _previous = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var prevStepIndex;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.step) {
                  _context3.next = 3;
                  break;
                }

                prevStepIndex = this.steps.indexOf(this.step) - 1;
                return _context3.abrupt("return", prevStepIndex > -1 ? this.go(prevStepIndex, true) : false);

              case 3:
                return _context3.abrupt("return", false);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function previous() {
        return _previous.apply(this, arguments);
      }

      return previous;
    }()
  }, {
    key: "next",
    value: function () {
      var _next = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var nextStepIndex;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.step) {
                  _context4.next = 3;
                  break;
                }

                nextStepIndex = this.steps.indexOf(this.step) + 1;
                return _context4.abrupt("return", nextStepIndex < this.steps.length ? this.go(nextStepIndex, true) : false);

              case 3:
                return _context4.abrupt("return", false);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function next() {
        return _next.apply(this, arguments);
      }

      return next;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5() {
        var stepIndex;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                stepIndex = this.steps.indexOf(this.step);

                if (!(stepIndex === this.steps.length - 1)) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 4;
                return this.emit('onComplete', this);

              case 4:
                _context5.next = 6;
                return this.emit('onStop', this);

              case 6:
                this.step = null;
                this.steps = []; // remove the class that increase the specificity of the guidechimp classes

                document.body.classList.remove(this.constructor.getBodyClass()); // shut up events listeners

                this.shutUpOnKeydownListener();
                this.shutUpOnWindowResizeListener();
                this.removePreloaderElement();
                this.removeOverlayLayer();
                this.removeControlLayer();
                this.removeHighlightLayer();
                this.removeInteractionLayer();
                this.resetElementsHighlighting();
                this.cache.clear();
                return _context5.abrupt("return", this);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "getDataSteps",
    value: function getDataSteps(tour) {
      var _this2 = this;

      var dataPrefix = 'data-guidechimp';
      var tourStepsEl = Array.from(document.querySelectorAll("[".concat(dataPrefix, "-tour*='").concat(tour, "']"))); // filter steps by tour name

      tourStepsEl = tourStepsEl.filter(function (v) {
        var tours = v.getAttribute("".concat(dataPrefix, "-tour")).split(',');
        return tours.includes(_this2.tour);
      });
      var dataTourRegExp = new RegExp("^".concat(dataPrefix, "-").concat(tour, "-[^-]+$"));
      var dataGlobalRegExp = new RegExp("^".concat(dataPrefix, "-[^-]+$"));
      return tourStepsEl.map(function (el, i) {
        var stepAttrs = {};

        for (var j = 0; j < el.attributes.length; j++) {
          var _el$attributes$j = el.attributes[j],
              attrName = _el$attributes$j.name,
              attrValue = _el$attributes$j.value;
          var isTourAttr = dataTourRegExp.test(attrName);
          var isGlobalAttr = isTourAttr ? false : dataGlobalRegExp.test(attrName);

          if (isTourAttr || isGlobalAttr) {
            var attrShortName = isTourAttr ? attrName.replace("".concat(dataPrefix, "-").concat(tour, "-"), '') : attrName.replace("".concat(dataPrefix, "-"), '');

            if (attrShortName !== 'tour') {
              if (isTourAttr || isGlobalAttr && !stepAttrs[attrShortName]) {
                stepAttrs[attrShortName] = attrValue;
              }
            }
          }
        }

        return _objectSpread({
          step: i,
          title: '',
          description: '',
          position: _this2.options.position,
          interaction: _this2.options.interaction
        }, stepAttrs, {
          element: el
        });
      });
    }
  }, {
    key: "getJsSteps",
    value: function getJsSteps(tour) {
      return tour.map(function (v, i) {
        return _objectSpread({}, v, {
          step: v.step || i
        });
      });
    }
  }, {
    key: "sortSteps",
    value: function sortSteps(steps) {
      var copy = (0, _toConsumableArray2.default)(steps);
      return copy.sort(function (a, b) {
        if (a.step < b.step) {
          return -1;
        }

        if (a.step > b.step) {
          return 1;
        }

        return 0;
      });
    }
  }, {
    key: "scrollParentToChildElement",
    value: function scrollParentToChildElement(el) {
      var regex = /(auto|scroll)/;

      var getScrollableParent = function getScrollableParent(parent) {
        if (!parent || parent === document.body) {
          return document.body;
        }

        var parentStyle = getComputedStyle(parent);
        var isScrollable = regex.test("".concat(parentStyle.getPropertyValue('overflow'), "\n                ").concat(parentStyle.getPropertyValue('overflow-y'), "\n                ").concat(parentStyle.getPropertyValue('overflow-x')));
        return isScrollable ? parent : getScrollableParent(parent.parentElement);
      };

      var elStyle = getComputedStyle(el);
      var scrollableParent = elStyle.getPropertyValue('position') === 'fixed' ? document.body : getScrollableParent(el.parentElement); // scroll a parent scrollable element to a child element

      if (scrollableParent !== document.body) {
        scrollableParent.scrollTop = el.offsetTop - scrollableParent.offsetTop;
      }

      return this;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(el) {
      var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';

      var _el$getBoundingClient = el.getBoundingClientRect(),
          top = _el$getBoundingClient.top,
          bottom = _el$getBoundingClient.bottom,
          left = _el$getBoundingClient.left,
          right = _el$getBoundingClient.right;

      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      if (!(top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth)) {
        window.scrollBy({
          top: top,
          behavior: behavior
        });
      }

      return this;
    }
  }, {
    key: "highlightElement",
    value: function highlightElement(el) {
      var parentEl = el.parentElement;

      while (parentEl) {
        if (parentEl === document.body) {
          break;
        }

        if (el instanceof SVGElement && parentEl.tagName.toLowerCase() === 'svg') {
          this.constructor.addElementClass(parentEl, "".concat(this.constructor.getHighlightElementClass()));
          this.constructor.addElementClass(parentEl, this.constructor.getRelativePositionClass());
        }

        var parentElStyle = getComputedStyle(parentEl);
        var zIndex = parentElStyle.getPropertyValue('z-index');
        var opacity = parentElStyle.getPropertyValue('opacity');
        var transform = parentElStyle.getPropertyValue('transform');

        if (/[0-9]+/.test(zIndex) || opacity < 1 || transform && transform !== 'none') {
          this.constructor.addElementClass(parentEl, this.constructor.getFixStackingContext());
        }

        parentEl = parentEl.parentElement;
      }

      this.constructor.addElementClass(el, this.constructor.getHighlightElementClass());
      var elStyle = getComputedStyle(el);

      if (!['absolute', 'relative', 'fixed'].includes(elStyle.getPropertyValue('position'))) {
        this.constructor.addElementClass(el, this.constructor.getRelativePositionClass());
      }

      var highlightEls = this.cache.get('highlightEls') || new Set();
      highlightEls.add(el);
      this.cache.set('highlightEls', highlightEls);
      return this;
    }
  }, {
    key: "resetElementHighlighting",
    value: function resetElementHighlighting(el) {
      if (el) {
        var highlightEls = this.cache.get('highlightEls');

        if (highlightEls) {
          highlightEls.delete(el);
        }

        el.classList.remove(this.constructor.getHighlightElementClass());
        el.classList.remove(this.constructor.getRelativePositionClass());
        var parentEl = el.parentElement;

        while (parentEl) {
          if (parentEl === document.body) {
            break;
          }

          parentEl.classList.remove(this.constructor.getFixStackingContext());
          parentEl = parentEl.parentElement;
        }
      }

      return this;
    }
  }, {
    key: "resetElementsHighlighting",
    value: function resetElementsHighlighting() {
      var _this3 = this;

      var highlightEls = this.cache.get('highlightEls');

      if (highlightEls) {
        var highlightElsArray = Array.from(highlightEls);

        if (highlightElsArray.length) {
          highlightEls.forEach(function (el) {
            _this3.resetElementHighlighting(el);
          });
        }
      }

      return this;
    }
  }, {
    key: "setLayerPosition",
    value: function setLayerPosition(layer, el) {
      if (!layer || !el) {
        return this;
      }

      var padding = this.options.padding;

      var _this$constructor$get = this.constructor.getElementOffset(el),
          width = _this$constructor$get.width,
          height = _this$constructor$get.height,
          top = _this$constructor$get.top,
          left = _this$constructor$get.left;

      if (this.constructor.isElementFixed(el)) {
        this.constructor.addElementClass(layer, this.constructor.getFixedClass());
      } else {
        this.constructor.removeElementClass(layer, this.constructor.getFixedClass());
      }

      var elStyle = getComputedStyle(el);

      if (elStyle.getPropertyValue('position') === 'floating') {
        padding = 0;
      }

      var layerStyle = layer.style; // set new position

      layerStyle.cssText = "width: ".concat(width + padding, "px;\n        height: ").concat(height + padding, "px;\n        top: ").concat(top - padding / 2, "px;\n        left: ").concat(left - padding / 2, "px;");
      return this;
    }
  }, {
    key: "setTooltipLayerPosition",
    value: function setTooltipLayerPosition(tooltipLayer, el) {
      var preferredPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      // set tooltip position
      var position = 'floating';
      var alignment = null;
      var isDefaultElement = el.classList.contains(this.constructor.getDefaultElementClass());

      var _el$getBoundingClient2 = el.getBoundingClientRect(),
          elTop = _el$getBoundingClient2.top,
          elBottom = _el$getBoundingClient2.bottom,
          elLeft = _el$getBoundingClient2.left,
          elRight = _el$getBoundingClient2.right;

      var _el$getBoundingClient3 = el.getBoundingClientRect(),
          elWidth = _el$getBoundingClient3.width,
          elHeight = _el$getBoundingClient3.height;

      elWidth += this.options.padding;
      elHeight += this.options.padding;

      var _tooltipLayer$getBoun = tooltipLayer.getBoundingClientRect(),
          tooltipWidth = _tooltipLayer$getBoun.width,
          tooltipHeight = _tooltipLayer$getBoun.height;

      var style = tooltipLayer.style; // reset tooltip styles

      style.top = null;
      style.right = null;
      style.bottom = null;
      style.left = null;
      style.marginLeft = null;
      style.marginTop = null;

      if (!isDefaultElement) {
        var positionPriority = ['top', 'bottom', 'right', 'left'];

        if (elTop - tooltipHeight < 0) {
          positionPriority.splice(positionPriority.indexOf('top'), 1);
        }

        if (elBottom + tooltipHeight > window.innerHeight) {
          positionPriority.splice(positionPriority.indexOf('bottom'), 1);
        }

        if (elRight + tooltipWidth > window.innerWidth) {
          positionPriority.splice(positionPriority.indexOf('right'), 1);
        }

        if (elLeft - tooltipWidth < 0) {
          positionPriority.splice(positionPriority.indexOf('left'), 1);
        } // eslint-disable-next-line prefer-destructuring


        position = positionPriority[0];

        if (positionPriority.length) {
          if (positionPriority.includes(this.options.position)) {
            position = this.options.position;
          }

          if (positionPriority.includes(preferredPosition)) {
            position = preferredPosition;
          }
        }
      }

      if (position === 'top' || position === 'bottom') {
        var availableAlignments = ['left', 'right', 'middle'];
        var minWindowSize = Math.min(window.innerWidth, window.screen.width); // valid left space must be at least tooltip width

        if (minWindowSize - elLeft < tooltipWidth) {
          availableAlignments.splice(availableAlignments.indexOf('left'), 1);
        } // valid middle space must be at least half width from both sides


        if (elLeft < tooltipWidth / 2 || minWindowSize - elLeft < tooltipWidth / 2) {
          availableAlignments.splice(availableAlignments.indexOf('middle'), 1);
        } // valid right space must be at least tooltip width


        if (elLeft < tooltipWidth) {
          availableAlignments.splice(availableAlignments.indexOf('right'), 1);
        }

        alignment = availableAlignments.length ? availableAlignments[0] : 'middle';
      }

      var dataPositionAttr = 'data-guidechimp-position';
      var dataAlignmentAttr = 'data-guidechimp-alignment';
      tooltipLayer.removeAttribute(dataPositionAttr);
      tooltipLayer.removeAttribute(dataAlignmentAttr);
      tooltipLayer.setAttribute(dataPositionAttr, position);

      if (alignment) {
        tooltipLayer.setAttribute(dataAlignmentAttr, alignment);
      }

      switch (position) {
        case 'top':
          style.bottom = "".concat(elHeight, "px");
          break;

        case 'right':
          style.left = "".concat(elWidth, "px");
          break;

        case 'left':
          style.right = "".concat(elWidth, "px");
          break;

        case 'bottom':
          style.top = "".concat(elHeight, "px");
          break;

        default:
          {
            style.left = '50%';
            style.top = '50%';
            style.marginLeft = "-".concat(tooltipWidth / 2, "px");
            style.marginTop = "-".concat(tooltipHeight / 2, "px");
          }
      }

      if (alignment === 'right') {
        style.left = "".concat(elWidth - tooltipWidth, "px");
      } else if (alignment === 'middle') {
        style.left = "".concat(elWidth / 2 - tooltipWidth / 2, "px");
      }

      return this;
    }
  }, {
    key: "startPreloader",
    value: function startPreloader() {
      var highlightLayer = this.cache.has('highlightLayer') ? this.cache.get('highlightLayer') : document.body.querySelector(".".concat(this.constructor.getHighlightLayerClass()));

      if (highlightLayer) {
        highlightLayer.style.visibility = 'hidden';
      }

      var controlLayer = this.cache.has('controlLayer') ? this.cache.get('controlLayer') : document.body.querySelector(".".concat(this.constructor.getControlLayerClass()));

      if (controlLayer) {
        controlLayer.style.visibility = 'hidden';
      }

      var interactionLayer = this.cache.has('interactionLayer') ? this.cache.get('interactionLayer') : document.body.querySelector(".".concat(this.constructor.getInteractionLayerClass()));

      if (interactionLayer) {
        interactionLayer.style.visibility = 'hidden';
      }

      var tooltipLayer = this.cache.has('tooltipLayer') ? this.cache.get('tooltipLayer') : document.body.querySelector(".".concat(this.constructor.getTooltipLayerClass()));

      if (tooltipLayer) {
        tooltipLayer.style.visibility = 'hidden';
      }

      this.showPreloaderElement();
      return this;
    }
  }, {
    key: "stopPreloader",
    value: function stopPreloader() {
      var highlightLayer = this.cache.has('highlightLayer') ? this.cache.get('highlightLayer') : document.body.querySelector(".".concat(this.constructor.getHighlightLayerClass()));

      if (highlightLayer) {
        highlightLayer.style.visibility = 'visible';
      }

      var controlLayer = this.cache.has('controlLayer') ? this.cache.get('controlLayer') : document.body.querySelector(".".concat(this.constructor.getControlLayerClass()));

      if (controlLayer) {
        controlLayer.style.visibility = 'visible';
      }

      var interactionLayer = this.cache.has('interactionLayer') ? this.cache.get('interactionLayer') : document.body.querySelector(".".concat(this.constructor.getInteractionLayerClass()));

      if (interactionLayer) {
        interactionLayer.style.visibility = 'visible';
      }

      var tooltipLayer = this.cache.has('tooltipLayer') ? this.cache.get('tooltipLayer') : document.body.querySelector(".".concat(this.constructor.getTooltipLayerClass()));

      if (tooltipLayer) {
        tooltipLayer.style.visibility = 'visible';
      }

      this.removePreloaderElement();
      return this;
    }
  }, {
    key: "showDefaultElement",
    value: function showDefaultElement() {
      var defaultEl = this.cache.get('defaultEl');

      if (!defaultEl) {
        defaultEl = document.createElement('div');
        document.body.appendChild(defaultEl);
      }

      defaultEl.className = this.constructor.getDefaultElementClass();
      this.cache.set('defaultEl', defaultEl);
      return defaultEl;
    }
  }, {
    key: "showPreloaderElement",
    value: function showPreloaderElement() {
      var preloaderEl = this.cache.get('preloaderEl');

      if (!preloaderEl) {
        preloaderEl = document.createElement('div');
        preloaderEl.className = this.constructor.getPreloaderClass();
        document.body.appendChild(preloaderEl);
      }

      this.cache.set('preloaderEl', preloaderEl);
      return preloaderEl;
    }
  }, {
    key: "removePreloaderElement",
    value: function removePreloaderElement() {
      var preloaderEl = this.cache.get('preloaderEl');

      if (preloaderEl) {
        preloaderEl.parentElement.removeChild(preloaderEl);
      }

      this.cache.delete('preloaderEl');
      return this;
    }
  }, {
    key: "showOverlayLayer",
    value: function showOverlayLayer() {
      var _this4 = this;

      var overlayLayer = this.cache.get('overlayLayer');

      if (!overlayLayer) {
        overlayLayer = document.createElement('div');
        overlayLayer.className = this.constructor.getOverlayLayerClass();
        overlayLayer.onclick = this.options.exitOverlay ? function () {
          return _this4.stop();
        } : null;
        document.body.appendChild(overlayLayer);
      }

      this.cache.set('overlayLayer', overlayLayer);
      return overlayLayer;
    }
  }, {
    key: "removeOverlayLayer",
    value: function removeOverlayLayer() {
      var overlayLayer = this.cache.get('overlayLayer');

      if (overlayLayer) {
        overlayLayer.parentElement.removeChild(overlayLayer);
      }

      this.cache.delete('overlayLayer');
      return this;
    }
  }, {
    key: "showHighlightLayer",
    value: function showHighlightLayer() {
      var highlightLayer = this.cache.get('highlightLayer');

      if (!highlightLayer) {
        highlightLayer = document.createElement('div');
        highlightLayer.className = this.constructor.getHighlightLayerClass();
        document.body.appendChild(highlightLayer);
      }

      this.cache.set('highlightLayer', highlightLayer);
      return highlightLayer;
    }
  }, {
    key: "removeHighlightLayer",
    value: function removeHighlightLayer() {
      var highlightLayer = this.cache.get('highlightLayer');

      if (highlightLayer) {
        highlightLayer.parentElement.removeChild(highlightLayer);
      }

      this.cache.delete('highlightLayer');
      return this;
    }
  }, {
    key: "showControlLayer",
    value: function showControlLayer() {
      var controlLayer = this.cache.get('controlLayer');

      if (!controlLayer) {
        controlLayer = document.createElement('div');
        controlLayer.className = this.constructor.getControlLayerClass();
        document.body.appendChild(controlLayer);
      }

      this.cache.set('controlLayer', controlLayer);
      return controlLayer;
    }
  }, {
    key: "removeControlLayer",
    value: function removeControlLayer() {
      var controlLayer = this.cache.get('controlLayer');

      if (controlLayer) {
        controlLayer.parentElement.removeChild(controlLayer);
      }

      this.cache.delete('controlLayer');
      return this;
    }
  }, {
    key: "showInteractionLayer",
    value: function showInteractionLayer() {
      // get or create interaction layer
      var interactionLayer = this.cache.get('interactionLayer');

      if (!interactionLayer) {
        interactionLayer = document.createElement('div');
        document.body.appendChild(interactionLayer);
      }

      interactionLayer.className = this.constructor.getInteractionLayerClass();
      var interaction = this.options.interaction;

      if (this.step && typeof this.step.interaction === 'boolean') {
        interaction = this.step.interaction;
      } // disable interaction


      if (!interaction) {
        interactionLayer.classList.add(this.constructor.getDisableInteractionClass());
      }

      this.cache.set('interactionLayer', interactionLayer);
      return interactionLayer;
    }
  }, {
    key: "removeInteractionLayer",
    value: function removeInteractionLayer() {
      var interactionLayer = this.cache.get('interactionLayer');

      if (interactionLayer) {
        interactionLayer.parentElement.removeChild(interactionLayer);
      }

      this.cache.delete('interactionLayer');
      return this;
    }
  }, {
    key: "showTooltipLayer",
    value: function showTooltipLayer() {
      var parent = this.showControlLayer();
      var tooltipLayer = this.cache.get('tooltipLayer');

      if (!tooltipLayer) {
        tooltipLayer = document.createElement('div');
        tooltipLayer.setAttribute('role', 'dialog');
        parent.appendChild(tooltipLayer);
      }

      tooltipLayer.className = this.constructor.getTooltipLayerClass();
      this.cache.set('tooltipLayer', tooltipLayer);
      return tooltipLayer;
    }
  }, {
    key: "showTooltipTail",
    value: function showTooltipTail() {
      var parent = this.showTooltipLayer();
      var tooltipTailEl = this.cache.get('tooltipTailEl');

      if (!tooltipTailEl) {
        tooltipTailEl = document.createElement('div');
        parent.appendChild(tooltipTailEl);
      }

      tooltipTailEl.className = this.constructor.getTooltipTailClass();
      this.cache.set('tooltipTailEl', tooltipTailEl);
      return tooltipTailEl;
    }
  }, {
    key: "showClose",
    value: function showClose() {
      var _this5 = this;

      var parent = this.showTooltipLayer();
      var closeEl = this.cache.get('closeEl');

      if (!closeEl) {
        closeEl = document.createElement('div');

        closeEl.onclick = function () {
          return _this5.stop();
        };

        parent.appendChild(closeEl);
      }

      closeEl.className = this.constructor.getCloseClass();
      this.cache.set('closeEl', closeEl);
      return closeEl;
    }
  }, {
    key: "showProgressbar",
    value: function showProgressbar() {
      var parent = this.showTooltipLayer();
      var progressbarEl = this.cache.get('progressbarEl');

      if (!progressbarEl) {
        progressbarEl = document.createElement('div');
        progressbarEl.setAttribute('role', 'progress');
        progressbarEl.setAttribute('aria-valuemin', 0);
        progressbarEl.setAttribute('aria-valuemax', 100);
        parent.appendChild(progressbarEl);
      }

      var stepIndex = this.steps.indexOf(this.step);

      if (stepIndex >= 0 && this.steps.length) {
        var progress = (stepIndex + 1) / this.steps.length * 100;
        progressbarEl.setAttribute('aria-valuenow', progress);
        progressbarEl.style.cssText = "width: ".concat(progress, "%;");
      }

      progressbarEl.className = this.constructor.getProgressbarClass();

      if (!this.options.showProgressbar) {
        progressbarEl.classList.add(this.constructor.getHiddenClass());
      }

      this.cache.set('progressbarEl', progressbarEl);
      return progressbarEl;
    }
  }, {
    key: "showTitle",
    value: function showTitle(title) {
      var titleEl = this.cache.get('titleEl');

      if (!titleEl) {
        titleEl = document.createElement('div');
        this.showTooltipLayer().appendChild(titleEl);
      }

      titleEl.className = this.constructor.getTitleClass();

      if (!title) {
        titleEl.classList.add(this.constructor.getHiddenClass());
      }

      titleEl.innerHTML = title || '';
      this.cache.set('titleEl', titleEl);
      return titleEl;
    }
  }, {
    key: "showDescription",
    value: function showDescription(description) {
      var descriptionEl = this.cache.get('descriptionEl');

      if (!descriptionEl) {
        descriptionEl = document.createElement('div');
        this.showTooltipLayer().appendChild(descriptionEl);
      }

      descriptionEl.className = this.constructor.getDescriptionClass();

      if (!description) {
        descriptionEl.classList.add(this.constructor.getHiddenClass());
      }

      descriptionEl.innerHTML = description || '';
      this.cache.set('descriptionEl', descriptionEl);
      return descriptionEl;
    }
  }, {
    key: "showCustomButtonsLayer",
    value: function showCustomButtonsLayer() {
      var buttons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var customButtonsLayer = this.cache.get('customButtonsLayer');

      if (!customButtonsLayer) {
        customButtonsLayer = document.createElement('div');
        this.showTooltipLayer().appendChild(customButtonsLayer);
      }

      customButtonsLayer.className = this.constructor.getCustomButtonsLayerClass();

      if (!buttons.length) {
        customButtonsLayer.classList.add(this.constructor.getHiddenClass());
      }

      while (customButtonsLayer.firstChild) {
        customButtonsLayer.removeChild(customButtonsLayer.firstChild);
      }

      buttons.forEach(function (v) {
        if (v instanceof HTMLElement) {
          customButtonsLayer.appendChild(v);
        } else {
          var _v$tagName = v.tagName,
              tagName = _v$tagName === void 0 ? 'button' : _v$tagName,
              _v$title = v.title,
              title = _v$title === void 0 ? '' : _v$title,
              className = v.class,
              onClick = v.onClick;
          var customButton = document.createElement(tagName);
          customButton.innerHTML = title;

          if (className) {
            customButton.className = className;
          }

          if (onClick) {
            customButton.onclick = onClick;
          }

          customButtonsLayer.appendChild(customButton);
        }
      });
      this.cache.set('customButtonsLayer', customButtonsLayer);
      return customButtonsLayer;
    }
  }, {
    key: "showNavigation",
    value: function showNavigation() {
      var navigationLayer = this.cache.get('navigationLayer');

      if (!navigationLayer) {
        navigationLayer = document.createElement('div');
        this.showTooltipLayer().appendChild(navigationLayer);
      }

      navigationLayer.className = this.constructor.getNavigationClass();
      this.cache.set('navigationLayer', navigationLayer);
      return navigationLayer;
    }
  }, {
    key: "showPagination",
    value: function showPagination() {
      var _this6 = this;

      var paginationLayer = this.cache.get('paginationLayer');

      if (!paginationLayer) {
        paginationLayer = document.createElement('div');
        this.showNavigation().appendChild(paginationLayer);
      }

      paginationLayer.className = this.constructor.getPaginationLayerClass();

      if (!this.options.showPagination || this.steps.length < 2) {
        paginationLayer.classList.add(this.constructor.getHiddenClass());
      }

      while (paginationLayer.firstChild) {
        paginationLayer.removeChild(paginationLayer.firstChild);
      }

      this.steps.forEach(function (v, i) {
        var paginationItem = document.createElement('div');
        paginationItem.className = _this6.constructor.getPaginationItemClass();

        if (_this6.step === v) {
          paginationItem.classList.add(_this6.constructor.getPaginationCurrentItemClass());
        }

        paginationItem.onclick = function () {
          _this6.go(i, true);
        };

        paginationLayer.appendChild(paginationItem);
      });
      this.cache.set('paginationLayer', paginationLayer);
      return paginationLayer;
    }
  }, {
    key: "showNavigationPrev",
    value: function showNavigationPrev() {
      var _this7 = this;

      var navigationPrevEl = this.cache.get('navigationPrevEl');

      if (!navigationPrevEl) {
        navigationPrevEl = document.createElement('div');
        this.showNavigation().appendChild(navigationPrevEl);
      }

      navigationPrevEl.onclick = null;
      navigationPrevEl.className = this.constructor.getNavigationPrevClass();
      var stepIndex = this.steps.indexOf(this.step);

      if (stepIndex > -1) {
        if (stepIndex === 0) {
          navigationPrevEl.classList.add(this.constructor.getHiddenClass());
        } else {
          navigationPrevEl.onclick = function () {
            return _this7.go(stepIndex - 1, true);
          };
        }
      }

      this.cache.set('navigationPrevEl', navigationPrevEl);
      return navigationPrevEl;
    }
  }, {
    key: "showNavigationNext",
    value: function showNavigationNext() {
      var _this8 = this;

      var navigationNextEl = this.cache.get('navigationNextEl');

      if (!navigationNextEl) {
        navigationNextEl = document.createElement('div');
        this.showNavigation().appendChild(navigationNextEl);
      }

      navigationNextEl.onclick = null;
      navigationNextEl.className = this.constructor.getNavigationNextClass();
      var stepIndex = this.steps.indexOf(this.step);

      if (stepIndex > -1) {
        if (stepIndex === this.steps.length - 1 || this.steps.length === 1) {
          navigationNextEl.classList.add(this.constructor.getHiddenClass());
        } else {
          navigationNextEl.onclick = function () {
            _this8.go(stepIndex + 1, true);
          };
        }
      }

      this.cache.set('navigationNextEl', navigationNextEl);
      return navigationNextEl;
    }
  }, {
    key: "showCopyright",
    value: function showCopyright() {
      var copyrightEl = this.cache.get('copyrightEl');

      if (!copyrightEl) {
        copyrightEl = document.createElement('div');
        this.showTooltipLayer().appendChild(copyrightEl);
      }

      copyrightEl.className = this.constructor.getCopyrightClass();
      copyrightEl.innerHTML = 'Made with GuideChimp';
      this.cache.set('copyrightEl', copyrightEl);
      return copyrightEl;
    }
    /**
     * Register an event listener for a tour event.
     *
     * Event names can be comma-separated to register multiple events.
     *
     * @param {string} event The name of the event to listen for.
     * @param {function} listener The event listener, accepts context.
     */

  }, {
    key: "on",
    value: function on(event, listener) {
      var _this9 = this;

      var events = event.split(',').map(function (e) {
        return e.trim();
      });
      events.forEach(function (e) {
        _this9.listeners[e] = _this9.listeners[e] || [];

        _this9.listeners[e].push(listener);
      });
    }
    /**
     * Emits an event by name to all registered listeners on that event.
     * Listeners will be called in the order that they were added. If a listener
     * returns `false`, no other listeners will be called.
     *
     * @param {string} event    The name of the event to emit.
     * @param args  The context args of the event, passed to listeners.
     * @returns {Promise}
     */

  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this.listeners[event];

      if (!listeners) {
        return [];
      } // run through each listener


      return Promise.all(listeners.map(function (f) {
        return Promise.resolve().then(function () {
          return f.apply(void 0, args);
        });
      }));
    }
    /**
     * Set up keydown event listener
     * @return {this}
     */

  }, {
    key: "setUpOnKeydownListener",
    value: function setUpOnKeydownListener() {
      this.shutUpOnKeydownListener(); // turn on keyboard navigation

      this.cache.set('onKeydownListener', this.getOnKeydownListener());
      window.addEventListener('keydown', this.cache.get('onKeydownListener'), true);
      return this;
    }
    /**
     * Return on key down event listener function
     * @returns {function}
     */

  }, {
    key: "getOnKeydownListener",
    value: function getOnKeydownListener() {
      var _this10 = this;

      return function (event) {
        var keyCode = event.keyCode;
        var escCode = 27;
        var arrowLeftCode = 37;
        var arrowRightCode = 39;
        var enterCode = 13;
        var spaceCode = 32; // exit key pressed, stop tour

        if (keyCode === escCode) {
          _this10.stop();

          return;
        } // if the left arrow is pressed, go to the previous step


        if (keyCode === arrowLeftCode) {
          _this10.previous();

          return;
        } // if the right arrow, enter or space is pressed, go to the next step


        if (keyCode === arrowRightCode || keyCode === enterCode || keyCode === spaceCode) {
          _this10.next();
        }
      };
    }
    /**
     * Shut up keydown event listener
     * @return {this}
     */

  }, {
    key: "shutUpOnKeydownListener",
    value: function shutUpOnKeydownListener() {
      if (this.cache.has('onKeydownListener')) {
        window.removeEventListener('keydown', this.cache.get('onKeydownListener'), true);
        this.cache.delete('onKeydownListener');
      }

      return this;
    }
    /**
     * Set up window resize event listener
     * @return {this}
     */

  }, {
    key: "setUpOnWindowResizeListener",
    value: function setUpOnWindowResizeListener() {
      this.shutUpOnWindowResizeListener(); // turn on keyboard navigation

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
      var _this11 = this;

      return function () {
        return _this11.refresh();
      };
    }
    /**
     * Shut up window resize event listener
     * @return {this}
     */

  }, {
    key: "shutUpOnWindowResizeListener",
    value: function shutUpOnWindowResizeListener() {
      if (this.cache.has('onWindowResizeListener')) {
        window.removeEventListener('resize', this.cache.get('onWindowResizeListener'), true);
        this.cache.delete('onWindowResizeListener');
      }

      return this;
    }
    /**
     * Refresh layers position
     * @returns {this}
     */

  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.step) {
        return this;
      }

      if (this.cache.has('highlightLayer')) {
        this.setLayerPosition(this.cache.get('highlightLayer'), this.step.element);
      }

      if (this.cache.has('controlLayer')) {
        this.setLayerPosition(this.cache.get('controlLayer'), this.step.element);
      }

      if (this.cache.has('interactionLayer')) {
        this.setLayerPosition(this.cache.get('interactionLayer'), this.step.element);
      }

      if (this.cache.has('tooltipLayer')) {
        this.setTooltipLayerPosition(this.cache.get('tooltipLayer'), this.step.element, this.step.position);
      }

      return this;
    }
  }], [{
    key: "getDefaultOptions",
    value: function getDefaultOptions() {
      return {
        position: 'top',
        useKeyboard: true,
        exitEscape: true,
        exitOverlay: true,
        showPagination: true,
        showProgressbar: true,
        interaction: true,
        padding: 10
      };
    }
  }, {
    key: "getBodyClass",
    value: function getBodyClass() {
      return 'gc';
    }
  }, {
    key: "getDefaultElementClass",
    value: function getDefaultElementClass() {
      return 'gc-default';
    }
  }, {
    key: "getFixStackingContext",
    value: function getFixStackingContext() {
      return 'gc-fix-stacking-context';
    }
  }, {
    key: "getHighlightElementClass",
    value: function getHighlightElementClass() {
      return 'gc-highlighted';
    }
  }, {
    key: "getPreloaderClass",
    value: function getPreloaderClass() {
      return 'gc-preloader';
    }
  }, {
    key: "getOverlayLayerClass",
    value: function getOverlayLayerClass() {
      return 'gc-overlay';
    }
  }, {
    key: "getFixedClass",
    value: function getFixedClass() {
      return 'gc-fixed';
    }
  }, {
    key: "getHighlightLayerClass",
    value: function getHighlightLayerClass() {
      return 'gc-highlight';
    }
  }, {
    key: "getControlLayerClass",
    value: function getControlLayerClass() {
      return 'gc-control';
    }
  }, {
    key: "getInteractionLayerClass",
    value: function getInteractionLayerClass() {
      return 'gc-interaction';
    }
  }, {
    key: "getTooltipLayerClass",
    value: function getTooltipLayerClass() {
      return 'gc-tooltip';
    }
  }, {
    key: "getTooltipTailClass",
    value: function getTooltipTailClass() {
      return 'gc-tooltip-tail';
    }
  }, {
    key: "getTitleClass",
    value: function getTitleClass() {
      return 'gc-title';
    }
  }, {
    key: "getDescriptionClass",
    value: function getDescriptionClass() {
      return 'gc-description';
    }
  }, {
    key: "getCustomButtonsLayerClass",
    value: function getCustomButtonsLayerClass() {
      return 'gc-custom-buttons';
    }
  }, {
    key: "getNavigationClass",
    value: function getNavigationClass() {
      return 'gc-navigation';
    }
  }, {
    key: "getNavigationPrevClass",
    value: function getNavigationPrevClass() {
      return 'gc-navigation-prev';
    }
  }, {
    key: "getNavigationNextClass",
    value: function getNavigationNextClass() {
      return 'gc-navigation-next';
    }
  }, {
    key: "getCloseClass",
    value: function getCloseClass() {
      return 'gc-close';
    }
  }, {
    key: "getPaginationLayerClass",
    value: function getPaginationLayerClass() {
      return 'gc-pagination';
    }
  }, {
    key: "getPaginationItemClass",
    value: function getPaginationItemClass() {
      return 'gc-pagination-item';
    }
  }, {
    key: "getPaginationCurrentItemClass",
    value: function getPaginationCurrentItemClass() {
      return 'gc-pagination-active';
    }
  }, {
    key: "getProgressbarClass",
    value: function getProgressbarClass() {
      return 'gc-progressbar';
    }
  }, {
    key: "getDisableInteractionClass",
    value: function getDisableInteractionClass() {
      return 'gc-disable';
    }
  }, {
    key: "getCopyrightClass",
    value: function getCopyrightClass() {
      return 'gc-copyright';
    }
  }, {
    key: "getHiddenClass",
    value: function getHiddenClass() {
      return 'gc-hidden';
    }
  }, {
    key: "getRelativePositionClass",
    value: function getRelativePositionClass() {
      return 'gc-relative';
    }
    /**
     * Get element offset
     * @param el
     * @return {{top: number, left: number, width: number, height: number}}
     */

  }, {
    key: "getElementOffset",
    value: function getElementOffset(el) {
      var _document = document,
          body = _document.body,
          documentElement = _document.documentElement;
      var scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft;

      var _el$getBoundingClient4 = el.getBoundingClientRect(),
          width = _el$getBoundingClient4.width,
          height = _el$getBoundingClient4.height,
          top = _el$getBoundingClient4.top,
          left = _el$getBoundingClient4.left;

      return {
        width: width,
        height: height,
        top: top + scrollTop,
        left: left + scrollLeft
      };
    }
    /**
     * Check if el or his parent has fixed position
     * @param el
     * @return {boolean}
     */

  }, {
    key: "isElementFixed",
    value: function isElementFixed(el) {
      var parentNode = el.parentNode;

      if (!parentNode || parentNode.nodeName === 'HTML') {
        return false;
      }

      var elStyle = getComputedStyle(el);

      if (elStyle.getPropertyValue('position') === 'fixed') {
        return true;
      }

      return this.isElementFixed(parentNode);
    }
    /**
     * Add class to el
     * @param el
     * @param className
     */

  }, {
    key: "addElementClass",
    value: function addElementClass(el, className) {
      if (el instanceof SVGElement) {
        el.setAttribute('class', "".concat(el.getAttribute('class') || '', " ").concat(className));
        return;
      }

      el.classList.add(className);
    }
    /**
     * Remove class from el
     * @param el
     * @param className
     */

  }, {
    key: "removeElementClass",
    value: function removeElementClass(el, className) {
      if (el instanceof SVGElement) {
        var classes = el.getAttribute('class') || '';
        classes.replace(className, '');
        el.setAttribute('class', classes);
        return;
      }

      el.classList.remove(className);
    }
  }]);
  return GuideChimp;
}();

exports.default = GuideChimp;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(10);

var iterableToArray = __webpack_require__(11);

var nonIterableSpread = __webpack_require__(12);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=guidechimp.js.map