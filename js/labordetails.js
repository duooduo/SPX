'use strict';
!(function () {
	var id = getQueryStringArgs().id;

	var postJson = {
		"id": id,
		"source": "H5"
	};
	$.ajax({
		url: location.protocol + portJson.site + portJson.viewLabor,
		type: 'POST',
		dataType: 'json',
		// headers: {"Content-type": "application/json;charset=UTF-8"},
		// contentType: 'application/json;charset=UTF-8',
		data: postJson,
		success: function (d) {
			console.log(d);
			if(d.status == 1001){
				var data = d.data;
				$('.labor_header img').attr('src',data.icon);
				$('.labor_name em').html(data.realName);
				$('.labor_name span').html(data.workStatus);
				if(data.sex == '男'){
					$('.p_tip').append('<span class="age1">'+ data.age +'</span>');
				}else if(data.sex == '女'){
					$('.p_tip').append('<span class="age2">'+ data.age +'</span>');
				}
				if(data.workYears){
					$('.p_tip').append('<span class="yer">'+ data.workYears +'</span>');
				}
				if(data.education){
					$('.p_tip').append('<span class="edu">'+ data.education +'</span>');
				}

				$('.dataPurpose').find('dl').eq(0).find('dd').html(data.purpose);
				if( !data.salaryMin || !data.salaryMax ){
					$('.dataPurpose').find('dl').eq(1).find('dd').html('面议');
				}else {
					$('.dataPurpose').find('dl').eq(1).find('dd').html(data.salaryMin + '-' + data.salaryMax);
				}

				if(data.workHistory && (data.workHistory.length > 0)){
					var historyDom = '';
					for(var i=0; i<data.workHistory.length; i++){
						var index = data.workHistory[i];
						if(index.workYears && index.workYears != 0){
							historyDom += '<span>'+ index.situation.value + index.workYears + '年' +'</span>';
						}else if(index.workYears && index.workYears == 0 && index.workMonth && index.workMonth != 0){
							historyDom += '<span>'+ index.situation.value + index.workMonth + '月' +'</span>';
						}else {
							historyDom += '<span>'+ index.situation.value +'</span>';
						}
					}
					$('.dataWorkHistory .p_tipsBox').html(historyDom);
				}else {
					$('.dataWorkHistory').remove();
				}

				if(data.workExperience && data.workExperience.length>0){
					var experienceDom = '';
					for(var i=0; i<data.workExperience.length; i++){
						var index = data.workExperience[i];
						if(index.workEndYear && index.workEndMonth){
							experienceDom += '<dl><dt>'+ index.title +'（'+ index.company +'）</dt><dd>'+ index.workStartYear +'.'+ index.workStartMonth +'-'+ index.workEndYear +'.'+ index.workEndMonth +'</dd></dl>'
						}else {
							experienceDom += '<dl><dt>'+ index.title +'（'+ index.company +'）</dt><dd>'+ index.workStartYear +'.'+ index.workStartMonth +'-'+ '至今' +'</dd></dl>'
						}
					}
					$('.dataWorkExperience .labor_list03').html(experienceDom);
				}else {
					$('.dataWorkExperience').remove();
				}

				if(data.specialty){
					$('.labor_intro').html(data.specialty);
				}else {
					$('.dataSpecialty').remove();
				}

				toDownload();
			}
		},
		error: function(e){
			console.log(e);
		}
	});
})();