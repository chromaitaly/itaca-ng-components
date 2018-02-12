(function() {
    'use strict';
    
    angular.module('itaca.components').component('chRatesheetRate', {
    	bindings: {
    		rate: "<",
    		type: "@",
    		showDetails: "<",
    		onSave: "&?",
    		onSaveMinStay: "&?",
    		onToggleClosing: "&?"
    	},
		controller: RatesheetRateCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-rate.tpl"
    });
    
    /* @ngInject */
    function RatesheetRateCtrl($scope, $mdMedia, REGEXP) {
    	
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
    		
    		// memorizzo la tariffa originale
    		ctrl.$$tempRate = angular.copy(ctrl.rate);
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
    		var close = ctrl.$$isStandard ? ctrl.rate.standard.enabled : ctrl.rate.notRefundable.enabled;
    		close = _.isBoolean(close) ? close : false; 
    		
    		ctrl.onToggleClosing && ctrl.onToggleClosing({
    			$event: ev,
    			$rate: ctrl.$$tempRate, 
    			$type: ctrl.type, 
    			$closed: close
    		});
    	};

    	this.$saveMinStay = function() {
    		var form = $scope.chRatesheetRateForm;
    		form.$setSubmitted();
    		
    		if (form.$invalid) {
    			form.minStay.$setTouched();
    			return;
    		}
    		
    		ctrl.onSaveMinStay && ctrl.onSaveMinStay({
    			$rate: ctrl.$$tempRate, 
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
    			$rate: ctrl.$$tempRate, 
    			$type: ctrl.type
    		});
    	};
    }
        
})();