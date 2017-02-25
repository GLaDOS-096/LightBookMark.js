# LightBookMark.js

*a tiny lib using original ECMAScript5 to make your page switch automatically*

~~author: GLaDOS-096~~

## Basic Settings

`_containerName (element id)`

The container element for the whole navigation list


`_blockName (element id)`

The id set of each LBM instance


`_onClassName (class name)`

The class sign showing that the element has been activated


`_offClassName (class name)`

The class sign showing that the element is not activated


## A brief Intro

#### The page

`<div class="navList">
	<div class="btn" onclick="lbm.scrollToBookmark(1,true)"> To Chapter 1 </div>
	<div class="btn" onclick="lbm.scrollToBookmark(2,true)"> To Chapter 2 </div>
	<div class="btn" onclick="lbm.scrollToBookmark('ex',false)"></div>
	<div class="btn" onclick="lbm.scrollToBookmark(3,true)"> To Chapter 3 </div>
	<div class="arrow arrow-up" onclick="lbm.scrollToSideBookmark(-1)"></div>
	<div class="arrow arrow-down" onclick="lbm.scrollToSideBookmark(1)"></div>
</div>

<div id="container">
	<div id="chap1" class="off"></div>
	<div id="chap2" class="on"></div>
	<div id="ex" class="off"></div>
	<div id="chap3" class="off"></div>
</div>`

#### The simple code of LBM

`var lbm = LightBookMark('container','chap','on','off');`


## APIs

`getWindowHeight()`
`getOffsetX()`
`getOffsetY()`
`getElementPosX()`
`getElementPosY()`

These functions work as its name says

`hasClass()`
`addClass()`
`removeClass()`

These functions work as they are in jQuery

`scrollTo(x,y)`

Scroll the screen to the ordered position

`scrollToBookmark(symbol, useBlock)`

scroll to a certain bookmark
* if 'use block', the arg `symbol` should be the serial number of the bookmark
* if not 'use block', the arg `symbol` should be the whole name of the bookmark

`scrollToSideBookmark(uod)`
==only available while 'use block'==

the arg 'uod' refers to 'up or down' whose value ouht to be 1 if down and -1 of up
no other value is valid here

in the sample above, if we click the `.arrow-up` when activated `#chap3`, it will jump back to `#chap2`

