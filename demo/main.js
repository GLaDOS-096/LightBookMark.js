/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __LightBookMark = __webpack_require__(1);

	var lbm = __LightBookMark("container", "block", "on", "off");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(_containerName, _blockName, _onClassName, _offClassName) {
	    var constructBookmark = {
	        containerName: _containerName,
	        blockName: _blockName,
	        onClassName: _onClassName,
	        offClassName: _offClassName,
	        scrollLoop: false,
	        scrollInterval: null,
	        currentBlock: null,
	        getWindowHeight: function() {
	            return window.innerHeight;
	        },
	        getOffsetX: function() {
	            return window.pageXOffset;
	        },
	        getOffsetY: function() {
	            return window.pageYOffset;
	        },
	        getElementPosY: function(element) {
	            var y = 0;
	            while (element.offsetParent) {
	                y += element.offsetTop;
	                element = element.offsetParent;
	            }
	            return y;
	        },
	        hasClass: function(obj, cls) {
	            var _buffer = obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	            if (_buffer != null) {
	                return true;
	            } else {
	                return false;
	            }
	        },
	        removeClass: function(obj, cls) {
	            if (this.hasClass(obj, cls)) {
	                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	                obj.className = obj.className.replace(reg, '');
	            }
	        },
	        addClass: function(obj, cls) {
	            if (!this.hasClass(obj, cls)) {
	                obj.className += (" " + cls);
	            }
	        },
	        scrollTo: function(x, y) {
	            if (this.scrollLoop) {
	                var left = this.getOffsetX();
	                var top = this.getOffsetY();
	                if (Math.abs(left - x) <= 1 && Math.abs(top - y) <= 1) {
	                    window.scrollTo(x, y);
	                    clearInterval(this.scrollInterval);
	                    this.scrollLoop = false;
	                    this.scrollInterval = null;
	                } else {
	                    window.scrollTo(left + (x - left) / 10, top + (y - top) / 10);
	                }
	            } else {
	                this.scrollInterval = setInterval("lbm.scrollTo(" + x + "," + y + ")", 15);
	                this.scrollLoop = true;
	            }
	        },
	        scrollToBookmark: function(symbol, useBlock) {
	            var container = document.getElementById(this.containerName);
	            var containerPosY = this.getElementPosY(container) + container.offsetHeight;
	            var windowHeight = this.getWindowHeight();
	            if (this.scrollLoop) {
	                clearInterval(this.scrollInterval);
	                this.scrollLoop = false;
	                this.scrollInterval = null;
	            }
	            if (this.currentBlock != null) {
	                this.addClass(this.currentBlock, this.offClassName);
	            }
	            if (useBlock) {
	                this.currentBlock = document.getElementById(this.blockName + symbol);
	            } else {
	                this.currentBlock = document.getElementById(symbol);
	            }
	            if (this.hasClass(this.currentBlock, this.offClassName)) {
	                this.removeClass(this.currentBlock, this.offClassName);
	            }
	            this.addClass(this.currentBlock, this.onClassName);
	            var posY = this.getElementPosY(this.currentBlock);
	            if (posY > (containerPosY - windowHeight)) {
	                posY = (containerPosY - windowHeight);
	            }
	            this.scrollTo(0, posY);
	        },
	        scrollToSideBookmark: function(uod) {
	            var num = this.blockName.length;
	            if (this.currentBlock == null) {
	                this.currentBlock = document.getElementById(this.blockName + "0");
	                console.log(this.currentBlock);
	            }
	            var currentId = this.currentBlock.getAttribute("id");
	            var currentNum = currentId.substring(num);
	            if (uod == 1 || uod == -1) {
	                this.scrollToBookmark(currentNum + uod, true);
	            } else {
	                console.log("Param invalid");
	            }
	        }
	    };
	    return constructBookmark;
	};

/***/ }
/******/ ]);