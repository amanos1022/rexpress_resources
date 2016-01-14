require(['jquery', 'slick'], function($){
	$('.pets-gallery').slick({
		slidesToShow : 4,
		slidesToScroll : 4,
		infinite:false,
		dots : true
	});
});