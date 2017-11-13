(function() {
	'use strict';
	
	angular.module("itaca.components").component('chWeather', {
		bindings: {
			city: "@",
			country: "@"
	    },
	    controller: WeatherCtrl,
	    template: 
	    	"<div>"+
	    		"<div class=\"relative overflow-hidden weather-container\">"+
	    			"<i ng-if=\"$ctrl.$$weather.label == \"partly.cloudy\"\" ng-class=\"$ctrl.$$weather.isNight ? \"starry\" : \"sunny\"\" class=\"cloud\"></i>"+
	    			"<i class=\"{{$ctrl.$$weather.icon}}\"></i>"+
	    		"</div>"+
	    		"<div class=\"text-white\"><span ng-if=\"$$weather.label\" translate=\"weather.{{$ctrl.$$weather.label}}\"></span></div>"+
	    		"<div class=\"md-headline text-bold text-white\"><span>{{::$ctrl.city}}</span></div>"+
	    		"<div class=\"md-body-2 text-white text-uppercase\"><span>{{::$ctrl.country}}</span></div>"+
	    		"<div>"+
	    			"<span class=\"md-headline text-bold text-white\">{{$$weather.temp}}</span>"+
	    			"<mdi-icon class=\"mdi mdi-temperature-celsius material-icons text-white\"></md-icon>"+
	    		"</div>"+
	    	"</div>"
	});
	
	/* @ngInject */
	function WeatherCtrl($scope, $log, $http, Weather, WeatherUtils, NumberUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$reset();
			
			ctrl.$getWeather();
		};
		
		this.$reset = function() {
			ctrl.$$weather = {icon: "mdi mdi-minus material-icons md-164", temp: "-"};
		};
		
		this.$getWeather = function() {
			var appId = 'd783765019148133e5c3c9beefa5d546';
			var url = 'https://api.openweathermap.org/data/2.5/$$weather';
			
			Weather.get(ctrl.city, ctrl.country).then(function(response) {
				if(!_.isNil(response.data)){
		    		ctrl.$$weather.temp = NumberUtils.fixedDecimals(response.data.main.temp, 1);
		    		ctrl.$getIcon(response.data.weather[0].icon);
		    		
		    	} else {
		    		$log.error("Error getting weather");
		    	}
			}, function(error) {
				$log.error(error);
				ctrl.$reset();
			});
			
//			$http({
//				method: 'GET',
//				url: url,
//				params: {
//					 q: ctrl.city +',' + ctrl.country,
//					 mode: 'json',
//					 units: 'metric',
//					 appId: appId,
//				}
//			}).then(function(response){
//				if(!_.isNil(response.data)){
//		    		ctrl.$$weather.temp = NumberUtils.fixedDecimals(response.data.main.temp, 1);
//		    		ctrl.$getIcon(response.data.weather[0].icon);
//		    	}
//			}, function(response) {
//				$log.error("Error getting weather: " + response.data && response.data.message ? response.data.message :  "");
//			});
		};
		
		this.$getInfo = function(iconId){
			_.assign(ctrl.$$weather, WeatherUtils.getInfo(iconId));
		};
	}
})();
