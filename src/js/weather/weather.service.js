(function() {
	'use strict';
	
	angular.module("itaca.components").provider('Weather', WeatherProvider);
	
	function WeatherProvider() {
		var $$appId = "";

		this.setAppId = function(appId) {
			$$appId = appId;
		};

		this.$get = /* @ngInject */ function($resource, $q) {
			return new Weather($resource, $q, $$appId);
		};
	}
	
	function Weather($resource, $q, appId) {
		var $$service = this;
		
		this.$$appId = appId;
		this.API = $resource("https://api.openweathermap.org/data/2.5/weather");
			
		this.get = function(city, country) {
			var deferred = $q.defer();
			
			if (!city)  {
				deferred.reject("City cannot be null");
				return deferred.promise;
			}
			
			var params = {
				appId : $$service.$$appId,
				q : city + ',' + country,
				mode : 'json',
				units : 'metric'
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