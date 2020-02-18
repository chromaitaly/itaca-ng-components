(function() {
	"use strict";
	
	angular.module("itaca.components").factory("GuestDetailsAPI", GuestDetailsApi); 
    
    /* @ngInject */
    function GuestDetailsApi($resource, $q) {	
		
    	var $$service = {};
	
		// Url dei GuestDetailsAPI
		$$service.url = "/resources/public/js/data/json";
		
		var methods = {
			municipalities: {method:"GET", url: $$service.url+"/municipalities.json"},
			countries: {method: "GET", url: $$service.url + "/countries.json"},
			documents: {method: "GET", url: $$service.url + "/documents.json"},
		};
		
		$$service.API = $resource(this.url, null, methods);
		
		$$service.municipalities = function() {
			var deferred = $q.defer();
	
			this.API.municipalities().$promise.then(function(response) {
				deferred.resolve(response.content);
			}, function(response) {
				deferred.reject(response.data && response.data.message ? response.data.message :  "Error getting municipalities");
			});		
	
			return deferred.promise;
		};
		
		$$service.countries = function() {
			var deferred = $q.defer();
			
			this.API.countries().$promise.then(function(response) {
				deferred.resolve(response.content);
			}, function(response) {
				deferred.reject(response.data && response.data.message ? response.data.message :  "Error getting country");
			});		
	
			return deferred.promise;
		};
		
		$$service.documents = function() {
			var deferred = $q.defer();
			
			this.API.documents().$promise.then(function(response) {
				deferred.resolve(response.content);
			}, function(response) {
				deferred.reject(response.data && response.data.message ? response.data.message :  "Error getting documents");
			});		
	
			return deferred.promise;
		};
		
		return $$service;
    }
})();