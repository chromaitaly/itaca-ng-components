(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheetPromotion", {
    	bindings: {
    		promotion: "<",
    		type: "@",
    		onToggleClosing: "&?"
    	},
		controller: RatesheetPromotionCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-promotion.tpl"
    });
    
    /* @ngInject */
    function RatesheetPromotionCtrl($scope, $mdMedia) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    		ctrl.$initPromotion();
    	};
    	
    	this.$initPromotion = function() {
    		ctrl.type = ctrl.type || "STANDARD";
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (!changesObj) {
    			return;
    		}
    		
    		if (changesObj.promotion || changesObj.type) {
    			ctrl.$initPromotion();
    		}
    	};
    	
    	this.$toggleClosing = function(ev) {
    		var close = _.isBoolean(ctrl.promotion.enabled) ? ctrl.promotion.enabled : false; 
    		
    		ctrl.onToggleClosing && ctrl.onToggleClosing({
    			$event: ev,
    			$promotion: ctrl.promotion, 
    			$type: ctrl.type, 
    			$closed: close
    		});
    	};
    }
        
})();