(function() {
    'use strict';
    
    angular.module('itaca.components').component('chRatesheetRateEdit', {
    	bindings: {
    		rate: "<",
    		type: "@",
    		hideRate: "<",
    		hideRestrictions: "<",
    		onSave: "&?",
    		onSaveMinStay: "&?"
    	},
		controller: RatesheetRateEditCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-rate-edit.tpl"
    });
    
    /* @ngInject */
    function RatesheetRateEditCtrl($scope, $mdMedia, REGEXP) {
    	
    	this.$mdMedia = $mdMedia;
    	this.REGEXP = REGEXP;
    	
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
    	
    	this.$saveMinStay = function() {
    		var form = $scope.chRatesheetRateForm;
    		form.$setSubmitted();
    		
    		if (form.$invalid) {
    			form.minStay.$setTouched();
    			return;
    		}
    		
    		ctrl.onSaveMinStay && ctrl.onSaveMinStay({
    			$rate: ctrl.rate, 
    			$type: ctrl.type 
    		});
    	};
    	
    	this.$saveRate = function() {
    		var form = $scope.chRatesheetRateForm;
    		form.$setSubmitted();
    		
    		if (form.$invalid) {
				form.amount.$setTouched();
    			return;
    		}
    		
    		ctrl.onSave && ctrl.onSave({
    			$rate: ctrl.rate, 
    			$type: ctrl.type
    		});
    	};
    }
        
})();