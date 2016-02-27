require(['../Utilities/AjaxForm', 'env'], function(AjaxForm, env){
	var formElem = $('#RExpress-contact-form');
	var communityId = $('#remote-template-script').attr('community-id');

	var valid = function(){
		alert('Thank You! Someone will be with you shortly.');
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
	new AjaxForm({
		url 		: 	env.apiUrl+'community/'+communityId+'/contact-form-lead',
		formElem 	: 	formElem,
		valid 		: 	valid,
		invalid 	: 	invalid,
		prePost 	: 	clearErrors
	});
});