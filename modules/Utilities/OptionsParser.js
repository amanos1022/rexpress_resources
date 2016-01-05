define([], function(){
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
	return {
		parse : parse
	}
});