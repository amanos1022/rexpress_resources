define(['env', 'AjaxForm', '../Utilities/OptionsParser', 'jquery', 'underscore'], function(env, AjaxForm, OptionsParser, $, _){
	var postData = {
		communityId : $('#remote-template-script').attr('community-id'),
		requests 	: []
	};
	var init = function(){
		// set postData.requests
		$('div[remote-template]').each(function(){
			postData.requests.push(generateRequest($(this)));
		});

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
			options : OptionsParser(elem.attr('remote-template-options'))
		}
	}
	var dispatchTemplates = function(templates){
		var template;
		for(var i=0;i<templates.length;i++){
			template = templates[i];

			// Incase two templates are used on the same page,
			// we have to make sure we inject the html into the proper remote-template div
			// we do this by checking className:name in remote-template-options attr
			_.each($('div[remote-template="'+template.name+'"]'), function(remoteTemplate){
				var rtOptions = $(remoteTemplate).attr('remote-template-options');
				if(rtOptions.match("className:"+template.templateRequest.options.className)){
					$(remoteTemplate).html(template.html);
				}
			});
		}
	}

	
	return {
		init : init
	};
});