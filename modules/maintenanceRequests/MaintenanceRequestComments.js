var AjaxForm = function(form, url, valid, invalid){
	var data;
	form.on('submit', function(e){
		data = $(this).serialize();
		e.preventDefault();
		sendRequest();
	})

	sendRequest = function(){
		$.ajax({
			url		: url,
			type	:'post',
			success	: success,
			error 	: error,
			data 	: data
		});
	}
	success = function(errors){
		var errors = JSON.parse(errors);
		if(errors.fails){
			invalid(errors);
		}else{
			valid(errors);
		}
		return errors;
	}
	error = function(r){
		console.log(r);
	}
	valid = valid;
	invalid = invalid;
}
var MaintenanceRequestComments = function(){
	var authForm = $('form[MaintenanceSchedule]');
	AjaxForm(
		authForm,
		'http://rexpressapi.angelomanos.com/maintenance-request/comment/auth',
		function(response){
			// Valid, show commments and add comment form
			showComments(authForm.parent(), response.maintenanceRequest);
			authForm.remove();
		},
		function(r){
			alert('invalid');
		}
	);
	var ui = (function(){
		return {
			getComments : function(comments){
				var commentsElem = $('<div class="comments"></div>');
				for(var i=0;i<comments.length;i++){
					var comment = comments[i];
					var commentElem = $('<div class="created_by_'+comment.created_by+'"></div>')
										.appendTo(commentsElem);
					commentElem.html(comment.comment);
				}
				return commentsElem;
			},
			addComment 	: function(comment, elem){
				var commentElem = $('<div class="created_by_'+comment.created_by+'"></div>')
									.appendTo(elem);
				commentElem.html(comment.comment);
			},
			getAddForm : function(maintenanceRequestId){
				var form = $('<form><label>Comment</label><textarea name="comment"></textarea><input type="submit" value="Add Comment"><input type="hidden" name="created_by" value="1"></form>');

				form.append('<input type="hidden" name="maintenance_request_id" value="'+maintenanceRequestId+'">'); // Maintenance Request ID
				form.append('<input type="hidden" name="created_by" value="1">'); // Created By
				return form;
			}
		};
	})();
	showComments = function(parentElem, maintenanceRequest){
		var comments = ui.getComments(maintenanceRequest.comments);
		var addForm = ui.getAddForm(maintenanceRequest.id);

		var af = AjaxForm(
			addForm,
			'http://rexpressapi.angelomanos.com/maintenance-request/comment',
			function(response){ 
				var comment = response.comment;
				ui.addComment(comment, comments);
			},
			function(r){ alert('Comment field cannot be empty')}
		);

		parentElem.append(comments);
		parentElem.append(addForm);
	}
}
MaintenanceRequestComments();