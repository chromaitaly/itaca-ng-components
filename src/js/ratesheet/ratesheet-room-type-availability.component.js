(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheetRoomTypeAvailability", {
    	require: {
    		ratesheetRoomTypeCtrl: "^chRatesheetRoomType"
    	},
    	bindings: {
    		availability: "<",
    		onClick: "&?"
    	},
		controller: RatesheetRoomTypeAvailabilityCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-room-type-availability.tpl"
    });
    
    /* @ngInject */
    function RatesheetRoomTypeAvailabilityCtrl($scope, $mdMedia) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    	};
    	
    	this.$click = function(ev) {
    		this.onClick && this.onClick({
    			$event: ev,
    			$availability: ctrl.availability
    		});
    	};
    	
    }
        
})();