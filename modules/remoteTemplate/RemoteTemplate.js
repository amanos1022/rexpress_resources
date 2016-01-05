define(['env', '../Utilities/AjaxForm', '../Utilities/OptionsParser'], function(env, AjaxForm, OptionsParser){
	var postData = {
		communityId : $('#remote-template-script').attr('community-id'),
		requests 	: []
	};
	function init(){
		$.ajax({
			url 	: 	env.apiUrl+'remote-template',
			type 	: 	'post',
			data 	: 	postData,
			success : 	dispatchTemplates,
			error 	: 	function(r){ console.log(r); }
		});
	}

	var generateRequest = function(elem){
		return {
			name : elem.attr('remote-template'),
			options : OptionsParser.parse(elem.attr('remote-template-options') || '')
		}
	}
	var dispatchTemplates = function(templates){
		var template;
		for(var i=0;i<templates.length;i++){
			template = templates[i];
			$('div[remote-template="'+template.name+'"]').html(template.html);
		}
	}

	// set postData.requests
	$('div[remote-template]').each(function(){
		postData.requests.push(generateRequest($(this)));
	});
	
	return {
		init : init
	};
});