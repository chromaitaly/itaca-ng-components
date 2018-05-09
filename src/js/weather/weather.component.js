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
	    		"<i ng-if=\"$ctrl.$$weather.label == 'partly.cloudy'\" ng-class=\"$ctrl.$$weather.isNight ? 'starry' : 'sunny'\" class=\"cloud\"></i>"+
	    			"<md-icon class=\"{{$ctrl.$$weather.icon}}\"></md-icon>"+
	    		"</div>"+
	    		"<div class=\"text-white\"><span ng-if=\"$ctrl.$$weather.label\" translate=\"weather.{{$ctrl.$$weather.label}}\"></span></div>"+
	    		"<div class=\"md-headline text-bold text-white text-capitalize\"><span>{{$ctrl.city}}</span></div>"+
	    		"<div class=\"md-body-2 text-white text-uppercase\"><span>{{$ctrl.country}}</span></div>"+
	    		"<div>"+
	    			"<span class=\"md-headline text-bold text-white\">{{$ctrl.$$weather.temp}}</span>"+
	    			"<mdi-icon class=\"mdi mdi-temperature-celsius material-icons text-white\"></md-icon>"+
	    		"</div>"+
	    	"</div>"
	});
	
	/* @ngInject */
	function WeatherCtrl($scope, $log, $http, Weather, WeatherUtils, NumberUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$reset();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.city) {
				ctrl.$getWeather();
			}
		};
		
		this.$reset = function() {
			ctrl.$$weather = {icon: "mdi mdi-minus material-icons md-164", temp: "-"};
		};
		
		this.$getWeather = function() {
			Weather.get(ctrl.city, ctrl.country).then(function(response) {
				if(!_.isNil(response)){
		    		ctrl.$$weather.temp = NumberUtils.fixedDecimals(response.main.temp, 1);
		    		ctrl.$getInfo(response.weather[0].icon);
		    		
		    	} else {
		    		$log.error("Error getting weather");
		    	}
			}, function(error) {
				$log.error(error);
				ctrl.$reset();
			});
		};
		
		this.$getInfo = function(iconId){
			_.assign(ctrl.$$weather, WeatherUtils.getInfo(iconId));
		};
	}
})();
