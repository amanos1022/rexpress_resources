define(['../Utilities/AjaxForm','../remoteTemplate/env', '../../vendor/lodash/lodash'], function(AjaxForm, env, _){
	return function MaintenanceRequestComments(){
		var authForm = $('form[MaintenanceSchedule]');

		var af = new AjaxForm({
			formElem 	: authForm,
			url 		: env.apiUrl + '/maintenance-request/comment/auth',
			valid 		: function (response){
				authForm.parent().append(ui.getMainteneanceRequestsList(response.maintenanceRequests))
				authForm.remove();
			}
		});

		var ui =  {
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
			},
			getMainteneanceRequestsList : function(maintenanceRequests){
				var container = $('<div></div>');
				container.append('<tr></tr>')
									.append('<th>Unit Number</th>')
									.append('<th>Name</th>')
									.append('<th>Description</th>')
									.append('<th>Date Created</th>')
									.append('<th>Status</th>')
				
				var appendItem = function(maintenanceRequest){
					var row = $('<tr></tr>').append('<td>'+maintenanceRequest.apartment.vApartmentNumber+'</td>')
									.append('<td>'+maintenanceRequest.first_name+' '+maintenanceRequest.last_name+'</td>')
									.append('<td>'+maintenanceRequest.description+'</td>')
									.append('<td>'+maintenanceRequest.created_at+'</td>')
									.append('<td>'+maintenanceRequest.status+'</td>')
									.appendTo(container);
					row.click(function(){
						showComments(container.parent(), maintenanceRequest);
						container.remove();
					});
				}
				_.forEach(maintenanceRequests, appendItem);

				return container;
			}
		};
		showComments = function(parentElem, maintenanceRequest){
			var comments = ui.getComments(maintenanceRequest.comments);
			var addForm = ui.getAddForm(maintenanceRequest.id);

			var af = AjaxForm({
				formElem 	: 	addForm,
				url			: 	env.apiUrl+'maintenance-request/comment',
				valid 		: 	function(response){ 
					var comment = response.comment;

					ui.addComment(comment, comments);
					$(addForm[0]).find('textarea[name="comment"]').val('');
				},
				function(r){ alert('Comment field cannot be empty'); }
			});

			parentElem.append(comments);
			parentElem.append(addForm);
		}
	}
});