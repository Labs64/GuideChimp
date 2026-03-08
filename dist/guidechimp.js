/*! GuideChimp v5.0.0 | Copyright (C) 2026 Labs64 GmbH */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GuideChimp"] = factory();
	else
		root["GuideChimp"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4823:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(4756));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(5715));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(1132));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(9293));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));
var _createClass2 = _interopRequireDefault(__webpack_require__(4579));
var _uniqueId2 = _interopRequireDefault(__webpack_require__(7200));
var _isFunction2 = _interopRequireDefault(__webpack_require__(1882));
var _merge2 = _interopRequireDefault(__webpack_require__(5364));
var _isHtmlElement = _interopRequireDefault(__webpack_require__(5135));
var _overlay = _interopRequireDefault(__webpack_require__(8534));
var _preloader = _interopRequireDefault(__webpack_require__(4576));
var _interaction = _interopRequireDefault(__webpack_require__(3534));
var _control = _interopRequireDefault(__webpack_require__(3783));
var _tooltip = _interopRequireDefault(__webpack_require__(7137));
var _progressbar = _interopRequireDefault(__webpack_require__(3566));
var _title = _interopRequireDefault(__webpack_require__(804));
var _description = _interopRequireDefault(__webpack_require__(1920));
var _customButtons = _interopRequireDefault(__webpack_require__(4290));
var _previous2 = _interopRequireDefault(__webpack_require__(7869));
var _pagination = _interopRequireDefault(__webpack_require__(2880));
var _next2 = _interopRequireDefault(__webpack_require__(9289));
var _close = _interopRequireDefault(__webpack_require__(8126));
var _copyright = _interopRequireDefault(__webpack_require__(4531));
var _notification = _interopRequireDefault(__webpack_require__(4175));
var _fakeStep = _interopRequireDefault(__webpack_require__(2411));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable class-methods-use-this */ /**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */ /**
 * Lodash functions
 * @see https://lodash.com/docs
 */ // utils
// templates
var GuideChimp = exports["default"] = /*#__PURE__*/function () {
  /**
   * GuideChimp constructor
   * @param tour
   * @param options
   */
  function GuideChimp(tour) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, GuideChimp);
    Object.defineProperty(this, 'uid', {
      value: (0, _uniqueId2.default)(),
      enumerable: false,
      configurable: false,
      writable: false
    });
    this.setDefaults();
    this.cache = new Map();
    this.listeners = {};
    this.observers = {};
    this.options = {};
    this.setOptions(options);
    this.tour = null;
    this.setTour(tour);
    this.notifications = [];
    this.elements = new Map();
    this.init();
  }

  /**
   * Called after construction, this hook allows you to add some extra setup
   * logic without having to override the constructor.
   */
  return (0, _createClass2.default)(GuideChimp, [{
    key: "init",
    value: function init() {}

    /**
     * Default options
     * @return {Object}
     */
  }, {
    key: "setDefaults",
    value: function setDefaults() {
      this.previousStep = null;
      this.currentStep = null;
      this.nextStep = null;
      this.fromStep = null;
      this.toStep = null;
      this.previousStepIndex = -1;
      this.currentStepIndex = -1;
      this.nextStepIndex = -1;
      this.fromStepIndex = -1;
      this.toStepIndex = -1;
      this.steps = [];
      this.isDisplayed = false;
      return this;
    }

    /**
     * Set tour name or steps
     * @param tour
     * @return {this}
     */
  }, {
    key: "setTour",
    value: function setTour(tour) {
      this.tour = tour;
      return this;
    }

    /**
     * Get tour name or steps
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
      this.options = (0, _merge2.default)(this.constructor.getDefaultOptions(), options);
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
     * @param number step number, or it indexes
     * @param useIndex whether to use step number or index
     * @return {Promise<boolean>}
     */
  }, {
    key: "start",
    value: (function () {
      var _start = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
        var number,
          useIndex,
          _len,
          args,
          _key,
          isStarted,
          _args = arguments;
        return _regenerator.default.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              number = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
              useIndex = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
              this.isDisplayed = true;
              this.mountOverlayEl();
              this.startPreloader();

              // emit start event
              for (_len = _args.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = _args[_key];
              }
              _context.next = 1;
              return this.emit.apply(this, ['onStart'].concat(args));
            case 1:
              this.stopPreloader();
              if (!(!this.tour || !this.tour.length)) {
                _context.next = 2;
                break;
              }
              this.removeOverlayEl();
              this.isDisplayed = false;
              return _context.abrupt("return", false);
            case 2:
              this.steps = this.sortSteps(this.getSteps(this.tour));
              if (this.steps.length) {
                _context.next = 3;
                break;
              }
              this.removeOverlayEl();
              this.isDisplayed = false;
              return _context.abrupt("return", false);
            case 3:
              // add a class that increase the specificity of the classes
              document.body.classList.add(this.constructor.getBodyClass());
              _context.next = 4;
              return this.go.apply(this, [number, useIndex].concat(args));
            case 4:
              isStarted = _context.sent;
              this.isDisplayed = isStarted;
              document.body.classList.toggle(this.constructor.getBodyClass(), isStarted);
              if (isStarted) {
                // turn on keyboard navigation
                if (this.options.useKeyboard) {
                  this.addOnKeydownListener();
                }

                // on window resize
                this.addOnWindowResizeListener();

                // on window scroll
                this.addOnWindowScrollListener();
              }
              return _context.abrupt("return", isStarted);
            case 5:
            case "end":
              return _context.stop();
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
     * @param number step number, or it indexes
     * @param useIndex whether to use step number or index
     * @param args
     * @return {Promise<boolean>}
     */
    )
  }, {
    key: "go",
    value: (function () {
      var _go = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(number) {
        var _this = this;
        var useIndex,
          _len2,
          args,
          _key2,
          stepNumber,
          isSameStep,
          fromStep,
          fromStepIndex,
          currentStep,
          currentStepIndex,
          toStep,
          toStepIndex,
          onBeforeChange,
          onAfterChange,
          abort,
          scrollBehavior,
          _this$currentStep$scr,
          scrollPadding,
          _args2 = arguments,
          _t;
        return _regenerator.default.wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              useIndex = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
              for (_len2 = _args2.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                args[_key2 - 2] = _args2[_key2];
              }
              if (!(!this.isDisplayed || !this.steps.length)) {
                _context2.next = 1;
                break;
              }
              return _context2.abrupt("return", false);
            case 1:
              stepNumber = useIndex ? parseInt(number, 10) : number;
              if (!this.currentStep) {
                _context2.next = 2;
                break;
              }
              // skip if this step is already displayed
              isSameStep = useIndex ? this.currentStepIndex === stepNumber : this.currentStep.step === stepNumber;
              if (!isSameStep) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", false);
            case 2:
              fromStep = this.currentStep;
              fromStepIndex = this.currentStepIndex;
              currentStep = useIndex ? this.steps[stepNumber] : this.steps.filter(function (_ref) {
                var step = _ref.step;
                return step === stepNumber;
              })[0];
              if (currentStep) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return", false);
            case 3:
              currentStepIndex = this.steps.indexOf(currentStep);
              toStep = currentStep;
              toStepIndex = currentStepIndex;
              onBeforeChange = toStep.onBeforeChange, onAfterChange = toStep.onAfterChange;
              this.startPreloader();
              abort = false;
              if (!onBeforeChange) {
                _context2.next = 5;
                break;
              }
              _context2.next = 4;
              return Promise.resolve().then(function () {
                return onBeforeChange.call.apply(onBeforeChange, [_this, toStep, fromStep].concat(args));
              });
            case 4:
              _t = _context2.sent;
              if (!(_t === false)) {
                _context2.next = 5;
                break;
              }
              abort = true;
            case 5:
              _context2.next = 6;
              return this.emit.apply(this, ['onBeforeChange', toStep, fromStep].concat(args));
            case 6:
              if (!_context2.sent.some(function (r) {
                return r === false;
              })) {
                _context2.next = 7;
                break;
              }
              abort = true;
            case 7:
              this.stopPreloader();
              if (!abort) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return", false);
            case 8:
              this.beforeChangeStep({
                toStep: toStep,
                toStepIndex: toStepIndex,
                currentStep: currentStep,
                currentStepIndex: currentStepIndex,
                fromStep: fromStep,
                fromStepIndex: fromStepIndex
              });
              this.toStep = toStep;
              this.toStepIndex = toStepIndex;
              this.currentStep = currentStep;
              this.currentStepIndex = currentStepIndex;
              this.fromStep = fromStep;
              this.fromStepIndex = fromStepIndex;
              this.previousStep = this.steps[this.currentStepIndex - 1] || null;
              this.previousStepIndex = this.previousStep ? this.currentStepIndex - 1 : -1;
              this.nextStep = this.steps[this.currentStepIndex + 1] || null;
              this.nextStepIndex = this.nextStep ? this.currentStepIndex + 1 : -1;
              scrollBehavior = this.options.scrollBehavior;
              _this$currentStep$scr = this.currentStep.scrollPadding, scrollPadding = _this$currentStep$scr === void 0 ? this.options.scrollPadding : _this$currentStep$scr; // scroll to element
              this.scrollParentsToStepEl();
              this.scrollTo(this.getStepEl(this.currentStep, true), scrollBehavior, scrollPadding);
              this.mountStep();
              setTimeout(function () {
                if (_this.getEl('tooltip')) {
                  _this.scrollTo(_this.getEl('tooltip'), scrollBehavior, scrollPadding);
                }
              }, 300);
              if (onAfterChange) {
                onAfterChange.call.apply(onAfterChange, [this, this.toStep, this.fromStep].concat(args));
              }
              this.emit.apply(this, ['onAfterChange', this.toStep, this.fromStep].concat(args));
              return _context2.abrupt("return", true);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function go(_x) {
        return _go.apply(this, arguments);
      }
      return go;
    }())
  }, {
    key: "previous",
    value: function () {
      var _previous = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this2 = this;
        var _len3,
          args,
          _key3,
          onPrevious,
          _args3 = arguments,
          _t2;
        return _regenerator.default.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              for (_len3 = _args3.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = _args3[_key3];
              }
              if (!(!this.isDisplayed || !this.currentStep || !this.previousStep)) {
                _context3.next = 1;
                break;
              }
              return _context3.abrupt("return", false);
            case 1:
              onPrevious = this.currentStep.onPrevious;
              this.startPreloader();
              if (!onPrevious) {
                _context3.next = 3;
                break;
              }
              _context3.next = 2;
              return Promise.resolve().then(function () {
                return onPrevious.call.apply(onPrevious, [_this2, _this2.previousStep, _this2.currentStep].concat(args));
              });
            case 2:
              _t2 = _context3.sent;
              if (!(_t2 === false)) {
                _context3.next = 3;
                break;
              }
              this.stopPreloader();
              return _context3.abrupt("return", false);
            case 3:
              _context3.next = 4;
              return this.emit.apply(this, ['onPrevious', this.previousStep, this.currentStep].concat(args));
            case 4:
              if (!_context3.sent.some(function (r) {
                return r === false;
              })) {
                _context3.next = 5;
                break;
              }
              this.stopPreloader();
              return _context3.abrupt("return", false);
            case 5:
              this.stopPreloader();
              return _context3.abrupt("return", this.go.apply(this, [this.previousStepIndex, true].concat(args)));
            case 6:
            case "end":
              return _context3.stop();
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
      var _next = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this3 = this;
        var _len4,
          args,
          _key4,
          onNext,
          _args4 = arguments,
          _t3;
        return _regenerator.default.wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              for (_len4 = _args4.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = _args4[_key4];
              }
              if (!(!this.isDisplayed || !this.currentStep || !this.nextStep)) {
                _context4.next = 1;
                break;
              }
              return _context4.abrupt("return", false);
            case 1:
              onNext = this.currentStep.onNext;
              this.startPreloader();
              if (!onNext) {
                _context4.next = 3;
                break;
              }
              _context4.next = 2;
              return Promise.resolve().then(function () {
                return onNext.call.apply(onNext, [_this3, _this3.nextStep, _this3.currentStep].concat(args));
              });
            case 2:
              _t3 = _context4.sent;
              if (!(_t3 === false)) {
                _context4.next = 3;
                break;
              }
              this.stopPreloader();
              return _context4.abrupt("return", false);
            case 3:
              _context4.next = 4;
              return this.emit.apply(this, ['onNext', this.nextStep, this.currentStep].concat(args));
            case 4:
              if (!_context4.sent.some(function (r) {
                return r === false;
              })) {
                _context4.next = 5;
                break;
              }
              this.stopPreloader();
              return _context4.abrupt("return", false);
            case 5:
              this.stopPreloader();
              return _context4.abrupt("return", this.go.apply(this, [this.nextStepIndex, true].concat(args)));
            case 6:
            case "end":
              return _context4.stop();
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
      var _stop = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _len5,
          args,
          _key5,
          _args5 = arguments;
        return _regenerator.default.wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (this.isDisplayed) {
                _context5.next = 1;
                break;
              }
              return _context5.abrupt("return", this);
            case 1:
              for (_len5 = _args5.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = _args5[_key5];
              }
              if (!(this.currentStepIndex === this.steps.length - 1)) {
                _context5.next = 3;
                break;
              }
              this.startPreloader();
              _context5.next = 2;
              return this.emit.apply(this, ['onComplete'].concat(args));
            case 2:
              this.stopPreloader();
            case 3:
              this.startPreloader();

              // emit stop event
              _context5.next = 4;
              return this.emit.apply(this, ['onStop'].concat(args));
            case 4:
              this.stopPreloader();

              // remove the class that increase the specificity of the classes
              document.body.classList.remove(this.constructor.getBodyClass());

              // remove events listeners
              this.removeListeners();

              // disconnect observers
              this.unobserveStep();

              // remove all layers and keys
              this.unmountStep();

              // remove overlay
              this.removeOverlayEl();
              this.cache.clear();
              this.elements.clear();

              // set step variables to defaults
              this.setDefaults();
              return _context5.abrupt("return", this);
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function stop() {
        return _stop.apply(this, arguments);
      }
      return stop;
    }()
  }, {
    key: "getSteps",
    value: function getSteps(tour) {
      if (!tour || !tour.length) {
        return [];
      }
      return typeof tour === 'string' ? this.getDataSteps(tour) : this.getJsSteps(tour);
    }
  }, {
    key: "getDataSteps",
    value: function getDataSteps(tour) {
      var _this4 = this;
      var dataPrefix = 'data-guidechimp';
      var tourStepsEl = Array.from(document.querySelectorAll("[".concat(dataPrefix, "-tour*='").concat(tour, "']")));

      // filter steps by tour name
      tourStepsEl = tourStepsEl.filter(function (v) {
        var tours = v.getAttribute("".concat(dataPrefix, "-tour")).split(',');
        return tours.includes(_this4.tour);
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
        return _objectSpread(_objectSpread({
          step: i,
          title: '',
          description: '',
          position: _this4.options.position,
          interaction: _this4.options.interaction
        }, stepAttrs), {}, {
          element: el
        });
      });
    }
  }, {
    key: "getJsSteps",
    value: function getJsSteps(tour) {
      return tour.map(function (v, i) {
        return _objectSpread(_objectSpread({}, v), {}, {
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
    key: "getStepEl",
    value: function getStepEl(step) {
      var _ref2 = step || {},
        element = _ref2.element;
      if (!element) {
        return this.mountFakeStepEl();
      }
      var getEl = function getEl(selector) {
        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        return el || def;
      };
      var el = getEl(element);
      if (!el || el.style.display === 'none' || el.style.visibility === 'hidden') {
        el = this.getEl('fakeStep') ? this.getEl('fakeStep') : this.mountFakeStepEl();
      }
      return el;
    }
  }, {
    key: "scrollParentsToStepEl",
    value: function scrollParentsToStepEl() {
      var _this$currentStep$scr2 = this.currentStep.scrollPadding,
        scrollPadding = _this$currentStep$scr2 === void 0 ? this.options.scrollPadding : _this$currentStep$scr2;
      return this.scrollParentsToEl(this.getStepEl(this.currentStep), scrollPadding);
    }
  }, {
    key: "getScrollableParentsEls",
    value: function getScrollableParentsEls(el) {
      var parents = [];
      var htmlEl = el;
      while (htmlEl && htmlEl !== htmlEl.ownerDocument.body) {
        htmlEl = this.getScrollableParentEl(htmlEl);
        parents.push(htmlEl);
      }
      return parents;
    }
  }, {
    key: "getScrollableParentEl",
    value: function getScrollableParentEl(el) {
      var regex = /(auto|scroll)/;
      var elStyle = getComputedStyle(el);
      var elDocument = el.ownerDocument;
      var _getClosestScrollableParent = function getClosestScrollableParent(parent) {
        if (!parent || parent === elDocument.body) {
          return elDocument.body;
        }
        var parentStyle = getComputedStyle(parent);
        if (elStyle.getPropertyValue('position') === 'fixed' && parentStyle.getPropertyValue('position') === 'static') {
          return _getClosestScrollableParent(parent.parentElement);
        }
        var overflowX = parentStyle.getPropertyValue('overflow-x');
        var overflowY = parentStyle.getPropertyValue('overflow-y');
        if (regex.test(overflowX) || regex.test(overflowY)) {
          return parent;
        }
        return _getClosestScrollableParent(parent.parentElement);
      };
      return elStyle.getPropertyValue('position') === 'fixed' ? elDocument.body : _getClosestScrollableParent(el.parentElement);
    }
  }, {
    key: "scrollParentsToEl",
    value: function scrollParentsToEl(el) {
      var scrollPadding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // get all scrollable parents
      var parents = this.getScrollableParentsEls(el);
      parents.forEach(function (parent) {
        if (parent !== document.body) {
          // eslint-disable-next-line no-param-reassign
          parent.scrollTop = el.offsetTop - parent.offsetTop - scrollPadding;
          // eslint-disable-next-line no-param-reassign
          parent.scrollLeft = el.offsetLeft - parent.offsetLeft - scrollPadding;
        }
      });
      return this;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(el) {
      var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
      var scrollPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var _el$getBoundingClient = el.getBoundingClientRect(),
        top = _el$getBoundingClient.top,
        bottom = _el$getBoundingClient.bottom,
        left = _el$getBoundingClient.left,
        right = _el$getBoundingClient.right;
      var _window = window,
        innerWidth = _window.innerWidth,
        innerHeight = _window.innerHeight;
      if (!(left >= 0 && right <= innerWidth)) {
        window.scrollBy({
          behavior: behavior,
          left: left - scrollPadding
        });
      }
      if (!(top >= 0 && bottom <= innerHeight)) {
        window.scrollBy({
          behavior: behavior,
          top: top - scrollPadding
        });
      }
      return this;
    }
  }, {
    key: "highlightStepEl",
    value: function highlightStepEl() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var el = this.getStepEl(this.currentStep);
      var overlay = this.getEl('overlay');
      if (overlay) {
        var path = overlay.querySelector('path');
        var animate = path.querySelector('animate');
        var isCurrentElFake = this.isEl(el, 'fakeStep');
        var to = isCurrentElFake ? this.getOverlayDocumentPath() : this.getOverlayStepPath(this.currentStep);
        path.setAttribute('d', to);
        if (animate) {
          var lock = animate.getAttribute('lock');
          if (!lock) {
            animate.setAttribute('from', to);
            animate.setAttribute('to', to);
          }
          if (animation) {
            var isFromElFake = this.isEl(this.getStepEl(this.fromStep), 'fakeStep');
            var from = this.fromStep && !isFromElFake && !isCurrentElFake ? this.getOverlayStepPath(this.fromStep) : null;
            if (from) {
              animate.setAttribute('from', from);
              animate.setAttribute('to', to);
            }
            animate.setAttribute('lock', 'true');
          }
          animate.onend = function () {
            animate.removeAttribute('lock');
          };
          animate.beginElement();
        }
      }
      var elStyle = getComputedStyle(el);
      if (!['absolute', 'relative', 'fixed'].includes(elStyle.getPropertyValue('position'))) {
        el.classList.add(this.constructor.getRelativePositionClass());
      }
      el.classList.add(this.constructor.getHighlightClass());
      el.setAttribute("data-guidechimp-".concat(this.uid), 'highlight');
      this.elements.set('highlight', el);
      return this;
    }
  }, {
    key: "resetHighlightStepEl",
    value: function resetHighlightStepEl() {
      var overlay = this.getEl('overlay');
      if (overlay) {
        var path = overlay.querySelector('path');
        var animate = overlay.querySelector('animate');
        path.setAttribute('d', this.getOverlayDocumentPath());
        if (animate) {
          animate.removeAttribute('from');
          animate.removeAttribute('to');
        }
      }
      var el = this.getStepEl(this.currentStep);
      el.classList.remove(this.constructor.getRelativePositionClass());
      el.classList.remove(this.constructor.getHighlightClass());
      el.removeAttribute("data-guidechimp-".concat(this.uid));
      this.elements.delete('highlight');
      return this;
    }
  }, {
    key: "setInteractionPosition",
    value: function setInteractionPosition(interactionEl) {
      var el = this.getStepEl(this.currentStep);
      if (!interactionEl || !el) {
        return this;
      }
      var padding = this.options.padding;
      var elStyle = getComputedStyle(el);
      if (elStyle.getPropertyValue('position') === 'floating') {
        padding = 0;
      }
      var _this$constructor$get = this.constructor.getOffset(el),
        width = _this$constructor$get.width,
        height = _this$constructor$get.height,
        top = _this$constructor$get.top,
        left = _this$constructor$get.left;
      interactionEl.classList.toggle(this.constructor.getFixedClass(), this.constructor.isFixed(el));
      var style = interactionEl.style;

      // set new position
      style.cssText = "width: ".concat(width + padding, "px;\n        height: ").concat(height + padding, "px;\n        top: ").concat(top - padding / 2, "px;\n        left: ").concat(left - padding / 2, "px;");
      return this;
    }
  }, {
    key: "setControlPosition",
    value: function setControlPosition(controlEl) {
      var el = this.getStepEl(this.currentStep);
      if (!controlEl || !el) {
        return this;
      }
      var padding = this.options.padding;
      var elStyle = getComputedStyle(el);
      if (elStyle.getPropertyValue('position') === 'floating') {
        padding = 0;
      }
      var scrollX = el.ownerDocument.defaultView.scrollX;
      var _el$ownerDocument$doc = el.ownerDocument.documentElement.getBoundingClientRect(),
        docElWidth = _el$ownerDocument$doc.width;
      var _this$constructor$get2 = this.constructor.getOffset(el),
        elHeight = _this$constructor$get2.height,
        elTop = _this$constructor$get2.top,
        elLeft = _this$constructor$get2.left,
        elRight = _this$constructor$get2.right;
      var height = elHeight + padding;
      var top = elTop - padding / 2;
      var left = scrollX < scrollX + (elLeft - padding / 2) ? scrollX : elLeft - padding / 2;
      var width = scrollX + docElWidth > scrollX + (elRight + padding / 2) ? docElWidth : elRight + padding / 2;
      controlEl.classList.toggle(this.constructor.getFixedClass(), this.constructor.isFixed(el));
      var style = controlEl.style;

      // set new position
      style.cssText = "width: ".concat(width, "px;\n        height: ").concat(height, "px;\n        top: ").concat(top, "px;\n        left: ").concat(left, "px;");
      return this;
    }
  }, {
    key: "setTooltipPosition",
    value: function setTooltipPosition(tooltipEl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.currentStep) {
        return this;
      }
      var el = this.getStepEl(this.currentStep);
      if (!tooltipEl || !el) {
        return this;
      }
      var boundary = options.boundary,
        pos = options.position;
      var padding = this.options.padding;
      boundary = boundary || window;
      pos = pos || this.currentStep.position;
      pos = pos || this.options.position;
      var _pos$split = pos.split('-'),
        _pos$split2 = (0, _slicedToArray2.default)(_pos$split, 2),
        position = _pos$split2[0],
        alignment = _pos$split2[1];
      var elStyle = getComputedStyle(el);
      if (elStyle.getPropertyValue('position') === 'floating') {
        padding = 0;
      }
      var tooltipStyle = tooltipEl.style;

      // reset tooltip styles
      tooltipStyle.top = null;
      tooltipStyle.right = null;
      tooltipStyle.bottom = null;
      tooltipStyle.left = null;
      tooltipStyle.transform = null;
      var _el$getBoundingClient2 = el.getBoundingClientRect(),
        elTop = _el$getBoundingClient2.top,
        elBottom = _el$getBoundingClient2.bottom,
        elLeft = _el$getBoundingClient2.left,
        elRight = _el$getBoundingClient2.right,
        elWidth = _el$getBoundingClient2.width,
        elHeight = _el$getBoundingClient2.height;
      var _tooltipEl$getBoundin = tooltipEl.getBoundingClientRect(),
        tooltipHeight = _tooltipEl$getBoundin.height,
        tooltipWith = _tooltipEl$getBoundin.width;

      // find out min tooltip width
      var cloneTooltip = tooltipEl.cloneNode(true);
      cloneTooltip.style.visibility = 'hidden';
      cloneTooltip.innerHTML = '';
      tooltipEl.parentElement.appendChild(cloneTooltip);
      var _cloneTooltip$getBoun = cloneTooltip.getBoundingClientRect(),
        minTooltipWidth = _cloneTooltip$getBoun.width;
      cloneTooltip.parentElement.removeChild(cloneTooltip);
      var boundaryRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
      if (!(boundary instanceof Window)) {
        var _boundary$getBounding = boundary.getBoundingClientRect(),
          x = _boundary$getBounding.x,
          y = _boundary$getBounding.y;
        boundaryRect = new DOMRect(x, y, boundary.scrollWidth, boundary.scrollHeight);
      }
      var _boundaryRect = boundaryRect,
        boundaryTop = _boundaryRect.top,
        boundaryBottom = _boundaryRect.bottom,
        boundaryLeft = _boundaryRect.left,
        boundaryRight = _boundaryRect.right;

      // if the element is default element, skip position and alignment calculation
      if (this.isEl(el, 'fakeStep')) {
        position = 'floating';
      } else {
        // calculate position
        var positions = ['bottom', 'right', 'left', 'top'];
        var _getComputedStyle = getComputedStyle(tooltipEl),
          tooltipMarginTop = _getComputedStyle.marginTop,
          tooltipMarginLeft = _getComputedStyle.marginLeft,
          tooltipMarginRight = _getComputedStyle.marginRight,
          tooltipMarginBottom = _getComputedStyle.marginBottom;
        tooltipMarginTop = parseInt(tooltipMarginTop, 10);
        tooltipMarginLeft = parseInt(tooltipMarginLeft, 10);
        tooltipMarginRight = parseInt(tooltipMarginRight, 10);
        tooltipMarginBottom = parseInt(tooltipMarginBottom, 10);

        // check if the tooltip can be placed on top
        if (tooltipHeight + tooltipMarginTop + tooltipMarginBottom > elTop - boundaryTop) {
          positions.splice(positions.indexOf('top'), 1);
        }

        // check if the tooltip can be placed on bottom
        if (tooltipHeight + tooltipMarginTop + tooltipMarginBottom > boundaryBottom - elBottom) {
          positions.splice(positions.indexOf('bottom'), 1);
        }

        // check if the tooltip can be placed on left
        if (minTooltipWidth + tooltipMarginLeft + tooltipMarginRight > elLeft - boundaryLeft) {
          positions.splice(positions.indexOf('left'), 1);
        }

        // check if the tooltip can be placed on right
        if (minTooltipWidth + tooltipMarginLeft + tooltipMarginRight > boundaryRight - elRight) {
          positions.splice(positions.indexOf('right'), 1);
        }
        if (positions.length) {
          position = positions.includes(position) ? position : positions[0];
        } else {
          position = 'floating';
        }
        if (position === 'top' || position === 'bottom') {
          var alignments = ['left', 'right', 'middle'];

          // valid left space must be at least tooltip width
          if (boundaryRight - elLeft < minTooltipWidth) {
            alignments.splice(alignments.indexOf('left'), 1);
          }

          // valid right space must be at least tooltip width
          if (elRight - boundaryLeft < minTooltipWidth) {
            alignments.splice(alignments.indexOf('right'), 1);
          }

          // valid middle space must be at least half width from both sides
          if (elLeft + elWidth / 2 - boundaryLeft < minTooltipWidth / 2 || boundaryRight - (elRight - elWidth / 2) < minTooltipWidth / 2) {
            alignments.splice(alignments.indexOf('middle'), 1);
          }
          if (alignments.length) {
            alignment = alignments.includes(alignment) ? alignment : alignments[0];
          } else {
            alignment = 'middle';
          }
        }
      }
      tooltipEl.setAttribute('data-guidechimp-position', position);
      var root = document.documentElement;
      switch (position) {
        case 'top':
          tooltipStyle.bottom = "".concat(elHeight + padding, "px");
          break;
        case 'right':
          tooltipStyle.left = "".concat(elRight + padding / 2 - root.clientLeft, "px");
          break;
        case 'left':
          tooltipStyle.right = "".concat(root.clientWidth - (elLeft - padding / 2), "px");
          break;
        case 'bottom':
          tooltipStyle.top = "".concat(elHeight + padding, "px");
          break;
        default:
          {
            tooltipStyle.left = '50%';
            tooltipStyle.top = '50%';
            tooltipStyle.transform = 'translate(-50%,-50%)';
          }
      }
      tooltipEl.removeAttribute('data-guidechimp-alignment');
      if (alignment) {
        tooltipEl.setAttribute('data-guidechimp-alignment', alignment);
        switch (alignment) {
          case 'left':
            {
              tooltipStyle.left = "".concat(elLeft - padding / 2, "px");
              break;
            }
          case 'right':
            {
              tooltipStyle.right = "".concat(root.clientWidth - elRight - padding / 2, "px");
              break;
            }
          default:
            {
              if (elLeft + elWidth / 2 < tooltipWith / 2 || elLeft + elWidth / 2 + tooltipWith / 2 > root.clientWidth) {
                tooltipStyle.left = "".concat(root.clientWidth / 2 - tooltipWith / 2, "px");
              } else {
                tooltipStyle.left = "".concat(elLeft + elWidth / 2 - tooltipWith / 2, "px");
              }
            }
        }
      }
      return this;
    }
  }, {
    key: "startPreloader",
    value: function startPreloader() {
      document.body.classList.add(this.constructor.getLoadingClass());
      var overlay = this.getEl('overlay');
      if (overlay) {
        var path = overlay.querySelector('path');
        var animate = overlay.querySelector('animate');
        var preloaderCache = new Map();
        preloaderCache.set('d', path.getAttribute('d'));
        path.setAttribute('d', this.getOverlayDocumentPath());
        if (animate) {
          preloaderCache.set('from', animate.getAttribute('from'));
          preloaderCache.set('to', animate.getAttribute('to'));
          animate.removeAttribute('from');
          animate.removeAttribute('to');
        }
        this.cache.set('preloaderCache', preloaderCache);
      }
      var preloader = this.mountPreloaderEl();
      preloader.hidden = true;
      setTimeout(function () {
        preloader.hidden = false;
      }, 100);
      return this;
    }
  }, {
    key: "stopPreloader",
    value: function stopPreloader() {
      document.body.classList.remove(this.constructor.getLoadingClass());
      var overlay = this.getEl('overlay');
      if (overlay) {
        var path = overlay.querySelector('path');
        var animate = overlay.querySelector('animate');
        var preloaderCache = this.cache.get('preloaderCache') || new Map();
        if (preloaderCache.has('d')) {
          path.setAttribute('d', preloaderCache.get('d'));
        }
        if (animate) {
          if (preloaderCache.has('from')) {
            animate.setAttribute('from', preloaderCache.get('from'));
          }
          if (preloaderCache.has('to')) {
            animate.setAttribute('to', preloaderCache.get('to'));
          }
        }
        this.cache.delete('preloaderCache');
      }
      this.removePreloaderEl();
      return this;
    }
  }, {
    key: "getDefaultTmplData",
    value: function getDefaultTmplData() {
      var _this5 = this;
      return {
        previousStep: this.previousStep,
        currentStep: this.currentStep,
        nextStep: this.nextStep,
        fromStep: this.fromStep,
        toStep: this.toStep,
        previousStepIndex: this.previousStepIndex,
        currentStepIndex: this.currentStepIndex,
        nextStepIndex: this.nextStepIndex,
        fromStepIndex: this.fromStepIndex,
        toStepIndex: this.toStepIndex,
        steps: this.steps,
        go: function go() {
          return _this5.go.apply(_this5, arguments);
        },
        previous: function previous() {
          return _this5.previous.apply(_this5, arguments);
        },
        next: function next() {
          return _this5.next.apply(_this5, arguments);
        },
        stop: function stop() {
          return _this5.stop.apply(_this5, arguments);
        }
      };
    }
  }, {
    key: "mountStep",
    value: function mountStep() {
      var interactionEl = this.mountInteractionEl();
      var controlEl = this.mountControlEl();
      this.setInteractionPosition(interactionEl);
      this.setControlPosition(controlEl);
      this.setTooltipPosition(this.getEl('tooltip'));
      this.observeStep();
      this.highlightStepEl(true);
      return this;
    }
  }, {
    key: "unmountStep",
    value: function unmountStep() {
      this.resetHighlightStepEl();
      this.removeInteractionEl();
      this.removeControlEl();
      this.removePreloaderEl();
      this.removeFakeStepEl();
      return this;
    }
  }, {
    key: "createEl",
    value: function createEl(name, tmpl) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!tmpl || !(0, _isFunction2.default)(tmpl)) {
        throw Error("\"".concat(name, "\" template is missing or is not a function, \n            please check your templates.").concat(name, " option"));
      }
      var el = tmpl.call(this, data);
      if (el) {
        el.setAttribute("data-quidechimp-".concat(this.uid), name);
      }
      return el;
    }
  }, {
    key: "getEl",
    value: function getEl(key) {
      var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var el = this.elements.get(key);
      if (!el) {
        el = document.querySelector("[data-quidechimp-".concat(this.uid, "=\"").concat(key, "\"]"));
      }
      return el || def;
    }
  }, {
    key: "mountEl",
    value: function mountEl(el, parent) {
      var _this6 = this;
      if (el) {
        var els = el.querySelectorAll("[data-quidechimp-".concat(this.uid, "]"));
        [el].concat((0, _toConsumableArray2.default)(els)).forEach(function (v) {
          var key = v.getAttribute("data-quidechimp-".concat(_this6.uid));
          if (key) {
            _this6.removeEl(key);
            _this6.elements.set(key, v);
          }
        });
        parent.appendChild(el);
      }
      return el;
    }
  }, {
    key: "removeEl",
    value: function removeEl(key) {
      var el = this.getEl(key);
      if (el) {
        el.parentElement.removeChild(el);
      }
      this.elements.delete(key);
      return this;
    }
  }, {
    key: "isEl",
    value: function isEl(el, key) {
      return this.getEl(key) ? el === this.getEl(key) : el.getAttribute("data-quidechimp-".concat(this.uid)) === key;
    }
  }, {
    key: "createFakeStepEl",
    value: function createFakeStepEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.createEl('fakeStep', this.options.templates.fakeStep, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), data));
    }
  }, {
    key: "mountFakeStepEl",
    value: function mountFakeStepEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.mountEl(this.createFakeStepEl(data), document.body);
    }
  }, {
    key: "removeFakeStepEl",
    value: function removeFakeStepEl() {
      return this.removeEl('fakeStep');
    }
  }, {
    key: "createPreloaderEl",
    value: function createPreloaderEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.createEl('preloader', this.options.templates.preloader, data);
    }
  }, {
    key: "mountPreloaderEl",
    value: function mountPreloaderEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.mountEl(this.createPreloaderEl(data), document.body);
    }
  }, {
    key: "removePreloaderEl",
    value: function removePreloaderEl() {
      return this.removeEl('preloader');
    }
  }, {
    key: "getOverlayDocumentPath",
    value: function getOverlayDocumentPath() {
      var _window2 = window,
        innerWidth = _window2.innerWidth,
        innerHeight = _window2.innerHeight;
      var _document = document,
        _document$body = _document.body,
        scrollWidth = _document$body.scrollWidth,
        scrollHeight = _document$body.scrollHeight;
      var width = innerWidth > scrollWidth ? innerWidth : scrollWidth;
      var height = innerHeight > scrollHeight ? innerHeight : scrollHeight;
      return "M 0 0 H ".concat(width, " V ").concat(height, " H 0 V 0 Z");
    }
  }, {
    key: "getOverlayStepPath",
    value: function getOverlayStepPath(step) {
      return this.getOverlayElPath(this.getStepEl(step));
    }
  }, {
    key: "getOverlayElPath",
    value: function getOverlayElPath(el) {
      var padding = this.options.padding;
      padding = padding ? padding / 2 : 0;
      var _el$getBoundingClient3 = el.getBoundingClientRect(),
        left = _el$getBoundingClient3.left,
        top = _el$getBoundingClient3.top,
        width = _el$getBoundingClient3.width,
        height = _el$getBoundingClient3.height;
      var r = 4;
      var path = this.getOverlayDocumentPath();
      path += "M ".concat(left - padding + r, " ").concat(top - padding, "\n                 a ").concat(r, ",").concat(r, " 0 0 0 -").concat(r, ",").concat(r, "\n                 V ").concat(height + top + padding - r, "\n                 a ").concat(r, ",").concat(r, " 0 0 0 ").concat(r, ",").concat(r, "\n                 H ").concat(width + left + padding - r, "\n                 a ").concat(r, ",").concat(r, " 0 0 0 ").concat(r, ",-").concat(r, "\n                 V ").concat(top - padding + r, "\n                 a ").concat(r, ",").concat(r, " 0 0 0 -").concat(r, ",-").concat(r, "Z");
      return path;
    }
  }, {
    key: "createOverlayEl",
    value: function createOverlayEl() {
      var _this7 = this;
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaults = {
        stop: function () {
          var _stop2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
            var _args6 = arguments;
            return _regenerator.default.wrap(function (_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (!_this7.options.exitOverlay) {
                    _context6.next = 1;
                    break;
                  }
                  _context6.next = 1;
                  return _this7.stop.apply(_this7, _args6);
                case 1:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));
          function stop() {
            return _stop2.apply(this, arguments);
          }
          return stop;
        }(),
        path: this.getOverlayDocumentPath()
      };
      return this.createEl('overlay', this.options.templates.overlay, _objectSpread(_objectSpread({}, defaults), data));
    }
  }, {
    key: "mountOverlayEl",
    value: function mountOverlayEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.mountEl(this.createOverlayEl(data), document.body);
    }
  }, {
    key: "removeOverlayEl",
    value: function removeOverlayEl() {
      return this.removeEl('overlay');
    }
  }, {
    key: "createInteractionEl",
    value: function createInteractionEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var interaction = this.options.interaction;
      if (typeof this.currentStep.interaction === 'boolean') {
        interaction = this.currentStep.interaction;
      }
      var defaults = _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        interaction: interaction
      });
      return this.createEl('interaction', this.options.templates.interaction, _objectSpread(_objectSpread({}, defaults), data));
    }
  }, {
    key: "mountInteractionEl",
    value: function mountInteractionEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.mountEl(this.createInteractionEl(data), document.body);
    }
  }, {
    key: "removeInteractionEl",
    value: function removeInteractionEl() {
      return this.removeEl('interaction');
    }
  }, {
    key: "createControlEl",
    value: function createControlEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.createEl('control', this.options.templates.control, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        tooltip: this.createTooltipEl(data)
      }, data));
    }
  }, {
    key: "mountControlEl",
    value: function mountControlEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.mountEl(this.createControlEl(data), document.body);
    }
  }, {
    key: "removeControlEl",
    value: function removeControlEl() {
      return this.removeEl('control');
    }
  }, {
    key: "createTooltipEl",
    value: function createTooltipEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaults = _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        progressbar: this.createProgressbarEl(data),
        title: this.createTitleEl(data),
        description: this.createDescriptionEl(data),
        close: this.createCloseEl(data),
        customButtons: this.createCustomButtonsEl(data),
        previous: this.createPreviousEl(data),
        pagination: this.createPaginationEl(data),
        next: this.createNextEl(data),
        copyright: this.createCopyrightEl(data),
        notification: this.createNotificationEl(data)
      });
      return this.createEl('tooltip', this.options.templates.tooltip, _objectSpread(_objectSpread({}, defaults), data));
    }
  }, {
    key: "createCloseEl",
    value: function createCloseEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.createEl('close', this.options.templates.close, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), data));
    }
  }, {
    key: "createProgressbarEl",
    value: function createProgressbarEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var showProgressbar = this.options.showProgressbar;
      if (typeof this.currentStep.showProgressbar === 'boolean') {
        showProgressbar = this.currentStep.showProgressbar;
      }
      var progressMax = 100;
      var progressMin = 0;
      var progress = (this.currentStepIndex + 1) / this.steps.length * 100;
      var defaults = _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        showProgressbar: showProgressbar,
        progressMax: progressMax,
        progressMin: progressMin,
        progress: progress
      });
      return this.createEl('progressbar', this.options.templates.progressbar, _objectSpread(_objectSpread({}, defaults), data));
    }
  }, {
    key: "createTitleEl",
    value: function createTitleEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$currentStep$tit = this.currentStep.title,
        title = _this$currentStep$tit === void 0 ? '' : _this$currentStep$tit;
      return this.createEl('title', this.options.templates.title, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        title: title
      }, data));
    }
  }, {
    key: "createDescriptionEl",
    value: function createDescriptionEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$currentStep$des = this.currentStep.description,
        description = _this$currentStep$des === void 0 ? '' : _this$currentStep$des;
      return this.createEl('description', this.options.templates.description, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        description: description
      }, data));
    }
  }, {
    key: "createCustomButtonsEl",
    value: function createCustomButtonsEl() {
      var _this8 = this;
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var buttons = [];
      if (this.currentStep.buttons) {
        this.currentStep.buttons.forEach(function (button) {
          var buttonEl = button;
          if (!(0, _isHtmlElement.default)(buttonEl)) {
            var onClick = button.onClick,
              _button$tagName = button.tagName,
              tagName = _button$tagName === void 0 ? 'button' : _button$tagName,
              _button$title = button.title,
              title = _button$title === void 0 ? '' : _button$title,
              className = button.class;
            buttonEl = document.createElement(tagName);
            buttonEl.innerHTML = title;
            if (className) {
              buttonEl.className = className;
            }
            if (onClick) {
              buttonEl.addEventListener('click', function (e) {
                onClick.call(_this8, e);
              });
            }
          }
          buttons.push(buttonEl);
        });
      }
      return this.createEl('customButtons', this.options.templates.customButtons, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        buttons: buttons
      }, data));
    }
  }, {
    key: "createPaginationEl",
    value: function createPaginationEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$currentStep$pag = this.currentStep.pagination,
        pagination = _this$currentStep$pag === void 0 ? this.options.pagination : _this$currentStep$pag;
      var showPagination = this.options.showPagination;
      if (typeof this.currentStep.showPagination === 'boolean') {
        showPagination = this.currentStep.showPagination;
      }
      return this.createEl('pagination', this.options.templates.pagination, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        showPagination: showPagination,
        pagination: pagination
      }, data));
    }
  }, {
    key: "createPreviousEl",
    value: function createPreviousEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var showNavigation = this.options.showNavigation;
      if (typeof this.currentStep.showNavigation === 'boolean') {
        showNavigation = this.currentStep.showNavigation;
      }
      return this.createEl('previous', this.options.templates.previous, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        showNavigation: showNavigation
      }, data));
    }
  }, {
    key: "createNextEl",
    value: function createNextEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var showNavigation = this.options.showNavigation;
      if (typeof this.currentStep.showNavigation === 'boolean') {
        showNavigation = this.currentStep.showNavigation;
      }
      return this.createEl('next', this.options.templates.next, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        showNavigation: showNavigation
      }, data));
    }
  }, {
    key: "createCopyrightEl",
    value: function createCopyrightEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.createEl('copyright', this.constructor.getDefaultOptions().templates.copyright, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), data));
    }
  }, {
    key: "createNotificationEl",
    value: function createNotificationEl() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.createEl('notification', this.options.templates.notification, _objectSpread(_objectSpread({}, this.getDefaultTmplData()), {}, {
        messages: this.notifications
      }, data));
    }

    /**
     * Show notification message
     * @param message
     * @returns {GuideChimp}
     */
  }, {
    key: "notify",
    value: function notify(message) {
      this.notifications.push(message);
      var notificationEl = this.getEl('notification');
      if (notificationEl) {
        this.mountEl(this.createNotificationEl(), notificationEl.parentElement);
      }
      return this;
    }

    /**
     * Register an event listener for a tour event.
     *
     * Event names can be comma-separated to register multiple events.
     *
     * @param {string} event The name of the event to listen for.
     * @param {function} listener The event listener, accepts context.
     * @param {object} options Listener options
     * @return {this}
     */
  }, {
    key: "on",
    value: function on(event, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // priorities from low to high
      var priorities = this.constructor.getEventListenersPriorities();
      var _priorities = (0, _slicedToArray2.default)(priorities, 1),
        priority = _priorities[0];
      if (options.priority && priorities.includes(options.priority)) {
        priority = options.priority;
      }
      var e = event.trim();
      this.listeners[e] = this.listeners[e] || {};
      this.listeners[e][priority] = this.listeners[e][priority] || [];
      this.listeners[e][priority].push(listener);
      return this;
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
      var _this9 = this;
      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }
      // from high to low
      var priorities = (0, _toConsumableArray2.default)(this.constructor.getEventListenersPriorities()).reverse();
      var e = event.trim();
      var result = [];
      var promise = Promise.resolve(result);
      if (this.listeners[e]) {
        priorities.forEach(function (priority) {
          var listeners = _this9.listeners[e][priority];
          if (listeners) {
            promise = promise.then(function () {
              return Promise.all(listeners.map(function (f) {
                return Promise.resolve().then(function () {
                  return f.apply(_this9, args);
                });
              }));
            }).then(function (r) {
              result = [].concat((0, _toConsumableArray2.default)(result), (0, _toConsumableArray2.default)(r));
              return result;
            });
          }
        });
      }
      return promise;
    }

    /**
     * Add keydown event listener
     * @return {this}
     */
  }, {
    key: "addOnKeydownListener",
    value: function addOnKeydownListener() {
      // turn on keyboard navigation
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
      var _this0 = this;
      return function (event) {
        var keyCode = event.keyCode;
        var _this0$constructor$ge = _objectSpread(_objectSpread({}, _this0.constructor.getDefaultKeyboardCodes()), _this0.options.useKeyboard),
          previousCodes = _this0$constructor$ge.previous,
          nextCodes = _this0$constructor$ge.next,
          stopCodes = _this0$constructor$ge.stop;

        //  stop tour
        if (stopCodes && stopCodes.includes(keyCode)) {
          _this0.stop({
            event: event
          });
          return;
        }

        // go to the previous step
        if (previousCodes && previousCodes.includes(keyCode)) {
          _this0.previous({
            event: event
          });
          return;
        }

        // go to the next step
        if (nextCodes && nextCodes.includes(keyCode)) {
          _this0.next({
            event: event
          });
        }
      };
    }

    /**
     * Remove keydown event listener
     * @return {this}
     */
  }, {
    key: "removeOnKeydownListener",
    value: function removeOnKeydownListener() {
      if (this.cache.has('onKeydownListener')) {
        window.removeEventListener('keydown', this.cache.get('onKeydownListener'), true);
        this.cache.delete('onKeydownListener');
      }
      return this;
    }

    /**
     * Add window resize event listener
     * @return {this}
     */
  }, {
    key: "addOnWindowResizeListener",
    value: function addOnWindowResizeListener() {
      // turn on keyboard navigation
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
      var _this1 = this;
      return function () {
        return _this1.refresh();
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
     * Add window scroll event listener
     * @returns {GuideChimp}
     */
  }, {
    key: "addOnWindowScrollListener",
    value: function addOnWindowScrollListener() {
      this.cache.set('onWindowScrollListener', this.getOnWindowScrollListener());
      window.addEventListener('scroll', this.cache.get('onWindowScrollListener'), true);
      return this;
    }

    /**
     * Return on window scroll event listener function
     * @returns {function}
     */
  }, {
    key: "getOnWindowScrollListener",
    value: function getOnWindowScrollListener() {
      var _this10 = this;
      return function () {
        return _this10.refresh();
      };
    }

    /**
     * Remove window resize event listener
     * @return {this}
     */
  }, {
    key: "removeOnWindowScrollListener",
    value: function removeOnWindowScrollListener() {
      if (this.cache.has('onWindowScrollListener')) {
        window.removeEventListener('scroll', this.cache.get('onWindowScrollListener'), true);
        this.cache.delete('onWindowScrollListener');
      }
      return this;
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      this.removeOnKeydownListener();
      this.removeOnWindowResizeListener();
      this.removeOnWindowScrollListener();
    }
  }, {
    key: "observeStep",
    value: function observeStep() {
      this.observeResizing();
      this.observeMutation();
    }
  }, {
    key: "observeResizing",
    value: function observeResizing() {
      var _this11 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        box: 'border-box'
      };
      var observer = this.observers.resizingObserver;
      if (!observer && typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(function () {
          if (!_this11 && !_this11.currentStep) {
            return;
          }
          _this11.refresh();
        });
        this.observers.resizingObserver = observer;
      }
      if (observer) {
        // observe elements
        observer.observe(this.getStepEl(this.currentStep), options);
        return true;
      }
      return false;
    }
  }, {
    key: "unobserveResizing",
    value: function unobserveResizing() {
      var observer = this.observers.resizingObserver;
      if (observer) {
        observer.disconnect();
        return true;
      }
      return false;
    }
  }, {
    key: "observeMutation",
    value: function observeMutation() {
      var _this12 = this;
      var observer = this.observers.mutationObserver;
      if (!observer) {
        observer = new MutationObserver(function (mutations) {
          if (!_this12 && !_this12.currentStep) {
            return;
          }
          var element = _this12.currentStep.element;
          if (!element) {
            return;
          }
          var el = _this12.getStepEl(_this12.currentStep);
          var isElExists = function isElExists() {
            return el && !_this12.isEl(el, 'fakeStep');
          };
          mutations.forEach(function (record) {
            if (isElExists()) {
              if (record.type === 'childList' && record.removedNodes.length) {
                record.removedNodes.forEach(function (node) {
                  if (node === el || node.contains(el)) {
                    el = _this12.getStepEl(_this12.currentStep);
                    _this12.scrollParentsToStepEl();
                    _this12.refresh();
                  }
                });
              }
            } else if (record.type === 'childList' && record.addedNodes.length) {
              el = _this12.getStepEl(_this12.currentStep);
              if (isElExists()) {
                _this12.scrollParentsToStepEl();
                _this12.refresh();
              }
            }
          });
        });
        this.observers.mutationObserver = observer;
      }
      observer.observe(this.getStepEl(this.currentStep).ownerDocument.body, {
        childList: true,
        subtree: true
      });
      return true;
    }
  }, {
    key: "unobserveMutation",
    value: function unobserveMutation() {
      var observer = this.observers.mutationObserver;
      if (observer) {
        observer.disconnect();
        return true;
      }
      return false;
    }
  }, {
    key: "unobserveStep",
    value: function unobserveStep() {
      this.unobserveResizing();
      this.unobserveMutation();
    }
  }, {
    key: "beforeChangeStep",
    value: function beforeChangeStep() {
      this.unmountStep();
      this.unobserveStep();
    }

    /**
     * Refresh layers position
     * @returns {this}
     */
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.currentStep) {
        return this;
      }
      this.highlightStepEl();
      this.setControlPosition(this.getEl('control'));
      this.setInteractionPosition(this.getEl('interaction'));
      this.setTooltipPosition(this.getEl('tooltip'));
      return this;
    }
  }], [{
    key: "getDefaultOptions",
    value: function getDefaultOptions() {
      return {
        position: 'bottom',
        useKeyboard: true,
        exitEscape: true,
        exitOverlay: true,
        showPagination: true,
        showNavigation: true,
        showProgressbar: true,
        pagination: {
          theme: 'circles',
          circles: {
            maxItems: 10
          },
          numbers: {
            delimiter: '...',
            visibleSteps: 5
          }
        },
        interaction: true,
        padding: 8,
        scrollPadding: 10,
        scrollBehavior: 'auto',
        templates: {
          close: _close.default,
          copyright: _copyright.default,
          next: _next2.default,
          previous: _previous2.default,
          progressbar: _progressbar.default,
          title: _title.default,
          description: _description.default,
          customButtons: _customButtons.default,
          pagination: _pagination.default,
          notification: _notification.default,
          tooltip: _tooltip.default,
          fakeStep: _fakeStep.default,
          control: _control.default,
          interaction: _interaction.default,
          preloader: _preloader.default,
          overlay: _overlay.default
        }
      };
    }
  }, {
    key: "getDefaultKeyboardCodes",
    value: function getDefaultKeyboardCodes() {
      var escCode = 27;
      var arrowLeftCode = 37;
      var arrowRightCode = 39;
      var enterCode = 13;
      var spaceCode = 32;
      return {
        previous: [arrowLeftCode],
        next: [arrowRightCode, enterCode, spaceCode],
        stop: [escCode]
      };
    }
  }, {
    key: "getEventListenersPriorities",
    value: function getEventListenersPriorities() {
      return ['low', 'medium', 'high', 'critical'];
    }
  }, {
    key: "getBodyClass",
    value: function getBodyClass() {
      return 'gc';
    }
  }, {
    key: "getLoadingClass",
    value: function getLoadingClass() {
      return 'gc-loading';
    }
  }, {
    key: "getHighlightClass",
    value: function getHighlightClass() {
      return 'gc-highlight';
    }
  }, {
    key: "getFixedClass",
    value: function getFixedClass() {
      return 'gc-fixed';
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
    key: "getOffset",
    value: function getOffset(el) {
      var _el$ownerDocument = el.ownerDocument,
        body = _el$ownerDocument.body,
        documentElement = _el$ownerDocument.documentElement,
        view = _el$ownerDocument.defaultView;
      var scrollTop = view.scrollY || documentElement.scrollTop || body.scrollTop;
      var scrollLeft = view.scrollX || documentElement.scrollLeft || body.scrollLeft;
      var _el$getBoundingClient4 = el.getBoundingClientRect(),
        top = _el$getBoundingClient4.top,
        right = _el$getBoundingClient4.right,
        bottom = _el$getBoundingClient4.bottom,
        left = _el$getBoundingClient4.left,
        width = _el$getBoundingClient4.width,
        height = _el$getBoundingClient4.height,
        x = _el$getBoundingClient4.x,
        y = _el$getBoundingClient4.y;
      return {
        right: right,
        bottom: bottom,
        width: width,
        height: height,
        x: x,
        y: y,
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

/***/ 1478:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
var _construct2 = _interopRequireDefault(__webpack_require__(9646));
var _GuideChimp = _interopRequireDefault(__webpack_require__(4823));
__webpack_require__(9960);
/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
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
guideChimp.plugins = new Set();
guideChimp.extend = function (plugin) {
  if (!guideChimp.plugins.has(plugin)) {
    guideChimp.plugins.add(plugin);
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    plugin.apply(void 0, [_GuideChimp.default, guideChimp].concat(args));
  }
  return guideChimp;
};
module.exports = guideChimp;

/***/ }),

/***/ 8126:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Close button template
 * @param stop
 * @returns {null|Element}
 */
var _default = exports["default"] = function _default(_ref) {
  var stop = _ref.stop;
  var _render = (0, _render2.default)('<div class="gc-close" />'),
    element = _render.element;
  element.addEventListener('click', function (e) {
    stop(e);
  });
  return element;
};

/***/ }),

/***/ 3783:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Control template
 * @param tooltip {Element}
 * @returns {Element|*}
 */
var _default = exports["default"] = function _default(_ref) {
  var tooltip = _ref.tooltip;
  var _render = (0, _render2.default)('<div class="gc-control" />'),
    control = _render.element;
  control.append(tooltip);
  return control;
};

/***/ }),

/***/ 4531:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render = _interopRequireDefault(__webpack_require__(4702));
/**
 * Copyright template
 * @returns {null|Element}
 */
var _default = exports["default"] = function _default() {
  return (0, _render.default)('<div class="gc-copyright">Made with GuideChimp</div>').element;
};

/***/ }),

/***/ 4290:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Custom buttons template
 * @param buttons
 * @returns {Element|null}
 */
var _default = exports["default"] = function _default(_ref) {
  var buttons = _ref.buttons;
  if (buttons && buttons.length) {
    var _render = (0, _render2.default)('<div ref="buttonsEl" class="gc-custom-buttons" />'),
      buttonsEl = _render.refs.buttonsEl,
      element = _render.element;
    buttons.forEach(function (b) {
      buttonsEl.append(b);
    });
    return element;
  }
  return null;
};

/***/ }),

/***/ 1920:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render = _interopRequireDefault(__webpack_require__(4702));
/**
 * Description template
 * @param description
 * @returns {Element|null}
 */
var _default = exports["default"] = function _default(_ref) {
  var description = _ref.description;
  if (description) {
    return (0, _render.default)("<div class=\"gc-description\">".concat(description, "</div>")).element;
  }
  return null;
};

/***/ }),

/***/ 2411:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Fate step template
 * @returns {Element|*}
 */
var _default = exports["default"] = function _default() {
  var _render = (0, _render2.default)('<div class="gc-fake-step"></div>'),
    element = _render.element;
  return element;
};

/***/ }),

/***/ 3534:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render = _interopRequireDefault(__webpack_require__(4702));
/**
 * Disable interaction template
 * @param interaction {boolean}
 * @returns {Element|null}
 */
var _default = exports["default"] = function _default(_ref) {
  var interaction = _ref.interaction;
  if (!interaction) {
    return (0, _render.default)('<div class="gc-interaction gc-disable"/>').element;
  }
  return null;
};

/***/ }),

/***/ 9289:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Next arrow template
 * @param nextStep
 * @param showNavigation
 * @param next
 * @returns {null|Element}
 */
var _default = exports["default"] = function _default(_ref) {
  var nextStep = _ref.nextStep,
    showNavigation = _ref.showNavigation,
    next = _ref.next;
  var classes = !nextStep || !showNavigation ? 'gc-hidden' : '';
  var _render = (0, _render2.default)("<div class=\"gc-navigation-next ".concat(classes, "\" />")),
    element = _render.element;
  element.addEventListener('click', function (e) {
    next(e);
  });
  return element;
};

/***/ }),

/***/ 4175:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render = _interopRequireDefault(__webpack_require__(4702));
var _default = exports["default"] = function _default(_ref) {
  var messages = _ref.messages;
  if (messages.length) {
    return (0, _render.default)("<div class=\"gc-notification\">".concat(messages[0], "</div>")).element;
  }
  return null;
};

/***/ }),

/***/ 8534:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(4702));
var _default = exports["default"] = function _default(_ref) {
  var path = _ref.path,
    stop = _ref.stop;
  var _render = (0, _render2.default)("\n        <div class=\"gc-overlay\">\n            <svg class=\"svg-overlay\">\n                <path d=\"".concat(path, "\">\n                    <animate attributeName=\"d\"\n                       dur=\"200ms\" />\n                </path>\n            </svg>\n        </div>\n    ")),
    overlay = _render.element;
  overlay.addEventListener('click', function (e) {
    stop(e);
  });
  return overlay;
};

/***/ }),

/***/ 2880:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render5 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Pagination template
 * @param data
 * @returns {Element|null}
 */
var _default = exports["default"] = function _default(data) {
  var showPagination = data.showPagination,
    steps = data.steps,
    pagination = data.pagination,
    currentStepIndex = data.currentStepIndex,
    previousStepIndex = data.previousStepIndex,
    nextStepIndex = data.nextStepIndex,
    previous = data.previous,
    next = data.next,
    go = data.go;
  if (showPagination && steps.length > 1) {
    var theme = pagination.theme,
      circlesTheme = pagination.circles,
      numbersTheme = pagination.numbers;
    var isNumberTheme = theme === 'numbers' || steps.length >= circlesTheme.maxItems;
    var total = steps.length;
    var lastIndex = total - 1;
    var _render = (0, _render5.default)('<div class="gc-pagination" />'),
      paginationEl = _render.element;
    var createPaginationItem = function createPaginationItem(tag, index) {
      var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var _render2 = (0, _render5.default)("<".concat(tag, " class=\"gc-pagination-item\">").concat(text, "</").concat(tag, ">")),
        li = _render2.element;
      if (index === previousStepIndex) {
        li.classList.add('gc-pagination-item-previous');
        li.addEventListener('click', function (e) {
          previous(e);
        });
      } else if (index === nextStepIndex) {
        li.classList.add('gc-pagination-item-next');
        li.addEventListener('click', function (e) {
          next(e);
        });
      } else {
        if (index === currentStepIndex) {
          li.classList.add('gc-pagination-item-current', 'gc-pagination-active');
        }
        li.addEventListener('click', function (e) {
          go(index, true, e);
        });
      }
      return li;
    };
    if (isNumberTheme) {
      var _render3 = (0, _render5.default)('<ul class="gc-pagination-theme-numbers" />'),
        ul = _render3.element;
      var half = Math.floor(numbersTheme.visibleSteps / 2);
      var start = currentStepIndex - half;
      if (lastIndex - currentStepIndex < half) {
        start = lastIndex - numbersTheme.visibleSteps;
      }
      var end = currentStepIndex + half;
      if (end < numbersTheme.visibleSteps - 1) {
        end = numbersTheme.visibleSteps - 1;
      }
      for (var i = 0; i < steps.length;) {
        if (i > 0 && i < steps.length - 1) {
          if (i < start || i > end) {
            ul.append((0, _render5.default)("<li class=\"gc-pagination-dots\">".concat(numbersTheme.delimiter, "</li>")).element);
            i = i < start ? start : steps.length - 1;

            // eslint-disable-next-line no-continue
            continue;
          }
        }
        ul.append(createPaginationItem('li', i, String(i + 1)));
        i += 1;
      }
      paginationEl.append(ul);
    } else {
      var _render4 = (0, _render5.default)('<div class="gc-pagination-theme-circles" />'),
        _ul = _render4.element;
      steps.forEach(function (v, i) {
        _ul.append(createPaginationItem('div', i));
      });
      paginationEl.append(_ul);
    }
    return paginationEl;
  }
  return null;
};

/***/ }),

/***/ 4576:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render = _interopRequireDefault(__webpack_require__(4702));
/**
 * Preloader template
 * @returns {Element}
 */
var _default = exports["default"] = function _default() {
  return (0, _render.default)('<div class="gc-preloader" />').element;
};

/***/ }),

/***/ 7869:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render2 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Previous arrow template
 * @param showNavigation
 * @param previousStep
 * @param previous
 * @returns {Element|*}
 */
var _default = exports["default"] = function _default(_ref) {
  var showNavigation = _ref.showNavigation,
    previousStep = _ref.previousStep,
    previous = _ref.previous;
  var classes = !previousStep || !showNavigation ? 'gc-hidden' : '';
  var _render = (0, _render2.default)("<div ref=\"prevEl\" class=\"gc-navigation-prev ".concat(classes, "\"/>")),
    prevEl = _render.refs.prevEl,
    element = _render.element;
  prevEl.addEventListener('click', function (e) {
    previous(e);
  });
  return element;
};

/***/ }),

/***/ 3566:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render = _interopRequireDefault(__webpack_require__(4702));
/**
 * Progressbar template
 * @param showProgressbar
 * @param progressMin
 * @param progressMax
 * @param progress
 * @returns {null|Element}
 */
var _default = exports["default"] = function _default(_ref) {
  var showProgressbar = _ref.showProgressbar,
    progressMin = _ref.progressMin,
    progressMax = _ref.progressMax,
    progress = _ref.progress;
  if (showProgressbar) {
    return (0, _render.default)(" \n            <div class=\"gc-progressbar\"\n                 role=\"progressbar\"\n                 aria-valuemin=\"".concat(progressMin, "\"\n                 aria-valuemax=\"").concat(progressMax, "\"\n                 aria-valuenow=\"").concat(progress, "\"\n                 style=\"width:").concat(progress, "%;\"\n            />")).element;
  }
  return null;
};

/***/ }),

/***/ 804:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render = _interopRequireDefault(__webpack_require__(4702));
/**
 *
 * @param title
 * @returns {Element|null}
 */
var _default = exports["default"] = function _default(_ref) {
  var title = _ref.title;
  if (title) {
    return (0, _render.default)("<div class=\"gc-title\">".concat(title, "</div>")).element;
  }
  return null;
};

/***/ }),

/***/ 7137:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _render3 = _interopRequireDefault(__webpack_require__(4702));
/**
 * Tooltip template
 * @param progressbar {Element|null}
 * @param title {Element|null}
 * @param description {Element|null}
 * @param close {Element|null}
 * @param customButtons {Element|null}
 * @param previous {Element|null}
 * @param pagination {Element|null}
 * @param next {Element|null}
 * @param copyright {Element|null}
 * @param notification {Element|null}
 * @returns {Element|*}
 */
var _default = exports["default"] = function _default(_ref) {
  var progressbar = _ref.progressbar,
    title = _ref.title,
    description = _ref.description,
    close = _ref.close,
    customButtons = _ref.customButtons,
    previous = _ref.previous,
    pagination = _ref.pagination,
    next = _ref.next,
    copyright = _ref.copyright,
    notification = _ref.notification;
  var _render = (0, _render3.default)("\n        <div class=\"gc-tooltip\">\n            <div class=\"gc-tooltip-tail\">\n        </div>\n    "),
    tooltip = _render.element;
  if (progressbar) {
    tooltip.append(progressbar);
  }
  if (title) {
    tooltip.append(title);
  }
  if (description) {
    tooltip.append(description);
  }
  if (close) {
    tooltip.append(close);
  }
  if (customButtons) {
    tooltip.append(customButtons);
  }
  if (previous || pagination || next) {
    var _render2 = (0, _render3.default)('<div class="gc-navigation" />'),
      nav = _render2.element;
    if (previous) {
      nav.append(previous);
    }
    if (pagination) {
      nav.append(pagination);
    }
    if (next) {
      nav.append(next);
    }
    tooltip.append(nav);
  }
  if (copyright) {
    tooltip.append(copyright);
  }
  if (notification) {
    tooltip.append(notification);
  }
  return tooltip;
};

/***/ }),

/***/ 5135:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = function _default(el) {
  return el instanceof HTMLElement || /^\[object HTML(.+)Element\]$/.test("".concat(el));
};

/***/ }),

/***/ 4702:
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

/***/ 1549:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(2032),
    hashDelete = __webpack_require__(3862),
    hashGet = __webpack_require__(6721),
    hashHas = __webpack_require__(2749),
    hashSet = __webpack_require__(5749);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ 2460:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(3702),
    listCacheDelete = __webpack_require__(80),
    listCacheGet = __webpack_require__(4739),
    listCacheHas = __webpack_require__(8655),
    listCacheSet = __webpack_require__(1175);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ 8223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(6110),
    root = __webpack_require__(9325);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ 3661:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(3040),
    mapCacheDelete = __webpack_require__(7670),
    mapCacheGet = __webpack_require__(289),
    mapCacheHas = __webpack_require__(4509),
    mapCacheSet = __webpack_require__(2949);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ 7217:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(2460),
    stackClear = __webpack_require__(1420),
    stackDelete = __webpack_require__(938),
    stackGet = __webpack_require__(3605),
    stackHas = __webpack_require__(9817),
    stackSet = __webpack_require__(945);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ 1873:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(9325);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 7828:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(9325);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ 1033:
/***/ (function(module) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ 695:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(8096),
    isArguments = __webpack_require__(2428),
    isArray = __webpack_require__(6449),
    isBuffer = __webpack_require__(3656),
    isIndex = __webpack_require__(361),
    isTypedArray = __webpack_require__(7167);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ 4932:
/***/ (function(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ 7805:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(3360),
    eq = __webpack_require__(5288);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),

/***/ 6547:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(3360),
    eq = __webpack_require__(5288);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ 6025:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(5288);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ 3360:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(3243);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ 9344:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(3805);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ 6649:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var createBaseFor = __webpack_require__(3221);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ 2552:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(1873),
    getRawTag = __webpack_require__(659),
    objectToString = __webpack_require__(9350);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 7534:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2552),
    isObjectLike = __webpack_require__(346);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ 5083:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(1882),
    isMasked = __webpack_require__(7296),
    isObject = __webpack_require__(3805),
    toSource = __webpack_require__(7473);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ 4901:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2552),
    isLength = __webpack_require__(294),
    isObjectLike = __webpack_require__(346);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ 2903:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(3805),
    isPrototype = __webpack_require__(5527),
    nativeKeysIn = __webpack_require__(181);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ 5250:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(7217),
    assignMergeValue = __webpack_require__(7805),
    baseFor = __webpack_require__(6649),
    baseMergeDeep = __webpack_require__(2824),
    isObject = __webpack_require__(3805),
    keysIn = __webpack_require__(7241),
    safeGet = __webpack_require__(4974);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),

/***/ 2824:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(7805),
    cloneBuffer = __webpack_require__(3290),
    cloneTypedArray = __webpack_require__(1961),
    copyArray = __webpack_require__(3007),
    initCloneObject = __webpack_require__(5529),
    isArguments = __webpack_require__(2428),
    isArray = __webpack_require__(6449),
    isArrayLikeObject = __webpack_require__(6074),
    isBuffer = __webpack_require__(3656),
    isFunction = __webpack_require__(1882),
    isObject = __webpack_require__(3805),
    isPlainObject = __webpack_require__(1331),
    isTypedArray = __webpack_require__(7167),
    safeGet = __webpack_require__(4974),
    toPlainObject = __webpack_require__(9884);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),

/***/ 9302:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var identity = __webpack_require__(3488),
    overRest = __webpack_require__(6757),
    setToString = __webpack_require__(2865);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ 9570:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var constant = __webpack_require__(7334),
    defineProperty = __webpack_require__(3243),
    identity = __webpack_require__(3488);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ 8096:
/***/ (function(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ 7556:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(1873),
    arrayMap = __webpack_require__(4932),
    isArray = __webpack_require__(6449),
    isSymbol = __webpack_require__(4394);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ 7301:
/***/ (function(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ 9653:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Uint8Array = __webpack_require__(7828);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ 3290:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(9325);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ }),

/***/ 1961:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(9653);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ 3007:
/***/ (function(module) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ 4172:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(6547),
    baseAssignValue = __webpack_require__(3360);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ 5481:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(9325);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ 999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseRest = __webpack_require__(9302),
    isIterateeCall = __webpack_require__(6800);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ 3221:
/***/ (function(module) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ 3243:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(6110);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ 4840:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 2651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(4218);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ 6110:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(5083),
    getValue = __webpack_require__(392);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ 8879:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(4335);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ 659:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(1873);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 392:
/***/ (function(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ 2032:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ 3862:
/***/ (function(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ 6721:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ 2749:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ 5749:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ 5529:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseCreate = __webpack_require__(9344),
    getPrototype = __webpack_require__(8879),
    isPrototype = __webpack_require__(5527);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ 361:
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 6800:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(5288),
    isArrayLike = __webpack_require__(4894),
    isIndex = __webpack_require__(361),
    isObject = __webpack_require__(3805);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ 4218:
/***/ (function(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ 7296:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(5481);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ 5527:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ 3702:
/***/ (function(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ 80:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ 4739:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ 8655:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ 1175:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ 3040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(1549),
    ListCache = __webpack_require__(2460),
    Map = __webpack_require__(8223);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ 7670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ 289:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ 4509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ 2949:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ 1042:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(6110);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ 181:
/***/ (function(module) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ 6009:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(4840);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ 9350:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 4335:
/***/ (function(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ 6757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var apply = __webpack_require__(1033);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ 9325:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(4840);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 4974:
/***/ (function(module) {

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;


/***/ }),

/***/ 2865:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSetToString = __webpack_require__(9570),
    shortOut = __webpack_require__(1811);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ 1811:
/***/ (function(module) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ 1420:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(2460);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ 938:
/***/ (function(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ 3605:
/***/ (function(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ 9817:
/***/ (function(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ 945:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(2460),
    Map = __webpack_require__(8223),
    MapCache = __webpack_require__(3661);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ 7473:
/***/ (function(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ 7334:
/***/ (function(module) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ 5288:
/***/ (function(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 3488:
/***/ (function(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 2428:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(7534),
    isObjectLike = __webpack_require__(346);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ 6449:
/***/ (function(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 4894:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(1882),
    isLength = __webpack_require__(294);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ 6074:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLike = __webpack_require__(4894),
    isObjectLike = __webpack_require__(346);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ 3656:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(9325),
    stubFalse = __webpack_require__(9935);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ 1882:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2552),
    isObject = __webpack_require__(3805);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ 294:
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ 3805:
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 346:
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 1331:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2552),
    getPrototype = __webpack_require__(8879),
    isObjectLike = __webpack_require__(346);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ 4394:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2552),
    isObjectLike = __webpack_require__(346);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 7167:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(4901),
    baseUnary = __webpack_require__(7301),
    nodeUtil = __webpack_require__(6009);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ 7241:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(695),
    baseKeysIn = __webpack_require__(2903),
    isArrayLike = __webpack_require__(4894);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ 5364:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseMerge = __webpack_require__(5250),
    createAssigner = __webpack_require__(999);

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;


/***/ }),

/***/ 9935:
/***/ (function(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ 9884:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(4172),
    keysIn = __webpack_require__(7241);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),

/***/ 3222:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(7556);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ 7200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(3222);

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;


/***/ }),

/***/ 9960:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5172:
/***/ (function(module) {

function _OverloadYield(e, d) {
  this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;

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

/***/ 2987:
/***/ (function(module) {

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5901:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(79);
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return arrayLikeToArray(r);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9293:
/***/ (function(module) {

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7383:
/***/ (function(module) {

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9646:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isNativeReflectConstruct = __webpack_require__(7550);
var setPrototypeOf = __webpack_require__(5636);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4579:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(7736);
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

/***/ 3693:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(7736);
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

/***/ 4994:
/***/ (function(module) {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7550:
/***/ (function(module) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9291:
/***/ (function(module) {

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1156:
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

/***/ 7752:
/***/ (function(module) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1869:
/***/ (function(module) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 6993:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorDefine = __webpack_require__(5546);
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function () {
    return this;
  }), regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (module.exports = _regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5869:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorAsyncGen = __webpack_require__(887);
function _regeneratorAsync(n, e, r, t, o) {
  var a = regeneratorAsyncGen(n, e, r, t, o);
  return a.next().then(function (n) {
    return n.done ? n.value : a.next();
  });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var regenerator = __webpack_require__(6993);
var regeneratorAsyncIterator = __webpack_require__(1791);
function _regeneratorAsyncGen(r, e, t, o, n) {
  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1791:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(5172);
var regeneratorDefine = __webpack_require__(5546);
function AsyncIterator(t, e) {
  function n(r, o, i, f) {
    try {
      var c = t[r](o),
        u = c.value;
      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
        n("next", t, i, f);
      }, function (t) {
        n("throw", t, i, f);
      }) : e.resolve(u).then(function (t) {
        c.value = t, i(c);
      }, function (t) {
        return n("throw", t, i, f);
      });
    } catch (t) {
      f(t);
    }
  }
  var r;
  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
    function f() {
      return new e(function (e, r) {
        n(t, i, e, r);
      });
    }
    return r = r ? r.then(f, f) : f();
  }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5546:
/***/ (function(module) {

function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4373:
/***/ (function(module) {

function _regeneratorKeys(e) {
  var n = Object(e),
    r = [];
  for (var t in n) r.unshift(t);
  return function e() {
    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
    return e.done = !0, e;
  };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4633:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(5172);
var regenerator = __webpack_require__(6993);
var regeneratorAsync = __webpack_require__(5869);
var regeneratorAsyncGen = __webpack_require__(887);
var regeneratorAsyncIterator = __webpack_require__(1791);
var regeneratorKeys = __webpack_require__(4373);
var regeneratorValues = __webpack_require__(579);
function _regeneratorRuntime() {
  "use strict";

  var r = regenerator(),
    e = r.m(_regeneratorRuntime),
    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
  function n(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    var e, t;
    return function (n) {
      e || (e = {
        stop: function stop() {
          return t(n.a, 2);
        },
        "catch": function _catch() {
          return n.v;
        },
        abrupt: function abrupt(r, e) {
          return t(n.a, o[r], e);
        },
        delegateYield: function delegateYield(r, o, a) {
          return e.resultName = o, t(n.d, regeneratorValues(r), a);
        },
        finish: function finish(r) {
          return t(n.f, r);
        }
      }, t = function t(r, _t, o) {
        n.p = e.prev, n.n = e.next;
        try {
          return r(_t, o);
        } finally {
          e.next = n.n;
        }
      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
      try {
        return r.call(this, e);
      } finally {
        n.p = e.prev, n.n = e.next;
      }
    };
  }
  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, t, n, o) {
        return r.w(a(e), t, n, o && o.reverse());
      },
      isGeneratorFunction: n,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, o, u) {
        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 579:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(3738)["default"]);
function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5636:
/***/ (function(module) {

function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5715:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(2987);
var iterableToArrayLimit = __webpack_require__(1156);
var unsupportedIterableToArray = __webpack_require__(7122);
var nonIterableRest = __webpack_require__(7752);
function _slicedToArray(r, e) {
  return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1132:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(5901);
var iterableToArray = __webpack_require__(9291);
var unsupportedIterableToArray = __webpack_require__(7122);
var nonIterableSpread = __webpack_require__(1869);
function _toConsumableArray(r) {
  return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9045:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(3738)["default"]);
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

/***/ 7736:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(3738)["default"]);
var toPrimitive = __webpack_require__(9045);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 3738:
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

/***/ 7122:
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

/***/ }),

/***/ 4756:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(4633)();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(1478);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=guidechimp.js.map