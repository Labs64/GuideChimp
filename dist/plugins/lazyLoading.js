/*! GuideChimp v5.0.0 | Copyright (C) 2026 Labs64 GmbH */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["guideChimpPluginLazyLoading"] = factory();
	else
		root["guideChimpPluginLazyLoading"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 701:
/***/ (function(module) {



/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

/**
 *
 * @param {Class} cls GuideChimp class
 * @param {Object} factory GuideChimp factory
 * @param {Object} options the options object
 */
module.exports = function (cls, factory, options) {
  var opt = options || {};
  var _opt$timeout = opt.timeout,
    timeout = _opt$timeout === void 0 ? 5000 : _opt$timeout;
  var _opt$frequency = opt.frequency,
    frequency = _opt$frequency === void 0 ? 100 : _opt$frequency;
  var parentInit = cls.prototype.init;

  // eslint-disable-next-line func-names,no-param-reassign
  cls.prototype.init = function () {
    var _this = this;
    parentInit.call(this);
    this.on('onBeforeChange', function (toStep) {
      return new Promise(function (resolve) {
        var element = toStep.element;
        if (!element) {
          resolve();
          return;
        }
        var isElExists = function isElExists() {
          var el = _this.getStepEl(toStep);
          return el && !_this.isEl(el, 'fakeStep');
        };
        if (isElExists()) {
          resolve();
          return;
        }
        var interval = setInterval(function () {
          timeout -= frequency;
          if (isElExists() || timeout <= 0) {
            clearInterval(interval);
            resolve();
          }
        }, frequency);
      });
    });
  };
};

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(701);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=lazyLoading.js.map