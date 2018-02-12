(function() {
    'use strict';
    
    angular.module('itaca.components').component('chRatesheetHeader', {
    	bindings: {
    		header: "<",
    		onToggleClosing: "&?"
    	},
		controller: RatesheetHeaderCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-header.tpl"
    });
    
    /* @ngInject */
    function RatesheetHeaderCtrl($scope, $mdMedia) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    	};
    	
    	this.$toggleRoomTypeClosing = function(ev) {
    		ctrl.onToggleClosing && ctrl.onToggleClosing({
    			$event: ev,
    			$date: ctrl.header.date, 
    			$closed: _.isBoolean(ctrl.header.roomClosed) ? !ctrl.header.roomClosed : false
    		});
    	};
    	
    }
        
})();