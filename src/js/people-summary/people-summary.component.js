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
        template: "<span ng-bind='$ctrl.$$peopleSummary'></span>"
	});

	/* @ngInject */
	function PeopleSummaryCtrl($scope, ReservationUtils, $translate) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$updateSummary();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.people || changesObj.extraPeople || changesObj.noDetails) {
				ctrl.$updateSummary();
			}
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
						ctrl.$$peopleSummary = _.toLower(guestsCount.total  +' '+ message);
					});
				}
				
			} else {
	        	ReservationUtils.peopleSummary(ctrl.people, ctrl.extraPeople).then(function(message) {
	    			ctrl.$$peopleSummary = message;
	    		});
			}
		};
	}
})();