/*! GuideChimp v5.0.0 | Copyright (C) 2026 Labs64 GmbH */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["guideChimpPluginBlurredOverlay"] = factory();
	else
		root["guideChimpPluginBlurredOverlay"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(281);
/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

module.exports = function (cls) {
  // eslint-disable-next-line no-param-reassign
  cls.getNotBlurredClass = function () {
    return 'gc-not-blurred';
  };
  var parentInit = cls.prototype.init;

  // eslint-disable-next-line func-names,no-param-reassign
  cls.prototype.init = function () {
    var _this = this;
    parentInit.call(this);
    var addBlur = function addBlur(step) {
      var el = _this.getStepEl(step);
      while (el) {
        if (el === el.ownerDocument.body) {
          break;
        }
        el.classList.add(_this.constructor.getNotBlurredClass());
        el = el.parentElement;
      }
    };
    var removeBlur = function removeBlur() {
      var els = document.querySelectorAll(".".concat(_this.constructor.getNotBlurredClass()));
      els.forEach(function (el) {
        el.classList.remove(_this.constructor.getNotBlurredClass());
      });
    };
    this.on('onAfterChange', function (toStep) {
      removeBlur();
      addBlur(toStep);
    });
    this.on('onStop', function () {
      removeBlur();
    });
  };
};

/***/ }),

/***/ 281:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	var __webpack_exports__ = __webpack_require__(625);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=blurredOverlay.js.map