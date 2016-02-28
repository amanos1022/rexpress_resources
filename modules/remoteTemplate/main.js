requirejs.config({
	paths 	: 	{
		'jquery' 		: 	'../../vendor/jquery/dist/jquery',
		'underscore' 	: 	'../../vendor/underscore/underscore-min',
		'AjaxForm' 		: 	'../Utilities/AjaxForm',
		'fancybox' 		: 	'../../vendor/fancyBox/source/jquery.fancybox',
		'fancyboxCSS' 	: 	'../venderHelpers/fancyboxCSS',
		'LoadCSS' 		: 	'../Utilities/LoadCSS',
		'velocity' 		: 	'../../vendor/velocity/velocity',
		'text'			: 	'../../vendor/text/text',
		'moment'		: 	'../../vendor/moment/moment'
	},
	shim 	: 	{
		'fancyboxCSS' 	: 	{
			deps 	: 	['LoadCSS']
		},
		'fancybox' 		: 	{
			deps	: 	['jquery', 'fancyboxCSS']
		},
		'velocity' 		: 	{
			deps	: 	['jquery']
		}
	}
});
requirejs(['env', 'RemoteTemplate'], function(env, RemoteTemplate){
	RemoteTemplate.init();
});