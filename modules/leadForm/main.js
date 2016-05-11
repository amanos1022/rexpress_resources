require(['AjaxForm', 'env', '../../vendor/lodash/lodash'], function(AjaxForm, env, _){
	var form = $('#lead-form');
	var af = new AjaxForm({
		formElem 	: 	form,
		url 		: 	env.apiUrl+'lead',
		valid 		: 	function(r){
			alert('Thank you! Someone will contact you soon.');
			window.location.reload();
		},
		invalid 	: function(r){
			_.forEach(r.messages, function(value, key){
				form.find('[name="'+key+'"] + .error').html(value);
			});
		},
		prePost 	: function(){
			fields = {
				first_name:'',
				last_name:'',
				email:''
			}
			_.forEach(fields, function(value, key){
				form.find('[name="'+key+'"] + .error').html('');
			});
		}
	});
});