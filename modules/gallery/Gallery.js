define(function(require){
	return function(options){
		var $ = require('jquery'),
			LoadCSS = require('LoadCSS'),
			env = require('env'),
			velocity = require('velocity');
			require('fancybox');

		LoadCSS(env.resourcesUrl+'vendor/fancyBox/source/jquery.fancybox.css');

		var elem = $('.'+options.className),
			layoutArr = options.layout.split(','),
			padding = layoutArr[2],
			itemWidth = (Math.floor(elem.width() / layoutArr[1]) - (padding*2)) + 'px';

		elem.children('div').each(function(){
			var img = $(this).find('img');
			var src = img.attr('src');
			var imgDiv = $('<div></div>').appendTo($(this));
			var anchor = $(this).find('a');

			// hide img elem
			img.hide();

			// setup item container sizing etc
			$(this).css({
				float			: 'left',
				padding			: padding,
				width 			: itemWidth,
				height 			: itemWidth,
				position 		: 'relative',
			    beforeShow: function(){
			        $("body").css({'overflow-y':'hidden'});
			    },
			    afterClose: function(){
			        $("body").css({'overflow-y':'visible'});
			    },
			});

			// setup imgDiv with img src bg
			imgDiv.css({
				background 		: 'url('+src+')',
				backgroundSize 	: 'cover',
				width 			: '100%',
				height			: '100%',
			})

			// setup anchor
			anchor.css({
				display:'block',
				position:'absolute',
				width: '100%',
				height: '100%'
			}).fancybox({
				scrolling : 'hidden',
				helpers : {
					overlay : {
						locked : false
					}
				}
			});
		});

		// clear div
		$('<div></div>')
			.appendTo(elem)
			.css({
				clear:'both'
			});

		// transition in
		setTimeout(function(){
			elem.velocity({opacity:1});
		}, 200);
	}
});