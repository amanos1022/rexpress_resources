define([], function(){
	// format = key:value|key:value|
	return function OptionsParser(raw){
		var options = {};
		if(raw != ''){
			var optionsRaw = raw.split('|');
			for(var i = 0 ; i < optionsRaw.length ; i++ ){
				var optionObj = optionsRaw[i].split(':');
				options[optionObj[0]] = optionObj[1];				
			}
		}
		return options;
	}
});