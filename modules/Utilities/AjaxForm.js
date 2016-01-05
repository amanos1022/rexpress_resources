define([], function(){
	var AjaxForm = function(options){
		var data;
		var options = {
			formElem 	: options.formElem 	|| $('form'),
			url 	 	: options.url 		|| '',
			valid 	 	: options.valid 	|| function(e){ console.log(e); },
			invalid 	: options.invalid	|| function(e){ console.log(e); },
			prePost		: options.prePost 	|| function(){},
			debug 		: options.debug		|| false
		}

		options.formElem.on('submit', function(e){
			data = $(this).serialize();

			e.preventDefault();
			options.prePost();
			sendRequest();
		});
		sendRequest = function(){
			$.ajax({
				url		: options.url,
				type	:'post',
				success	: success,
				error 	: error,
				data 	: data
			});
		}
		success = function(response){
			var response = JSON.parse(response);
			if(response.fails){
				options.invalid(response);
			}else{
				options.valid(response);
			}
			
			if(options.debug) { console.log(response); }

			return response;
		}
		error = function(r){
			console.log(r);
		}
	}
	return AjaxForm;
});