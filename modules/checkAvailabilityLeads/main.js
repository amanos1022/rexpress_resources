require(['../Utilities/AjaxForm', 'env', '../../vendor/lodash/lodash'], function(AjaxForm, env, _){
	var form = $('#check-availability-lead');
	var af = new AjaxForm({
		formElem 	: form,
		url 		: env.apiUrl+'check-availability-leads',
		invalid		: function(r){
			_.forEach(r.messages, function(value, key){
				form.find('input[name="'+key+'"] + .error').html(value);
			});
		},
		valid		: function(r){
			alert('Thank you! Someone will be contacting you shortly!');
			form.find('input + .error').html('');
			form.find('input[name="name"]').val('');
			form.find('input[name="email"]').val('');
			form.find('input[name="phone"]').val('');
			form.find('select[name="floor_plan_id"]').val('').change();
		},
		prePost : function(){
			form.find('input + .error').html('');
		}
	});
});