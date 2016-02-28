requirejs.config({
	paths 	: 	{
		'jquery' 		: 	'../../vendor/jquery/dist/jquery',
		'underscore' 	: 	'../../vendor/underscore/underscore-min',
		'AjaxForm' 		: 	'../Utilities/AjaxForm',
		'fancybox' 		: 	'../../vendor/fancyBox/source/jquery.fancybox',
		'LoadCSS' 		: 	'../Utilities/LoadCSS',
		'velocity' 		: 	'../../vendor/velocity/velocity'
	},
	shim 	: 	{
		'fancybox' 		: 	{
			deps	: 	['jquery']
		},
		'velocity' 		: 	{
			deps	: 	['jquery']
		}
	}
});
requirejs(['env', 'RemoteTemplate'], function(env, RemoteTemplate){
	RemoteTemplate.init();
});