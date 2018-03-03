(function() {
    'use strict';
    
    angular.module('itaca.components').component('chRatesheetRate', {
    	bindings: {
    		rate: "<",
    		type: "@",
    		onToggleClosing: "&?"
    	},
		controller: RatesheetRateCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-rate.tpl"
    });
    
    /* @ngInject */
    function RatesheetRateCtrl($scope, $mdMedia) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    		ctrl.$initRate();
    	};
    	
    	this.$initRate = function() {
    		ctrl.type = ctrl.type || "STANDARD";
    		ctrl.$$isStandard = ctrl.type == "STANDARD";
    		ctrl.$$rateDataKey = ctrl.$$isStandard ? 'standard' : 'notRefundable';
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (!changesObj) {
    			return;
    		}
    		
    		if (changesObj.rate || changesObj.type) {
    			ctrl.$initRate();
    		}
    	};
    	
    	this.$toggleRateClosing = function(ev) {
    		var rateData = ctrl.rate[ctrl.$$rateDataKey];
//    		if (!rateData || !rateData.amount || !rateData.amount.finalAmount) {
//    			return;
//    		}
    			
    		var close = rateData && rateData.enabled;
    		close = _.isBoolean(close) ? close : false; 
    		
    		ctrl.onToggleClosing && ctrl.onToggleClosing({
    			$event: ev,
    			$rate: ctrl.rate, 
    			$type: ctrl.type, 
    			$closed: close
    		});
    	};
    }
        
})();