(function(){
	// grabbing all elements with element name "remote-template"
	// looping trhough them and adding their "name" attr to requests array
	// checking for an options attr
		// if it has it parse value
	// setting up data object
	// send request
		// 
	var RemoteTemplateOptionsParser = function(){
		// format = key:value|key:value|
		var options = {};
		this.parse = function(raw){
			if(raw != ''){
				var optionsRaw = raw.split('|');
				for(var i = 0 ; i < optionsRaw.length ; i++ ){
					var optionObj = optionsRaw[i].split(':');
					options[optionObj[0]] = optionObj[1];				
				}
			}
			return options;
		}
	}
	var RemoteTemplateRequestGenerator = function(elem){
		var optionsParser = new RemoteTemplateOptionsParser;

		return {
			// elem : elem,
			name : elem.attr('remote-template'),
			options : optionsParser.parse(elem.attr('remote-template-options') || '')
		}
	}
	var RemoteTemplateRequester = function(){
		var postData,
			requests;
		var _this = this;
		var scriptTag = $(document.currentScript);
		var communityId = scriptTag.attr('community-id');

		var sendRequest = function()
		{
			$.ajax({
				url 	: 	apiUrl,
				type 	: 	'post',
				data 	: 	postData,
				success : 	function(templates){
					dispatchTemplates(templates);
				},
				error 	: 	function(r){
					console.log(r);
				}
			});
		}
		var setPostData = function()
		{
			postData = {};
			postData.communityId = communityId;
			postData.requests = requests;
			postData.name
		}
		var setRequests = function()
		{
			requests = [];
			$('div[remote-template]').each(function(){
				requests.push(RemoteTemplateRequestGenerator($(this)));
			});
		}
		var dispatchTemplates = function(templates){
			var template;
			for(var i=0;i<templates.length;i++){
				template = templates[i];
				$('div[remote-template="'+template.name+'"]').html(template.html);
			}
		}		
		// __Construct
		setRequests();
		setPostData();
		sendRequest();
	};
	var requester = new RemoteTemplateRequester;

	// var requests,
	// 	data,
	// 	scriptTag = $(document.currentScript),
	// 	communityId = scriptTag.attr('community-id');


	// data.communityId = communityId;
	// data.requests = requests;

	//get options

	// data.options.className = scriptTag.attr('options');

	// var dispatchTemplates = function(templates){
	// 	var template;
	// 	for(var i=0;i<templates.length;i++){
	// 		template = templates[i];
	// 		$('remote-template[name="'+template.name+'"]').html(template.templateHtml);
	// 	}
	// }

	// console.log(data);
	// $.ajax({
	// 	url 	: 	apiUrl,
	// 	type 	: 	'post',
	// 	data 	: 	data,
	// 	success : 	function(templates){
	// 		dispatchTemplates(templates);
	// 	},
	// 	error 	: 	function(r){
	// 		console.log(r);
	// 	}
	// });
})();