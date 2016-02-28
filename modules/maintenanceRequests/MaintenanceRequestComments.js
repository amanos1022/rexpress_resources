define(['AjaxForm','env', '../../vendor/lodash/lodash', 'velocity', 'moment'], function(AjaxForm, env, _, velocity, moment){
	return function MaintenanceRequestComments(){
		var authForm = $('form[MaintenanceSchedule]');
		var container = authForm.parent();
		var addForm,
			commentsElem,
			imgElem,
			valuesElem;


		var userCommentCSS = {
			textAlign 		: 'left',
			background 		: '#fff',
			borderRight 	: '3px solid green',
			padding 		: '1em',
			width 			: '80%',
			marginLeft  	: '20%',
			marginTop 		: '1em',
			marginBottom 	: '1em'
		};
		var adminCommentCSS = {
			textAlign 		: 'left',
			background 		: '#fff',
			borderLeft 	: '3px solid red',
			padding 		: '1em',
			width 			: '80%',
			marginTop 		: '1em',
			marginBottom 	: '1em'
		};

		// Auth Form
		var af = new AjaxForm({
			formElem 	: authForm,
			url 		: env.apiUrl + '/maintenance-request/comment/auth',
			valid 		: function (response){

				authForm.velocity({paddingTop:'50px', opacity:0}, {complete:function(){
					authForm.remove();
				}});

				authForm.parent().velocity({width:'100%'}, {complete:function(){
					container.append(ui.getMaintenanceRequestList(response.payload.maintenanceRequests))
				}});

			},
			invalid 	: function(response){
				$.fancybox({
					content : '<h3>Maintenance request not found. Please try again.</h3>',
					helpers : {
						overlay : {
							locked : false
						}
					}
				});
				setTimeout(function(){
					$.fancybox.close();
				}, 2000);
			}
		});

		var ui =  {
			getComments : function(maintenanceRequest){
				commentsElem = $('<div class="comments"></div>')
				imgElem = $('<div></div>').appendTo(container).css({width:'33%', display:'block', float:'left'});
				valuesElem = $('<div></div>').appendTo(container).css({width:'64%', paddingLeft:'2%', display:'block', float:'left', textAlign:'left'});
				$('<div></div>').appendTo(container).css({clear:'both'});
				// data
				if(maintenanceRequest.photo != null){
					$('<a href="'+env.apiUrl+'uploads/maintenanceRequests/'+maintenanceRequest.photo.filename+'" target="_blank"><img src="'+env.apiUrl+'uploads/maintenanceRequests/'+maintenanceRequest.photo.filename+'" width="100%"></a>')
						.appendTo(imgElem)
						.fancybox({
							helpers : {
								overlay : {
									locked : false
								}
							}});
				}
				$('<div><strong>Description</strong><p>'+maintenanceRequest.description+'</p></div>')
					.appendTo(valuesElem);

				// Comments
				var comments = maintenanceRequest.comments;
				for(var i=0;i<comments.length;i++){
					var comment = comments[i];
					var commentElem = $('<div class="created_by_'+comment.created_by+'"></div>')
						.appendTo(commentsElem)
						.append('<div>'+comment.comment+'</div>');

					if(comment.created_by){
						commentElem.css(userCommentCSS);
					}else{
						commentElem.css(adminCommentCSS);
					}
				}
				return commentsElem;
			},
			addComment 	: function(comment, elem){
				var commentElem = $('<div class="created_by_'+comment.created_by+'"></div>')
					.appendTo(elem)
					.css(userCommentCSS);

				commentElem.html(comment.comment);
			},
			getAddForm : function(maintenanceRequestId){
				addForm = $('<form><label>Add a Comment</label><textarea name="comment" class="form-control"></textarea><input type="submit" class="btn btn-primary" value="Add Comment"><input type="hidden" name="created_by" value="1"></form>');

				addForm.append('<input type="hidden" name="maintenance_request_id" value="'+maintenanceRequestId+'">'); // Maintenance Request ID
				addForm.append('<input type="hidden" name="created_by" value="1">'); // Created By

				return addForm;
			},
			getMaintenanceRequestList : function(maintenanceRequests){
				var listContainer = $('<div></div>').css({border:'1px solid #999'});
				var cellCss = {
					width 		: '31%',
					padding 	: '.5em .5%',
					float		: 'left'
				};

				// Title
				$('<div>Maintenace Requests for unit #'+maintenanceRequests[0].apartment.vApartmentNumber+'</div>')
					.appendTo(container)
					.css({fontSize:'1.5em', borderBottom:'1px solid #666', marginBottom:'1em'});

				var rowHead = $('<div></div>')
								.appendTo(listContainer)
								.css({
									padding 		: 	'5px 10px',
									borderBottom	: 	'2px solid #666',
									fontWeight		: 	'bold'
								})
					// $('<div>Unit Number</div>').appendTo(rowHead).css(cellCss);
					// $('<div>Name</div>').appendTo(rowHead).css(cellCss);
					$('<div>Description</div>').appendTo(rowHead).css(cellCss);
					$('<div>Date Created</div>').appendTo(rowHead).css(cellCss);
					$('<div>Status</div>').appendTo(rowHead).css(cellCss);
					$('<div></div>').appendTo(rowHead).css({clear:'both'});

				var appendItem = function(maintenanceRequest){
					var createdDate = new Date(maintenanceRequest.created_at);

					var row = $('<div></div>')
								.appendTo(listContainer)
								.css({
									padding 		: 	'5px 10px',
									borderBottom	: 	'1px solid #999',
									cursor 			: 	'pointer'
								}).hover(function(){
									$(this).velocity('stop');
									$(this).velocity({backgroundColor:'#FFF7D4'}, {duration : 200, easing:'easeOutExpo'})
								}, function(){
									$(this).velocity('stop');
									$(this).velocity({backgroundColor:'#fff'}, {duration : 200, easing:'easeInExpo'})
								});
					// $('<div>'+maintenanceRequest.apartment.vApartmentNumber+'</div>').appendTo(row).css(cellCss);
					// $('<div>'+maintenanceRequest.first_name+' '+maintenanceRequest.last_name+'</div>').appendTo(row).css(cellCss);
					$('<div>'+maintenanceRequest.description+'</div>').appendTo(row).css(cellCss);
					$('<div>'+createdDate.getMonth()+'/'+createdDate.getDate()+'/'+createdDate.getFullYear()+'</div>').appendTo(row).css(cellCss);
					$('<div>'+getStatus(maintenanceRequest.status)+'</div>').appendTo(row).css(cellCss);
					$('<div></div>').appendTo(row).css({clear:'both'});

					// Row Click
					row.click(function(){
						showComments(listContainer, maintenanceRequest);
						listContainer.hide();
					});
				}
				var getStatus = function(statusCode){
					var statusText = '';
					switch(statusCode){
						case null :
						case 0 :
							statusText = 'New'
							break;
						case 1 :
							statusText = 'Scheduled'
							break;
						case 2 :
							statusText = 'In Progress'
							break;
						case 3 :
							statusText = 'Completed'
							break;
						case 4 :
							statusText = 'Cancelled'
							break;
					}
					return statusText;
				}
				_.forEach(maintenanceRequests, appendItem);
				return listContainer;
			}
		};

		showComments = function(container, maintenanceRequest){
			var comments = ui.getComments(maintenanceRequest, container);
			var addForm = ui.getAddForm(maintenanceRequest.id);
			var af = AjaxForm({
				formElem 	: 	addForm,
				url			: 	env.apiUrl+'maintenance-request/comment',
				valid 		: 	function(response){ 
					console.log(response);
					var comment = response.payload.comment;

					ui.addComment(comment, comments);
					$(addForm[0]).find('textarea[name="comment"]').val('');
				},
				function(r){ alert('Comment field cannot be empty'); }
			});

			container.parent().append(comments);
			addForm
				.appendTo(container.parent())
				.css({paddingTop:'25px;'});;

			// Close Button
			$('<a href="#">Back</a>')
				.appendTo(container.parent())
				.click(function(e){
					e.preventDefault();
					commentsElem.remove();
					addForm.remove();
					valuesElem.remove();
					imgElem.remove();
					$(this).remove();
					container.show();
				})
		}
	}
});