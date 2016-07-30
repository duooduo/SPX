'use strict';
!(function () {
	var id = getQueryStringArgs().id;

	var postJson = {
		"id": id,
		"source": "H5"
	};
	$.ajax({
		url: location.protocol + portJson.site + portJson.viewJob,
		type: 'POST',
		dataType: 'json',
		// headers: {"Content-type": "application/json;charset=UTF-8"},
		// contentType: 'application/json;charset=UTF-8',
		data: postJson,
		success: function (d) {
			console.log(d);
			if(d.status == 1001){
				var data = d.data;
				if(data.status == 0){
					$('.job_name').html(data.name);
				}else if(data.status == 1){
					$('.job_name').html('<span>【已下线】</span>'+data.name);
				}
				var date = new Date(data.createTime);
				$('.job_time').html((date.getMonth()+1) + '月' + date.getDate() + '日'); //date.getFullYear()
				$('.job_main').html(data.shopName);
				$('.job_wage').html(data.salaryMin + '-' + data.salaryMax + '元/月');
				$('.job_address').html(data.shopLocationName);

				if(data.welfare && data.welfare.length>0){
					var welfareDom = '';
					for(var i=0; i<data.welfare.length; i++){
						var index = data.welfare[i];
						welfareDom += '<span>'+ index +'</span>';
					}
					$('.dataWelfare .job_tips').html(welfareDom);
				}else {
					$('.dataWelfare').remove();
				}

				if(data.education){
					$('.dataWork .job_tips').append('<span>'+ data.education +'学历</span>');
				}
				if(data.workYears){
					$('.dataWork .job_tips').append('<span>'+ data.workYears +'经验</span>');
				}
				if(data.ageMin && data.ageMax){
					$('.dataWork .job_tips').append('<span>'+ data.ageMin +'-'+ data.ageMax +'岁</span>');
				}

				$('.dataWork .job_require').html(data.description);

				$('.job_bossInfo img').attr('src',data.icon);
				$('.job_bossInfo .ovh').html('<b>'+ data.realName +'</b>/<b>'+ data.position +'</b>');
				$('.job_shopTxt').html(data.shopName);
				$('.job_shopScope').html(data.shopScale);
				$('.job_shopType').html(data.shopType);

				toDownload();
			}
		},
		error: function(e){
			console.log(e);
		}
	});
})();