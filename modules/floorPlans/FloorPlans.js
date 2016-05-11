define(['jquery', 'fancybox'], function($, fancybox){
	return function(className){
		$('.'+className+' .'+className+'__img a').fancybox();
	}
})