(function() {
    'use strict';
    
    angular.module('itaca.components').component('chRatesheetPromotion', {
    	bindings: {
    		promotion: "<",
    		type: "@",
    		showDetails: "<",
    		onSaveMinStay: "&?",
    		onToggleClosing: "&?"
    	},
		controller: RatesheetPromotionCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-promotion.tpl"
    });
    
    /* @ngInject */
    function RatesheetPromotionCtrl($scope, $mdMedia, REGEXP) {
    	
    	this.$mdMedia = $mdMedia;
    	this.REGEXP = REGEXP;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    		ctrl.$initPromotion();
    	};
    	
    	this.$initPromotion = function() {
    		ctrl.type = ctrl.type || "STANDARD";
    		
    		// memorizzo la Promo originale
    		ctrl.$$tempPromotion = angular.copy(ctrl.promotion);
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
    			$promotion: ctrl.$$tempPromotion, 
    			$type: ctrl.type, 
    			$closed: close
    		});
    	};

    	this.$saveMinStay = function() {
    		var form = $scope.chRatesheetPromotionForm;
    		form.$setSubmitted();
    		
    		if (form.$invalid) {
    			form.minStay.$setTouched();
    			return;
    		}
    		
    		ctrl.onSaveMinStay && ctrl.onSaveMinStay({
    			$promotion: ctrl.$$tempPromotion, 
    			$type: ctrl.type 
    		});
    	};
    }
        
})();