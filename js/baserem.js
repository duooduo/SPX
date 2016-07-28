'use strict';
fnResize();
window.addEventListener("resize", function() {fnResize();}, false);
function fnResize(){
	var docWidth = document.documentElement.clientWidth,
		body = document.getElementsByTagName('html')[0];
	// if(docWidth >= 720) docWidth = 720;
	body.style.fontSize = docWidth / 18 + 'px';
}