define(['AjaxForm', 'env', 'underscore'], function(AjaxForm, env, _){
	return function(options){
		var communityId = $('#remote-template-script').attr('community-id'),
			formElem = $(options.formSelector);
		
		var valid = function(){
			alert('Thank You! Someone will be contacting you shortly.');
			formElem.find('input[type="text"]').val('');
			formElem.find('select').val('');
		}
		var invalid = function(r){
			_.each(r.messages, function(message, key){
				formElem
					.find('input[name="'+key+'"] + .error')
					.html(message);
			})
		}
		var clearErrors = function(){
			formElem
				.find('input + .error')
				.html('');
		}
		var init = function(){
			new AjaxForm({
				url 		: 	env.apiUrl+'community/'+communityId+'/contact-form-lead',
				formElem 	: 	formElem,
				valid 		: 	valid,
				invalid 	: 	invalid,
				prePost 	: 	clearErrors
			});
		}

		init();
	}
});