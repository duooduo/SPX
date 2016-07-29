'use strict';

$(function () {
	var id = getQueryStringArgs().id;

	var postJson = {
		"id": id,
		"source": "H5"
	};
	$.ajax({
		url: location.protocol + portJson.site + portJson.viewBoss,
		type: 'POST',
		dataType: 'json',
		// headers: {"Content-type": "application/json;charset=UTF-8"},
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(postJson),
		success: function (d) {
			console.log(d);
			if(d.code == 1001){

			}
		},
		error: function(e){
			console.log(e);
		}
	});
});