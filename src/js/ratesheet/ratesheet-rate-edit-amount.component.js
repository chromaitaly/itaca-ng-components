(function() {
    'use strict';
    
    angular.module('itaca.components').component('chRatesheetRateEditAmount', {
    	bindings: {
    		rate: "=",
    		type: "@",
    		label: "@",
    		ngDisabled: "<?",
    		ngRequired: "<?",
    		errorMessages: "<?",
    		errorIcon: "<?",
    		errorBg: "<?",
    		validateOnInit: "<?",
    		updateOn: "@",
    		onChange: "&?"
    	},
		controller: RatesheetRateEditAmountCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-rate-edit-amount.tpl"
    });
    
    /* @ngInject */
    function RatesheetRateEditAmountCtrl($scope, $mdMedia, REGEXP, StringUtils) {
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	this.REGEXP = REGEXP;
    	this.$$hasIconLeftClass = false;
    	
    	this.$onInit = function() {
    		ctrl.$initRate();
    		ctrl.$initUpdateMode();
    		ctrl.$initErrorIcon();
    		ctrl.$initErrorBg();
    	};
    	
    	this.$postLink = function() {
    		if (ctrl.validateOnInit) {
    			$scope.chRatesheetRateDataForm.$setSubmitted();
    		}
    	};
    	
    	this.$initRate = function() {
    		ctrl.rate = _.isPlainObject(ctrl.rate) ? ctrl.rate : {};
    		ctrl.type = ctrl.type || "STANDARD";
    		ctrl.rate.type = ctrl.type;
    	};
    	
    	this.$initUpdateMode = function() {
    		ctrl.updateOn = _.includes(["default", "blur"], ctrl.updateOn) ? ctrl.updateOn : "default";
    	};
    	
    	this.$initErrorIcon = function() {
    		ctrl.errorIcon = _.isNil(ctrl.errorIcon) || StringUtils.isBoolean(ctrl.errorIcon) && StringUtils.toBoolean(ctrl.errorIcon) ? "mdi mdi-alert md-24 md-warn" : _.isNil(StringUtils.toBoolean(ctrl.errorIcon)) ? ctrl.errorIcon : StringUtils.toBoolean(ctrl.errorIcon);
    	};
    	
    	this.$initErrorBg = function() {
    		ctrl.errorBg = _.isNil(ctrl.errorBg) || StringUtils.isBoolean(ctrl.errorBg) && StringUtils.toBoolean(ctrl.errorBg) ? "mdi mdi-alert md-24 md-warn" : _.isNil(StringUtils.toBoolean(ctrl.errorBg)) ? ctrl.errorBg : StringUtils.toBoolean(ctrl.errorBg);
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (!changesObj) {
    			return;
    		}
    		
    		if (changesObj.rate || changesObj.type) {
    			ctrl.$initRate();
    		}
    		
    		if (changesObj.updateOn) {
    			ctrl.$initUpdateMode();
    		}
    		
    		if (changesObj.errorIcon) {
    			ctrl.$initErrorIcon();
    		}
    		
    		if (changesObj.errorBg) {
    			ctrl.$initErrorBg();
    		}
    	};
    	
    	this.$onChange = function() {
    		var form = $scope.chRatesheetRateDataForm;
    		form.$setSubmitted();
    		
    		if (form.$invalid) {
				form.amount.$setTouched();
    			return;
    		}
    		
    		ctrl.onChange && ctrl.onChange({
    			$rate: ctrl.rate, 
    			$type: ctrl.type
    		});
    	};
    }
        
})();