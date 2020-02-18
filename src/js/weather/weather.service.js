(function() {
	"use strict";
	
	angular.module("itaca.components").provider("Weather", WeatherProvider);
	
	function WeatherProvider() {
		this.$get = /* @ngInject */ function($resource, $q) {
			return new Weather($resource, $q);
		};
	}
	
	function Weather($resource, $q, WEATHER_ID) {
		var $$service = this;
		
		this.API = $resource("https://api.openweathermap.org/data/2.5/weather");
			
		this.get = function(city, country) {
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

			$$service.API.get(params, function(response) {
				deferred.resolve(response);
				
			}, function(response) {
				deferred.reject(response.data && response.data.message ? response.data.message : "Error getting weather for " + city + ", " + country);
			});

			return deferred.promise;
		};
	}
})();