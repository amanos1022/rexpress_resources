var MaintenanceRequest = function(formElem){
	var data;

	var formSubmit = function(e){
		e.preventDefault();
		data = formElem.serialize();
		sendRequest();
	}
	var sendRequest = function(){
		$.ajax({
			url : 'http://rexpressapi.angelomanos.com/maintenance-request',
			data : data,
			type : 'post',
			success : requestSuccess,
			error : requestError
		});
	}
	var requestSuccess = function(r){
		var errors = JSON.parse(r);
		clearErrors();
		if(errors.fails){
			showErrors(errors.messages);
		}else{
			uploadPhoto(errors.maintenanceRequestId);
		}
	}	
	var requestError = function(r){
		console.log(r);
	}
	var showErrors = function(messages){
		for(var input in messages){
			if(messages.hasOwnProperty(input)){
				showError(input, messages[input]);
			}
		}
	}
	var showError = function(input, message){
		formElem.find('input[name="'+input+'"] + .error, textarea[name="'+input+'"] + .error, select[name="'+input+'"] + .error').html(message);
	}
	var clearErrors = function(input){
		formElem.find('input + .error, select + .error, textarea + .error').html('');
	}
	var showSuccess = function(){
		displayThankYou();
		clearForm();
	}
	var displayThankYou = function(){
		alert('Thank You. We will be in contact with you shortly!');
	}
	var clearForm = function(){
		formElem.find('input[type="text"], select, textarea').val('');
		formElem.find('input:checked').prop('checked', false);
	}
	var uploadPhoto = function(maintenanceRequestId){
		var iframe = formElem.find('iframe')
		var message = '{"upload":"true", "maintenanceRequestId":"'+maintenanceRequestId+'"}';
		var destination = 'http://rexpressapi.angelomanos.com/maintenance-request/upload-photo';

		iframe[0].contentWindow.postMessage(message, destination);
	}
	var uploadSuccess = function(e){
		if(e.data.request != "postUri"){
			data = JSON.parse(e.data);
			if(data.uploadSuccess){
				showSuccess();
			}
		}
	}

	formElem.on('submit', formSubmit);
	window.addEventListener('message', uploadSuccess, false);	
}

var mr = new MaintenanceRequest($('form[MaintenanceRequest]'));


