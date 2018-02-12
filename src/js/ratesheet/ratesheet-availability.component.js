(function() {
    'use strict';
    
    angular.module('itaca.components').component('chRatesheetAvailability', {
    	bindings: {
    		availability: "<",
    		onClick: "&?"
    	},
		controller: RatesheetAvailabilityCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-availability.tpl"
    });
    
    /* @ngInject */
    function RatesheetAvailabilityCtrl($scope, $mdMedia) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    	};
    	
    	this.$click = function(ev) {
    		ctrl.onClick && ctrl.onClick({
    			$event: ev,
    			$date: ctrl.availability.date
    		});
    	};
    	
    }
        
})();