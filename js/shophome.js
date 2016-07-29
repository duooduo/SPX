'use strict';
!(function () {
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
			if(d.status == 1001){
				var data = d.data;
				$('.shop_header img').attr('src',data.icon);    //头像
				$('.shop_header_name').find('span').eq(0).html(data.realName);  //名字
				$('.shop_header_name').find('span').eq(1).html(data.position);  //职位
				if(data.sex == '男'){

				}else if(data.sex == '女'){

				}
				$('.ovh .age').html(data.age);  //年龄

			}
		},
		error: function(e){
			console.log(e);
		}
	});
})();