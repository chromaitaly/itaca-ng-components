/**
 * People Summary
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component('chPeopleSummary', {
        bindings: {
        	people: "<",
        	extraPeople: "<?",
        	noDetails: "<?"
        },
        controller: PeopleSummaryCtrl,
        template: "<span>{{$ctrl.$$peopleSummary}}</span>"
	});

	/* @ngInject */
	function PeopleSummaryCtrl($scope, ReservationUtils, $translate) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$initWatches();
		};
		
		this.$updateSummary = function() {
			if(ctrl.noDetails){
				var guestsCount = ReservationUtils.guestsCount(ctrl.people, ctrl.extraPeople);
				
				if(!guestsCount && guestsCount.total <= 0) {
					$translate('people.none').then(function(message){
						ctrl.$$peopleSummary = message;
					});

				} else {					
					$translate('people.pax').then(function(message){
						ctrl.$$peopleSummary = guestsCount.total  +' '+ message;
					});
				}
				
			} else {
	        	ReservationUtils.peopleSummary(ctrl.people, ctrl.extraPeople).then(function(message) {
	    			ctrl.$$peopleSummary = message;
	    		});
			}
		};
		
		this.$initWatches = function() {		
			$scope.$watchCollection(function() {
				return ctrl.people;
			}, ctrl.$updateSummary);
			
			$scope.$watchCollection(function() {
				return ctrl.extraPeople;
			}, ctrl.$updateSummary);
			
			$scope.$watchCollection(function() {
				return ctrl.noDetails;
			}, ctrl.$updateSummary);
		};
	}
})();