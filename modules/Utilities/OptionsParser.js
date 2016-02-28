define([], function(){
	// format = key:value|key:value|
	return function OptionsParser(raw){
		var options = {};

		if(raw != '' && typeof(raw) != 'undefined'){
			var optionsArr = raw.split('|');
			for(var i = 0 ; i < optionsArr.length ; i++ ){
				var optionArr = optionsArr[i].split(':');
				options[optionArr[0]] = optionArr[1];				
			}
		};
		return options;
	}
});