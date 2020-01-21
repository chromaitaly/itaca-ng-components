(function() {
	'use strict';
	
	angular.module("itaca.components").component('chAmountInput', {
		require: {
			ngModelCtrl: 'ngModel',
		},
		bindings: {
			ngModel: "<?",
			ngMin: "<?",
			ngStep: "<?",
			ngMax: "<?",
			amountType: "@",
			amountCurrency: "@",
			inputName: "@",
			label: "@",
			labelNoFloat: "<?",
			inputContainerClass: "@",
			ngRequired: "<?",
			ngDisabled: "<?",
			ngReadonly: "<?",
			hideIcon: "<?",
			allowNegative: "<?",
			errorMessages: "<?",
			ngDisabled: "<?",
			ngChange: "&"
	    },
	    controller: AmountInputCtrl,
	    templateUrl: "/tpls/amount-input/amount-input.tpl"
	});

	/* @ngInject */
	function AmountInputCtrl($scope, REGEXP) {
	   var ctrl = this;
	   
	   this.REGEXP = REGEXP;
	   
	   this.$onInit = function() {
//		   ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
		   ctrl.inputName = ctrl.inputName || 'amount';
		   ctrl.allowNegative = _.isBoolean(ctrl.allowNegative) ? ctrl.allowNegative : false;
		   ctrl.ngMin = ctrl.ngMin < 0 && !ctrl.allowNegative ? 0 : ctrl.ngMin;
		   ctrl.ngStep = _.isFinite(ctrl.ngStep) ? ctrl.ngStep : ctrl.amountType && ctrl.amountType == 'PERCENTAGE' ? 1 : 0.01;
		   
		   ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
		   
		   if (ctrl.amountType || ctrl.amountCurrency) {
			   var amount = ctrl.ngModel ? angular.copy(ctrl.ngModel) : {};
			  
			   ctrl.amountType && (amount.type = ctrl.amountType);
			   ctrl.amountCurrency && (amount.currency = ctrl.amountCurrency);
			   
			   ctrl.ngModelCtrl.$setViewValue(amount);
		   }
	   };
	   
	   this.$update = function() {
			ctrl.ngModelCtrl.$setViewValue(ctrl.ngModel);
		};	   
	}
})();