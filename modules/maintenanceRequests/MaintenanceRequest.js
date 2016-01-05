/*
	This module is for Adding a Maintenance Request From a front-end implementation of the Add Maintenance Request Remote Template
	Since the template for the form is being obtained from a remote location, and that location loads the iFrame for image upload,
		- We have to get clever with trigging the image upload form from it's parent frame
			- in this case we're using iframe[x].contentWindow.postMessage to trigger the form to submit
*/

define(['../Utilities/AjaxForm', '../remoteTemplate/env'], function(AjaxForm, env){
	return function MaintenanceRequest(formElem){
		var data;

		var uploadPhoto = function(maintenanceRequestId)
		{
			var iframe = formElem.find('iframe')
			var message = '{"upload":"true", "maintenanceRequestId":"'+maintenanceRequestId+'"}';
			var destination = env.apiUrl+'maintenance-request/upload-photo';

			iframe[0].contentWindow.postMessage(message, destination);
		}
		var showSuccess = function()
		{
			alert('Thank You. We will be in contact with you shortly!');
			clearForm();
		}
		var clearForm = function()
		{
			formElem.find('input[type="text"], select, textarea').val('');
			formElem.find('input:checked').prop('checked', false);
		}
		var uploadSuccess = function(e)
		{
			if(e.data.request != "postUri"){
				data = JSON.parse(e.data);
				if(data.uploadSuccess){
					showSuccess();
				}else{
					alert('Maintenance Request was added but there was a problem uploading your file');
				}
			}
		}
		var displayErrors = function(response)
		{
			messages = response.messages;

			alert('There were some issues with the form you submitted');
			
			for(var input in messages){
				if(messages.hasOwnProperty(input)){
					var message = messages[input];
					formElem.find('input[name="'+input+'"] + .error, textarea[name="'+input+'"] + .error, select[name="'+input+'"] + .error').html(message);
				}
			}
		}

		var af = new AjaxForm({
			formElem	: 	formElem,
			url 		: 	env.apiUrl+'maintenance-request',
			valid 		: 	function(response){ uploadPhoto(response.maintenanceRequestId); },
			invalid		: 	displayErrors,
			prePost 	: 	function(){ formElem.find('input + .error, select + .error, textarea + .error').html(''); },
			debug		: 	true
		});

		// Listen for postMessage from photo iframe
		window.addEventListener('message', uploadSuccess, false);
	}
});