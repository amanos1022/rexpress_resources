$.fn.extend({
    AngeloLightBox : function(options){
        var imgContainerWidth = options.imgContainerWidth || 70;
        var imgContainerLeft = (100 - imgContainerWidth) / 2;

        $(this).click(function(){
            var close = function(){
                haze.remove();
                imgContainer.remove();
            }
            var haze = $('<div></div>')
                            .css({
                                background  :   'rgba(0,0,0,0.4)',
                                position    :   'absolute',
                                width       :   '100%',
                                height      :   $(document).height()+'px',
                                top         :   '0',
                                left        :   '0',
                                zIndex      :   '1000001'
                            })
                            .appendTo('body')
                            .click(close);

            var imgContainer = $('<div></div>')
                            .css({
                                width       :   imgContainerWidth+'%',
                                left        :   imgContainerLeft+'%',
                                position    :   'fixed',
                                top         :   '100px',
                                background  :   '#fff',
                                zIndex      :   '1000002',
                                padding     :   '10px',
                                boxShadow   :   '0 0 20px rgba(0,0,0,0.2)'
                            })
                            .appendTo('body')
                            .append('<img src="'+$(this).attr('src')+'" width="100%">');

            var closeBtn = $('<div><img src="http://resources.residentexpress.com/scripts/AngeloLightBox/v1.0/images/btn-close.png" width="100%"></div>')
                                .css({
                                    position:'absolute',
                                    top:'-15px',
                                    right:'-15px',
                                    width:'30px',
                                    height:'30px',
                                    cursor:'pointer'
                                })
                                .appendTo(imgContainer)
                                .click(close);
        });
    }
});