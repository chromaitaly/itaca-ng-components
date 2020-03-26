(function() {
	"use strict";
	
	angular.module("itaca.components").provider("Weather", WeatherProvider);
	
	function WeatherProvider() {
		this.$get = /* @ngInject */ function($resource, $q, WEATHER_ID) {
			return new Weather($resource, $q, WEATHER_ID);
		};
	}
	
	function Weather($resource, $q, WEATHER_ID) {
		var $$service = {};
		
		$$service.url = "https://api.openweathermap.org/data/2.5/weather";
		
		var methods = {
			get: {method:'GET', url: $$service.url, headers: { 'Content-Type': undefined, 'x-requested-with': undefined}},
		};
		
		$$service.API = $resource($$service.url, {appId: "@appId", q: "@q"}, methods);
		
		$$service.get = function(city, country) {
			var deferred = $q.defer();
			
			if (!city)  {
				deferred.reject("City cannot be null");
				return deferred.promise;
			}
			
			var params = {
				appId : WEATHER_ID,
				q : city + "," + country,
				mode : "json",
				units : "metric"
			};

			this.API.get(params).$promise.then(function(response) {
				deferred.resolve(response);
				
			}, function(response) {
				deferred.reject(response.data && response.data.message ? response.data.message : "Error getting weather for " + city + ", " + country);
			});
	
			return deferred.promise;
		};
		
		return $$service;
	}
})();