'use strict';
fnResize();
var k = null;
window.addEventListener("resize",function(){
	clearTimeout(k);
	k = setTimeout(fnResize,300);
},false);
function fnResize(){
	var docWidth = document.documentElement.clientWidth,
		body = document.getElementsByTagName('html')[0];
	if(docWidth >= 720) docWidth = 720;
	body.style.fontSize = docWidth / 18 + 'px';
}