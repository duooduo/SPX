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
					$('.p_tip').append('<span class="age1">'+ data.age +'</span>');
				}else if(data.sex == '女'){
					$('.p_tip').append('<span class="age2">'+ data.age +'</span>');
				}
				//todo 3年？
				// $('.ovh .p_tip').append('<span class="yer">'+  +'</span>');
				if(data.shopType){
					$('.p_tip').append('<span class="mrk">'+ data.shopType +'</span>');
				}
				$('.shop_header_site').html(data.shopName); //店名

				$('.shop_address').html(data.shopLocationName); //地址
				$('.shop_intro').html(data.shopDescription);    //介绍

				if(data.jobs && data.jobs != []){
					var jobsdom = '';
					for(var i=0; i<data.jobs.length; i++){
						var index = data.jobs[i];
						jobsdom += '<li><a href="#"><span class="fl">'+ index.name +'</span><span class="fr">'+ index.salaryMin + '-' + index.salaryMax + '元/'+ index.salaryUnit +'</span></a></li>'
					}
					$('.shop_jobList').html(jobsdom);
				}else {
					$('.dataAboutShop').css('border-bottom','none');
					$('.dataJobs').hide();
				}

				if(data.shopImg && data.shopImg != []){
					var imgdom = '';
					for(var i=0; i<data.shopImg.length; i++){
						var index = data.shopImg[i];
						imgdom += '<li><div class="shop_img"><img src="'+ index +'" alt=""></div></li>';
					}
					$('.shop_imgBox').html(imgdom);
				}else {
					$('.dataShopImg').hide();
				}
			}
		},
		error: function(e){
			console.log(e);
		}
	});
})();