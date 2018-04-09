(function() {
	'use strict';
	
	angular.module("itaca.components").factory('WeatherUtils', WeatherUtilsFactory);
	
	/* @ngInject */
	function WeatherUtilsFactory() {		
		var $$service = {};
		
		$$service.getInfo = function(iconId) {
			if(!iconId){
				return null;
			}
			
			var icon = "mdi-minus";
			var label;
			var isNight = iconId.slice(-1) == "n"; //d = day - n = night
			
			switch(iconId) {
				case "01d" : label = "sunny"; icon="sunny"; break; // Limpido giorno - Clear 
				case "01n" : label = "starry"; icon="starry"; break; // Limpido notte - Clear 
				
				case "02d" :
				case "02n" : label = "partly.cloudy"; icon="cloudy"; break; // Poco nuvoloso - Clouds
				
				case "03d" :
				case "03n" :
				case "04d" :
				case "04n" : label = "cloudy"; icon="cloudy"; break; // Nuvoloso - Clouds
				
				case "09d" :
				case "09n" : label = "drizzle"; icon="rainy"; break; // Pioggerella - Drizzle
				
				case "010d":
				case "010n": label = "rain"; icon="rainy"; break; // Pioggia - Rain
				
				case "011d":
				case "011n": label = "thunderstorm"; icon="stormy"; break; // Temporale - Thunderstorm
				
				case "013d":
				case "013n": label = "snowy"; icon="snowy"; break; // Neve - Snow
				
				case "050d":
				case "050n": label = "variable"; icon= "material-icons md-160 mdi mdi-weather-windy text-white"; break; // Vario
					
				default	   : label = "variable"; icon="material-icons md-160 mdi mdi-weather-windy text-white"; break;
			}
			
			return {
				icon: icon,
				label: label,
				isNight: isNight
			};
		};
		
		$$service.getLabel = function(iconId){
			if(!iconId){
				return null;
			}
			
			var label = "";
				
			switch(iconId) {
				case "01d" : label = "sunny"; break; // Limpido giorno - Clear 
				case "01n" : label = "starry"; break; // Limpido notte - Clear 
				
				case "02d" :
				case "02n" : label = "partly.cloudy"; break; // Poco nuvoloso - Clouds
				
				case "03d" :
				case "03n" :
				case "04d" :
				case "04n" : label = "cloudy"; break; // Nuvoloso - Clouds
				
				case "09d" :
				case "09n" : label = "drizzle"; break; // Pioggerella - Drizzle
				
				case "010d":
				case "010n": label = "rain"; break; // Pioggia - Rain
				
				case "011d":
				case "011n": label = "thunderstorm"; break; // Temporale - Thunderstorm
				
				case "013d":
				case "013n": label = "snowy"; break; // Neve - Snow
				
				case "050d":
				case "050n": label = "variable"; break; // Vario
					
				default	   : label = "variable"; break;
			}
			
			return label;
		};
		
		$$service.getIconClass = function(iconId){
			if(!iconId){
				return null;
			}
			
			var icon = "mdi-minus";
				
			switch(iconId) {
				case "01d" : icon="sunny"; break; // Limpido giorno - Clear 
				case "01n" : icon="starry"; break; // Limpido notte - Clear 
				
				case "02d" :
				case "02n" : icon="cloudy"; break; // Poco nuvoloso - Clouds
				
				case "03d" :
				case "03n" :
				case "04d" :
				case "04n" : icon="cloudy"; break; // Nuvoloso - Clouds
				
				case "09d" :
				case "09n" : icon="rainy"; break; // Pioggerella - Drizzle
				
				case "010d":
				case "010n": icon="rainy"; break; // Pioggia - Rain
				
				case "011d":
				case "011n": icon="stormy"; break; // Temporale - Thunderstorm
				
				case "013d":
				case "013n": icon="snowy"; break; // Neve - Snow
				
				case "050d":
				case "050n": icon= "material-icons md-160 mdi mdi-weather-windy text-white"; break; // Vario
					
				default	   : icon="material-icons md-160 mdi mdi-weather-windy text-white"; break;
			}
			
			return icon;
		};
		
		$$service.isNight = function(iconId) {
			if(!iconId){
				return null;
			}
			
			return iconId.slice(-1) == "n"; //d = day - n = night
		};
		
		return $$service;
	}
})();