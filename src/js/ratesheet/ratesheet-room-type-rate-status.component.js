(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheetRoomTypeRateStatus", {
    	require: {
    		ratesheetRoomTypeCtrl: "^chRatesheetRoomType"
    	},
    	bindings: {
    		rate: "<",
    		onToggleClosing: "&?"
    	},
		controller: RatesheetRoomTypeRateStatusCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-room-type-rate-status.tpl"
    });
    
    /* @ngInject */
    function RatesheetRoomTypeRateStatusCtrl($scope, $mdMedia) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    	};
    	
    	
    	this.$onChanges = function(changesObj) {
    	};
    	
    	this.$toggleRateClosing = function(ev) {
//    		this.rate.closed = !this.rate.closed;
    		
    		this.onToggleClosing && this.onToggleClosing({
    			$event: ev,
    			$rate: ctrl.rate
    		});
    	};
    }
        
})();