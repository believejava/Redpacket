angular.module('npmtApp').filter('allowedCityFilter',function(){
	return function (input) {
		var output = "";
		for (var i = 0; i < input.length; i++) {
				var tmpCity = "";
				if (i == input.length-1) {
					tmpCity = input[i].name;
				} else 
					tmpCity = input[i].name + " | ";
			output += tmpCity; 
		}
		return output;
	}
});


angular.module('npmtApp').filter('isSelectedFilter',function(){
	return function (input) {
		var output = "";
		if(input)
			output = "是";
		else
			output = "否"
		return output;
	}
});

