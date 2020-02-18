(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheetPromotionEdit", {
    	bindings: {
    		promotion: "<",
    		type: "@",
    		onSaveMinStay: "&?"
    	},
		controller: RatesheetPromotionEditCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-promotion-edit.tpl"
    });
    
    /* @ngInject */
    function RatesheetPromotionEditCtrl($scope, $mdMedia, REGEXP) {
    	
    	this.$mdMedia = $mdMedia;
    	this.REGEXP = REGEXP;
    	
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
    	
    	this.$saveMinStay = function() {
    		var form = $scope.chRatesheetPromotionForm;
    		form.$setSubmitted();
    		
    		if (form.$invalid) {
    			form.minStay.$setTouched();
    			return;
    		}
    		
    		ctrl.onSaveMinStay && ctrl.onSaveMinStay({
    			$promotion: ctrl.promotion, 
    			$type: ctrl.type 
    		});
    	};
    }
})();