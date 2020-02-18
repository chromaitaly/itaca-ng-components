(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheetRoomTypeStatus", {
    	require: {
    		ratesheetRoomTypeCtrl: "^chRatesheetRoomType"
    	},
    	bindings: {
    		status: "<",
    		onToggleClosing: "&?"
    	},
		controller: RatesheetRoomTypeStatusCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-room-type-status.tpl"
    });
    
    /* @ngInject */
    function RatesheetRoomTypeStatusCtrl($scope, $mdMedia) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    	};
    	
    	this.$toggleRoomTypeClosing = function(ev) {
//    		this.status.roomClosed = !this.status.roomClosed;
    		
    		this.onToggleClosing && this.onToggleClosing({
    			$event: ev,
    			$status: ctrl.status 
    		});
    	};
    	
    }
        
})();