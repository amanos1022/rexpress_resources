requirejs.config({
	paths : {
		'jquery' 		: '../../vendor/jquery/dist/jquery',
		'underscore' 	: '../../vendor/underscore/underscore-min',
		'AjaxForm' 		: '../Utilities/AjaxForm'
	}
});
requirejs(['env', 'RemoteTemplate'], function(env, RemoteTemplate){
	RemoteTemplate.init();
});