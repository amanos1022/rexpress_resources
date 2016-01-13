requirejs.config({
	paths :{
		jquery:'../../vendor/jquery/dist/jquery',
		slick:'../../vendor/slick-carousel/slick/slick',
	},
	shim : {
		'slick' : ['jquery']
	}
});
require(['jquery', 'slick'], function($){
	$('.pets-gallery').slick({
		slidesToShow : 4,
		slidesToScroll : 4
	});
});