/**
 *LightBookMark.js
 *This is a tiny package helping creating bookmarks on pages.
 *I wrote it in an hour on October 10th.
 *I gave up being compatible with most versions of IE but maybe not in the future.
 *It is just a prototype of the final BookMark.js which I'll later push onto GitHub.
 *I decided not to build it on famous frameworks such as jQuery and Vue.js \
 *	because coding with original JavaScript furthers my understanding of it.
 *There are a few probs with this lib especially in efficiency because of too many \
 *	DOM searches and operations (you'll see it in the demo).
 *I want to expand it to a larger lib and fix those in the next few weeks or months.
 *There are a few ideas I've come up with:
 *	scrollToUpperBookmark();
 *	scrollToLowerBookmark();
 *	other packaged methods controlling real DOM bookmarks;
 *	reconstruction with JavaScript functional programming;
 *	optimization to have a higher efficiency;
 *	attempts not to affect blocks' original class names;
 *	attempts to being compatible with IE;
 *	etc...
 *Stay hungry, stay foolish.
 *To be a better Front-Ender.
 */
var lbm = {
	containerName : "container",
	blockName : "block",
	onClassName : "on",
	offClassName : "off",
	scrollLoop : false,
	scrollInterval : null,
	currentBlock : null,
	getWindowHeight : function(){
		return window.innerHeight;
	},
	getOffsetX : function(){
		return window.pageXOffset;
	},
	getOffsetY : function(){
		return window.pageYOffset;
	},
	getElementPosY : function(element){
		var y = 0;
		while(element.offsetParent){
			y += element.offsetTop;
			element = element.offsetParent;
		}
		return y;
	},
	hasClass : function(obj,cls){
		var _buffer = obj.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		if (_buffer!=null) {
			return true;
		} else {
			return false;
		}
	},
	removeClass : function(obj,cls){
		if (this.hasClass(obj,cls)) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			obj.className = obj.className.replace(reg,'');
		}
	},
	addClass : function(obj,cls){
		if (!this.hasClass(obj,cls)) {
			obj.className += (" "+cls);
		}
	},
	scrollTo : function(x,y){
		if (this.scrollLoop) {
			var left = this.getOffsetX();
			var top = this.getOffsetY();
			if (Math.abs(left-x) <= 1 && Math.abs(top-y) <= 1) {
				window.scrollTo(x,y);
				clearInterval(this.scrollInterval);
				this.scrollLoop = false;
				this.scrollInterval = null;
			} else {
				window.scrollTo(left+(x-left)/10, top+(y-top)/10);
			}
		} else {
			this.scrollInterval = setInterval("lbm.scrollTo("+x+","+y+")",15);
			this.scrollLoop = true;
		}
	},
	scrollToBookmark : function(symbol,useBlock){
		var container = document.getElementById(this.containerName);
		var containerPosY = this.getElementPosY(container) + container.offsetHeight;
		var windowHeight = this.getWindowHeight();
		var currentBlock = this.currentBlock;
		if (this.scrollLoop){
			clearInterval(this.scrollInterval);
			this.scrollLoop = false;
			this.scrollInterval = null;
		}
		if (currentBlock != null) {
			this.addClass(currentBlock,this.offClassName);
		}
		if (useBlock) {
			currentBlock = document.getElementById(this.blockName+symbol);
		} else {
			currentBlock = document.getElementById(symbol);
		}
		if (this.hasClass(currentBlock,this.offClassName)) {
			this.removeClass(currentBlock,this.offClassName);
		}
		this.addClass(currentBlock,this.onClassName);
		var posY = this.getElementPosY(currentBlock);
		if (posY > (containerPosY - windowHeight)) {
			posY = (containerPosY - windowHeight);
		}
		this.scrollTo(0,posY);
	},
	scrollToLowerBookmark : function(){
		var num = this.blockName.length;
		var currentBlock = this.currentBlock;
		if (currentBlock != null) {
			var currentId = currentBlock.getAttribute("id");
			var currentNum = currentId.substring(num);
			this.scrollToBookmark(num+1,true);
		} else {
			this.scrollToBookmark(1,true);
		}
	},
	scrollToUpperBookmark : function(){
		var num = this.blockName.length;
		var currentBlock = this.currentBlock;
		if (currentBlock != null){
			var currentId = currentBlock.getAttribute("id");
			var currentNum = currentId.substring(num);
			if (current >= 1) {
				this.scrollToBookmark(num-1,true);
			}
		}
	}
};
