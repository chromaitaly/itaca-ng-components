(function() {
	"use strict";
	
	angular.module("itaca.components").component("chWeather", {
		bindings: {
			city: "@",
			country: "@",
			onChange: "&?"
	    },
	    controller: WeatherCtrl,
	    template: 
	    	"<div>"+
	    		"<div class=\"relative overflow-hidden weather-container\">"+
	    			"<i ng-if=\"$ctrl.$$weather.label == 'partly.cloudy'\" ng-class=\"$ctrl.$$weather.isNight ? 'starry' : 'sunny'\" class=\"cloud\"></i>"+
	    			"<i ng-if=\"$ctrl.$$weather.icon\" class=\"{{$ctrl.$$weather.icon}}\"></i>"+
	    			"<md-icon ng-if=\"!$ctrl.$$weather.icon\" class=\"mdi mdi-minus material-icons md-164 text-white\"></md-icon>"+
	    		"</div>"+
	    		"<div ng-if=\"$ctrl.$$weather.label\" class=\"text-white\"><span translate=\"weather.{{$ctrl.$$weather.label}}\"></span></div>"+
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
			ctrl.$$weather = {icon: null, temp: "-"};
		};
		
		this.$getWeather = function() {
			Weather.get(ctrl.city, ctrl.country).then(function(response) {
				if(!_.isNil(response)){
		    		ctrl.$$weather.temp = NumberUtils.fixedDecimals(response.main.temp, 1);
		    		ctrl.$getInfo(response.weather[0].icon);
		    		ctrl.onChange && ctrl.onChange({$weather: ctrl.$$weather});
		    		
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